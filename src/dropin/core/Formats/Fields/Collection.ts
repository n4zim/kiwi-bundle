import { ModelField_RequiredOption, ModelField_MinMaxOptions, ModelField, ModelField_IdOption } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type CollectionFieldOptions = ModelField_RequiredOption & ModelField_MinMaxOptions & ModelField_IdOption & {
  volume: string
}

export type CollectionFieldSchema = ModelField<FieldType.COLLECTION, CollectionFieldOptions>

export type CollectionField = {}

export const CollectionFieldValidator = (data: CollectionField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
