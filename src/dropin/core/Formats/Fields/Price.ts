import { ModelField_RequiredOption, ModelField_MinMaxOptions, ModelField } from "../Models/Field"
import { Currency } from "../../Context/Fields/Currency"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context/Types/ErrorType"
import { Issue } from "../Models/Error"

export type PriceFieldOptions = ModelField_RequiredOption & ModelField_MinMaxOptions & {
  currency: Currency
}

export type PriceFieldSchema = ModelField<FieldType.PRICE, PriceFieldOptions>

export type PriceField = { number: number, currency: Currency }

export const PriceFieldValidator = (data: PriceField | any, context?: l4rContext): Promise<Issue[]> => {
  if(typeof data !== "object") {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
  }

  if(typeof data.number === "undefined") {
    return Promise.resolve([ new Issue(i18nValidator.noDataFoundForKey("number"), ErrorType.INCOMPLETE, context) ])
  }

  if(typeof data.number !== "number") {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeANumber, ErrorType.INCOMPATIBLE, context) ])
  }

  if(typeof data.currency === "undefined") {
    return Promise.resolve([ new Issue(i18nValidator.noDataFoundForKey("currency"), ErrorType.INCOMPLETE, context) ])
  }

  const totalKeys = Object.keys(data).length
  if(totalKeys > 2) {
    return Promise.resolve([ new Issue(i18nValidator.keysCountMismatch(totalKeys, 2), ErrorType.UNEXPECTED, context) ])
  }

  return Promise.resolve([])
}
