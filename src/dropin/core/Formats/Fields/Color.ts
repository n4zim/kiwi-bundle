import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type ColorFieldOptions = ModelField_RequiredOption

export type ColorFieldSchema = ModelField<FieldType.COLOR, ColorFieldOptions>

export type ColorField = string

export const ColorFieldValidator = (data: ColorField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
