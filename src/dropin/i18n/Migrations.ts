import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nMigrations = i18nData({

  name: {
    en: { one: "Migration", many: "Migrations" },
    fr: { one: "Migration", many: "Migrations", article: NameArticle.FR_FEM },
  },

})
