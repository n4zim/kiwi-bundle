import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type FileFieldOptions = ModelField_RequiredOption & {
  formats?: string[]
  minSize?: number
  maxSize?: number
}

export type FileFieldSchema = ModelField<FieldType.FILE, FileFieldOptions>

export type FileField = {}

export const FileFieldValidator = (data: FileField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
