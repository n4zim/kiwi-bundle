import * as Kiwi from "../kiwi"

export const i18nLinks = {

  goTo: (name: string) => ({
    fr: `Aller sur la page "${name}"`,
    en: `Go to the "${name}" page`,
  }),

  changeLanguage: (language: Kiwi.Language) => ({
    fr: `Changer la langue en ${language === Kiwi.Language.ENGLISH ? "anglais" : "français"}`,
    en: `Change the language to ${language === Kiwi.Language.ENGLISH ? "english" : "french"}`,
  }),

}
