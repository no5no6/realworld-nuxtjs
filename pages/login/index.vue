<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link :to="isLogin ? 'register' : 'login'">{{
              isLogin ? "Need an account?" : "Have an account?"
            }}</nuxt-link>
          </p>

          <ul class="error-messages">
            <li v-for="(error, key, index) in errors" :key="index">
              <div v-for="(item, idx) in error" :key="idx">
                <div>{{ key }} {{ item }}</div>
              </div>
            </li>
          </ul>
          <!-- 增加 prevent 属性，阻止表单默认提交行为，只触发我们自己写的提交方法 -->
          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                required
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
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
                type="password"
                v-model="user.password"
                class="form-control form-control-lg"
                placeholder="Password"
                minlength="8"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled="disabledButton">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅在客户端加载 js-cookie
// const moudle = process.client ? 'js-cookie' : undefined

const Cookies = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginIndex',
  middleware: 'no-auth',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: '',
        username: ''
      },
      errors: '',
      disabledButton: false
    }
  },
  methods: {
    async onSubmit () {
      this.disabledButton = true

      const exec = this.isLogin ? login : register

      try {
        let { data } = await exec({ user: this.user })

        // 保存用户状态
        this.$store.commit('setUser', data.user)
        /**
         *  1. 为了防止页面刷新丢失 vuex 里登录状态
         *  2. 因为是 nuxt 应用，所以不能用浏览器的本地存储，需放到 cookie 中，这样前后端都可以访问。
         *  3. 配合 nuxt 的 vuex 中提供的特定 actions ，做前后端同步登录状态。 详情见 @/store/index.js
         */
        Cookies.set('user', data.user)

        this.$router.push('/')
      } catch (error) {
        this.errors = error.response.data.errors
        this.disabledButton = false
      }
    }
  }
}
</script>

<style></style>
