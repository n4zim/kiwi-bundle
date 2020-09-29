import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nAutomations = i18nData({

  name: {
    en: { many: "Automations" },
    fr: { one: "Automatisation", article: NameArticle.FR_FEM_CNT },
  },

})
