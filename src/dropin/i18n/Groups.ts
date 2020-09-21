import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nGroups = i18nData({

  name: {
    en: { one: "Group", many: "Groups" },
    fr: { one: "Groupe", many: "Groupes", article: NameArticle.FR_MAS },
  },

})
