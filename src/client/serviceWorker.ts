import logger from "./logger"

declare var self: any
declare var window: any

const log = (title: string, ...args: any) => {
  logger.logInfo("ServiceWorker", title, ...args)
}

self.addEventListener("install", (event: any) => {
  self.skipWaiting()

  /*event.waitUntil(
    caches.open("offline").then(function(cache) {
      return cache.addAll([
        "/",
      ])
    })
  )*/
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

// ******************************************

// Service Worker Active
self.addEventListener("activate", (event: any) => {
  log("Activation")
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.open("offline").then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})
