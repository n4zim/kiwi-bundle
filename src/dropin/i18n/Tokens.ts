import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nTokens = i18nData({

  name: {
    en: { one: "Token", many: "Tokens" },
    fr: { one: "Jeton", many: "Jetons", article: NameArticle.FR_MAS },
  },

})
