import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type CustomFieldOptions = ModelField_RequiredOption

export type CustomFieldSchema = ModelField<FieldType.CUSTOM, CustomFieldOptions>

export type CustomField = string

export const CustomFieldValidator = (data: CustomField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
