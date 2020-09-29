import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type ImageFieldOptions = ModelField_RequiredOption & {
  formats?: string[]
  minSize?: number
  maxSize?: number
}

export type ImageFieldSchema = ModelField<FieldType.IMAGE, ImageFieldOptions>

export type ImageField = {}

export const ImageFieldValidator = (data: ImageField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
