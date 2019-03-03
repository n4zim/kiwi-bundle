import pathLib from "path"
import { CheckerPlugin } from "awesome-typescript-loader"
import StyleLintPlugin from "stylelint-webpack-plugin"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import OfflinePlugin from "offline-plugin"
import Webpack from "webpack"
import WebpackConfig from "./core"

const generateFaviconsWebpackPlugin = ({ path, cache }: any) => new FaviconsWebpackPlugin({
  logo: pathLib.join(path, "assets", "logo.png"),
  prefix: "/assets",
  persistentCache: cache,
  inject: true,
})

const generateOfflinePlugin = (dev: boolean) => {
  const options: any = {
    appShell: "/",
    externals: [
      "/"
    ],
    ServiceWorker: {
      cacheName: "kiwi-offline",
    },
  }

  if(dev) {
    options.excludes = [
      "**/*.hot-update.js",
      "/icons/.cache",
    ]
    options.ServiceWorker.events = true
    options.AppCache = { events: true }
  }

  return new OfflinePlugin(options)
}

const plugins = (path: string, bundlePath: string, kiwiConfig: any) => new WebpackConfig({

  common: () => [
    new HtmlWebpackPlugin({
      template: pathLib.join(bundlePath, "opt", "index.html.ejs"),
      title: kiwiConfig.project.title,
      description: kiwiConfig.project.description,
      excludeChunks: [ "sw" ],
    }),
  ],

  development: () => [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    generateFaviconsWebpackPlugin({ path, cache: true }),
    generateOfflinePlugin(true),
  ],

  production: () => [
    generateFaviconsWebpackPlugin({ path, cache: false }),
    generateOfflinePlugin(false),
  ],

})

export default plugins
