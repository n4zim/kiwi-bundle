import { readConfig } from "./config"
import { webpackConsoleLog } from "./utils"
import Webpack from "webpack"
import generateWebpackConfig from "./webpack/production"

export default (path: string) => {
  readConfig(path).then((kiwiConfig: any) => {

    // TODO : Clear dist dir

    webpackConsoleLog("Webpack is currently starting...")

    Webpack(generateWebpackConfig(kiwiConfig), (err, stats) => {
      if(err) {
        console.error("Webpack error :", err)
      } else {
        console.log(stats.toString({ colors: true }))
      }
    })

  })
}
