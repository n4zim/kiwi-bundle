const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WebpackCdnPlugin = require("webpack-cdn-plugin")
const merge = require("webpack-merge")
const pathLib = require("path")

const projectPath = process.cwd()

const generateWebpackConfig = config => merge(require('./config')(config), {
  mode: "production",
  entry: pathLib.join(projectPath, "src", "client", "index.ts"),
  output: {
    filename: "js/bundle.[hash].min.js",
    path: pathLib.resolve(projectPath, config.platforms.web.buildDir),
  },
  devtool: "source-map",
  plugins: [
    new FaviconsWebpackPlugin({
      logo: pathLib.resolve(projectPath, 'assets', 'logo.png'),
      prefix: 'icons/',
      persistentCache: true,
      inject: true,
    }),
    new WebpackCdnPlugin({
      modules: [
        { name: "react", var: "React", path: "umd/react.production.min.js" },
        { name: "react-dom", var: "ReactDOM", path: "umd/react-dom.production.min.js" },
        //{ name: "mobx", path: "lib/mobx.umd.min.js" },
        { name: "localforage", path: "dist/localforage.min.js" },
      ],
    }),
  ],
})

module.exports = require('./kiwi.config')(generateWebpackConfig)
