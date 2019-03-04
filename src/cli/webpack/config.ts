import Webpack from "webpack"
import pathLib from "path"
import fs from "fs"
import { WebpackMode } from "./core"
import configRules from "./config.rules"
import configPlugins from "./config.plugins"
import { webpackConsoleLog } from "../utils"

interface WebpackConfig extends Webpack.Configuration {
  entry: any
  output: any
  devServer?: any
}

export default (path: string, outputPath: string, kiwiConfig: any, mode: WebpackMode): WebpackConfig => {
  const bundlePath = pathLib.join(path, "node_modules", "kiwi-bundle")
  const clientPath = pathLib.join(path, "src", "client")

  // Common config
  const config: WebpackConfig = {
    mode,

    resolve: {
      extensions: [ ".ts", ".tsx", ".js" ],
      modules: [
        pathLib.join(bundlePath, "node_modules")
      ],
      alias: {
        "kiwi-bundle": bundlePath,
      },
    },

    entry: {
      main: [ pathLib.join(clientPath, "index.ts") ],
    },

    output: {
      filename: (data: any) => {
        const hasHash = data.chunk.name !== "sw"
        const isProd = mode === WebpackMode.PRODUCTION
        return `js/[name]${hasHash ? `.[${isProd ? "contenthash" : "hash"}]` : ""}${isProd ? ".min" : ""}.js`
      },
      chunkFilename: `js/[name].[contenthash]${mode === WebpackMode.PRODUCTION ? ".min" : ""}.js`,
      path: outputPath,
    },

    module: {
      rules: configRules.generate(mode),
    },

    plugins: configPlugins(path, bundlePath, kiwiConfig).generate(mode),

    performance: {
      hints: false,
    },
  }

  // Service Worker
  const serviceWorkerPath = pathLib.join(clientPath, "serviceWorker", "index.ts")
  const serviceWorkerExists = fs.existsSync(serviceWorkerPath)
  if(serviceWorkerExists) config.entry.sw = serviceWorkerPath
  webpackConsoleLog(serviceWorkerExists ? "Service worker detected" : "No service worker found")

  // Mode options
  if(mode === WebpackMode.DEVELOPMENT) {

    // ENTRY
    config.entry.main.unshift(
      "webpack-dev-server/client"
        + `?http://${kiwiConfig.platforms.web.devHost}:${kiwiConfig.platforms.web.devPort}`
    )
    config.entry.main.unshift("webpack/hot/only-dev-server")

    // DEV TOOL
    config.devtool = "eval"

    // DEV SERVER
    config.devServer = {
      host: kiwiConfig.platforms.web.devHost,
      port: kiwiConfig.platforms.web.devPort,
      clientLogLevel: "warning",
      historyApiFallback: true,
      inline: true,
      hot: true,
    }

  } else  if(mode === WebpackMode.PRODUCTION) {

    // DEV TOOL
    config.devtool = "source-map"

    // OPTIMIZATION
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
          }
        }
      }
    }
  }

  return config
}
