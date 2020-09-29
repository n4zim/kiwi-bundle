import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type DocumentFieldOptions = ModelField_RequiredOption

export type DocumentFieldSchema = ModelField<FieldType.DOCUMENT, DocumentFieldOptions>

export type DocumentField = string

export const DocumentFieldValidator = (data: DocumentField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
