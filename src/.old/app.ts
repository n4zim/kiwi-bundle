import { render } from "react-dom"
import Router from "./Router"
import Route from "../routes/Route"
import Logger from "../logger"
import { LinkAction } from "../routes/Link"
import Store from "../stores/Store"

class App {
  router: Router
  stores: Store[]
  logger: Logger

  constructor(routes: Route[] = [], stores: Store[] = []) {
    this.router = new Router(this, routes)
    this.stores = stores
    this.logger = new Logger()

    const renderDiv = document.getElementById("render")
    render(this.router.render(), renderDiv)
  }

  getLinkAction(name: number): LinkAction {
    const route = this.router.getByName(name)
    return {
      path: route.path,
      call: () => { this.router.history.push(route.path) },
    }
  }

  getStore(name: number) {
    return 
  }

}

export default App
