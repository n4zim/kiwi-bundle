import { AppRegistry } from "react-native"
import page from "./page"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  console.log("MOBILE", options)
  const firstRoute = Object.keys(options.navigation.routes)[0]
  const Page = page(firstRoute, options.navigation.routes[firstRoute].component)
  AppRegistry.registerComponent(options.key, () => Page)
}
