import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nPipelines = i18nData({

  name: {
    en: { one: "Pipeline", many: "Pipelines" },
    fr: { one: "Pipeline", many: "Pipelines", article: NameArticle.FR_FEM },
  },

})
