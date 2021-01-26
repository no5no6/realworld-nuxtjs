<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1> {{ article.title }} </h1>
        <profile :article="article"></profile>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="markdowContent"></div>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <profile :article="article"></profile>
      </div>

      <article-comment :data="comments" :slug="slug" @addComment="addComment" @removeComment="removeComment"></article-comment>
    </div>
  </div>
</template>

<script>
import { getArticle, getComment } from '@/api/article'

import Profile from './components/porfile'
import ArticleComment from './components/comment'

import MarkdownIt from 'markdown-it'

export default {
  name: 'ArticleIndex',
  components: {
    Profile,
    ArticleComment
  },
  head () {
    return {
      title: `${this.article.title}-Realworld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  },
  async asyncData ({ params }) {
    const slug = params.slug

    let { data } = await getArticle(slug)
    const article = data.article
    console.log(data.article, 'data.articledata.articledata.article')
    return {
      article,
      slug
    }
  },
  computed: {
    markdowContent () {
      const md = new MarkdownIt()
      return md.render(this.article.body)
    }
  },
  data () {
    return {
      comments: []
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const { data } = await getComment(this.slug)
      console.log(data)
      this.comments = data.comments
    },
    addComment (comment) {
      this.comments.unshift(comment)
    },
    removeComment (removeId) {
      this.comments = this.comments.filter(({ id }) => id !== removeId)
    }
  }
}
</script>

<style></style>
