import { AppRegistry } from "react-native"
import page from "./page"
import { AppOptions } from "./types/app"

export async function App (options: AppOptions) {
  //console.log("MOBILE", options)
  const firstRoute = Object.keys(options.routes)[0]
  const Page = await page(firstRoute, options)
  AppRegistry.registerComponent(options.key, () => Page)
}
