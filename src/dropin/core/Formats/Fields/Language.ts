import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type LanguageFieldOptions = ModelField_RequiredOption

export type LanguageFieldSchema = ModelField<FieldType.LANGUAGE, LanguageFieldOptions>

export type LanguageField = {}

export const LanguageFieldValidator = (data: LanguageField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
