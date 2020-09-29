import { i18nData } from "../core/Formats/Models/i18n"

export type i18nAPI_Create = { name: string }

export const i18nAPI = i18nData({

  name: {
    en: { one: "Application programming interface", short: "API" },
    fr: { one: "Interface de programmation", short: "API" },
  },

  create: (params: i18nAPI_Create) => ({
    en: { one: [ "Create a new ", params.name ], many: [ "Create multiple ", params.name ] },
    fr: { one: [ "Créer un nouveau ", params.name ], many: [ "Créer plusieurs ", params.name ] },
  }),

})
