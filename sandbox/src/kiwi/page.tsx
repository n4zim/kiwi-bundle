import React from "react"
import { Language } from "./types/names"
import { Context } from "./context"
import { CURRENT_LANGUAGE } from "./local"

function Wrapper (props: { name: string, children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>(Language.ENGLISH)
  const [name, setName] = React.useState<string>(props.name)
  return <Context.Provider value={{
    language,
    setLanguage: lang => {
      CURRENT_LANGUAGE.set(lang)
      setLanguage(lang)
    },
    name,
    setName,
  }}>
    {props.children}
  </Context.Provider>
}

export default function(name: string, component: Promise<any>) {
  const Component = React.lazy(() => component)
  return () => <React.Suspense>
    <Wrapper name={name}>
      <Component/>
    </Wrapper>
  </React.Suspense>
}
