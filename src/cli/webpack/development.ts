import pathLib from "path"
import merge from "webpack-merge"
import fs from "fs"
import Webpack from "webpack"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import commonConfigGenerator from "./common"
import { webpackGetServiceWorker } from "../utils"

const projectPath = process.cwd()
const clientPath = pathLib.join(projectPath, "src", "client")

const serviceWorker = webpackGetServiceWorker(clientPath) // TODO : Remove code duplication

export default (kiwiConfig: any): any => {
  const commonConfig = commonConfigGenerator(kiwiConfig)
  return merge(commonConfig, {
    mode: "development",
    entry: () => {
      let entries: any = {
        main: [
          `webpack-dev-server/client?http://${kiwiConfig.platforms.web.devHost}:${kiwiConfig.platforms.web.devPort}`,
          "webpack/hot/only-dev-server",
          pathLib.join(clientPath, "index.ts"),
        ]
      }
      if(serviceWorker !== null) entries.sw = serviceWorker
      return entries
    },
    devServer: {
      host: kiwiConfig.platforms.web.devHost,
      port: kiwiConfig.platforms.web.devPort,
      clientLogLevel: "warning",
      historyApiFallback: true,
      writeToDisk: true,
      inline: true,
      hot: true,
    },
    devtool: "eval",
    plugins: [
      new Webpack.NamedModulesPlugin(),
      new Webpack.HotModuleReplacementPlugin(),
      new FaviconsWebpackPlugin({
        logo: pathLib.join(projectPath, "assets", "logo.png"),
        prefix: "icons/",
        persistentCache: true,
        inject: true,
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false,
        },
      }),
    ],
  })
}
