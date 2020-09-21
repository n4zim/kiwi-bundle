import { i18nData } from "./i18n"
import { ErrorType } from "../../Context/Types/ErrorType"
import { l4rContext } from "./l4r"

export class Issue {
  message: string | i18nData
  type?: ErrorType
  context?: string|string[]

  constructor(message: string | i18nData, type?: ErrorType, context?: string|string[]) {
    this.message = message
    if(typeof type !== "undefined") this.type = type
    if(typeof context !== "undefined") this.context = context
  }

  addContext(context?: l4rContext) {
    if(typeof context !== "undefined") {
      if(typeof this.context === "undefined") {
        this.context = context
      } else if(Array.isArray(this.context)) {
        if(Array.isArray(context)) {
          this.context.push.apply(this.context, context)
        } else {
          this.context.push(context)
        }
      } else if(Array.isArray(context)) {
        this.context = [ this.context, ...context ]
      } else {
        this.context = [ this.context, context ]
      }
    }
  }
}
