/*
    db        j88D  d8888b.
    88       j8~88  88  `8D
    88      j8' 88  88oobY'
    88      V88888D 88`8b
    88booo.     88  88 `88.
    Y88888P     VP  88   YD   Record anything.
*/

import { l4rParams, l4rContext } from "../Formats/Models/l4r"
import { l4rSettings } from "./l4rSettings"
import { Environment } from "../Context/Fields/Environment"

const generateCss = (color?: string) => [
  //  "border: 1px solid black",
    "padding: 2px 10px",
    typeof color !== "undefined" ? `background-color: ${color}` : "",
  //  "color: white",
    "font-size: 12px",
  ].join(";")

const dateToText = (date: Date) => date.getFullYear()
  + " " + date.getMonth()
  + " " + date.getDate()
  + " " + date.getHours()
  + " " + date.getMinutes()
  + " " + date.getSeconds()
  + " " + date.getMilliseconds()

export class l4r {
  private static previous: Date

  static log<Data = any>(params: l4rParams, ...data: Data[]): void {
    if(params.force || l4rSettings.isCurrentMode(Environment.DEVELOPMENT)) {
      if(Array.isArray(params.context)) params.context.join("/")
      const label = `%c${params.context}`
      const css = generateCss(params.color)

      console.groupCollapsed(label, css, params.title)

      const now = new Date()

      const details: { date: string, previous?: string } = {
        date: dateToText(now),
      }

      if(typeof this.previous !== "undefined") {
        details.previous +=  `${now.getTime() - this.previous.getTime()} ms`
      }
      this.previous = now

      console.log("\\_> Details", details)

      data.forEach(console.log)

      console.groupEnd()
    }
  }

  static success<Data = any>(context: l4rContext | Function, title: string, ...data: Data[]): void {
    if(context instanceof Function) context = context.constructor.name
    this.log({ context, title, color: "#a4f6a5" }, ...data)
  }

  static error<Data = any>(context: l4rContext | Function, title: string, ...data: Data[]): void {
    if(context instanceof Function) context = context.constructor.name
    this.log({ context, title, color: "#f68787", force: true }, ...data)
  }

  static warning<Data = any>(context: l4rContext | Function, title: string, ...data: Data[]): void {
    if(context instanceof Function) context = context.constructor.name
    this.log({ context, title, color: "#f8a978" }, ...data)
  }

  static info<Data = any>(context: l4rContext | Function, title: string, ...data: Data[]): void {
    if(context instanceof Function) context = context.constructor.name
    this.log({ context, title, color: "#f1eb9a" }, ...data)
  }

}
