import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nAuth = i18nData({

  name: {
    en: { one: "Authentification" },
    fr: { one: "Authentification", article: NameArticle.FR_FEM_CNT },
  },

})
