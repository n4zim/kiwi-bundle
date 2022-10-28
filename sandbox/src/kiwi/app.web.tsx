import React from "react"
import { createRoot } from "react-dom/client"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  console.log("WEB", options)
  const firstRoute = Object.keys(options.navigation.routes)[0]
  const Component = await options.navigation.routes[firstRoute].component
  createRoot(document.getElementById("root")!).render(<Component.default/>)
}
