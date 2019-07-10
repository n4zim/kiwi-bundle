import { stringsFunction } from "./types"
import logger from "../client/logger"

interface DataType {
  article?: string
  one?: string
  many?: string
}

export default function stringsByCount(data: DataType): stringsFunction {
  return (language, count) => {
    if(count !== 1) {
      if(typeof data.one !== "undefined") {
        return data.one
      }
    } else {
      if(typeof data.many !== "undefined") {
        return data.many
      }
    }

    logger.logError("i18n", `Missing stringsByCount for a count of ${count}`)
    return ""
  }
}
