import { WorkerMessageType } from "./serviceWorkerTypes"

declare var self: any

const ENABLE_LOGGER = true

const log = (title: string, ...args: any) => {
  if(ENABLE_LOGGER) {
    console.log(`ServiceWorker (${title})`, ...args)
  }
}

const getSplitedPath = (request: Request|Response) => {
  const path = /^https?\:\/\/(?:.*?)\/(.*)$/.exec(request.url)
  if(path !== null && path.length === 2) {
    return path[1].split("/")
  } else {
    return []
  }
}

const isRessourceAcceptedOnFetch = (splitedPath: string[]) => {
  return splitedPath.length >= 1
    && splitedPath[0] !== "sockjs-node"
    && !/^.*\.hot-update.js(on)?$/.test(splitedPath[0])
}

const getAssetNameWithHash = (splitedPath: string[]) => {
  const data = /^(.*?)\.[0-9a-z]+\.js$/.exec(splitedPath[1])
  if(data !== null && data.length === 2) {
    return data[1]
  } else {
    return null
  }
}

const cleanCache = (cache: Cache, splitedPath: string[]) => {
  if(splitedPath.length === 2 && splitedPath[0] === "static") {
    const hashAssetName = getAssetNameWithHash(splitedPath)
    if(hashAssetName !== null) {
      cache.matchAll().then(results => {
        results.forEach(result => {
          const resultSplitedPath = getSplitedPath(result)
          if(
            resultSplitedPath.length === 2
            && splitedPath[1] !== resultSplitedPath[1]
            && resultSplitedPath[0] === "static"
            && new RegExp(`^${hashAssetName}\.[0-9a-z]+\.js$`).test(resultSplitedPath[1])
          ) {
            cache.delete(result.url)
          }
        })
      })
    }
  }
}

const informClientIfUpdated = (original: Response, latest: Response|undefined) => {
  if(typeof latest !== "undefined" && latest.headers.get("ETag") !== original.headers.get("ETag")) {
    self.clients.matchAll().then((clients: any) => {
      clients.forEach((client: any) => {
        client.postMessage({ type: WorkerMessageType.CACHE })
      })
    })
  }
}

const onNotCachedRessource = (event: any, cache: Cache) => {
  const networkFetch = fetch(event.request)
  event.waitUntil( // Cache ressource on backgroud
    networkFetch.then(networkResponse => {
      return cache.put(event.request, networkResponse.clone())
    })
  )
  return networkFetch // Network ressource
}

const onCachedRessource = (event: any, cache: Cache, cacheResponse: Response, splitedPath: string[]) => {
  event.waitUntil( // Check new version on background
    fetch(event.request).then(networkResponse => {
      return cache.put(event.request, networkResponse.clone()).then(() => {
        return cache.match(event.request)
          .then(newCacheResponse => informClientIfUpdated(cacheResponse, newCacheResponse))
          .then(() => cleanCache(cache, splitedPath))
      })
    })
  )
  return cacheResponse // Cache ressource
}

const fetchResponse = (request: Request, event: any, splitedPath: string[]) => {
  return caches.open("offline").then(cache => {
    return cache.match(request).then(cacheResponse => {
      if(typeof cacheResponse === "undefined") {
        return onNotCachedRessource(event, cache)
      } else {
        return onCachedRessource(event, cache, cacheResponse, splitedPath)
      }
    })
  })
}

const convertToRootDocument = (request: Request) => {
  const splitedUrl = request.url.split("/")
  console.log(request)
  return new Request(`${splitedUrl[0]}//${splitedUrl[2]}/`, {
    method: "GET",
    headers: request.headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect,
  })
}

// -------------------------------------------------------------------------------------

self.addEventListener("install", (event: any) => {
  log("install", event)
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (event: any) => {
  log("activate")
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", (event: any) => {
  if(event.request.method === "GET") {
    const splitedPath = getSplitedPath(event.request)
    if(isRessourceAcceptedOnFetch(splitedPath)) {
      if(event.request.destination === "document" && splitedPath[0].length > 0) {
        log("fetch forwarded", event.request.url)
        event.respondWith(fetchResponse(convertToRootDocument(event.request), event, splitedPath))
      } else {
        log("fetch", event.request.url)
        event.respondWith(fetchResponse(event.request, event, splitedPath))
      }
    }
  }
})

self.addEventListener("message", (event: any) => {
  log("message", `FROM ${event.source.id} :`)
  // Echo messages for all clients (except the emitter)
  event.waitUntil(self.clients.matchAll().then((clients: any) => {
    clients.forEach((client: any) => {
      if(client.id !== event.source.id) {
        client.postMessage(event.data)
      }
    })
  }))
})
