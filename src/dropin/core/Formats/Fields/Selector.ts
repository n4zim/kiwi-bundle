import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type SelectorFieldOptions = ModelField_RequiredOption

export type SelectorFieldSchema = ModelField<FieldType.SELECTOR, SelectorFieldOptions>

export type SelectorField = string

export const SelectorFieldValidator = (data: SelectorField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
