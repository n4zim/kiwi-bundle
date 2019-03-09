import { log } from "./utils"
import eventFetch from "./event.fetch"
import eventMessage from "./event.message"

declare var self: any

self.addEventListener("install", (event: any) => {
  event.waitUntil(self.skipWaiting())
  log("install")
})

self.addEventListener("activate", (event: any) => {
  event.waitUntil(self.clients.claim())
  log("activate")
})

self.addEventListener("fetch", eventFetch)

self.addEventListener("message", eventMessage)
