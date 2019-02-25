
const generateCss = (color: string) => [
  "border: 1px solid black",
  "padding: 2px 10px",
  "background-color: " + color,
  "color: white",
  "font-size: 12px",
].join(";")

type ContextType = Object|string

class Logger {
  private enabled: boolean = false

  disable() {
    if(this.enabled) {
      this.enabled = false
      this.logInfo(this, "Disabled")
    } else {
      this.logError(this, "Already disabled")
    }
  }

  private log(context: ContextType, color: string, title: string, ...data: any) {
    const isObject = typeof context !== "string"
    const isSingle = !isObject && data.length === 0

    const label = `%c${isObject ? context.constructor.name : context}`
    const css = generateCss(color)

    if(isSingle) {
      console.log(label, css, title)
    } else {
      console.groupCollapsed(label, css, title)

      if(isObject) {
        console.log("Context", context)
      }

      data.forEach((element: any) => {
        console.log(element)
      })

      console.groupEnd()
    }
  }

  logSuccess(context: ContextType, title: string, ...data: any) {
    this.log(context, "#7eae0c", title, ...data)
  }

  logError(context: ContextType, title: string,  ...data: any) {
    this.log(context, "#a71c0d", title, ...data)
  }

  logInfo(context: ContextType, title: string,  ...data: any) {
    this.log(context, "#0f4ba6", title, ...data)
  }

}

export default new Logger()
