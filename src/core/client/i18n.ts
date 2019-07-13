import { Name } from "dropin-recipes"

export type i18nStrings = { [name: string]: Name }

export const currentLanguage = navigator.language.slice(0, 2)

export function i18n(data: Name, count = 1, vars = {}): string {
  if(typeof data === "string") {
    return data
  }
  return ""
}
