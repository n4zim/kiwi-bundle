import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"
import "./serviceWorkerClient"

let STARTED = false

export default class Client {
  constructor(router: Router) {
    render(router.render(), document.getElementById("render"), () => {
      logger.logSuccess(this, STARTED ? "Restarted" : "Started")
      STARTED = true
    })

    if(typeof module.hot !== "undefined") {
      const moduleCacheChildren: string[] = require.cache[0].children
      const clientModuleName: string = moduleCacheChildren[moduleCacheChildren.length - 1]
      const clientModule: NodeModule = require.cache[clientModuleName]
      if(typeof clientModule.hot !== "undefined") {
        clientModule.hot.accept()
        logger.logInfo("Hot", "Listening")
      }
    }
  }
}
