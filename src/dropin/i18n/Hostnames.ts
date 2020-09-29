import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nHostnames = i18nData({

  name: {
    en: { one: "Hostname", many: "Hostnames" },
    fr: { one: "Hôte", many: "Hôtes", article: NameArticle.FR_MAS },
  },

})
