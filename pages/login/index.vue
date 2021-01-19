<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <a href="">{{
              isLogin ? "Need an account?" : "Have an account?"
            }}</a>
          </p>

          <ul class="error-messages">
            <li v-for="(error, key, index) in errors" :key="index">
              {{ key }} {{ error }}
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
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
// 仅在客户端加载 js-cookie
// const moudle = process.client ? 'js-cookie' : undefined

const Cookie =  process.client ? require('js-cookie') : undefined
console.log(Cookie, 'cccccccccccc')
export default {
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login"
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: "",
      },
      errors: "",
    };
  },
  methods: {
    async onSubmit() {
      const exec = this.isLogin ? login : register
      try {
        let { data } = await exec({ user: this.user })

        // 保存用户状态
        this.$store.commit("setUser", data.user)
        Cookie.set('user', data.user)
        
        this.$router.push("/")
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
};
</script>

<style></style>
