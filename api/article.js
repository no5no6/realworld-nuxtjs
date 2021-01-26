import { request } from '@/plugins/request'

const prefix = '/api'

export const getArticles = params => request.get(`${prefix}/articles`, { params })

export const getYourFeedArticles = params => request.get(`${prefix}/articles/feed`, { params })

export const getArticle = slug => request.get(`${prefix}/articles/${slug}`)

export const addArticle = params => request.post(`${prefix}/articles`, params)

export const updateArticle = params => request.put(`${prefix}/articles/${params.slug}`)

export const addStar = slug => request.post(`${prefix}/articles/${slug}/favorite`)

export const removeStar = slug => request.delete(`${prefix}/articles/${slug}/favorite`)
