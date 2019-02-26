import pathLib from "path"
import merge from "webpack-merge"
import Webpack from "webpack"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import commonConfig from "./common"

const projectPath = process.cwd()

export default (kiwiConfig: any): any => merge(commonConfig(kiwiConfig), {
  mode: "development",
  entry: [
    `webpack-dev-server/client?http://${kiwiConfig.platforms.web.devHost}:${kiwiConfig.platforms.web.devPort}`,
    "webpack/hot/only-dev-server",
    pathLib.join(projectPath, "src", "client", "index.tsx"),
  ],
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
