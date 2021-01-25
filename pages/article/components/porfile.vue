<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      },
    }"><img :src="article.author.image"/></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }, 
      }" class="author">{{ article.author.username }}</nuxt-link>
      <span class="date">{{ article.updatedAt | date() }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :disabled="followButtonDisabled" @click="onFollow">
      <i class="ion-plus-round"></i>
      &nbsp; {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }} <span class="counter">({{article.favoritesCount}})</span>
    </button>
    <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.favorited }"
        @click="onStar"
        :disabled="favoriteButtonDisabled"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? 'UnFavorite' : 'Favorite'}} Arcticle <span class="counter">({{ article.favoritesCount }})</span> 
    </button>
  </div>
</template>

<script>
// import { mapState } from "vuex"
import { addFollowUser, removeFollowUser } from '@/api/profile'
import { addStar, removeStar } from "@/api/article"

export default {
  name: 'ArticleProfile',
  props: {
    article: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      favoriteButtonDisabled: false,
      followButtonDisabled: false
    }
  },
  computed: {
  },
  methods: {
    async onFollow() {
      this.followButtonDisabled = true
      // this.user.following = !this.user.following
      this.article.author.following = !this.article.author.following 

      const exec = this.article.author.following  ? addFollowUser : removeFollowUser

      try {
        await exec(this.article.author.username)
        this.followButtonDisabled = false
      } catch (error) {
        this.followButtonDisabled = false
      }
    },
    async onStar() {
      this.favoriteButtonDisabled = true
      this.article.favorited = !this.article.favorited

      try {
        if (this.article.favorited) {
          await addStar(this.article.slug)
          this.article.favoritesCount += 1
        } else {
          await removeStar(this.article.slug)
          this.article.favoritesCount -= 1
        }

        this.disableButton = false
      } catch (error) {
        this.disableButton = false 
      }
    },
  }
}
</script>

<style>

</style>