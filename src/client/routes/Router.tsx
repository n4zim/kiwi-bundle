import * as React from "react"
import { createBrowserHistory } from "history"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { LinkAction } from "./Link"
import Route from "./Route"

const HISTORY = createBrowserHistory()
export default class Router {
  routes: Route[] = []
  indexes: { [name: string]: number } = {}

  constructor(routes: Route[] = []) {
    this.routes = routes
  }

  private redirect(path: string) {
    HISTORY.push(path)
  }

  getLinkAction(path: string): LinkAction {
    return { path, call: () => { this.redirect(path) } }
  }

  private getReactRouterRoutes() {
    return this.routes.map((route: Route, index: number) => {
      return <ReactRoute exact
        key={`route${index}`}
        path={route.path}
        component={route.component}
      />
    })
  }

  render() {
    return <ReactRouter history={HISTORY}>
      <Switch>
        {this.getReactRouterRoutes()}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
  }

}
