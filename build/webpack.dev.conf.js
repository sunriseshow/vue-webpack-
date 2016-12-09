var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {

    loaders:[
      utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }),
      {
        test: /\.(js|html)$/i,
        loader: 'string-replace',
        query: {
          multiple: [
            { search: '${tps.domain}', replace: '.suning.com' },
            { search: '${mobile.image.host.url}', replace: 'http://img.suning.cn/project/mtps' },
            { search: '${mobile.css.host.url}', replace: 'http://res.suning.cn/project/mtps' },
            { search: '${mobile.js.host.url}', replace: 'http://res.suning.cn/project/mtps' },
            { search: '${versionNo}', replace: '411,255' }


          ]
        },
        //include: projectRoot,
        exclude: /node_modules/
      }

    ]
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
