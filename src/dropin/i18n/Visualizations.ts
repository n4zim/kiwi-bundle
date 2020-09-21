import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nVisualizations = i18nData({

  name: {
    en: { one: "Visualization", many: "Visualizations" },
    fr: { one: "Visualisation", many: "Visualisations", article: NameArticle.FR_FEM },
  },

})
