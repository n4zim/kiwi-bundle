import { NameField } from "../Fields"
import { i18nArticle } from "../../Context/Code/i18nArticle"
import { Language } from "../../Context/Fields/Language"
import { KeysObject } from "../Objects"
import { i18nQuery } from "../Queries/i18n"

export type i18nSchema<Name = NameField> = Name | i18nQuery<Name>


export type i18nData<Data = any> = KeysObject<i18nSchema|i18nSchema[]|((...params: any[]) => i18nSchema|i18nSchema[]), Data>

export const i18nData = <Data extends i18nData<Data>>(data: Data): Data => data


export type i18nOptions<Vars = { [name: string]: string }> = {
  count?: number
  vars?: Vars
  lowercase?: boolean
  article?: i18nArticle
  language?: Language
}


export type i18nMarkdownCompilerOptions = { [index: string]: string }

export type i18nMarkdownCompiler<Output = any> = {
  bold: (id: string, children: Output, options: i18nMarkdownCompilerOptions) => Output
  link: (id: string, link: string, children: Output, options: i18nMarkdownCompilerOptions) => Output
}

type i18nSettingsMarkdownString = {
  text: string
  options: i18nMarkdownCompilerOptions
  bold?: boolean
  link?: string
}

export type i18nSettingsMarkdownObject = { [index: number]: { end: number, value: i18nSettingsMarkdownString } }

export type i18nSettingsCompilerCallback = (match: RegExpExecArray, children?: i18nSettingsMarkdownString) => i18nSettingsMarkdownString
