import React from "react"
import { Language } from "./types/names"
import { Context } from "./context"
import { CURRENT_LANGUAGE } from "./local"
import { AppOptions } from "./types/app"
import { Platform } from "react-native"

function Page (props: {
  name: string,
  getComponent: (name: string) => Promise<any>,
  getPath: (name: string) => string,
}) {
  const [language, setLanguage] = React.useState<Language>(Language.ENGLISH)
  const [page, setPage] = React.useState<string>(props.name)
  const Component = React.lazy(() => props.getComponent(page))
  return <Context.Provider
    value={{
      language,
      page,
      setLanguage: lang => {
        CURRENT_LANGUAGE.set(lang)
        setLanguage(lang)
      },
      goTo: name => {
        if(Platform.OS === "web") {
          window.history.pushState({}, "", props.getPath(name))
        }
        setPage(name)
      },
    }}
  >
    <React.Suspense>
      <Component/>
    </React.Suspense>
  </Context.Provider>
}

export default function(initialName: string, options: AppOptions) {
  return () => <Page
    name={initialName}
    getComponent={name => options.navigation.routes[name].component}
    getPath={name => options.navigation.routes[name].path}
  />
}
