import React from "react"
import { createRoot } from "react-dom/client"
import page from "./page"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  console.log("WEB", options)
  let firstRoute
  const keys = Object.keys(options.navigation.routes)
  for(const key of keys) {
    const route = options.navigation.routes[key]
    if(route.path === window.location.pathname) {
      firstRoute = key
      break
    }
  }
  if(!firstRoute) {
    firstRoute = keys[0]
  }
  const Page = page(firstRoute, options)
  createRoot(document.getElementById("root")!).render(<Page/>)
}
