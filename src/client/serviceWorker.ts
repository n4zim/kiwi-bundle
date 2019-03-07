import logger from "./logger"

declare var self: any

const log = (title: string, ...args: any) => {
  logger.logInfo("ServiceWorker", title, ...args)
}

self.addEventListener("install", () => {
  self.skipWaiting()
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
  console.log("#SW Activated")
  event.waitUntil(self.clients.claim())
})

/*self.addEventListener("fetch", (event: any) => {
  console.log("fetch", ID, event)
})*/
