import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nValues = i18nData({

  name: {
    en: { one: "Value", many: "Values" },
    fr: { one: "Valeur", many: "Valeurs", article: NameArticle.FR_FEM },
  },

})
