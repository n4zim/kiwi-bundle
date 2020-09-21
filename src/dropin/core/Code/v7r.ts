import { v7rData } from "../Formats/Models/v7r"
import { l4rContext } from "../Formats/Models/l4r"
import { Issue } from "../Formats/Models/Error"
import { i18nValidator } from "../../i18n/Validator"
import { ErrorType } from "../Context/Types/ErrorType"
import { FieldType } from "../Context/Types/FieldType"
import * as Fields from "../Formats/Fields"

/*
    db    db d88888D d8888b.
    88    88 VP  d8' 88  `8D
    Y8    8P    d8'  88oobY'
    `8b  d8'   d8'   88`8b
    `8bd8'   d8'    88 `88.
      YP    d8'     88   YD   Validate anything.
*/

export const v7r = <Input extends any = any>(input: Input, data: v7rData, context?: l4rContext): Promise<Issue[]> => {
  if(typeof data !== "object") {
    return Promise.resolve([ new Issue(i18nValidator.schemaMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
  }

  if(typeof data.type === "string") {
    switch(data.type) {
      case FieldType.AUDIO: return Fields.AudioFieldValidator(input, context)
      case FieldType.BOOLEAN: return Fields.BooleanFieldValidator(input, context)
      case FieldType.COLLECTION: return Fields.CollectionFieldValidator(input, context)
      case FieldType.COLOR: return Fields.ColorFieldValidator(input, context)
      case FieldType.CUSTOM: return Fields.CustomFieldValidator(input, context)
      case FieldType.DATE: return Fields.DateFieldValidator(input, context)
      case FieldType.DOCUMENT: return Fields.DocumentFieldValidator(input, context)
      case FieldType.EMAIL: return Fields.EmailFieldValidator(input, context)
      case FieldType.FILE: return Fields.FileFieldValidator(input, context)
      case FieldType.IMAGE: return Fields.ImageFieldValidator(input, context)
      case FieldType.LANGUAGE: return Fields.LanguageFieldValidator(input, context)
      case FieldType.LIST: return Fields.ListFieldValidator(input, context)
      case FieldType.LOCATION: return Fields.LocationFieldValidator(input, context)
      case FieldType.MEASUREMENT: return Fields.MeasurementFieldValidator(input, context)
      case FieldType.NAME: return Fields.NameFieldValidator(input, context)
      case FieldType.OBJECT: return Fields.ObjectFieldValidator(input, context)
      case FieldType.PERIOD: return Fields.PeriodFieldValidator(input, context)
      case FieldType.PHONE: return Fields.PhoneFieldValidator(input, context)
      case FieldType.PIPELINE: return Fields.PipelineFieldValidator(input, context)
      case FieldType.PRICE: return Fields.PriceFieldValidator(input, context)
      case FieldType.QUANTITY: return Fields.QuantityFieldValidator(input, context)
      case FieldType.RECURRENCE: return Fields.RecurrenceFieldValidator(input, context)
      case FieldType.SELECTOR: return Fields.SelectorFieldValidator(input, context)
      case FieldType.TEXT: return Fields.TextFieldValidator(input, context)
      case FieldType.URL: return Fields.URLFieldValidator(input, context)
      case FieldType.VIDEO: return Fields.VideoFieldValidator(input, context)
      default: return Promise.resolve([ new Issue(i18nValidator.typeNotFound(data.type), ErrorType.INCOMPLETE, context) ])
    }
  }

  if(typeof input !== "object") {
    return Promise.resolve([ new Issue(i18nValidator.dataMustBeAnObject, ErrorType.INCOMPATIBLE, context) ])
  }

  return Object.keys(data).reduce((promise, schemaKey) => promise.then(list => {
    if(typeof (input as any)[schemaKey] === "undefined") {
      list.push(new Issue(i18nValidator.noDataFoundForKey(schemaKey), ErrorType.UNFINDABLE, context))
      return list
    }

    let childContext
    if(typeof context !== "undefined") {
      if(Array.isArray(context)) {
        childContext = [ ...context, schemaKey ]
      } else {
        childContext = [ context, schemaKey ]
      }
    }

    return v7r((input as any)[schemaKey], (data as any)[schemaKey], childContext).then(errors => {
      list.push.apply(list, errors)
      return list
    })

  }), Promise.resolve([] as Issue[])).then(errors => {
    const schemaKeys = Object.keys(data)
    Object.keys(input as any).forEach(dataKey => {
      if(schemaKeys.indexOf(dataKey) === -1) {
        errors.push(new Issue(i18nValidator.unexpectedKey(dataKey), ErrorType.UNEXPECTED, context))
      }
    })
    return errors
  })

}
