import { LanguagesObject } from "./names"

export type AppOptions = {
  key: string
  routes: {
    [name: string]: {
      path: string
      component: Promise<any>
      title?: string | LanguagesObject<string>
    }
  }
}
