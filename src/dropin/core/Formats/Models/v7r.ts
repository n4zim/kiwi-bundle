import * as Fields from "../Fields"

export type v7rSchema = Fields.AudioFieldSchema | Fields.BooleanFieldSchema | Fields.CollectionFieldSchema
  | Fields.ColorFieldSchema | Fields.CustomFieldSchema | Fields.DateFieldSchema | Fields.DocumentFieldSchema
  | Fields.EmailFieldSchema | Fields.FileFieldSchema | Fields.ImageFieldSchema | Fields.LanguageFieldSchema
  | Fields.ListFieldSchema | Fields.LocationFieldSchema | Fields.MeasurementFieldSchema | Fields.NameFieldSchema
  | Fields.ObjectFieldSchema | Fields.PeriodFieldSchema | Fields.PhoneFieldSchema | Fields.PipelineFieldSchema
  | Fields.PriceFieldSchema | Fields.QuantityFieldSchema | Fields.RecurrenceFieldSchema |  Fields.SelectorFieldSchema
  | Fields.TextFieldSchema | Fields.URLFieldSchema | Fields.VideoFieldSchema

export type v7rData<Data extends v7rData<Data> = any> = { [name: string]: Data | v7rSchema }

export const v7rData = <Data extends v7rData>(data: Data) => data
