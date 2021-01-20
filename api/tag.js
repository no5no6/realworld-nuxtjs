import { request } from '@/plugins/request'

const prefix = '/api/tags'

export const getTags = () => request.get(prefix)