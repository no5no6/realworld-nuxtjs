<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="save">
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="user.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  required
                  v-model="user.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="user.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  required
                  v-model="user.email"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  required
                  v-model="user.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  minlength="8"
                />
              </fieldset>
              <button :disabled="buttonDisable" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button :disabled="buttonDisable" class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user'
import _ from '@/plugins/lodash'

const Cookies = process.client ? require('js-cookie') : undefined

export default {
  name: 'SettingIndex',
  computed: {
  },
  async asyncData ({ store }) {
    // let user = null

    // let { data } = await getUser()
    // user = data.user
    const user = _.cloneDeep(store.state.user)

    return {
      user
    }
  },
  data () {
    return {
      buttonDisable: false
    }
  },
  methods: {
    async save () {
      // const params = _(this.user)
      //   .pick(['username', 'password', 'image', 'bio', 'email'])
      //   .reduce((memo, value, key) => {
      //     if (value) memo.push({ [key]: value })
      //     return memo
      //   }, [])

      this.buttonDisable = true
      const params = _.pick(this.user, ['username', 'password', 'image', 'bio', 'email'])

      try {
        await updateUser(params)

        this.$store.commit('setUser', this.user)
        Cookies.set('user', this.user)

        this.$router.push({ name: 'home' })
      } catch (error) {
        this.buttonDisable = false
      }
    },
    logout () {
      this.buttonDisable = true

      try {
        this.$store.commit('setUser', null)
        Cookies.remove('user')

        this.$router.push({ name: 'home' })
      } catch (error) {
        this.buttonDisable = false
      }
    }
  }
}
</script>

<style></style>
