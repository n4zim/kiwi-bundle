import * as React from "react"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { History, createBrowserHistory } from "history"
import Route from "./Route"
import { LinkAction } from "./Link"

export default class Router {
  pages: Route[] = []
  history: History = createBrowserHistory()
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
      call: () => { this.history.push(route.path) },
    }
  }

  render() {
    return <ReactRouter history={this.history}>
      <Switch>
        {this.pages.map((route: Route) => {
          /*render={props => {
            return React.createElement(route.component, { ...props, client: this })
          }}*/
          return <ReactRoute exact
            key={`route${route.name}`}
            path={route.path}
            component={route.component}
          />
        })}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
  }

}
