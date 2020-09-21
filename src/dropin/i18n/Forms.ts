import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nForms = i18nData({

  name: {
    en: { one: "Form", many: "Forms" },
    fr: { one: "Formulaire", many: "Formulaires", article: NameArticle.FR_MAS },
  },

})
