import logger from "./logger"
import { WorkerMessageType } from "./serviceWorkerTypes"

declare var self: any
declare var window: any

const log = (title: string, ...args: any) => {
  logger.logInfo("ServiceWorker", title, ...args)
}

self.addEventListener("install", (event: any) => {
  console.log("INSTALL")
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (event: any) => {
  console.log("ACTIVATE")
  event.waitUntil(self.clients.claim())
})

self.addEventListener("message", (event: any) => {
  console.log("MESSAGE")
  event.waitUntil(self.clients.matchAll().then((clients: any) => {
    clients.forEach((client: any) => {
      if(client.id !== event.source.id) {
        client.postMessage(event.data)
      }
    })
  }))
})

const getSplitedPath = (request: Request|Response) => {
  const path = /^https?\:\/\/(?:.*?)\/(.*)$/.exec(request.url)
  if(path !== null && path.length === 2) {
    return path[1].split("/")
  } else {
    return []
  }
}

const fetchIsAccepted = (splitedPath: string[]) => {
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

self.addEventListener("fetch", (event: any) => {
  if(event.request.method === "GET") {
    const splitedPath = getSplitedPath(event.request)
    if(fetchIsAccepted(splitedPath)) {
      // console.log("FETCH", event.request.url)

      // Response from cache
      event.respondWith(caches.open("offline").then(cache => {
        return cache.match(event.request)
      }))

      // Updating cache from network
      event.waitUntil(
        caches.open("offline").then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              if(response.ok) cleanCache(cache, splitedPath)
              return response
            })
          })
        }).then(response => {
          return self.clients.matchAll().then((clients: any) => {
            clients.forEach((client: any) => {
              client.postMessage(JSON.stringify({
                type: WorkerMessageType.CACHE,
                url: response.url,
                eTag: response.headers.get("ETag")
              }))
            })
          })
        })
      )
    }
  }
})
