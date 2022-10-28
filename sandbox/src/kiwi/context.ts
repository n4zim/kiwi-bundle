import React from "react"
import { Language } from "./types/names"

export const Context = React.createContext<{
  language: Language
  setLanguage: (language: Language) => void
  name: string
  setName: (name: string) => void
    }>({
      language: Language.ENGLISH,
      setLanguage: () => {},
      name: "",
      setName: () => {},
    })
