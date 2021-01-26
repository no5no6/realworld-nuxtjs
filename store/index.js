// 只用于服务端
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  /**
   *  1. nuxt 特定的 action
   *  2. 用于服务端初始化数据并传递给客户端使用。
   */
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }

    commit('setUser', user)
  }
}
