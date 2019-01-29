const merge = require('webpack-merge')
const webpack = require('webpack')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const port = process.env.DEV_PORT
if(typeof port === "undefined") {
  console.log("\n\x1b[31m/!\\ Missing env DEV_PORT - no dev server port\x1b[0m\n")
  module.exports = null
} else {
  module.exports = merge(require('./config'), {
    mode: 'development',
    entry: [
//      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
//      'webpack/hot/only-dev-server',
      './src/app.tsx',
    ],
    devServer: {
      port,
      //hot: true
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
//      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new FaviconsWebpackPlugin({
        logo: './assets/logo.png',
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
          windows: false
        }
      }),
    ],
  })
}
