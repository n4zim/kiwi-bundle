import * as React from "react"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { History, createBrowserHistory } from 'history'
import { WebComponent } from "./components"

class Route {
  name: string
  path: string
  component: typeof WebComponent
  constructor(name: string, path: string, component: typeof WebComponent) {
    this.name = name
    this.path = path
    this.component = component
  }
}

// -----------------------------------------------

class Router {
  routes: Route[] = []
  history: History = createBrowserHistory()
  paths: { [name: string]: string } = {}
  
  constructor(routes: Route[] = []) {
    this.routes = routes
    routes.forEach((route: Route) => {
      this.paths[route.name] = route.path
    })
  }

  getRoutePath(name: string) {
    if(typeof this.paths[name] === "undefined") {
      return "/"
    }
    return this.paths[name]
  }

  render() {
    return <ReactRouter history={this.history}>
      <Switch>
        {this.routes.map((route: Route) => {
          return <ReactRoute key={route.name} path={route.path} component={route.component}/>
        })}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
  }
}

// -----------------------------------------------

export {
  Router as default,
  Route,
}
