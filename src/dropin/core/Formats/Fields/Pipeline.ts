import { ModelField_RequiredOption, ModelField, ModelField_IdOption } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type PipelineFieldOptions = ModelField_RequiredOption & ModelField_IdOption

export type PipelineFieldSchema = ModelField<FieldType.PIPELINE, PipelineFieldOptions>

export type PipelineField = {}

export const PipelineFieldValidator = (data: PipelineField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
