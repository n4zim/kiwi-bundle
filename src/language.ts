import { Platform, NativeModules } from "react-native"
import { Language } from "./types/names"

export const CURRENT_LANGUAGE = (() => {
  let locale: Language = (() => {
    switch (Platform.OS) {
      case "web":
        if (navigator.language) {
          return navigator.language.slice(0, 2)
        }
        if ((navigator as any).userLanguage) {
          return (navigator as any).userLanguage.slice(0, 2)
        }
        break
      case "android":
        if (NativeModules.I18nManager.localeIdentifier) {
          return NativeModules.I18nManager.localeIdentifier.slice(0, 2)
        }
        break
      case "ios":
        if (NativeModules.SettingsManager.settings.AppleLocale) {
          return NativeModules.SettingsManager.settings.AppleLocale.slice(0, 2)
        }
        if (NativeModules.SettingsManager.settings.AppleLanguages[0]) {
          return NativeModules.SettingsManager.settings.AppleLanguages[0].slice(0, 2)
        }
    }
    return Language.ENGLISH
  })()
  if (Object.values(Language).indexOf(locale) === -1) {
    locale = Language.ENGLISH
  }
  return {
    get: () => locale,
    set: (v: Language) => {
      locale = v
    },
  }
})()
