import { render } from "react-dom"
import logger from "./logger"
import Router from "../routes/Router"
import { stringsFunction } from "../i18n/types"
import i18nExecuteString from "../i18n/ExecuteString"
import "./sw"

let STARTED = false

export default class Client {
  private hotModuleEnabled: boolean = typeof module.hot !== "undefined"
  private language = navigator.language.slice(0, 2)

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

  i18n(data: string|object|stringsFunction, count = 1, vars = {}): string {
    if(typeof data === "string") return data
    if(typeof data === "object") return i18nExecuteString(data)
    if(typeof data === "function") return data(this.language, count)
    logger.logError("i18n", "Unknown i18n data type")
    return ""
  }

}
