import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nRevisions = i18nData({

  name: {
    en: { one: "Revision", many: "Revisions" },
    fr: { one: "Révision", many: "Révisions", article: NameArticle.FR_FEM },
  },

})
