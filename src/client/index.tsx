import * as React from "react"
import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"

interface NodeModuleHot extends NodeModule {
  hot?: any
}

const moduleCacheChildren = require.cache[0].children
const clientModuleName = moduleCacheChildren[moduleCacheChildren.length - 1]
const clientModule = require.cache[clientModuleName]

declare var module: NodeModuleHot
const hotReloading = typeof module.hot !== "undefined" && typeof clientModule.hot !== "undefined"
if(hotReloading) {
  logger.logInfo("Hot", "Enabled")
}

export default class Client {
  // constructor(rootModule: NodeModuleHot, router: Router) {
  constructor(router: Router) {
    render(router.render(), document.getElementById("render"))
    logger.logInfo(this, "Rendered")
    if(hotReloading) {
      module.hot.accept()
      clientModule.hot.accept()
    }
  }
}
