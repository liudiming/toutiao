// 引入Vue的组件
import Vue from 'vue'
// 引入app的组件
import App from './App.vue'
// 引入vue-router配置
import router from './router'
// 引入vuex的配置
import store from './store'

// 
// import HighchartsVue from 'highcharts-vue'

// 引入axios
import axios from './common/myaxios'
// 在Vue的原型上添加$axios
Vue.prototype.$axios = axios

// 引入elment-ui 组件库
import {Message} from "element-ui"
Vue.prototype.$message = Message

// 
Vue.config.productionTip = false
// 创建一个vue的实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
