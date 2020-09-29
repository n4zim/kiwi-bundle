import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nVersions = i18nData({

  name: {
    en: { one: "Version", many: "Versions" },
    fr: { one: "Version", many: "Versions", article: NameArticle.FR_FEM },
  },

})
