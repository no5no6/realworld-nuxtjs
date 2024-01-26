import { request } from '@/plugins/request'

const prefix = '/api'

// 用户注册
export const register = user => request.post(`${prefix}/users`, user)

// 获取用户
export const getUser = user => request.get(`${prefix}/user`, user)

// 用户登录
export const login = user => request.post(`${prefix}/users/login`, user)

// 更新用户
export const updateUser = user => request.put(`${prefix}/user`, { user })
