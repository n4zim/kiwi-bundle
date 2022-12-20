import React from "react"
import { Platform } from "react-native"
import { Language, LanguagesObject } from "./types/names"
import { Context } from "./context"
import { CURRENT_LANGUAGE } from "./language"
import { AppOptions } from "./types/app"
import { i18n } from "./i18n"
import initNavigation, { Navigation } from "./navigation"

function Page (props: {
  name: string,
  navigation: Navigation,
  getComponent: (name: string) => any,
  getTitle: (name: string) => string | LanguagesObject<string> | undefined,
  props: { [key: string]: string },
}) {
  //console.log("PAGE", props.name)
  const [language, setLanguage] = React.useState<Language>(CURRENT_LANGUAGE.get())

  const [page, setPage] = React.useState<string>(props.name)
  props.navigation.bind(newPage => setPage(newPage))

  const Component = props.getComponent(page)

  const title = props.getTitle(page)
  if(Platform.OS === "web" && typeof title !== "undefined") {
    document.title = i18n(title)
  }

  return <Context.Provider
    value={{
      language,
      page,
      setLanguage: lang => {
        CURRENT_LANGUAGE.set(lang)
        setLanguage(lang)
      },
      goTo: props.navigation.goTo,
    }}
  >
    <Component {...props.props}/>
  </Context.Provider>
}

export default async function(
  initialName: string,
  options: AppOptions,
  forcedPath?: string,
  props: { [key: string]: string } = {},
) {
  const navigation = initNavigation(initialName, options, forcedPath)

  const components: { [name: string]: any } = {}
  for(const name of Object.keys(options.routes)) {
    components[name] = (await options.routes[name].component).default
  }

  return () => <Page
    name={initialName}
    navigation={navigation}
    getComponent={name => components[name]}
    getTitle={name => options.routes[name].title}
    props={props}
  />
}
