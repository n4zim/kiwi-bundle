import { render } from "react-dom"
import Logger from "./Logger"
import Router from "./routes/Router"

export default class Client {
  constructor(rootModule: NodeModule, router: Router) {
    const renderDiv = document.getElementById("render")

    render(router.render(), renderDiv)

    /*if(rootModule.hot) {
      const cache = require.cache
      const parent = cache[rootModule.parents[0]]
      console.log(parent)
      delete cache[rootModule.id]
      render(hot(Object.assign({ id: parent.i }, parent))(router.render()), renderDiv)
    } else {
      render(router.render(), renderDiv)
    }*/

    Logger.logInfo(this, "Rendered")
  }
}
