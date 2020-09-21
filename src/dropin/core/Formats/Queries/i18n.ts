import { NameField } from "../Fields"
import { i18nOptions } from "../Models/i18n"

export type i18nQuery<Name = NameField> = {
  $: { type: "i18n", name: Name, options?: i18nOptions }
}
