import React from "react"
import { Platform, View } from "react-native"
import { Language, LanguagesObject } from "./types/names"
import { Context, ContextType } from "./context"
import { CURRENT_LANGUAGE } from "./language"
import { AppOptions, AppOptionsRoute } from "./types/app"
import { i18n } from "./i18n"
import initNavigation, { Navigation } from "./navigation"

function Page(props: {
  name: string,
  navigation: Navigation,
  getComponent: (name: string) => any,
  getTitle: (name: string) => string | LanguagesObject<string> | undefined,
  initialProps: { [key: string]: string },
  handleProps: (props: { [key: string]: string }) => { [key: string]: string },
  init?: (name: string) => AppOptionsRoute["init"],
}) {
  const [language, setLanguage] = React.useState<Language>(CURRENT_LANGUAGE.get())
  const [page, setPage] = React.useState<{ name: string, props: any, loaded?: boolean }>({
    name: props.name,
    props: props.initialProps,
  })

  props.navigation.bind((newPage, newProps) => setPage({
    name: newPage,
    props: newProps,
    loaded: newPage === page.name,
  }))

  React.useEffect(() => {
    //console.log("CHECK INIT", page.name)
    if(!page.loaded) {
      if(typeof props.init !== "undefined") {
        const init = props.init!(page.name)
        if(typeof init !== "undefined") {
          init().then(result => {
            //console.log("INIT", result)
            if(typeof result === "string") {
              props.navigation.goTo(result)
            } else {
              setPage({ ...page, loaded: true })
            }
          })
          return
        }
      }
      setPage({ ...page, loaded: true })
    }
  }, [page.name])

  console.log("PAGE", page, { language })

  const Component = props.getComponent(page.name)

  if(typeof props.init === "undefined" && typeof Component === "string") {
    props.navigation.goTo(Component)
    return <View/>
  }

  if(!page.loaded) {
    //console.log("LOCKED")
    return <View/>
  }

  //console.log("DISPLAY", page.name, page.props)

  const title = props.getTitle(page.name)
  if(Platform.OS === "web" && typeof title !== "undefined") {
    document.title = i18n(title)
  }

  const context: ContextType = {
    language,
    page: page.name,
    setLanguage: lang => {
      CURRENT_LANGUAGE.set(lang)
      setLanguage(lang)
    },
    goTo: props.navigation.goTo,
    web: {
      updateTitle: title => {
        if(Platform.OS === "web" && typeof title !== "undefined") {
          document.title = title
        }
      },
      updateParameter(name, value) {
        const url = new URL(window.location.href)
        if(value.length === 0) {
          url.searchParams.delete(name)
        } else {
          url.searchParams.set(name, value)
        }
        window.history.replaceState(
          window.history.state,
          "",
          url.pathname + url.search,
        )
      },
    },
  }

  return <Context.Provider value={context}>
    <Component {...props.handleProps(page.props)}/>
  </Context.Provider>
}

export default async function(
  initialName: string,
  options: AppOptions,
  forcedPath?: string,
  props: { [key: string]: string } = {},
) {
  //console.log("MUST RENDER", initialName, options, forcedPath, props)

  const navigation = initNavigation(initialName, options, forcedPath, props)

  const components: { [name: string]: any } = {}
  for(const name of Object.keys(options.routes)) {
    const route = options.routes[name]
    if(typeof route.component !== "undefined") {
      components[name] = (await route.component).default
    } else {
      components[name] = route.redirect
    }
  }

  return () => <Page
    name={initialName}
    navigation={navigation}
    getComponent={name => components[name]}
    init={name => options.routes[name]?.init}
    getTitle={name => {
      let title = options.routes[name]?.title
      if(typeof options?.web?.title !== "undefined") {
        title = options.web.title(title as string)
      }
      return title
    }}
    initialProps={props}
    handleProps={props => {
      if(options?.wrappers?.props) return options.wrappers.props(props)
      return props
    }}
  />
}
