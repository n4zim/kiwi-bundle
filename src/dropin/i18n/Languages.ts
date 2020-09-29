import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"
import { Language } from "../core/Context/Fields/Language"
import { i18nArticle } from "../core/Context/Code/i18nArticle"

export const i18nLanguages = i18nData({

  name: {
    en: { one: "Language", many: "Languages" },
    fr: { one: "Langue", many: "Langues", article: NameArticle.FR_FEM },
  },

  current: (language: Language): i18nData => ({
    en: [
      "The current language is ",
      { $: { type: "i18n", name: i18nLanguages[language] } }
    ],
    fr: [
      "La langue actuelle est ",
      { $: { type: "i18n", name: i18nLanguages[language], options: { article: i18nArticle.FR_DEF } } },
    ],
  }),

  en: {
    en: "English",
    fr: { one: "Anglais", article: NameArticle.FR_MAS_CNT }
  },

  fr: {
    en: "French",
    fr: { one: "Français", article: NameArticle.FR_MAS },
  },

})
