import pathLib from "path"
import { CheckerPlugin } from "awesome-typescript-loader"
import StyleLintPlugin from "stylelint-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import AppManifestWebpackPlugin from "app-manifest-webpack-plugin"
import Webpack from "webpack"
import WebpackConfig from "./core"

const generateIconsAndManifest = (kiwiConfig: any, path: string, cacheEnabled: boolean) => {
  return new AppManifestWebpackPlugin({
    logo: pathLib.join(path, "assets", "logo.png"),
    prefix: "/static/icons/",
    output: "static/icons/",
    persistentCache: cacheEnabled,
    inject: true,
    config: {
      appName: kiwiConfig.project.title,
      appDescription: kiwiConfig.project.description,
      lang: kiwiConfig.project.lang,
      developerName: kiwiConfig.project.author,
      display: "standalone",
      orientation: "portrait",
      start_url: "/?homescreen=1",
      icons: {
        favicons: true,
        android: true,
        appleIcon: true,
        appleStartup: true,
        firefox: true,
        twitter: true,
        windows: true,
        yandex: false,
        coast: false,
        opengraph: false,
      },
    }
  })
}

const plugins = (path: string, bundlePath: string, kiwiConfig: any) => new WebpackConfig({

  common: () => [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      template: pathLib.join(bundlePath, "opt", "index.html.ejs"),
      lang: kiwiConfig.project.lang,
      title: kiwiConfig.project.title,
      description: kiwiConfig.project.description,
      generatekiwiConfig: (webpack: any) => {
        const config: any = {}
        if(Array.isArray(webpack.assetsByChunkName.sw)) {
          config.sw = webpack.assetsByChunkName.sw[0]
        } else {
          config.sw = webpack.assetsByChunkName.sw
        }
        return `<script>window.kiwi=${JSON.stringify(config)}</script>`
      },
      excludeChunks: [ "sw" ],
      minify: {
        preserveLineBreaks: true,
        collapseWhitespace: true,
      },
    }),
  ],

  development: () => [
    new Webpack.HotModuleReplacementPlugin(),
    generateIconsAndManifest(kiwiConfig, path, true),
  ],

  production: () => [
    generateIconsAndManifest(kiwiConfig, path, false),
  ],

})

export default plugins
