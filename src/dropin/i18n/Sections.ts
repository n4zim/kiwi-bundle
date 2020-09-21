import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nSections = i18nData({

  name: {
    en: { one: "Section", many: "Sections" },
    fr: { one: "Section", many: "Sections", article: NameArticle.FR_FEM },
  },

})
