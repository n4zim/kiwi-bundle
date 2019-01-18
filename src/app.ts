//import React from "react"
import { render } from "react-dom"
import Router, { Route } from "./router"
import Logger from "./logger"

class App {
  router: Router
  logger: Logger

  constructor(routes: Route[] = []) {
    this.router = new Router(routes)
    this.logger = new Logger()

    const renderDiv = document.getElementById("render")
    render(this.router.render(), renderDiv)
  }

}

export default Logger
