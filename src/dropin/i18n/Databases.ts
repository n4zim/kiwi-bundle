import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nDatabases = i18nData({

  name: {
    en: { one: "Database", many: "Databases" },
    fr: { one: "Base de données", many: "Bases de données", article: NameArticle.FR_FEM },
  },

})
