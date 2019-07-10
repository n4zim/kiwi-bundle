import { stringsFunction } from "./types"
import logger from "../client/logger"

export const currentLanguage = navigator.language.slice(0, 2)

const execute = (data: object) => {
  return "EXECUTE"
}

export default function i18n(data: string|object|stringsFunction, count = 1, vars = {}): string {
  if(typeof data === "string") {
    return data
  }

  if(typeof data === "object") {
    return execute(data)
  }

  if(typeof data === "function") {
    if(currentLanguage !== null) {
      return data(currentLanguage, count)
    } else {
      return ""
    }
  }

  logger.logError("i18n", "Unknown i18n data type")
  return ""
}
