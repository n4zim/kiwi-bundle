import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nMilestones = i18nData({

  name: {
    en: { one: "Milestone", many: "Milestones" },
    fr: { one: "Jalon", many: "Jalons", article: NameArticle.FR_MAS },
  },

})
