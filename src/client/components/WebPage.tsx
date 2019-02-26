import * as React from "react"
import { Component, ReactNode } from "react"
import logger from "../logger"

interface WebPageType {
  getTitle?: () => string
  render: () => ReactNode
}

export default class WebPage extends Component implements WebPageType {

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    // document.title = `${initialTitle} -`
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Update")
  }

}

export interface WebPageConstructor {
  new(props?: any): WebPage
}
