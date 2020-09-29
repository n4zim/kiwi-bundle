import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nLogs = i18nData({

  name: {
    en: { one: "Log", many: "Logs" },
    fr: { one: "Journal", many: "Journaux", article: NameArticle.FR_MAS },
  },

})
