import React from "react"
import { createRoot } from "react-dom/client"
import page from "./page"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  console.log("WEB", options)
  const firstRoute = Object.keys(options.navigation.routes)[0]
  const Page = page(firstRoute, options.navigation.routes[firstRoute].component)
  createRoot(document.getElementById("root")!).render(<Page/>)
}
