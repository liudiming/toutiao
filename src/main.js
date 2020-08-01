import Vue from 'vue'
// 引入app的组件
import App from './App.vue'
// 引入vue-router配置
import router from './router'
// 引入vuex的配置
import store from './store'


Vue.config.productionTip = false
// 创建一个vue的实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
