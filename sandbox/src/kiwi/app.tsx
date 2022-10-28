import { AppRegistry } from "react-native"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  console.log("MOBILE", options)
  const firstRoute = Object.keys(options.navigation.routes)[0]
  const component = await options.navigation.routes[firstRoute].component
  AppRegistry.registerComponent(options.key, () => component.default)
}
