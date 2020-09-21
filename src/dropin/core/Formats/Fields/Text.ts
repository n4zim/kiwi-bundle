import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context/Types/ErrorType"

export type TextFieldOptions = ModelField_RequiredOption & {
  lines?: number
}

export type TextFieldSchema = ModelField<FieldType.TEXT, TextFieldOptions>

export type TextField = string

export const TextFieldValidator = (data: TextField | any, context?: l4rContext): Promise<Issue[]> => {
  if(typeof data !== "string") {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeAString, ErrorType.INCOMPATIBLE, context) ])
  }
  return Promise.resolve([])
}
