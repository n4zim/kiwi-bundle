import * as React from "react"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { History, createBrowserHistory } from 'history'
import App from "../app"
import Route from './Route'
import WebPage, { WebPageConstructor } from "../components/WebPage"

export default class Router {
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

  injectKiwi(component: WebPageConstructor, props: any): React.ReactNode {
    return new component(this.app, props).render()
  }

  render() {
    return <ReactRouter history={this.history}>
      <Switch>
        {this.routes.map((route: Route) => {
          return <ReactRoute exact
            key={`route${route.name}`}
            path={route.path}
            render={props => this.injectKiwi(route.component, props)}
          />
        })}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
  }
}
