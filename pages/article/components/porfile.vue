<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
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
    <span v-if="user && user.username === article.author.username">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug
          }
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button
        class="btn btn-outline-danger btn-sm"
        :disabled="removeButtonDisabled"
        @click="remove"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
    <span v-else >
      <button
        class="btn btn-sm btn-outline-secondary"
        :disabled="followButtonDisabled"
        @click="onFollow"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "Unfollow" : "Follow" }}
        {{ article.author.username }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
      <button
        class="btn btn-sm btn-outline-secondary un-star"
        :class="{ star: article.favorited }"
        @click="onStar"
        :disabled="favoriteButtonDisabled"
      >
        <i class="ion-heart"></i>
        &nbsp; {{ article.favorited ? "UnFavorite" : "Favorite" }} Arcticle
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addFollowUser, removeFollowUser } from '@/api/profile'
import { addStar, removeStar, removeArticle } from '@/api/article'

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
  data () {
    return {
      favoriteButtonDisabled: false,
      followButtonDisabled: false,
      removeButtonDisabled: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onFollow () {
      if (this.user) {
        this.followButtonDisabled = true
        // this.user.following = !this.user.following
        this.article.author.following = !this.article.author.following

        const exec = this.article.author.following
          ? addFollowUser
          : removeFollowUser

        try {
          await exec(this.article.author.username)
          this.followButtonDisabled = false
        } catch (error) {
          this.followButtonDisabled = false
        }
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    async onStar () {
      if (this.user) {
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

          this.favoriteButtonDisabled = false
        } catch (error) {
          this.favoriteButtonDisabled = false
        }
      } else {
        this.$router.push({ name: 'login' })
      }
    },
    async remove () {
      this.removeButtonDisabled = true
      try {
        await removeArticle(this.article.slug)
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.removeButtonDisabled = false
      }
    }
  }
}
</script>

<style>
.un-star {
  border: 1px solid #5cb85c;
  color: #5cb85c;
}
.star {
  color: #fff;
  background-color: #5cb85c;
  border-color: #5cb85c;
}
</style>
