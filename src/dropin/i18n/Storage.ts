import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nStorage = i18nData({

  name: {
    en: { one: "Storage" },
    fr: { one: "Stockage", article: NameArticle.FR_MAS },
  },

})
