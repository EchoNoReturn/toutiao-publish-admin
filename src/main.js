import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@/styles/style.less' // 导入样式
// import request from '@/utils' // 导入请求模块
// // 添加 Element 组件库
import ElementUI from 'element-ui'
// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

// 全局注册 element 组件库
Vue.use(ElementUI)
// Vue.use(request) // 在全局注册使用request

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
