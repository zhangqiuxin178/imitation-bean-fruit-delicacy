module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ["import", {
      "libraryName": "wot-design",
      "style": true
    }]
  ],
  
  // proxyTable: {
  //   "/api": {
  //     target: 'http://localhost:8081/',      //后端接口的根目录
  //     changeOrigin: true,                    //是否跨域
  //     pathRewrite: {
  //       '^/api': '/'
  //     }
  //   }
  // }

}
