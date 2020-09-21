import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type PhoneFieldOptions = ModelField_RequiredOption & {
  prefix?: number
}

export type PhoneFieldSchema = ModelField<FieldType.PHONE, PhoneFieldOptions>

export type PhoneField = {}

export const PhoneFieldValidator = (data: PhoneField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
