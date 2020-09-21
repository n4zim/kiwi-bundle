import { i18nData } from "../core/Formats/Models/i18n"

export const i18nValidator = i18nData({

  schemaMustBeAnObject: {
    en: "Schema must be an object",
    fr: "Le Schema doit être un objet"
  },

  typeNotFound: (type: string): i18nData => ({
    en: [ "Type \"", type, "\" does not exist" ],
    fr: [ "Le type \"", type, "\" n'existe pas" ],
  }),

  dataMustBeAString: {
    en: "Data must be a string",
    fr: "La donnée doit être une chaîne de caractères",
  },

  dataMustBeANumber: {
    en: "Data must be a number",
    fr: "La donnée doit être un nombre"
  },

  dataMustBeAnObject: {
    en: "Data must be an object",
    fr: "La donnée doit être un objet"
  },

  dataMustBeBoolean: {
    en: "Data must be boolean",
    fr: "La donnée doit être un booléen"
  },

  noDataFoundForKey: (key: string): i18nData => ({
    en: [ "No data found for key \"", key, "\"" ],
    fr: [ "Pas de donnée trouvée pour la clé \"", key, "\"" ],
  }),

  unexpectedKey: (key: string): i18nData => ({
    en: [ "Unexpected key \"", key, "\"" ],
    fr: [ "Clé \"", key, "\" non attendue" ],
  }),

  keysCountMismatch: (current: number, expected: number): i18nData => ({
    en: [
      "The object contains ", current, " key", current === 1 ? "" : "s",
      " while ", expected, " ", expected === 1 ? "was" : "were", " expected",
    ],
    fr: [
      "L'objet contiens ", current, " clé", current === 1 ? "" : "s",
      " alors que ", expected, " ", expected === 1 ? "était" : "étaient",
      " attendu", expected === 1 ? "" : "s",
    ],
  }),

  dataShouldBe: (expected: string): i18nData => ({
    en: [ "Data expected to be \"", expected, "\"" ],
    fr: [ "La donnée devait être au format \"", expected, "\"" ],
  }),

})
