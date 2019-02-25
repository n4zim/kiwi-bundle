
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
  private previous: Date|null = null

  disable() {
    if(this.enabled) {
      this.enabled = false
      this.logInfo(this, "Disabled")
    } else {
      this.logError(this, "Already disabled")
    }
  }

  private dateToText(date: Date) {
    return date.getFullYear()
      + " " + date.getMonth()
      + " " + date.getDate()
      + " " + date.getHours()
      + " " + date.getMinutes()
      + " " + date.getSeconds()
      + " " + date.getMilliseconds()
  }

  private log(context: ContextType, color: string, title: string, ...data: any) {
    const isObject = typeof context !== "string"

    const label = `%c${isObject ? context.constructor.name : context}`
    const css = generateCss(color)

    console.groupCollapsed(label, css, title)

    const now = new Date()

    const contextData: { instance?: ContextType, time: string } = {
      time: this.dateToText(now),
    }

    if(this.previous !== null) {
      contextData.time +=  ` (${now.getTime() - this.previous.getTime()} ms from prev.)`
    }
    this.previous = now

    if(isObject) {
      contextData.instance = context
    }

    console.log("\\_> Context", contextData)

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
