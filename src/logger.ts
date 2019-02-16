
interface LoggerParams {
  enable: boolean
}

const defaultParams: LoggerParams = {
  enable: true,
}

const typeCss = (color: string) => [
  "border: 1px solid black",
  "padding: 2px 10px",
  "background-color: " + color,
  "color: white",
  "font-size: 13px",
].join(";")

enum TYPES {
  SUCCESS = "SUCCESS",
  ERROR   = " ERROR ",
  INFO    = "  INFO ",
}

const TYPES_COLORS = {
  [TYPES.SUCCESS]: "#7eae0c",
  [TYPES.ERROR]: "#a71c0d",
  [TYPES.INFO]: "#0f4ba6",
}

class Logger {
  enabled: boolean

  constructor(params: LoggerParams = defaultParams) {
    this.enabled = params.enable
    if(this.enabled) {
      //this.logSuccess({ test: [], oklm: {} })
      //this.logError("Logger is enabled")
      //this.logInfo("Logger is enabled")
    }
  }

  private log(data: any, type?: TYPES) {
    const log = []

    if(typeof type !== "undefined") {
      log.push("%c" + type, typeCss(TYPES_COLORS[type]))
    }

    console.log(...log, data)
  }

  logSuccess(data: any) {
    this.log(data, TYPES.SUCCESS)
  }

  logError(data: any) {
    this.log(data, TYPES.ERROR)
  }

  logInfo(data: any) {
    this.log(data, TYPES.INFO)
  }

}

export default Logger
