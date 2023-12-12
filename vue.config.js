const webpack = require('webpack');
const path = require('path');
// vue.config.js
module.exports = {
  // 选项...
  devServer: {
    port: 8089,
    // proxy:{
    //   '/': {
    //     target: 'http://192.168.0.125:3000/',
    //     changeOrigin: true,
    //     pathRewrite: {}
    //   },
    // }
  },
  configureWebpack: {//引入jquery
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.ProvidePlugin({
          jQuery: "jquery",
          $: "jquery"
        })
    ]
  },
}
console.log('webpack');