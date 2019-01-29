const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackCdnPlugin = require("webpack-cdn-plugin")

const dir = process.env.BUILD_DIR
if(typeof dir === "undefined") {
  console.log("\n\x1b[31m/!\\ Missing env BUILD_DIR - no destination directory\x1b[0m\n")
  module.exports = null
} else {
  const merge = require("webpack-merge")
  const { resolve } = require("path")

  module.exports = merge(require("./webpack.config"), {
    mode: "production",
    entry: "./index.tsx",
    output: {
      filename: "js/bundle.[hash].min.js",
      path: resolve(__dirname, "..", dir),
    },
    devtool: "source-map",
    plugins: [
      new FaviconsWebpackPlugin({
        logo: './assets/logo.png',
        prefix: 'icons/',
        persistentCache: true,
        inject: true,
      }),
      new WebpackCdnPlugin({
        modules: [
          { name: "react", var: "React", path: "umd/react.production.min.js" },
          { name: "react-dom", var: "ReactDOM", path: "umd/react-dom.production.min.js" },
          { name: "mobx", path: "lib/mobx.umd.min.js" },
          { name: "localforage", path: "dist/localforage.min.js" },
        ],
      }),
    ],
  })
}
