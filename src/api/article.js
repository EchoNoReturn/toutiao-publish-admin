/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 * */
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Header 参数使用 header 设置
    params
  })
}
export const getArticleChannels = params => {
  return request({
    method: 'GET',
    url: '/mp/v1'
  })
}
