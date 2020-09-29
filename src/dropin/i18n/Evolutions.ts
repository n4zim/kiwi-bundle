import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nEvolutions = i18nData({

  name: {
    en: { one: "Evolution", many: "Evolutions" },
    fr: { one: "Évolution", many: "Évolutions", article: NameArticle.FR_FEM_CNT },
  },

})
