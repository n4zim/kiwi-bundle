import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nNamespaces = i18nData({

  name: {
    en: { one: "Namespace", many: "Namespaces" },
    fr: { one: "Espace de nommage", many: "Espaces de nommages", article: NameArticle.FR_MAS_CNT },
  },

})
