// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  lintOnSave: false,
  //解决跨域问题
  devServer: {
    // // true 则热更新，false 则手动刷新，默认值为 true
    // inline: false,
    // // development server port 8000
    // port: 8001,
    // //代理服务器解决跨域
    proxy: {
      "/api": {
        // target: "http://39.98.123.211",
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  }
}