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
/**
 * 获取频道
 * */
export const getArticleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1'
  })
}
/**
 * 删除文章
 * */
export const deleteArticle = (articlesId) => {
  return request({
    method: 'DELETE',
    url: `/mp/v1/${articlesId}`
  })
}
/**
 * 发布文章
 * */
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1/fjisa',
    params: {
      draft // 是否保存为草稿
    }
  },
  data
  )
}
