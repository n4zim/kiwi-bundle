import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nMetrics = i18nData({

  name: {
    en: { one: "Metric", many: "Metrics" },
    fr: { one: "Métrique", many: "Métriques", article: NameArticle.FR_FEM },
  },

})
