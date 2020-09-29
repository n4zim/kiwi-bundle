import { i18nData } from "../core/Formats/Models/i18n"
import { NameArticle } from "../core/Context/Fields/NameArticle"

export const i18nUsers = i18nData({

  name: {
    en: { one: "User", many: "Users" },
    fr: { one: "Utilisateur", many: "Utilisateurs", article: NameArticle.FR_MAS_CNT },
  },

  email: {
    en: { one: "E-mail address", many: "E-mail addresses" },
    fr: { one: "Adresse e-mail", many: "Adresses e-mail", article: NameArticle.FR_FEM_CNT },
  },

  password: {
    en: { one: "Password", many: "Passwords" },
    fr: { one: "Mot de passe", many: "Mots de passe", article: NameArticle.FR_MAS },
  },

  register: {
    en: "Sign up",
    fr: "Inscription",
  },

  login: {
    en: "Sign in",
    fr: "Connexion",
  },

})
