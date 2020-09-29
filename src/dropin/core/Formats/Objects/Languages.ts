import { Language } from "../../Context/Fields/Language"
import { XOR } from "../../../core/Code/XOR"

export type LanguagesObject<Content, L extends Language = Language> = XOR<{
  "*": Content
}, {
  [language in L]?: Content
}>

export type LanguagesObject_IncludeAll<Content, L extends Language = Language> = {
  [language in L]: Content
}
