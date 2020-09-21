import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nCompanies = i18nData({

  name: {
    en: { one: "Company", many: "Companies" },
    fr: { one: "Entreprise", many: "Entreprises", article: NameArticle.FR_FEM_CNT },
  },

})
