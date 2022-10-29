import { XOR } from "./XOR"


export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
}


export enum NameArticle {
  FR_MAS, // Français - Masculin (un, le, du, au, les, des, aux)
  FR_MAS_CNT, // Français - Masculin contracté (un, l', de l', à l', les, des, aux)
  FR_FEM, // Français - Féminin (une, la, de la, à la, les, des, aux)
  FR_FEM_CNT, // Français - Féminin contracté (une, l', de l', à l', les, des, aux)
}


export type LanguagesObject<Content, L extends Language = Language> = XOR<{
  "*": Content
}, {
  [language in L]?: Content
}>


export type NameField_Text = string | number | (string|number)[]

export type NameField_ByNumber<Text = NameField_Text> = {
  one?: Text
  many?: Text
  short?: Text
  article?: NameArticle
}

export type NameField_ForAPerson<Text = NameField_Text> = { firstname?: Text, lastname?: Text, middlename?: Text }


type FieldsContent<Text> = Text | NameField_ByNumber<Text> | NameField_ForAPerson<Text>

export type NameField_ByLanguage<Text = NameField_Text> = LanguagesObject<FieldsContent<Text>>

export type NameField<Text = NameField_Text> = FieldsContent<Text> | NameField_ByLanguage<Text>
