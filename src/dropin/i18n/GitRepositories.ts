import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nGitRepositories = i18nData({

  name: {
    en: { one: "Git repository", many: "Git repositories" },
    fr: { one: "Dépôt Git", many: "Dépôts Git", article: NameArticle.FR_MAS },
  },

})
