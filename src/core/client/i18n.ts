import { Name, Languages, NameByNumber } from "dropin-recipes"
import { logger } from "."

export type i18nStrings = { [name: string]: Name }

export const currentLanguage = navigator.language.slice(0, 2)

export function i18n(data: Name, count = 1, vars = {}): string {
  if(typeof data === "string") {
    return data
  }

  let current: string | NameByNumber = ""

  // Is NameByLanguage
  if(typeof data === "object") {

    // Global text is set
    if(typeof data[Languages.ANY] !== "undefined") {
      current = data[Languages.ANY]

    // Current language
    } else if(typeof data[currentLanguage] !== "undefined") {
      current = data[currentLanguage]
    }

    // Is NameByNumber
    if(typeof current === "object") {
      if(count === 1) {
        if(typeof current.one !== "undefined") {
          return current.one
        }
      } else if(typeof current.many !== "undefined") {
        return current.many
      }
    }

  } else {
    logger.logError("i18n", "Unknown i18n data type")
  }

  return current as string
}
