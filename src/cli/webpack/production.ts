import pathLib from "path"
import merge from "webpack-merge"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import { webpackGetServiceWorker } from "../utils"
import commonConfig from "./common"

const projectPath = process.cwd()
const clientPath = pathLib.join(projectPath, "src", "client")

const serviceWorker = webpackGetServiceWorker(clientPath) // TODO : Remove code duplication

export default (kiwiConfig: any): any => merge(commonConfig(kiwiConfig), {
  entry: () => {
    let entries: any = { main: pathLib.join(clientPath, "index.ts") }
    if(serviceWorker !== null) entries.sw = serviceWorker
    return entries
  },
  mode: "production",
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "initial",
    },
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: pathLib.resolve(projectPath, "assets", "logo.png"),
      prefix: "icons/",
      persistentCache: true,
      inject: true,
    }),
  ],
})
