<template>
  <div
    id="login-form"
    class="container"
  >
    <div class="h1 text-center mb-3 shadow-sm bg-light">
      ログイン
    </div>
    <div
      v-if="errorMessage"
      class="text-center"
    >
      <span class="text-danger">{{ errorMessage }}</span>
    </div>
    <validation-observer v-slot="{ handleSubmit }">
      <div class="shadow-sm bg-light">
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
          <transition name="fade">
            <span
              v-if="errors[0]"
              class="text-danger"
            >{{ errors[0] }}</span>
          </transition>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          rules="required|min:3"
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
          <transition name="fade">
            <span
              v-if="errors[0]"
              class="text-danger"
            >{{ errors[0] }}</span>
          </transition>
        </validation-provider>
      </div>
      <div class="d-grid gap-2 col-6 mt-3 mx-auto">
        <button
          type="submit"
          class="btn btn-outline-dark shadow-sm"
          @click="handleSubmit(login)"
        >
          ログイン
        </button>
      </div>
    </validation-observer>
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
      },
      errorMessage: ""
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
        this.$router.push({ name: 'TopIndex' })
      } catch (error) {
        console.log(error);
        this.errorMessage = "ユーザーが見つかりませんでした"
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 2s;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>