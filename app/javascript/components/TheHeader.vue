<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/">
          <img
            src="../../assets/images/icon/boin_boin_roulette.png"
            class="img-fluis"
            alt="boin-picture"
          >
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div
          id="navbarNav"
          class="collapse navbar-collapse"
        >
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link
                :to="{ name: 'TopIndex' }"
                class="nav-link active"
              >
                ボインボインルーレット
              </router-link>
            </li>
            <li class="nav-item">
              <transition
                name="slide-fade"
                mode="out-in"
              >
                <button
                  v-if="selectedStyle"
                  key="simple-button"
                  class="btn btn-default navbar-btn nav-link active"
                  @click="styleChange(!selectedStyle)"
                >
                  シンプルモードに切り替え
                </button>
                <button
                  v-else
                  key="boin-button"
                  class="btn btn-default navbar-btn nav-link active"
                  @click="styleChange(!selectedStyle)"
                >
                  ボインモードに切り替え
                </button>
              </transition>
            </li>
            <template v-if="authUser">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'ResultIndex' }"
                  class="nav-link active"
                >
                  集めた言葉
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="#"
                  class="nav-link active"
                  @click.native="handleLogout"
                >
                  ログアウト
                </router-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'LoginIndex' }"
                  class="nav-link active"
                >
                  ログイン
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'RegisterIndex' }"
                  class="nav-link active"
                >
                  ユーザー登録
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("selectedWordBoxStyle", ["selectedStyle"]),
    ...mapGetters("users", ["authUser"])
  },
  methods: {
    ...mapActions("selectedWordBoxStyle", ["styleChange"]),
    ...mapActions("users", ["logoutUser"]),
    async handleLogout() {
      try {
        await this.logoutUser()
        this.$router.push({ name: 'TopIndex' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s;
}
.slide-fade-leave-active {
  transition: all .3s;
}
.slide-fade-enter {
    transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>