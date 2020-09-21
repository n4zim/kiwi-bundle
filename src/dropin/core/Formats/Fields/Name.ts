import { NameArticle } from "../../Context/Fields/NameArticle"
import { LanguagesObject } from "../Objects/Languages"
import { ModelField_RequiredOption, ModelField_LengthOptions, ModelField, ModelField_DefaultOption } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context/Types/ErrorType"

export type NameField_Text = string | number | (string|number)[]

export type NameField_ByNumber<Text = NameField_Text> = {
  one?: Text
  many?: Text
  short?: Text
  article?: NameArticle
}

export type NameField_ForAPerson<Text = NameField_Text> = { firstname?: Text, lastname?: Text, middlename?: Text }


type FieldsContent<Text> = Text | NameField_ByNumber<Text> | NameField_ForAPerson<Text>

export type NameField_ByLanguage<Text = NameField_Text> = LanguagesObject<FieldsContent<Text>>

export type NameField<Text = NameField_Text> = FieldsContent<Text> | NameField_ByLanguage<Text>


export type NameFieldOptions = ModelField_RequiredOption & ModelField_LengthOptions & ModelField_DefaultOption<NameField> & {
  person?: boolean | { firstname?: boolean, lastname?: boolean, middlename?: boolean }
}

export type NameFieldSchema = ModelField<FieldType.NAME, NameFieldOptions>


export const NameFieldValidator = (input: NameField | any, context?: l4rContext): Promise<Issue[]> => {
  if(typeof input === "number" || typeof input === "string") return Promise.resolve([])
  if(typeof input !== "object"
    || typeof input === "undefined" || input === null) {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
  }
  if(Array.isArray(input)) {
    return (input as NameField[]).reduce((promise, currentElement, currentIndex) => promise.then(list => {
      let currentContext
      if(typeof context !== "undefined") {
        if(Array.isArray(context)) {
          currentContext = [ ...context, currentIndex.toString() ]
        } else {
          currentContext = [ context, currentIndex.toString() ]
        }
      }
      return NameFieldValidator(currentElement, currentContext).then(errors => {
        list.push.apply(list, errors)
        return list
      })
    }), Promise.resolve([] as Issue[]))
  }

  if(typeof input.$ !== "undefined") {
    if(typeof input.$ !== "object") {
      return Promise.resolve([ new Issue(i18nValidator.dataMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
    }
    if(typeof input.$.type === "undefined") {
      return Promise.resolve([ new Issue(i18nValidator.noDataFoundForKey("type"), ErrorType.INCOMPLETE, context) ])
    }
    if(input.$.type !== "i18n") {
      return Promise.resolve([ new Issue(i18nValidator.dataShouldBe("i18n"), ErrorType.INCOMPATIBLE, context) ])
    }
    if(typeof input.$.name === "undefined") {
      return Promise.resolve([ new Issue(i18nValidator.noDataFoundForKey("name"), ErrorType.INCOMPLETE, context) ])
    }
  } else {
    const dataByLanguage = input as NameField_ByLanguage<NameField>
    if(typeof dataByLanguage["*"] !== "undefined") {
    } else {
    }
  }

  return Promise.resolve([])
}
