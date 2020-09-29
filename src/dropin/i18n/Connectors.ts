import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nConnectors = i18nData({

  name: {
    en: { one: "Connector", many: "Connectors" },
    fr: { one: "Connecteur", many: "Connecteurs", article: NameArticle.FR_MAS },
  },

})
