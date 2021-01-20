import { request } from '@/plugins/request'

const prefix = '/api/articles'

export const getArticles = params => request.get(prefix, { params })

export const getYourFeedArticles = params => request.get(`${prefix}/feed`, { params })

export const getArticle = params => request.get(`${prefix}/${params.slug}`)

export const addStar = slug => request.post(`${prefix}/${slug}/favorite`)

export const removeStar = slug => request.delete(`${prefix}/${slug}/favorite`)