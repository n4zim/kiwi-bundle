import { LanguagesObject } from "./names"

export type AppOptionsRoute = {
  path: string
  component: Promise<any>
  redirect?: string
  title?: string | LanguagesObject<string>
  init?: () => string | undefined
}

export type AppOptions = {
  key: string
  routes: { [name: string]: AppOptionsRoute }
  web?: {
    title?: (page: string | LanguagesObject<string>) => string | LanguagesObject<string>
  }
}
