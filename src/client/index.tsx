import { render } from "react-dom"
import logger from "./logger"
import Router from "./routes/Router"
import "./serviceWorkerClient"

if(typeof module.hot !== "undefined") {
  module.hot.accept()
}

export default class Client {
  constructor(router: Router) {
    render(router.render(), document.getElementById("render"))
    logger.logSuccess(this, "Started")

    if(typeof module.hot !== "undefined") {

      // Bundle
      // module.hot.accept()

      /*.map((module: NodeModule) => {
        if(typeof module.hot !== "undefined") {
          module.hot.accept("./src/client/pages/Home.tsx", () => {
            console.log("HEY")
          })
        }
      })*/

      // Client
      const moduleCacheChildren: string[] = require.cache[0].children
      const clientModuleName: string = moduleCacheChildren[moduleCacheChildren.length - 1]
      const clientModule: NodeModule = require.cache[clientModuleName]
      if(typeof clientModule.hot !== "undefined") {
        logger.logInfo("Hot", "Listening")

        /*require.cache.map((module: NodeModule) => {
          clientModule.hot.accept("./src/client/pages/Home.tsx", () => {
            console.log("HEY")
          })
        })*/
      }

    }
  }
}
