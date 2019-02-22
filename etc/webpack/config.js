const pathLib = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const projectPath = process.cwd()
const bundlePath = pathLib.join(projectPath, "node_modules", "kiwi-bundle")

module.exports = config => ({
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    modules: [
      pathLib.join(bundlePath, "node_modules")
    ],
    alias: {
      "kiwi-bundle": bundlePath,
    },
  },
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ 'babel-loader', 'source-map-loader' ],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [ 'babel-loader', 'awesome-typescript-loader' ],
        //loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
      {
        test: /\.(mov|mp4)$/,
        loaders: [
          'file-loader?name=medias/[hash].[ext]',
        ],
      },
      {
        test: /\.(ttf|eot)$/,
        use: { loader: 'file-loader', options: { name: 'fonts/[hash].[ext]' } },
      },
      {
        test: /\.(woff|woff2)$/,
        use: { loader: 'url-loader', options: { name: 'fonts/[hash].[ext]', limit: 5000, mimetype: 'application/font-woff' } },
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({
      template: pathLib.join(bundlePath, "opt", "index.html.ejs"),
      title: config.project.title,
      description: config.project.description,
    }),
  ],
})
