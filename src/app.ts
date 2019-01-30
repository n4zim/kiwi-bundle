import { render } from "react-dom"
import Router from "./routes/Router"
import Route from "./routes/Route"
import Logger from "./logger"
import { LinkAction } from "./routes/Link"

class App {
  router: Router
  logger: Logger

  constructor(routes: Route[] = []) {
    this.router = new Router(this, routes)
    this.logger = new Logger()

    const renderDiv = document.getElementById("render")
    render(this.router.render(), renderDiv)
  }

  getRouteAction(route: number): LinkAction {
    const path = this.router.paths[route]
    return {
      path,
      call: () => {
        this.router.history.push(path)
      }
    }
  }

}

export default App
