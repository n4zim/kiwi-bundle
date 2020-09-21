import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nConfigs = i18nData({

  name: {
    en: { one: "Configuration", many: "Configurations" },
    fr: { one: "Configuration", many: "Configurations", article: NameArticle.FR_FEM },
  },

})
