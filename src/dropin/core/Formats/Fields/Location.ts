import { ModelField_RequiredOption, ModelField } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"

export type LocationFieldOptions = ModelField_RequiredOption

export type LocationFieldSchema = ModelField<FieldType.LOCATION, LocationFieldOptions>

export type LocationField = []

export const LocationFieldValidator = (data: LocationField | any, context?: l4rContext): Promise<Issue[]> => {
  return Promise.resolve([])
}
