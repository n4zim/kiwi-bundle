import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type MeasurementFieldOptions = ModelField_RequiredOption

export type MeasurementFieldSchema = ModelField<FieldType.MEASUREMENT, MeasurementFieldOptions>

export type MeasurementField = {}

export const MeasurementFieldValidator = (data: MeasurementField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
