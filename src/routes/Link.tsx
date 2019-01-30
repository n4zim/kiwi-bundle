import * as React from "react"
import WebComponent from "../components/WebComponent"

export interface LinkAction {
  path: string
  call: () => void
}

interface Props {
  action: LinkAction
}

export default class Link extends WebComponent<Props> {

  onClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault()
    this.props.action.call()
  }

  render() {
    return <a href={this.props.action.path} onClick={this.onClick.bind(this)}>
      {this.props.children}
    </a>
  }

}
