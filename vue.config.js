let path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  filenameHashing: true,
  lintOnSave: false,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
    // proxy: null,
    proxy: {
      '/api': {
        target: 'http://82.157.165.74:8000/',//后端接口地址
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/api': '',//重写,
        }
      }
    },
  },

}