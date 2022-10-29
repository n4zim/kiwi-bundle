import { BackHandler, Platform } from "react-native"
import { AppOptions } from "./types/app"

export type Navigation = {
  bind: (updateFn: (page: string) => void) => void
  goTo: (page: string) => void
}

export default function(initialName: string, options: AppOptions): Navigation {
  let update: (page: string) => void = () => {}
  const history: string[] = [initialName]
  if(Platform.OS === "web") {
    window.history.replaceState(
      { page: initialName },
      "",
      options.routes[initialName].path,
    )
    window.onpopstate = event => {
      if(event.state && event.state.page) {
        update(event.state.page)
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
    goTo: page => {
      if(Platform.OS === "web") {
        window.history.pushState(
          { page },
          "",
          options.routes[page].path,
        )
      } else {
        history.push(page)
      }
      update(page)
    },
  }
}