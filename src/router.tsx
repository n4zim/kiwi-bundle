import React from "react"
//import { Router as ReactRouter, Switch, Route as ReactRoute } from "react-router-dom"
import { History, createBrowserHistory } from 'history'

class Route {
  name: string
  path: string
  component: React.Component
  constructor(name: string, path: string, component: React.Component) {
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
    return <div>OK</div>
    /*return <ReactRouter history={this.history}>
      <Switch>
        {this.routes.map((route: Route) => {
          return <ReactRoute key={route.name} path={route.path} render={() => {
            if(Meteor.userId()) return <Redirect to={HISTORY.getRoute('index')}/>
            return themeContainer(<AccountPage/>)
          }}/>
        })}
        <Redirect from="*" to="/"/>
      </Switch>
    </ReactRouter>*/
  }
}

// -----------------------------------------------

export {
  Router as default,
  Route,
}
