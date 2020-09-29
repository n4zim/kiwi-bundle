import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type URLFieldOptions = ModelField_RequiredOption

export type URLFieldSchema = ModelField<FieldType.URL, URLFieldOptions>

export type URLField = string

export const URLFieldValidator = (data: URLField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
