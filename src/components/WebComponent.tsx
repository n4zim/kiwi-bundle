import { Component } from "react"
import App from "../app"

interface Props {
  kiwi: App
}

export default class WebComponent<Props, S = {}, SS = any> extends Component<Props, S, SS> {

  constructor(props: Props) {
    super(props)
  }

}
