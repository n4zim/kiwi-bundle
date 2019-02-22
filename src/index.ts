import * as React from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Link, { LinkAction } from "./routes/Link"
import Logger from "./Logger"
import Route from "./routes/Route"
import Router from "./routes/Router"
import Store from "./stores/Store"
import WebComponent, { WebComponentConstructor } from "./components/WebComponent"
import WebPage, { WebPageConstructor } from "./components/WebPage"
import Client from "./client"
import { hot } from "react-hot-loader"

interface InitComponentOptions {
  observer?: boolean
}

type elementClass = WebPageConstructor|WebComponentConstructor

interface NodeModuleWithHot extends NodeModule {
  hot?: any
}

const initComponent = (pageModule: NodeModuleWithHot, options: InitComponentOptions = {}) => {
    return (elementClass: elementClass) => {
      if(pageModule.hot) {
        if(options.observer) {
          return hot(pageModule)(Object.assign({ id: "../test" }, observer(elementClass)))
        } else {
          const doit = Object.assign({ id: pageModule.i }, pageModule)
          console.log(doit)
          return hot(doit)(elementClass)
        }
      } else if(options.observer) {
        return observer(elementClass)
      } else {
        return elementClass
      }
    }
}

export {
  action,
  Client,
  initComponent,
  Link,
  LinkAction,
  Logger,
  observable,
  observer,
  React,
  Route,
  Router,
  Store,
  WebComponent,
  WebPage,
}
