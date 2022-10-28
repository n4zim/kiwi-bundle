import React from "react"
import { AppRegistry, ComponentProvider } from "react-native"
import { createRoot } from "react-dom/client"

export default (key: string, provider: ComponentProvider) => {
  AppRegistry.registerComponent(key, provider)
  const Root = provider()
  createRoot(document.getElementById("root")!).render(<Root/>)
}
