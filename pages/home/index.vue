<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link 
                :to="{
                  name: 'profile',
                  params: { 
                    username: article.author.username 
                  }
                }" 
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link 
                  :to="{
                    name: 'profile',
                    params: { 
                      username: article.author.username 
                    }
                  }" 
                  class="author"
                  >{{ article.author.username }}</nuxt-link>
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
                  slug: article.slug 
                }
              }" 
              class="preview-link"
              >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link 
                v-for="(tagName, index) in tags" :key="index"
                :to="{
                  name: 'home', 
                  query:{
                    tag: tagName
                  }
                 }" 
                 class="tag-pill tag-default" 
                 >{{ tagName }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getYourFeedArticles, addStar, removeStar } from '@/api/article'
import { getTags } from '@/api/tag'

export default {
  name: 'HomeIndex',
  /**
   *  1. asyncData 方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。
   *  2. asyncData 方法不能调用 this， 但已注入 context 参数，从中可以获取 prams，query 等等。
   *  3. 返回值会合并到原有的 data 中。
   */
  async asyncData({ query }) {
    /**
     *  1. 获取文章列表
     *     - 公共文章
     *     - 私有文章
     *     - 通过标签筛选的文章
     *  2. 获取标签列表
     *  3. 处理分页
     */

    let { tag, tab = 'globalFeed', currentPage = 1 } = query

    const limit = 10

    const getList = tab === 'globalFeed' ? getArticles : getYourFeedArticles

    const [ articlesResponse, tagsResponse ] = await Promise.all(
      [
        getList(
          {
            tag,
            limit,
            offset: (+currentPage -1 ) * limit
          }
        ),
        getTags()
      ]
    )

    let { articles, articlesCount } = articlesResponse.data
    articles.forEach(article => article.disableButton = false )

    const tags = tagsResponse.data.tags.slice(0, 20)

    console.log(articles, '=----------', tags)

    return {
      limit, // 每页展示条数
      tab,  // 选中 tab 标签
      currentPage,  // 当前页
      articles, // 文章列表
      articlesCount,  // 文章总条数
      tags, // 标签列表
      tag // 筛选标签
    }

  },
  methods: {
    async onStar(article) {
      article.disableButton = true
      article.favorited = !article.favorited

      if(article.favorited) {
        await addStar(article.slug)
        article.favoritesCount += 1
      }else {
        await removeStar(article.slug)
        article.favoritesCount -= 1
      }

      article.disableButton = false
      
    }
  },
  created() {},
}
</script>

<style></style>
