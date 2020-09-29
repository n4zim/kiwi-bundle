import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nOperations = i18nData({

  name: {
    en: { one: "Operation", many: "Operations" },
    fr: { one: "Opération", many: "Opérations", article: NameArticle.FR_FEM_CNT },
  },

})
