import { Name, LanguageSelector, NameByNumber, convertNameToString } from "dropin-recipes"
import { logger } from "."

export type i18nStrings = { [name: string]: Name }

export const currentLanguage = navigator.language.slice(0, 2)

export function i18n(name: Name, count = 1, vars = {}): string {
  const output = convertNameToString(currentLanguage, name, count, vars)

  if(output === null) {
    logger.logError("i18n", "Unknown i18n data type")
    return ""
  }

  return output
}
