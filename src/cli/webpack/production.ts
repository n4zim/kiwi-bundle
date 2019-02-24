import pathLib from "path"
import merge from "webpack-merge"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import commonConfig from "./common"

const projectPath = process.cwd()

export default (kiwiConfig: any): any => merge(commonConfig(kiwiConfig), {
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
