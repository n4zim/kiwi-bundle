import { ModelField_DefaultOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context/Types/ErrorType"

export type BooleanFieldOptions = ModelField_DefaultOption<boolean> & {
  done?: boolean
}

export type BooleanFieldSchema = ModelField<FieldType.BOOLEAN, BooleanFieldOptions>

export type BooleanField = boolean

export const BooleanFieldValidator = (data: BooleanField | any, context?: l4rContext): Promise<Issue[]> => {
  if(typeof data !== "boolean") {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeBoolean, ErrorType.INCOMPATIBLE, context) ])
  }
  return Promise.resolve([])
}
