import axios from 'axios'
import JSONbig from 'json-bigint'

// const request = axios.create()

// export default request
/**
 * 基于 axios 封装的请求模块
 */

// axios()
// axios.get()
// axios.post()

// 创建一个 axios 实例，说白了就是复制了一个 axios
// 我们通过这个实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 最新接口地址
  // baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    // 注意：如果使用了其他方式对 data 进行处理，记得判断是否需要使用try-catch
    try {
      // 后端返回的可能不是JSON格式字符串，如果不是会报错，所以使用try-catch
      return JSONbig.parse(data)
    } catch (error) {
      return data
    }
    // 如果需要使用这个对象，则需要在使用的时候转换为 string ，即使用 toString() 方法
  }]
})

// 请求拦截器
// Add a request interceptor
axios.interceptors.request.use(
  // 任何请求都会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    // Do something before request is sent
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Anthorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
