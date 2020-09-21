import { ModelField_RequiredOption, ModelField, ModelField_IdOption } from "../Models/Field"
import { FieldType } from "../../Context/Types/FieldType"
import { l4rContext } from "../Models/l4r"
import { Issue } from "../Models/Error"
import { i18nValidator } from "../../../i18n/Validator"
import { ErrorType } from "../../Context"

export type QuantityFieldOptions = ModelField_RequiredOption

export type QuantityFieldSchema = ModelField<FieldType.QUANTITY, QuantityFieldOptions>

export type QuantityField = number

export const QuantityFieldValidator = (data: QuantityField | any, context?: l4rContext): Promise<Issue[]> => {
  if(typeof data !== "number") {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeANumber, ErrorType.INCOMPATIBLE, context) ])
  }
  return Promise.resolve([])
}
