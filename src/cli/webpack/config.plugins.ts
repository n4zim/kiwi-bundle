import pathLib from "path"
import { CheckerPlugin } from "awesome-typescript-loader"
import StyleLintPlugin from "stylelint-webpack-plugin"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
// import OfflinePlugin from "offline-plugin"
import Webpack from "webpack"
import WebpackConfig from "./core"

import ManifestPlugin from "webpack-pwa-manifest"

const generateFaviconsWebpackPlugin = ({ path, dev }: any) => new FaviconsWebpackPlugin({
  logo: pathLib.join(path, "assets", "logo.png"),
  prefix: "assets/",
  persistentCache: dev,
  inject: true,
  icons: {
    android: !dev,
    appleIcon: !dev,
    appleStartup: !dev,
    coast: !dev,
    favicons: true,
    firefox: !dev,
    opengraph: !dev,
    twitter: !dev,
    yandex: !dev,
    windows: !dev,
  },
})

/*const generateOfflinePlugin = (dev: boolean) => {
  const options: any = {
    safeToUseOptionalCaches: true,
    appShell: "/",
    publicPath: "/",
    externals: [ "/" ],
    caches: {
      main: [
        "index.html",
        "js/*.js",
        "assets/favicon.ico",
        "assets/manifest.json",
      ],
      additional: [
        "assets/manifest.webapp",
        "assets/images/*",
      ],
      optional: [
        ":rest:",
      ]
    },
    ServiceWorker: {
      events: true,
      output: `js/offline${dev ? "" : ".min"}.js`,
    },
    AppCache: {
      events: true,
    }
  }

  if(dev) {
    options.excludes = [
      "assets/.cache",
      */ // "**/*.hot-update.js",
      /*
    ]
  }

  return new OfflinePlugin(options)
}*/

const plugins = (path: string, bundlePath: string, kiwiConfig: any) => new WebpackConfig({

  common: () => [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      template: pathLib.join(bundlePath, "opt", "index.html.ejs"),
      title: kiwiConfig.project.title,
      description: kiwiConfig.project.description,
      excludeChunks: [ "sw" ],
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],

  development: () => [
    new Webpack.HotModuleReplacementPlugin(),
    generateFaviconsWebpackPlugin({ path, dev: true }),
    // generateOfflinePlugin(true),
    new ManifestPlugin({
      name: kiwiConfig.project.title,
      short_name: kiwiConfig.project.title,
      description: kiwiConfig.project.description,
      orientation: "portrait",
      display: "standalone",
      start_url: "/",
      inject: true,
    }),
  ],

  production: () => [
    generateFaviconsWebpackPlugin({ path, dev: false }),
    // generateOfflinePlugin(false),
  ],

})

export default plugins
