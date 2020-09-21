import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nPermissions = i18nData({

  name: {
    en: { one: "Permission", many: "Permissions" },
    fr: { one: "Permission", many: "Permissions", article: NameArticle.FR_FEM },
  },

})
