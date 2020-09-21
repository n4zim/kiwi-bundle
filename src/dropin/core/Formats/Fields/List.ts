import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context"

export type ListFieldOptions = ModelField_RequiredOption & {
  todo?: boolean
  children?: ListField
}

export type ListFieldSchema = ModelField<FieldType.LIST, ListFieldOptions>

export type ListField = []

export const ListFieldValidator = (data: ListField | any, context?: l4rContext): Promise<Issue[]> => {
  if(!Array.isArray(data)) {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
  }

  // todo validate children

  return Promise.resolve([])
}
