const fs = require('fs')
const pathLib = require('path')
const yamlParse = require("yamljs").parse
const merge = require('webpack-merge')
const webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const projectPath = process.cwd()

const generateWebpackConfig = (port) => merge(require('./config'), {
  mode: 'development',
  entry: [
    //'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}`,
    //'webpack/hot/only-dev-server',
    pathLib.join(projectPath, "src", "client.tsx"),
  ],
  devServer: {
    port,
    historyApiFallback: true,
    //hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FaviconsWebpackPlugin({
      logo: pathLib.join(projectPath, "assets", "logo.png"),
      prefix: 'icons/',
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

module.exports = new Promise(resolve => {
  fs.readFile(pathLib.join(projectPath, "kiwi.yml"), (error, data) => {
    if(error) {
      resolve(null)
    } else {
      const config = yamlParse(data.toString('utf-8'))
      resolve(generateWebpackConfig(config.platforms.web.dev.port))
    }
  })
})
