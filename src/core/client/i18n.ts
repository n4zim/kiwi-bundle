import { stringToLanguageSelector, Name, nameToString } from "dropin-recipes"

export type i18nStrings = { [name: string]: Name }

export const currentLanguage = stringToLanguageSelector(navigator.language.slice(0, 2))

export function i18n(name: Name, count = 1, vars = {}): string {
  return nameToString(name, { language: currentLanguage, count, vars })
}
