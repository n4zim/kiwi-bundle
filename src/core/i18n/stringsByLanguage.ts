import { stringsFunction } from "./types"

type Languages = { [language: string]: any }

export default function stringsByLanguage(languages: Languages): stringsFunction {
  return (language, count) => {
    if(typeof languages[language] === "string") {
      return languages[language]
    }

    if(typeof languages[language] === "function") {
      return languages[language](language, count)
    }

    return ""
  }
}
