import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nDockerRegistries = i18nData({

  name: {
    en: { one: "Docker registry", many: "Docker registries" },
    fr: { one: "Registre Docker", many: "Registres Docker", article: NameArticle.FR_MAS },
  },

})
