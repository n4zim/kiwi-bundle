import * as React from "react"
import { render } from "react-dom"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { History, createBrowserHistory } from 'history'
import Route from "./routes/Route"
import Logger from "./logger"
import { LinkAction } from "./routes/Link"

export default class Client {
  pages: Route[]
  pagesIndexes: { [name: string]: number } = {}
  logger: Logger = new Logger()
  history: History = createBrowserHistory()

  constructor(pages: Route[]) {
    this.pages = pages
    pages.forEach((page, index) => {
      this.pagesIndexes[page.name] = index
    })

    const renderDiv = document.getElementById("render")
    render(this.renderReactRouter(), renderDiv)
  }
  
  getLinkAction(name: number): LinkAction {
    const route = this.pages[this.pagesIndexes[name]]
    return {
      path: route.path,
      call: () => { this.history.push(route.path) },
    }
  }

  renderReactRouter() {
    return <ReactRouter history={this.history}>
      <Switch>
        {this.pages.map((route: Route) => {
          return <ReactRoute exact
            key={`route${route.name}`}
            path={route.path}
            render={props => {
              return React.createElement(route.component, { ...props, client: this })
            }}
          />
        })}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
  }

}
