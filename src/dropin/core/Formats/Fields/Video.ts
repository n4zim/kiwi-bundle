import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type VideoFieldOptions = ModelField_RequiredOption

export type VideoFieldSchema = ModelField<FieldType.VIDEO, VideoFieldOptions>

export type VideoField = string

export const VideoFieldValidator = (data: VideoField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
