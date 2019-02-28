import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"

interface NodeModuleHot extends NodeModule {
  hot?: any
}

const moduleCacheChildren = require.cache[0].children
const clientModuleName = moduleCacheChildren[moduleCacheChildren.length - 1]

declare var module: NodeModuleHot
const hotReloading = typeof module.hot !== "undefined"
if(hotReloading) logger.logInfo("Hot", "Enabled")

export default class Client {
  constructor(router: Router) {
    render(router.render(), document.getElementById("render"))
    logger.logInfo(this, "Started")

    if(hotReloading) {
      module.hot.accept()
      require.cache[clientModuleName].hot.accept()
    }
  }
}
