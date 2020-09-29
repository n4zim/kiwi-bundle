import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nDisplays = i18nData({

  name: {
    en: { many: "Displays" },
    fr: { many: "Affichages", article: NameArticle.FR_MAS_CNT },
  },

})
