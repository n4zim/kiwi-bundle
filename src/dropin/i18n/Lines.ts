import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nLines = i18nData({

  name: {
    en: { one: "Line", many: "Lines" },
    fr: { one: "Fil", many: "Fils", article: NameArticle.FR_MAS },
  },

})
