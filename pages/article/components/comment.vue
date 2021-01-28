<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form v-if="user" class="card comment-form" @submit.prevent="save">
        <div class="card-block">
          <textarea
            required
            v-model="comment"
            class="form-control"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button :disabled="buttonDisabled" class="btn btn-sm btn-primary">
            Post Comment
          </button>
        </div>
      </form>
      <div v-else class="row">
        <p style="display: inherit;">
          <nuxt-link to="/login">Sign in</nuxt-link> or
          <nuxt-link to="/register">sign up</nuxt-link> to add
          comments on this article.
        </p>
      </div>

      <div class="card" v-for="comment in data" :key="comment.id">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username,
              },
            }"
            class="comment-author"
          >
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: comment.author.username,
              },
            }"
            class="comment-author"
          >
            {{ comment.author.username }}
          </nuxt-link>
          <span class="date-posted">{{ comment.updatedAt | date() }}</span>
          <span
            class="mod-options"
            v-if="user.username === comment.author.username"
          >
            <i class="ion-trash-a" @click="remove(comment.id)"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addComment, removeComment } from '@/api/article'

export default {
  name: 'ArticleComment',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    slug: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      comment: '',
      buttonDisabled: false,
      removeButtonDisabled: false
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async save () {
      this.buttonDisabled = true
      const comment = {
        comment: {
          body: this.comment
        }
      }

      try {
        let { data } = await addComment({ comment, slug: this.slug })

        this.$emit('addComment', data.comment)

        this.comment = ''
        this.buttonDisabled = false
      } catch (error) {
        this.buttonDisabled = false
      }
    },
    async remove (id) {
      if (this.removeButtonDisabled) return

      this.removeButtonDisabled = true

      try {
        await removeComment({ id, slug: this.slug })
        this.$emit('removeComment', id)
        this.removeButtonDisabled = true
      } catch (error) {
        this.removeButtonDisabled = false
      }
    }
  }
}
</script>

<style></style>
