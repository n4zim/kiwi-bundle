import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nOutputs = i18nData({

  name: {
    en: { many: "Outputs" },
    fr: { many: "Sorties", article: NameArticle.FR_FEM },
  },

})
