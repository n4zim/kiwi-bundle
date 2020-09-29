import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core"

export const i18nNotifications = i18nData({

  name: {
    en: { one: "Notification", many: "Notifications" },
    fr: { one: "Notification", many: "Notifications", article: NameArticle.FR_FEM },
  },

})
