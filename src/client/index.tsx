import * as React from "react"
import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"

interface NodeModuleHot extends NodeModule {
  hot?: any
}

declare var module: NodeModuleHot

export default class Client {
  constructor(rootModule: NodeModuleHot, router: Router) {
    render(router.render(), document.getElementById("render"))
    logger.logInfo(this, "Rendered")

    if(typeof rootModule.hot !== "undefined") {
      rootModule.hot.accept()
      if(typeof module.hot !== "undefined") {
        module.hot.accept()
      }
      logger.logInfo("HMR", "Listening")
    }
  }
}
