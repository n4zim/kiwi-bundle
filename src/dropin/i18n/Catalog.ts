import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nCatalog = i18nData({

  name: {
    en: { one: "Catalog" },
    fr: { one: "Catalogue", article: NameArticle.FR_MAS },
  },

})
