/**
 * 用户相关请求模块
*/
import request from '@/utils/request'

// 用户登录信息
export const login = data => {
  return request({
    method: 'POST',
    URL: '/mp/vl_0/authorizations',
    // data 用来设置 POST 请求体
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  return request({
    method: 'GET',
    URL: '/mp/v1_0/user/profile'
    // // 后端要求把需要授权的用户身份放到请求头中
    // headers: {
    //   Anthorization: `Bearer ${user.token}`
    // }
  })
}
// 修改用户信息
export const updateUserInfo = () => {}
