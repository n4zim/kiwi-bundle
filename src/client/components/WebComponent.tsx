import { Component } from "react"

export default class WebComponent<Props = {}, S = {}, SS = any> extends Component<Props, S, SS> {}

export interface WebComponentConstructor {
  new(props?: any): WebComponent
}
