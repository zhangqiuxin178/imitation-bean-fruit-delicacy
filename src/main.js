import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import wotui from './wotui'
// import axios from 'axios'
// 这是我们自己写的vue插件,用于循环添加 wot-design 按需引入组件
Vue.use(wotui)


Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})

Vue.config.productionTip = false

// axios.defaults.baseURL = '/api'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
