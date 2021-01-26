import { request } from '@/plugins/request'

const prefix = '/api'

export const getTags = () => request.get(`${prefix}/tags`)
