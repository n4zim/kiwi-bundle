import { BackHandler, Platform } from "react-native"
import { AppOptions } from "./types/app"

export type Navigation = {
  bind: (updateFn: (page: string, props?: { [key: string]: string }) => void) => void
  goTo: (page: string, props?: { [key: string]: string }) => void
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
    let path = (
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
    goTo: (page, props) => {
      if(Platform.OS === "web") {
        let prefix = ""
        if(props) {
          prefix = "?"
          for(const key in props) prefix += `${key}=${props[key]}&`
          prefix = prefix.slice(0, -1)
        }
        window.history.pushState(
          { page, props },
          "",
          options.routes[page].path + prefix + window.location.hash,
        )
      } else {
        history.push(page)
      }
      //console.log("GO TO", page, props)
      update(page, props)
    },
  }
}
