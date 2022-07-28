<template>
  <div id="login-form" class="container">
    <div class="h1 text-center mb-3 shadow-sm bg-light">
      ログイン
    </div>
    <div class="shadow-sm bg-light">
      <div class="form-floating">
        <input
          id="email"
          v-model="user.email"
          type="email"
          class="form-control"
          placeholder="boin@example.com"
        >
        <label for="email">
          <font-awesome-icon :icon="['fas', 'at']" /> メールアドレス
        </label>
      </div>
      <div class="form-floating">
        <input
          id="password"
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="password"
        >
        <label for="password">
          <font-awesome-icon :icon="['fas', 'key']" /> パスワード
        </label>
      </div>
    </div>
    <div class="d-grid gap-2 col-6 mt-3 mx-auto">
      <button
        type="submit"
        class="btn btn-outline-dark shadow-sm"
        @click="login"
      >
        ログイン
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        email: "",
        password: "",
      }
    }
  },
  methods: {
    ...mapActions("users", [
      "loginUser",
      "fetchUser",
    ]),
    async login() {
      try {
        await this.loginUser(this.user);
        this.$router.push({ name: 'ResultIndex' })
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>