const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  resolve: {
    extensions: [
      '.js'
    ],
    alias: {
      'dom-vertical-mini-map': path.join(__dirname, 'dist', 'dom-vertical-mini-map')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dom-vertical-mini-map.js',
    library: 'DomVerticalMiniMap',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    new MiniCssExtractPlugin({
      filename: 'dom-vertical-mini-map.css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
