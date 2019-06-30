import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"
import "./sw"

let STARTED = false

export default class Client {
  private hotModuleEnabled: boolean = typeof module.hot !== "undefined"

  constructor(router: Router) {
    // Render
    render(router.render(), document.getElementById("render"), () => {
      logger.logSuccess(this, STARTED ? "Restarted" : "Started")
      STARTED = true
    })

    // Service Worker activation (now done by Webpack)
    // serviceWorkerClient.load()

    // Hot reloading
    if(this.hotModuleEnabled) {
      this.loadHotModule()
    }
  }

  private loadHotModule() {
    // Listen for updates
    const moduleCacheChildren: string[] = require.cache[0].children
    const clientModuleName: string = moduleCacheChildren[moduleCacheChildren.length - 1]
    const clientModule: NodeModule = require.cache[clientModuleName]
    if(typeof clientModule.hot !== "undefined") {
      clientModule.hot.accept()
      logger.logInfo("Hot", "Listening")
    }

    // Force Service Worker cache
    const httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", "/")
    httpRequest.send()
  }

}
