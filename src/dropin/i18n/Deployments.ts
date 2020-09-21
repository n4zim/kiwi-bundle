import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nDeployments = i18nData({

  name: {
    en: { one: "Deployment", many: "Deployments" },
    fr: { one: "Déploiement", many: "Déploiements", article: NameArticle.FR_MAS },
  },

})
