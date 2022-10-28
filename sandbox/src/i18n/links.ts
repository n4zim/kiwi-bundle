import * as Kiwi from "kiwi-bundle"

export const i18nLinks = {

  goTo: (name: string) => ({
    fr: `Aller sur la page "${name}"`,
    en: `Go to the "${name}" page`,
  }),

  changeLanguage: (language: Kiwi.Language) => ({
    fr: `Changer la langue en "${language}"`,
    en: `Change the language to "${language}"`,
  }),

}
