import { LanguagesObject } from "./names"

export type AppOptionsRoute = {
  path: string
  component: Promise<any>
  title?: string | LanguagesObject<string>
} | {
  path: string
  redirect: string
}

export type AppOptions = {
  key: string
  routes: { [name: string]: AppOptionsRoute }
  web?: {
    title?: (page: string | LanguagesObject<string>) => string | LanguagesObject<string>
  }
}
