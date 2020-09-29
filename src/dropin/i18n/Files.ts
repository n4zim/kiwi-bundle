import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nFiles = i18nData({

  name: {
    en: { one: "File", many: "Files" },
    fr: { one: "Fichier", many: "Fichiers", article: NameArticle.FR_MAS },
  },

})
