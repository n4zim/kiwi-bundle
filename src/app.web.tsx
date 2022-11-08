import React from "react"
import { createRoot } from "react-dom/client"
import page from "./page"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  //console.log("WEB", options)
  let firstRoute: string | undefined, forcedPath: string | undefined
  const keys = Object.keys(options.routes)

  const wildcards = keys.reduce<{ [path: string]: string }>((acc, key) => {
    if(options.routes[key].path.startsWith("*.")) {
      const split = options.routes[key].path.split("*.")
      const count = split.length - 1
      acc[count] = key
      forcedPath = split[count]
    }
    return acc
  }, {})

  if(Object.keys(wildcards).length > 0) {
    const hostname = window.location.hostname
    const parts = hostname.split(".").slice(0, -2).length
    if(typeof wildcards[parts] !== "undefined") {
      firstRoute = wildcards[parts]
    }
  }

  if(!firstRoute) {
    for(const key of keys) {
      if(options.routes[key].path === window.location.pathname) {
        firstRoute = key
        break
      }
    }
  }

  if(!firstRoute) {
    firstRoute = keys[0]
  }

  const Page = await page(firstRoute, options, forcedPath)
  createRoot(document.getElementById("root")!).render(<Page/>)
}
