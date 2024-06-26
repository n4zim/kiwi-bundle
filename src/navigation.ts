import { BackHandler, Platform } from "react-native"
import { AppOptions } from "./types/app"

export type Navigation = {
  bind: (updateFn: (page: string, props?: { [key: string]: string }) => void) => void
  goTo: (page: string) => void
}

export default function (
  initialName: string,
  options: AppOptions,
  forcedPath?: string,
  props?: { [key: string]: string },
): Navigation {
  let update: (page: string, props?: { [key: string]: string }) => void = () => { }
  const history: string[] = [initialName]
  if(Platform.OS === "web") {
    const path = (
      typeof forcedPath !== "undefined"
        ? forcedPath
        : options.routes[initialName].path
    ) + window.location.hash
    window.history.replaceState({ page: initialName, props }, "", path)
    window.onpopstate = (event: any) => {
      if(event.state && event.state.page) {
        update(event.state.page, event.state.props)
      }
    }
  } else {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if(history.length > 1) {
        history.pop()
        update(history[history.length - 1])
        return true
      }
      return false
    })
  }
  return {
    bind: updateFn => {
      update = updateFn
    },
    goTo: to => {
      const [page, prefix] = to.split("?")
      const props: { [key: string]: string } = {}
      if(prefix) {
        const values = prefix.split("&")
        for(const value of values) {
          const [key, val] = value.split("=")
          props[key] = val
        }
      }
      if(Platform.OS === "web") {
        const path = options.routes[page].path
          + (prefix ? ("?" + prefix) : "")
          + window.location.hash
        //console.log("GO TO", page, props, path)
        window.history.pushState({ page, props }, "", path)
      } else {
        history.push(page)
      }
      //console.log("GO TO", page, props)
      update(page, props)
    },
  }
}
