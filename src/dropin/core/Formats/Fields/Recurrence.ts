import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type RecurrenceFieldOptions = ModelField_RequiredOption

export type RecurrenceFieldSchema = ModelField<FieldType.RECURRENCE, RecurrenceFieldOptions>

export type RecurrenceField = {}

export const RecurrenceFieldValidator = (data: RecurrenceField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
