import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nMaps = i18nData({

  name: {
    en: { one: "Map", many: "Maps" },
    fr: { one: "Plan", many: "Plans", article: NameArticle.FR_MAS },
  },

})
