import * as React from "react"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { History, createBrowserHistory } from 'history'
import { WebComponent, WebPageConstructor } from "./components"
import App from "./app"

class Route {
  name: number
  path: string
  component: WebPageConstructor
  constructor(name: number, path: string, component: WebPageConstructor) {
    this.name = name
    this.path = path
    this.component = component
  }
}

// -----------------------------------------------

class Router {
  app: App
  routes: Route[] = []
  history: History = createBrowserHistory()
  paths: { [name: string]: string } = {}
  
  constructor(app: App, routes: Route[] = []) {
    this.app = app
    this.routes = routes
    routes.forEach(route => {
      this.paths[route.name] = route.path
    })
  }

  render() {
    return <ReactRouter history={this.history}>
      <Switch>
        {this.routes.map((route: Route) => {
          return <ReactRoute exact key={`route${route.name}`} path={route.path} render={() => {
            return new route.component(this.app).render()
          }}/>
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
