import { render } from "react-dom"
import Logger from "./logger"
import Router from "./routes/Router"

interface ClientParams {
  router: Router
  logger: Logger
}

export default class Client implements ClientParams {
  router: Router
  logger: Logger

  constructor(params: ClientParams) {
    this.router = params.router
    this.logger = params.logger
    const renderDiv = document.getElementById("render")
    render(this.router.render(), renderDiv)
  }
}
