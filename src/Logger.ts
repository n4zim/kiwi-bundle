
const typeCss = (color: string) => [
  "border: 1px solid black",
  "padding: 2px 10px",
  "background-color: " + color,
  "color: white",
  "font-size: 12px",
].join(";")

type ContextType = Object|string

class Logger {
  private enabled: boolean = false

  enable() {
    if(this.enabled) {
      this.logInfo(this, "Already enabled")
    } else {
      this.enabled = true
      this.logInfo(this, "Enabled")
    }
  }

  private log(context: ContextType, color: string, title: string, ...data: any) {
    const label = typeof context === "string" ? context : context.constructor.name
    console.groupCollapsed("%c" + label, typeCss(color), title)
    console.log({ context })
    data.forEach((element: any) => {
      console.log(element)
    })
    console.groupEnd()
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
