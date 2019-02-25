import * as React from "react"
import { createBrowserHistory } from "history"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { LinkAction } from "./Link"
import Route from "./Route"

const HISTORY = createBrowserHistory()

export default class Router {
  pages: Route[] = []
  indexes: { [name: string]: number } = {}

  constructor(pages: Route[] = []) {
    this.pages = pages

    pages.forEach((page, index) => {
      this.indexes[page.name] = index
    })
  }

  getLinkAction(name: number): LinkAction {
    const index = this.indexes[name]
    if(typeof index === "undefined") {
      throw "Page not found on cache"
    }
    const route = this.pages[index]
    if(typeof route === "undefined") {
      throw "Page not found on router"
    }
    return {
      path: route.path,
      call: () => { HISTORY.push(route.path) },
    }
  }

  private getReactRouterRoutes() {
    return this.pages.map((route: Route) => {
      /*render={props => {
        return React.createElement(route.component, { ...props, client: this })
      }}*/
      return <ReactRoute exact
        key={`route${route.name}`}
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
