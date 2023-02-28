import React from "react"
import { Language } from "./types/names"

export const Context = React.createContext<{
  language: Language
  setLanguage: (language: Language) => void
  page: string
  goTo: (page: string, params?: { [key: string]: string }) => void
  web: {
    updateTitle: (name: string) => void
    updateParameter: (name: string, value: string) => void
  },
}>({
  language: Language.ENGLISH,
  setLanguage: () => { },
  page: "",
  goTo: () => { },
  web: {
    updateTitle: () => { },
    updateParameter: () => { },
  },
})
