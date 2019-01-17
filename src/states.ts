import * as React from "react"
import { BrowserRouter, Switch, Route as ReactRoute } from "react-router-dom"

class Route {
  name: string
  path: string
  component: React.Component
  constructor(name: string, path?: string, component: React.Component, ) {
    this.name = name
    this.component = component
    if(typeof path !== "undefined") {
      this.path = path
    } else {
      this.path = name
    }
  }
}

// -----------------------------------------------

class Router {
  routes: Route[] = []
  history: string[] = []
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
    return <BrowserRouter history={this.history}>
      <Switch>
        {this.routes.map((route: Route) => {
          return <Route path={route.path} render={() => {
            if(Meteor.userId()) return <Redirect to={HISTORY.getRoute('index')}/>
            return themeContainer(<AccountPage/>)
          }}/>
        })}
        <Redirect from="*" to="/"/>
      </Switch>
    </BrowserRouter>
  }
}

// -----------------------------------------------

export {
  Router as default,
  Route,
}
