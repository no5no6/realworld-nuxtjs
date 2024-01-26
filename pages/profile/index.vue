<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{user.username}}</h4>
            <p>
              {{ user.bio }}
            </p>
            <nuxt-link v-if="user.id" class="btn btn-sm btn-outline-secondary action-btn" to="/settings">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button v-else class="btn btn-sm btn-outline-secondary action-btn" :disabled="buttonDisabled" @click="onFollow">
              <i class="ion-plus-round"></i>
              &nbsp; {{user.following ? 'Unfollow' : 'Follow' }} {{user.username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{active: tab === 'my'}" :to="{
                  name: 'profile',
                  params: {
                    username: user.username,
                  },
                  query: {
                    tab: 'my'
                  }
                }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{active: tab === 'favorited'}" :to="{
                  name: 'profile',
                  params: {
                    username: user.username,
                  },
                  query: {
                    tab: 'favorited'
                  }
                }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username,
                }
              }"><img :src="article.image"/></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                  class="author"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.updatedAt | date() }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="onStar(article)"
                :disabled="article.disableButton"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in article.tagList" :key="index">{{ tag }}</li>
              </ul>
            </nuxt-link>
          </div>
          <div v-if="!articles.length" class="article-preview" >
            No articles are here... yet.
          </div>
          <nav>
            <ul class="pagination">
              <li
                v-for="page in totalPage"
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      tab,
                      currentPage: page,
                    },
                    params: {
                      username: user.username,
                    }
                  }"
                  >{{ page }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from '@/plugins/lodash'

import { getProfile, addFollowUser, removeFollowUser } from '@/api/profile'
import { getArticles } from '@/api/article'

export default {
  name: 'ProfileIndex',
  middleware: 'auth',
  watchQuery: ['tab', 'user', 'currentPage'],
  async asyncData ({ store, params, query }) {
    const username = params.username
    const currentUser = store.state.user

    let user = null
    let { currentPage = 1, tab = 'my' } = query
    let limit = 10
    let promise = []

    let requestParams = {
      limit,
      tab,
      offset: (+currentPage - 1) * limit
    }

    Object.assign(requestParams, { [tab === 'my' ? 'author' : 'favorited']: username })

    promise.push(
      getArticles(requestParams)
    )

    username !== currentUser.username && promise.push(getProfile(username))

    let [articlesResponse, profileResponse] = await Promise.all(promise)
    let { articles, articlesCount } = articlesResponse.data
    articles.forEach((article) => (article.disableButton = false))
    user = profileResponse ? profileResponse.data.profile : _.cloneDeep(currentUser)

    return {
      user,
      currentPage,
      limit,
      tab,
      articles,
      articlesCount
    }
  },
  data () {
    return {
      buttonDisabled: false
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFollow () {
      if (this.user) {
        this.buttonDisabled = true
        this.user.following = !this.user.following

        const exec = this.user.following ? addFollowUser : removeFollowUser

        try {
          await exec(this.user.username)
          this.buttonDisabled = false
        } catch (error) {
          this.buttonDisabled = false
        }
      } else {
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style></style>
