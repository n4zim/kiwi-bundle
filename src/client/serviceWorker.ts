import { WorkerMessageType } from "./serviceWorkerTypes"

declare var self: any

const ENABLE_LOGGER = true

const log = (title: string, ...args: any) => {
  if(ENABLE_LOGGER) {
    console.log(`ServiceWorker (${title})`, ...args)
  }
}

self.addEventListener("install", (event: any) => {
  log("install", event)
  event.waitUntil(self.skipWaiting())
})

self.addEventListener("activate", (event: any) => {
  log("activate")
  event.waitUntil(self.clients.claim())
})

self.addEventListener("message", (event: any) => {
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
      log("fetch", event.request.url)
      event.respondWith(
        caches.open("offline").then(cache => {
          return cache.match(event.request).then(cacheResponse => {

            // Ressource not yet cached
            if(typeof cacheResponse === "undefined") {
              const networkFetch = fetch(event.request)
              event.waitUntil( // Cache ressource in the backgroud
                networkFetch.then(networkResponse => {
                  return cache.put(event.request, networkResponse.clone())
                })
              )
              return networkFetch // Return network ressource

            // Ressource already cached
            } else {
              event.waitUntil( // Check new ressource version in the background
                fetch(event.request).then(networkResponse => {
                  return cache.put(event.request, networkResponse.clone()).then(() => {
                    return cache.match(event.request)

                      // Inform client for potential updates
                      .then(newCacheResponse => {
                        if(
                          typeof newCacheResponse !== "undefined"
                          && newCacheResponse.headers.get("ETag") !== cacheResponse.headers.get("ETag")
                        ) {
                          self.clients.matchAll().then((clients: any) => {
                            clients.forEach((client: any) => {
                              client.postMessage({ type: WorkerMessageType.CACHE })
                            })
                          })
                        }
                      })

                      // Remove old ressources
                      .then(() => {
                        cleanCache(cache, splitedPath)
                      })

                  })
                })
              )
              return cacheResponse // Return cache ressource
            }

          })
        })
      )
    }
  }
})
