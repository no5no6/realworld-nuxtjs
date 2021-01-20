import { request } from '@/plugins/request'

const prefix = '/api/users'

// 用户注册
export const register = user => request.post(prefix, user)

// 用户登录
export const login = user => request.post(`${prefix}/login`, user)
