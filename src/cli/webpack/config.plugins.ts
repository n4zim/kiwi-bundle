import pathLib from "path"
import { CheckerPlugin } from "awesome-typescript-loader"
import StyleLintPlugin from "stylelint-webpack-plugin"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import ManifestPlugin from "webpack-pwa-manifest"
import Webpack from "webpack"
import WebpackConfig from "./core"

const generateFaviconsPlugin = ({ path, dev }: any) => new FaviconsWebpackPlugin({
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

const generateManifestPlugin = (kiwiConfig: any) => new ManifestPlugin({
  name: kiwiConfig.project.title,
  short_name: kiwiConfig.project.title,
  description: kiwiConfig.project.description,
  orientation: "portrait",
  display: "standalone",
  start_url: "/",
  inject: true,
})

const plugins = (path: string, bundlePath: string, kiwiConfig: any) => new WebpackConfig({

  common: () => [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      template: pathLib.join(bundlePath, "opt", "index.html.ejs"),
      title: kiwiConfig.project.title,
      description: kiwiConfig.project.description,
      getServiceWorkerPath: (webpack: any) => {
        return webpack.chunks.find((c: any) => c.id === "sw").files[0]
      },
      excludeChunks: [ "sw" ],
      minify: {
        collapseWhitespace: true,
        minifyJS: true,
      },
    }),
  ],

  development: () => [
    new Webpack.HotModuleReplacementPlugin(),
    generateFaviconsPlugin({ path, dev: true }),
    generateManifestPlugin(kiwiConfig),
  ],

  production: () => [
    generateFaviconsPlugin({ path, dev: false }),
    generateManifestPlugin(kiwiConfig),
  ],

})

export default plugins
