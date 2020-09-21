import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type PeriodFieldOptions = ModelField_RequiredOption & {
  minDate?: Date
  maxDate?: Date
  years?: boolean
  months?: boolean
  days?: boolean
  hours?: boolean
  minutes?: boolean
  seconds?: boolean
}

export type PeriodFieldSchema = ModelField<FieldType.PERIOD, PeriodFieldOptions>

export type PeriodField = {}

export const PeriodFieldValidator = (data: PeriodField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
