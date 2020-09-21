import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nEndpoints = i18nData({

  name: {
    en: { many: "Endpoints" },
    fr: { many: "Points de terminaison", article: NameArticle.FR_MAS },
  },

})
