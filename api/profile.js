import { request } from '@/plugins/request'

const prefix = '/api'

export const getProfile = username => request.get(`${prefix}/profiles/${username}`)

export const addFollowUser = username => request.post(`${prefix}/profiles/${username}/follow`)

export const removeFollowUser = username => request.delete(`${prefix}/profiles/${username}/follow`)
