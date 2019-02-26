import { Component } from "react"
import logger from "../logger"

export default class WebComponent<Props = {}, S = {}, SS = any> extends Component<Props, S, SS> {

  componentDidMount() {
    logger.logView(this, "Mounted")
  }

  componentDidUpdate() {
    logger.logView(this, "Update")
  }

}

export interface WebComponentConstructor {
  new(props?: any): WebComponent
}
