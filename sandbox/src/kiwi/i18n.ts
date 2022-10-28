import { CURRENT_LANGUAGE } from "./local"
import { i18nArticle, i18nOptions, i18nQuery, i18nSchema } from "./types/i18n"
import { Language, NameArticle, NameField_ByLanguage, NameField_ByNumber, NameField_ForAPerson } from "./types/names"

export function i18n(schema: i18nSchema, options: i18nOptions = {}): string {
  if(typeof schema === "number") {return schema.toString()} // NAME NUMBER
  if(typeof schema === "string") {return fromString(schema, options)} // NAME STRING
  if(typeof schema === "object") {
    if(Array.isArray(schema)) {return fromArray(schema, options)} // ARRAY
    const schemaAsQuery = schema as i18nQuery
    if(typeof schemaAsQuery.$ !== "undefined") {return fromQuery(schemaAsQuery, options)}
    const schemaAsByNumber = schema as NameField_ByNumber
    if(
      typeof schemaAsByNumber.one !== "undefined"
      || typeof schemaAsByNumber.many !== "undefined"
      || typeof schemaAsByNumber.short !== "undefined"
    ) {
      return fromByNumber(schemaAsByNumber, options)
    }
    const schemaAsAPerson = schema as NameField_ForAPerson
    if(
      typeof schemaAsAPerson.firstname !== "undefined"
      || typeof schemaAsAPerson.lastname !== "undefined"
      || typeof schemaAsAPerson.middlename !== "undefined"
    ) {
      return fromAPerson(schemaAsAPerson, options)
    }
    return fromByLanguage(schema as NameField_ByLanguage, options)
  }
  return "" // FUNCTION, UNDEFINED, ...
}

const fromString = (text: string, options: i18nOptions): string => {
  // LOWERCASE
  if(typeof options.lowercase !== "undefined" && options.lowercase) {
    text = text.toLowerCase()
  }
  return text
}

const fromArray = (schema: i18nSchema[], options: i18nOptions): string => {
  return schema.map(current => i18n(current, options)).join("")
}

const fromQuery = (schema: i18nQuery, options: i18nOptions): string => {
  if(
    typeof schema.$ !== "object"
    || typeof schema.$.type === "undefined"
    || schema.$.type !== "i18n"
    || typeof schema.$.name === "undefined"
  ) {
    return ""
  }
  let queryOptions: i18nOptions
  if(typeof schema.$.options === "object") {
    queryOptions = Object.assign(options, schema.$.options)
  } else {
    queryOptions = options
  }
  return i18n(schema.$.name, queryOptions)
}

const fromByNumber = (nameByNumber: NameField_ByNumber, options: i18nOptions): string => {
  let output: string = ""

  if(typeof options.count === "undefined") {
    options.count = 1
  }

  // One
  if(options.count === 1) {
    if(typeof nameByNumber.one !== "undefined") {
      output = i18n(nameByNumber.one, options)
    } else if(typeof nameByNumber.many !== "undefined") {
      output = i18n(nameByNumber.many, options)
    }

  // Many
  } else {
    if(typeof nameByNumber.many !== "undefined") {
      output = i18n(nameByNumber.many, options)
    } else if(typeof nameByNumber.one !== "undefined") {
      output = i18n(nameByNumber.one, options)
    }
  }

  // ARTICLES
  if(typeof options.article !== "undefined" && options.article && typeof options.language !== "undefined") {
    switch (options.language) {
    case Language.FRENCH:
      switch (options.article as i18nArticle) {
      case i18nArticle.FR_IND:
        if(options.count !== 1) {
          output = "des " + output
        } else if(nameByNumber.article === NameArticle.FR_FEM || nameByNumber.article === NameArticle.FR_FEM_CNT) {
          output = "une " + output
        } else {
          output = "un " + output
        }
        break
      case i18nArticle.FR_DEF:
        if(options.count !== 1) {
          output = "les " + output
        } else if(nameByNumber.article === NameArticle.FR_MAS_CNT || nameByNumber.article === NameArticle.FR_FEM_CNT) {
          output = "l'" + output
        } else if(nameByNumber.article === NameArticle.FR_FEM) {
          output = "la " + output
        } else {
          output = "le " + output
        }
        break
      case i18nArticle.FR_DEF_CNT:
        if(options.count !== 1) {
          output = "aux " + output
        } else if(nameByNumber.article === NameArticle.FR_MAS_CNT || nameByNumber.article === NameArticle.FR_FEM_CNT) {
          output = "à l'" + output
        } else if(nameByNumber.article === NameArticle.FR_FEM) {
          output = "à la " + output
        } else {
          output = "au " + output
        }
        break
      case i18nArticle.FR_PAR:
        if(options.count !== 1) {
          output = "des " + output
        } else if(nameByNumber.article === NameArticle.FR_MAS_CNT || nameByNumber.article === NameArticle.FR_FEM_CNT) {
          output = "de l'" + output
        } else if(nameByNumber.article === NameArticle.FR_FEM) {
          output = "de la " + output
        } else {
          output = "du " + output
        }
        break
      }
      break
    }
  }
  return i18n(output, options)
}

const fromAPerson = (person: NameField_ForAPerson, options: i18nOptions): string => {
  let output: string = ""
  if(typeof person.firstname !== "undefined") {output += person.firstname}
  if(typeof person.middlename !== "undefined") {output += (output.length ? " " : "") + person.middlename}
  if(typeof person.lastname !== "undefined") {output += (output.length ? " " : "") + person.lastname}
  return i18n(output, options)
}

const fromByLanguage = (byLanguage: NameField_ByLanguage, options: i18nOptions): string => {
  if(typeof options.language !== "undefined" && typeof byLanguage[options.language] !== "undefined") {
    return i18n(byLanguage[options.language] as i18nSchema, options)
  }
  if(typeof byLanguage["*"] !== "undefined") { // Global Name text
    return i18n(byLanguage["*"], options)
  }
  if(typeof byLanguage[CURRENT_LANGUAGE.get()] !== "undefined") { // Default language
    options.language = CURRENT_LANGUAGE.get()
    return i18n(byLanguage[options.language] as i18nSchema, options)
  }
  return ""
}
