import React from "react"
import { createRoot } from "react-dom/client"
import page from "./page"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  //console.log("WEB", options)
  const keys = Object.keys(options.routes)

  const domains: string[] = [] // TODO: fix and enable domains

  const routes = keys.reduce<{
    [domainCount: string]: {
      [pathCount: string]: {
        route: string
        domains: string[]
        paths: string[]
      }[]
    }
  }>((acc, route) => {
    const split = options.routes[route].path.split("/")
    //const domains: string[] = split[0].length === 0 ? [] : split[0].split(".")
    const paths = split.length === 2 && split[1].length === 0 ? [] : split.slice(1)
    if(!acc[domains.length]) acc[domains.length] = {}
    if(!acc[domains.length][paths.length]) acc[domains.length][paths.length] = []
    acc[domains.length][paths.length].push({ domains, paths, route })
    return acc
  }, {})

  let firstRoute: string | undefined, overridePath: string | undefined
  const props: { [key: string]: string } = {}

  //const domains = window.location.hostname.split(".").slice(0, -2)

  //if(routes[domains.length]) {
    const paths = window.location.pathname === "/"
      ? []
      : window.location.pathname.slice(1).split("/")

    const pathsRoutes = routes[domains.length][paths.length]
    if(pathsRoutes) {
      new URLSearchParams(window.location.search).forEach((value, key) => {
        props[key] = value
      })

      for(const path of pathsRoutes) {
        if(
          path.domains.every((domain, i) => {
            return domain === domains[i] || domain.charAt(0) === "{"
          }) && path.paths.every((path, i) => {
            return path === paths[i] || path.charAt(0) === "{"
          })
        ) {
          firstRoute = path.route
          path.domains.forEach((domain, i) => {
            if(domain.charAt(0) === "{") {
              props[domain.slice(1, -1)] = domains[i]
            }
          })
          path.paths.forEach((path, i) => {
            if(path.charAt(0) === "{") {
              props[path.slice(1, -1)] = paths[i]
            }
          })
          overridePath = document.location.pathname + window.location.search
          break
        }
      }
    }
  //}

  if(!firstRoute) {
    firstRoute = keys[0]
  }

  const Page = await page(firstRoute, options, overridePath, props)
  createRoot(document.getElementById("root")!).render(<Page/>)
}
