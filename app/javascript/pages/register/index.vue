<template>
  <div
    id="register-form"
    class="container"
  >
    <div class="h1 text-center mb-3 shadow-sm bg-light">
      ユーザー登録
    </div>
    <div
      v-if="errorMessage"
      class="text-center"
    >
      <span
        v-for="(error, index) in errorMessage"
        :key="index"
        class="text-danger"
      >{{ error.key }}{{ error }}</span>
    </div>
    <validation-observer v-slot="{ handleSubmit }">
      <div class="shadow-sm bg-light">
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <div class="form-floating">
            <input
              id="name"
              v-model="user.name"
              name="名前"
              type="text"
              class="form-control"
              placeholder="愛 上男"
            >
            <label for="name">
              <font-awesome-icon :icon="['fas', 'user']" /> ユーザー名
            </label>
          </div>
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required|email"
        >
          <div class="form-floating">
            <input
              id="email"
              v-model="user.email"
              name="メールアドレス"
              type="email"
              class="form-control"
              placeholder="boin@example.com"
            >
            <label for="email">
              <font-awesome-icon :icon="['fas', 'at']" /> メールアドレス
            </label>
          </div>
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required|min:3"
          vid="password"
        >
          <div class="form-floating">
            <input
              id="password"
              v-model="user.password"
              name="パスワード"
              type="password"
              class="form-control"
              placeholder="password"
            >
            <label for="password">
              <font-awesome-icon :icon="['fas', 'key']" /> パスワード
            </label>
          </div>
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required|min:3|password_confirmed:@password"
        >
          <div class="form-floating">
            <input
              id="password_confirmation"
              v-model="user.password_confirmation"
              name="パスワード(確認)"
              type="password"
              class="form-control"
              placeholder="password"
            >
            <label for="password_confirmation">
              <font-awesome-icon :icon="['fas', 'key']" /> パスワード(確認)
            </label>
          </div>
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
      </div>
      <div class="d-grid gap-2 col-6 mt-3 mx-auto">
        <button
          type="submit"
          class="btn btn-outline-dark shadow-sm"
          @click="handleSubmit(signUp)"
        >
          登録
        </button>
      </div>
    </validation-observer>
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
      },
      errorMessage: []
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
          this.errorMessage.push(err.response.data)
        })
    }
  }
}
</script>