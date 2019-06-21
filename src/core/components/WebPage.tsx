import * as React from "react"
import { Component, ReactNode } from "react"
import logger from "../logger"

interface WebPageType {
  getTitle?: () => string
  render: () => ReactNode
}

export default class WebPage<Params = {}> extends Component implements WebPageType {
  params: Params

  constructor(props: any) {
    super(props)
    this.params = props.match.params
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
