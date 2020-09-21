import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nDocuments = i18nData({

  name: {
    en: { one: "Document", many: "Documents" },
    fr: { one: "Document", many: "Documents", article: NameArticle.FR_MAS },
  },

})
