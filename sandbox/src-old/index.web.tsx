import { AppRegistry } from "react-native"
import { createRoot } from "react-dom/client"
import App from "./App"

AppRegistry.registerComponent("kiwibundle", () => App)

const root = createRoot(document.getElementById("root")!)
root.render(<App/>)
