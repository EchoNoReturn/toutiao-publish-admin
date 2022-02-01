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

// router.beforeEach((to, from, next) => {
//   // 必须使用 next() 方法，不然会什么都没有
//   // const user = window.localStorage.getItem('user')
//   if (to.name === 'login') next({ path: '/login' })
//   else next()
//   console.log(to)
//   console.log(from)
// })

export default router
