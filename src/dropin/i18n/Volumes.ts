import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nVolumes = i18nData({

  name: {
    en: { one: "Volume", many: "Volumes" },
    fr: { one: "Volume", many: "Volumes", article: NameArticle.FR_MAS },
  },

})
