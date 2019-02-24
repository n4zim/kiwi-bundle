import { render } from "react-dom"
import Logger from "./Logger"
import Router from "./routes/Router"

export default class Client {
  constructor(router: Router) {
    const renderDiv = document.getElementById("render")

    // render(<Root>{router.render()}</Root>, renderDiv)
    render(router.render(), renderDiv)

    Logger.logInfo(this, "Rendered")
  }
}
