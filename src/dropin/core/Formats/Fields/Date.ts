import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context"

export type DateFieldOptions = ModelField_RequiredOption & {
  minDate?: Date
  maxDate?: Date
}

export type DateFieldSchema = ModelField<FieldType.DATE, DateFieldOptions>

export type DateField = Date

export const DateFieldValidator = (data: DateField | any, context?: l4rContext): Promise<Issue[]> => {
  if(!(data instanceof Date)) {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
  }
  return Promise.resolve([])
}
