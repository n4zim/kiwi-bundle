import { LanguagesObject } from "./names"
import { Language } from "./names"

export type AppOptions = {
  key: string
  navigation: {
    routes: {
      [name: string]: {
        path: string
        component: Promise<any>
        title?: string | LanguagesObject<string>
      }
    }
    prefixes: string[]
  }
  i18n?: {
    languages?: Language[]
  }
  platforms?: {
    web?: {
      i18n?: {
        urlQueryParam?: string
      }
      title?: string | ((page?: string) => string)
    }
  }
}
