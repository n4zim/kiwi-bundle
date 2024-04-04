import React from "react"
import { Language } from "./types/names"

export const Context = React.createContext<ContextType>({
  language: Language.ENGLISH,
  setLanguage: () => { },
  page: "",
  goTo: () => { },
  web: {
    updateTitle: () => { },
    updateParameter: () => { },
  },
})

export type ContextType = {
  language: Language
  setLanguage: (language: Language) => void
  page: string
  goTo: (to: string) => void
  web: {
    updateTitle: (name: string) => void
    updateParameter: (name: string, value: string) => void
  },
}
