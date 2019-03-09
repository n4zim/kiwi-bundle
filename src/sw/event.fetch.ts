import { WorkerMessageType } from "./types"
import { getSplitedPath, isRessourceAccepted, log, cleanCache } from "./utils"

declare var self: any

const onNotCachedRessource = (event: any, request: Request, cache: Cache) => {
  const networkFetch = fetch(request)
  event.waitUntil( // Cache ressource on backgroud
    networkFetch.then(networkResponse => {
      return cache.put(request, networkResponse.clone())
    })
  )
  return networkFetch // Network ressource
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

export default (event: any) => {
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
}
