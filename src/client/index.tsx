// import * as OfflinePluginRuntime from "offline-plugin/runtime"
import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"

import Worker from "worker-loader!./serviceWorker"

const worker = new Worker()
worker.postMessage({ a: 1 })
worker.onmessage = (event: any) => {
  console.log(event)
}
worker.addEventListener("message", (event: any) => {
  console.log(event)
})
interface NodeModuleHot extends NodeModule {
  hot?: any
}

declare var module: NodeModuleHot
const hotReloading = typeof module.hot !== "undefined"
if(hotReloading) logger.logInfo("Hot", "Enabled")

/*if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(function(registration) {
    console.log("Service worker registration succeeded:", registration)
  }, function(error) {
    console.log("Service worker registration failed:", error)
  })
} else {
  console.log("Service workers are not supported.")
}*/

/*OfflinePluginRuntime.install({
  onInstalled: () => {
    console.log("onInstalled")
  },

  onUpdating: () => {
    console.log("onUpdating")
  },

  onUpdateReady: () => {
    console.log("onUpdateReady")
    OfflinePluginRuntime.applyUpdate()
  },

  onUpdated: () => {
    console.log("onUpdated")
    window.location.reload()
  }
})*/

export default class Client {
  constructor(router: Router) {
    render(router.render(), document.getElementById("render"))
    logger.logInfo(this, "Started")

    if(hotReloading) {
      module.hot.accept()
      const moduleCacheChildren = require.cache[0].children
      const clientModuleName = moduleCacheChildren[moduleCacheChildren.length - 1]
      require.cache[clientModuleName].hot.accept()
    }
  }
}
