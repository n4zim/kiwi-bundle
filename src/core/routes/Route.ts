import { WebPageConstructor } from "../components/WebPage"

interface RouteOptions {
  authLevels?: Array<string>
}

export class Route {
  path: string
  component: WebPageConstructor

  options: RouteOptions

  constructor(path: string, component: WebPageConstructor, options: RouteOptions = {}) {
    this.path = path
    this.component = component

    this.options = options
  }

}
