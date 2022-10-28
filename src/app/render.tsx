import { AppRegistry, ComponentProvider } from "react-native"

export default (key: string, provider: ComponentProvider) => {
  AppRegistry.registerComponent(key, provider)
}
