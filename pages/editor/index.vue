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
                  v-model="obj.article"
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
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
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
import { updateArticle , addArticle, getArticle } from '/api/article'

export default {
  name: 'EditorIndex',
  middleware: 'auth',
  async asyncData ({ params, redirect }) {
    let obj = {
      title: '',
      description: '',
      article: '',
      tags: ''
    }

    const slug = params.slug

    if(slug) {
      try {
        let { data } = await getArticle(obj)
        console.log(data)
      } catch (error) {
        redirect({ name: 'editor'})
      }
    }

    return {
      obj,
      slug
    }
  },
  methods: {
    async save() {
      console.log('============')
      if (this.slug) {
        exec = updateArticle
        Object.assign(this.obj, { slug: this.slug })
      }else {
        exec = addArticle
      }

      try {
        await exec(this.obj)

        this.$router.push({ name: 'article' })
      } catch (error) {
        
      }
      
    }
  }
}
</script>

<style></style>
