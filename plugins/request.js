import axios from 'axios'

export const request = axios.create({
  // baseURL: 'http://realworld.api.fed.lagounews.com'
  // 上边开发用的 url 点赞接口有问题
  // baseURL: 'https://conduit.productionready.io'
  baseURL: 'https://api.realworld.io'
})

/**
 *  1. 可通过插件机制获取上下文对象（ query， params， req， res， app 等等）。
 *  2. 插件导出函数必须是 default 成员。
 */
export default ({ store }) => {
  request.interceptors.request.use((config) => {
    const { user } = store.state
    // 请求添加 token
    // config.headers.Authorization = 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTM0OTI0LCJ1c2VybmFtZSI6Im5vNW5vNiIsImV4cCI6MTYxNTk5NDI2OX0.-Yl6q2WUR7S_9uRzj1i9gFvSoySmmfwk5enwV4WhOgI'
    if (user && user.token) config.headers.Authorization = `Token ${user.token}`

    return config
  }, (error) => {
    console.dir(error, 'eeeee--------')
    return Promise.reject(error)
  })

  request.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  })
}
