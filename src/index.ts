import * as React from "react"
import { observable, action } from "mobx"
import { observer } from "mobx-react"
import Link, { LinkAction } from './routes/Link'
import Logger from './logger'
import Route from './routes/Route'
import Router from './routes/Router'
import Store from "./stores/Store"
import WebComponent, { WebComponentConstructor } from './components/WebComponent'
import WebPage, { WebPageConstructor } from './components/WebPage'
import Client from "./client"
import { hot } from 'react-hot-loader'

interface initComponentOptions {
  observer?: boolean
}

type elementClass = WebPageConstructor|WebComponentConstructor

const initComponent = (pageModule: NodeModule, elementClass: elementClass, options: initComponentOptions = {}) => {
  if(options.observer) {
    return hot(pageModule)(observer(elementClass))
  } else {
    return hot(pageModule)(elementClass)
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
