import pathLib from "path"
import merge from "webpack-merge"
import Webpack from "webpack"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import commonConfig from "./common"

const projectPath = process.cwd()

export default (kiwiConfig: any): any => merge(commonConfig(kiwiConfig), {
  mode: "development",
  devServer: {
    host: kiwiConfig.platforms.web.devHost,
    port: kiwiConfig.platforms.web.devPort,
    contentBase: pathLib.join(projectPath, kiwiConfig.platforms.web.buildDir),
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    inline: true,
  },
  devtool: "cheap-module-eval-source-map",
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
