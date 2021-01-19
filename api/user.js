import { request } from '@/plugins/request'

// 用户登录
export const login = user => request.post('/api/users/login', user)

// 用户注册
export const register = user => request.post('/api/users', user)