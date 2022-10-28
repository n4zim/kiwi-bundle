import React from "react"
import { Language } from "./types/names"

export const Context = React.createContext<{
  language: Language
  setLanguage: (language: Language) => void
  page: string
  goTo: (page: string) => void
    }>({
      language: Language.ENGLISH,
      setLanguage: () => {},
      page: "",
      goTo: () => {},
    })
