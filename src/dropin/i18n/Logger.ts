import { i18nData } from "../core/Formats/Models/i18n"
import { Environment } from "../core/Context/Fields/Environment"
import { i18nEnvironments } from "./Environments"

export const i18nLogger = i18nData({

  modeAlreadyEnabled: (mode: Environment): i18nData => ({
    en: [
      "l4r is already in ",
      { $: { type: "i18n", name: i18nEnvironments[mode] } },
      " mode",
    ],
    fr: [
      "l4r est déjà en mode de ",
      { $: { type: "i18n", name: i18nEnvironments[mode] } },
    ],
  }),

  modeChanged: (mode: Environment): i18nData => ({
    en: [
      "l4r is now on ",
      { $: { type: "i18n", name: i18nEnvironments[mode] } },
      " mode",
    ],
    fr: [
      "l4r est maintenant en mode de ",
      { $: { type: "i18n", name: i18nEnvironments[mode] } },
    ],
  }),

})
