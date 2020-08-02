// 引入axios
import axios from 'axios'

// 配置公共的url
// process.env.VUE_APP_URL  如果运行 npm run serve
// 是从.env.development 文件中读取的
axios.defaults.baseURL = process.env.VUE_APP_URL
// 配置一个拦截器
axios.interceptors.request.use(function(config){
    // KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS
    let data = config.data || {} //get请求时候是没有data  防御性代码
    data["oauth_token"] = "KwiVWLCxXax3rRcVsmgX7shQGhtBtXnS"
    config.data = data 
    // console.log(config)
    return config
},function(error){
    return Promise.reject(error)
})

// 响应的拦截器
axios.interceptors.response.use(function(response){
    // 返回数据中的data
    return response.data
},function(error){
    return Promise.reject(error)
})

// 导出自定义的axios
export default axios