import { Component } from "react"
import Client from "../client"

/*interface Props {
  client: Client
}*/

export default class WebPage extends Component {}

export interface WebPageConstructor {
  new(props?: any): WebPage
}
