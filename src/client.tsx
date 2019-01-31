import { render } from "react-dom"
import Logger from "./logger"
import Router from "./routes/Router";

export default class Client {
  router: Router
  logger: Logger = new Logger()

  constructor(router: Router) {
    this.router = router
    const renderDiv = document.getElementById("render")
    render(this.router.render(), renderDiv)
  }

}
