import { SchemaObject } from "../Objects/Schema"
import { NameField } from "../Fields"
import { FieldType } from "../../Context/Types/FieldType"

export type ModelField<Type extends FieldType, Options> = SchemaObject<Type, Options> & {
  name: NameField
  filters?: boolean | string[]
}

export interface ModelField_RequiredOption {
  required?: boolean
}

export interface ModelField_MinMaxOptions {
  min?: number
  max?: number
}

export interface ModelField_LengthOptions {
  minLength?: number
  maxLength?: number
}

export interface ModelField_IdOption {
  id: string
}

export interface ModelField_DefaultOption<Type> {
  default?: Type
}
