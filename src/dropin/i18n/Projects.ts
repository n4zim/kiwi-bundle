import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nProjects = i18nData({

  name: {
    en: { one: "Project", many: "Projects" },
    fr: { one: "Projet", many: "Projets", article: NameArticle.FR_MAS },
  },

})
