import * as React from "react"
import { createBrowserHistory } from "history"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { LinkAction } from "./Link"
import Redirect from "./Redirect"
import Route from "./Route"

/*interface RouterOptions {
  defaultPage?: string
}*/

const HISTORY = createBrowserHistory()

const regexParameter = (prefix: string) => new RegExp(`(?:\\?|\\&)(?:${prefix})([^=&]+)=([^&]*)`, "g")

export default class Router {
  routes: (Route|Redirect)[] = []
  // options: RouterOptions
  indexes: { [name: string]: number } = {}

  constructor(routes: (Route|Redirect)[] = []/*, options: RouterOptions = {}*/) {
    this.routes = routes
    // this.options = options
  }

  getLinkAction(path: string): LinkAction {
    return {
      path,
      call: () => {
        window.location.hash = path
      }
    }
  }

  getParamsAsStrings(prefix: string | string[] = "") {
    if(Array.isArray(prefix)) prefix = prefix.join("|")
    const matches = window.location.href.match(regexParameter(prefix))
    if(matches === null) return []
    return matches.map(match => match.slice(1))
  }

  getParamsAsArray(prefix: string | string[] = "") {
    let params: any = []
    let indexes: any = {}

    this.getParamsAsStrings(prefix).forEach(match => {
      const split = match.slice(prefix.length + 1).split("=")
      const field = split[0]
      const values = split[1].split("|")

      if(typeof indexes[field] === "undefined") {
        indexes[field] = params.length
        params.push({ field, values })
      } else {
        params[indexes[field]].values = params[indexes[field]].values.concat(values)
      }
    })

    return params
  }

  getParamsAsObject(prefix: string | string[] = "") {
    let params: any = {}

    this.getParamsAsStrings(prefix).forEach(match => {
      const split = match.slice(prefix.length + 1).split("=")
      const field = split[0]
      const values = split[1].split("|")

      if(typeof params[field] === "undefined") params[field] = []
      params[field] = params[field].concat(values)
    })

    return params
  }

  private getReactRoutes() {
    return this.routes.map((route: Route|Redirect, index: number) => {
      if(route instanceof Redirect) {
        return <ReactRedirect exact key={`route${index}`} to={route.path}/>
      }
      return <ReactRoute exact
        key={`route${index}`}
        path={route.path}
        component={route.component}
      />
    })
  }

  render() {
    // return <HashRouter>
    return <ReactRouter history={HISTORY}>
      <Switch>
        {this.getReactRoutes()}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
    // </HashRouter>
  }

}
