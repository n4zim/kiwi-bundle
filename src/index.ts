import * as React from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Link, { LinkAction } from "./client/routes/Link"
import Logger from "./client/Logger"
import Route from "./client/routes/Route"
import Router from "./client/routes/Router"
import Store from "./client/stores/Store"
import WebComponent, { WebComponentConstructor } from "./client/components/WebComponent"
import WebPage, { WebPageConstructor } from "./client/components/WebPage"
import Client from "./client"

interface InitComponentOptions {
  observer?: boolean
}

type elementClass = WebPageConstructor|WebComponentConstructor

interface NodeModuleWithHot extends NodeModule {
  hot?: any
}

const initComponent = (pageModule: NodeModuleWithHot, options: InitComponentOptions = {}) => {
  return (elementClass: elementClass) => elementClass
  /*return (elementClass: elementClass) => {
    if(pageModule.hot) {
      if(options.observer) {
        return hot(Object.assign({ id: pageModule.i }, pageModule))(observer(elementClass))
      } else {
        return hot(Object.assign({ id: pageModule.i }, pageModule))(elementClass)
      }
    } else if(options.observer) {
      return observer(elementClass)
    } else {
      return elementClass
    }
  }*/
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
