<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form submit.prevent="save">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="obj.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="obj.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="obj.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="obj.tags"
                  type="text"
                  class="form-control"
                  placeholder="Input labels separated by ','"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                :disabled="buttonDisabled"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="save"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateArticle, addArticle, getArticle } from '/api/article'

export default {
  name: 'EditorIndex',
  middleware: 'auth',
  async asyncData ({ params, redirect }) {
    let obj = {
      title: '',
      description: '',
      body: '',
      tags: ''
    }

    const slug = params.slug

    if (slug) {
      try {
        let { data } = await getArticle(slug)
        console.log(data)
        Object.assign(obj, data.article)
        obj.tags = obj.tagList.join(',')
      } catch (error) {
        redirect({ name: 'editor' })
      }
    }

    return {
      obj,
      slug
    }
  },
  data () {
    return {
      buttonDisabled: false
    }
  },
  methods: {
    async save () {
      this.buttonDisabled = true

      const exec = this.slug ? updateArticle : addArticle
      console.log(this.obj, '12312312312312321')
      this.obj.tagList = this.obj.tags.split(',')
      delete this.obj.tags

      try {
        let { data } = await exec({ article: this.obj }, this.slug)

        this.$router.push({ name: 'article', params: { slug: data.article.slug } })
      } catch (error) {
        this.buttonDisabled = false
      }
    }
  }
}
</script>

<style></style>
