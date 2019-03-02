import WebpackDevServer from "webpack-dev-server"
import Webpack from "webpack"
import { readConfig } from "./config"
import generateWebpackConfig from "./webpack/development"
import { webpackConsoleLog } from "./utils"
import chalk from "chalk"

export default (path: string) => {
  readConfig(path).then((kiwiConfig: any) => {
    const webpackConfig = generateWebpackConfig(kiwiConfig)
    const server = new WebpackDevServer(Webpack(webpackConfig), webpackConfig.devServer)
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, () => {
      webpackConsoleLog(
        `Development server will ba available at ` +
        chalk.bold(`http://${webpackConfig.devServer.host}:${webpackConfig.devServer.port}`)
      )
    })
  })
}
