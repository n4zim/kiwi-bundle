import { WorkerMessageType } from "./types"

declare var self: any

const ENABLE_LOGGER = true

const log = (title: string, ...args: any) => {
  if(ENABLE_LOGGER) {
    console.log(`ServiceWorker (${title})`, ...args)
  }
}

const getSplitedPath = (request: string) => {
  const path = /^https?\:\/\/(?:.*?)\/(.*)$/.exec(request)
  if(path !== null && path.length === 2) {
    return path[1].split("/")
  } else {
    return []
  }
}

const isRessourceAccepted = (splitedPath: string[]) => {
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
          const resultSplitedPath = getSplitedPath(result.url)
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
    return self.clients.matchAll().then((clients: any) => {
      log("asked for client update")
      return clients.forEach((client: any) => {
        return client.postMessage({ type: WorkerMessageType.CACHE })
      })
    })
  }
}

const onNotCachedRessource = (event: any, request: Request, cache: Cache) => {
  const networkFetch = fetch(request)
  event.waitUntil( // Cache ressource on backgroud
    networkFetch.then(networkResponse => {
      return cache.put(request, networkResponse.clone())
    })
  )
  return networkFetch // Network ressource
}

const onCachedRessource = (event: any, request: Request, cache: Cache, cacheResponse: Response, splitedPath: string[]) => {
  event.waitUntil( // Check new version on background
    fetch(request)
      .then(networkResponse => {
        return cache.put(request, networkResponse.clone()).then(() => {
          return cache.match(request)
            .then(newCacheResponse => informClientIfUpdated(cacheResponse, newCacheResponse))
            .then(() => cleanCache(cache, splitedPath))
        })
      })
      .catch(() => {
        log("offline")
      })
  )
  return cacheResponse // Cache ressource
}

const fetchResponse = (event: any, request: Request, splitedPath: string[]) => {
  return caches.open("offline").then(cache => {
    return cache.match(request).then(cacheResponse => {
      if(typeof cacheResponse === "undefined") {
        log("load - network first", request.url)
        return onNotCachedRessource(event, request, cache)
      } else {
        log("load - cache first", request.url)
        return onCachedRessource(event, request, cache, cacheResponse, splitedPath)
      }
    })
  })
}

const convertToRootDocument = (request: Request) => {
  const splitedUrl = request.url.split("/")
  return new Request(`${splitedUrl[0]}//${splitedUrl[2]}/`, {
    cache: request.cache, credentials: request.credentials, headers: request.headers,
    integrity: request.integrity, keepalive: request.keepalive, method: "GET",
    redirect: request.redirect, referrer: request.referrer,
    referrerPolicy: request.referrerPolicy, signal: request.signal,
  })
}

// -------------------------------------------------------------------------------------

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open("offline").then(cache => {
      return cache.addAll([
        "/",
        "/static/icons/favicon.ico",
        "/static/icons/manifest.json",
      ])
    }).then(() => {
      return self.skipWaiting()
    })
  )
  log("install")
})

self.addEventListener("activate", (event: any) => {
  event.waitUntil(self.clients.claim())
  log("activate")
})

self.addEventListener("fetch", (event: any) => {
  if(event.request.method === "GET") {
    const splitedPath = getSplitedPath(event.request.url)
    if(isRessourceAccepted(splitedPath)) {
      if(event.request.destination === "document" && splitedPath[0].length !== 0) {
        event.respondWith(fetchResponse(event, convertToRootDocument(event.request), [ "" ]))
        log("fetch forward", event.request.url)
      } else {
        event.respondWith(fetchResponse(event, event.request, splitedPath))
      }
    }
  }
})

self.addEventListener("message", (event: any) => {
  if(event.data.type === WorkerMessageType.CACHE) {
    event.waitUntil(
      caches.open("offline").then(cache => {
        event.data.files.forEach((file: string) => {
          const split = getSplitedPath(file)
          if(isRessourceAccepted(split)) {
            log("message - cache", file)
            cache.add(file).then(() => {
              cleanCache(cache, split)
            })
          }
        })
      })
    )
  } else if(event.data.type === WorkerMessageType.CHANGE) {
    // Echo messages for all clients (except the emitter)
    event.waitUntil(self.clients.matchAll().then((clients: any) => {
      clients.forEach((client: any) => {
        if(client.id !== event.source.id) {
          client.postMessage(event.data)
        }
      })
      log("message - change")
    }))
  }
})
