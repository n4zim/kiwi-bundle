import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type ObjectFieldOptions = ModelField_RequiredOption

export type ObjectFieldSchema = ModelField<FieldType.OBJECT, ObjectFieldOptions>

export type ObjectField = {}

export const ObjectFieldValidator = (data: ObjectField | any, context?: l4rContext): Promise<Issue[]> => {
  // todo validate children
  return Promise.resolve([])
}
