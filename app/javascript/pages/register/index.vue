<template>
  <div
    id="register-form"
    class="container"
  >
    <div class="h1 text-center mb-3 shadow-sm bg-light">
      ユーザー登録
    </div>
    <div class="shadow-sm bg-light">
      <div class="form-floating">
        <input
          id="name"
          v-model="user.name"
          type="text"
          class="form-control"
          placeholder="愛 上男"
        >
        <label for="name">
          <font-awesome-icon :icon="['fas', 'user']" /> ユーザー名
        </label>
      </div>
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
      <div class="form-floating">
        <input
          id="password_confirmation"
          v-model="user.password_confirmation"
          type="password"
          class="form-control"
          placeholder="password"
        >
        <label for="password_confirmation">
          <font-awesome-icon :icon="['fas', 'key']" /> パスワード(確認)
        </label>
      </div>
    </div>
    <div class="d-grid gap-2 col-6 mt-3 mx-auto">
      <button
        type="submit"
        class="btn btn-outline-dark shadow-sm"
        @click="signUp()"
      >
        登録
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterIndex",
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    signUp() {
      this.$axios.post('users', { user: this.user })
        .then(res => {
          this.$router.push({ name: 'LoginIndex' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>