import { readConfig } from "./config"
import pathLib from "path"
import rimraf from "rimraf"
import { webpackConsoleLog } from "./utils"
import Webpack from "webpack"
import generateWebpackConfig from "./webpack/config"
import { WebpackMode } from "./webpack/core"

export default (path: string) => {
  readConfig(path).then((kiwiConfig: any) => {
    const outputPath = pathLib.resolve(path, kiwiConfig.platforms.web.buildDir)
    rimraf(outputPath, (error) => {
      if(error) {
        console.error(error)
      } else {
        webpackConsoleLog("Webpack is currently starting...")
        Webpack(generateWebpackConfig(path, outputPath, kiwiConfig, WebpackMode.DEVELOPMENT), (err, stats) => {
          if(err) {
            console.error("Webpack error :", err)
          } else {
            console.log(stats.toString({ colors: true }))
          }
        })
      }
    })
  })
}
