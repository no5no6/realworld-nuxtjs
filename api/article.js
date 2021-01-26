import { request } from '@/plugins/request'

const prefix = '/api'

export const getArticles = params => request.get(`${prefix}/articles`, { params })

export const getYourFeedArticles = params => request.get(`${prefix}/articles/feed`, { params })

export const getArticle = slug => request.get(`${prefix}/articles/${slug}`)

export const addArticle = params => request.post(`${prefix}/articles`, params)

export const updateArticle = (params, slug) => request.put(`${prefix}/articles/${slug}`, params)

export const removeArticle = slug => request.delete(`/api/articles/${slug}`)

export const addStar = slug => request.post(`${prefix}/articles/${slug}/favorite`)

export const removeStar = slug => request.delete(`${prefix}/articles/${slug}/favorite`)

export const addComment = params => request.post(`${prefix}/articles/${params.slug}/comments`, params.comment)

export const getComment = slug => request.get(`${prefix}/articles/${slug}/comments`)

export const removeComment = params => request.delete(`${prefix}/articles/${params.slug}/comments/${params.id}`)
