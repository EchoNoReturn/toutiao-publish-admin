import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [{
  /**
   * 这里主要体现在网址上,例如需要进入登录页面则需要在 npm run serve 出来的网址后面再填上login
   * 如果默认渲染某页面为首页则只需要 '/' 这样写即可
   * */
  path: '/login',
  name: 'login',
  component: Login
},
{
  /**
  * 命名路由 layout 有一个默认子路由,这个名字没有意义,所以在控制台会有警告
  * 解决办法就是: 如果有默认子路由就不要给父路由起名字.
  */
  path: '/',
  // name: 'layout',
  component: Layout,
  children: [{
    path: '', // path 为空,会默认子路由渲染
    name: 'home',
    component: Home
  }]
}]

const router = new VueRouter({
  routes
})

/* // router.beforeEach((to, from, next) => {
//   // 必须使用 next() 方法，不然会什么都没有
//   // const user = window.localStorage.getItem('user')
//   if (to.name === 'login') next({ path: '/login' }) // 这个无效
//   else next()
//   console.log(to)
//   console.log(from)
// }) */

// router.beforeEach((to, from, next) => {
//   // 如果要访问的不是 /login，校验登录状态
//   // 如果没有登录，则跳转到登录页面
//   // 如果登录了，则允许通过
//   // 允许通过
//   // next()

//   // 获取登录信息
//   const user = JSON.parse(window.localStorage.getItem('user'))
//   if (to.path !== '/login') {
//     console.log('不是login,需要进行判断')
//     if (user) {
//       next()
//     } else {
//       next('/login')
//       console.log('没有登录信息，返回登录页面')
//     }
//   } else {
//     next()
//   }
// })

export default router
