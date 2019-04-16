import * as React from "react"
import { createBrowserHistory } from "history"
import { HashRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { LinkAction } from "./Link"
import Route from "./Route"

const HISTORY = createBrowserHistory()
export default class Router {
  routes: Route[] = []
  indexes: { [name: string]: number } = {}

  constructor(routes: Route[] = []) {
    this.routes = routes
  }

  getLinkAction(path: string): LinkAction {
    return {
      path,
      call: () => {
        window.location.hash = path
      }
    }
  }

  private getReactRoutes() {
    return this.routes.map((route: Route, index: number) => {
      return <ReactRoute exact
        key={`route${index}`}
        path={route.path}
        component={route.component}
      />
    })
  }

  render() {
    return <HashRouter>
      <Switch>
        {this.getReactRoutes()}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </HashRouter>
  }

}
