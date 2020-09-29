import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nComments = i18nData({

  name: {
    en: { one: "Comment", many: "Comments" },
    fr: { one: "Commentaire", many: "Commentaires", article: NameArticle.FR_MAS },
  },

})
