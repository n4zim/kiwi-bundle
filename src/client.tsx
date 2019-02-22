import * as React from "react"
import { render } from "react-dom"
import Logger from "./Logger"
import Router from "./routes/Router"
import { hot } from "react-hot-loader"
import Root from "./Root"

export default class Client {
  constructor(rootModule: NodeModule, router: Router) {
    const renderDiv = document.getElementById("render")

    // render(<Root>{router.render()}</Root>, renderDiv)
    render(router.render(), renderDiv)

    Logger.logInfo(this, "Rendered")
  }
}
