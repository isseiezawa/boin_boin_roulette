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
            <li
              key="boin-boin-roulette"
              class="nav-item"
            >
              <router-link
                :to="{ name: 'TopIndex' }"
                class="nav-link active"
                exact
                active-class="fw-bold text-danger"
              >
                ボインボインルーレット
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'FreeIndex' }"
                class="nav-link active"
                exact
                active-class="fw-bold text-danger"
              >
                フリールーレット
              </router-link>
            </li>
            <li
              key="mode-select"
              class="nav-item"
            >
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
            <transition
              name="slide-fade"
              mode="out-in"
            >
              <li
                v-if="authUser"
                key="word-list"
                class="nav-item"
              >
                <router-link
                  :to="{ name: 'ResultIndex' }"
                  class="nav-link active"
                  exact
                  active-class="fw-bold text-danger"
                >
                  集めた言葉
                </router-link>
              </li>
              <li
                v-if="!authUser"
                key="login"
                class="nav-item"
              >
                <router-link
                  :to="{ name: 'LoginIndex' }"
                  class="nav-link active"
                  exact
                  active-class="fw-bold text-danger"
                >
                  ログイン
                </router-link>
              </li>
            </transition>
            <transition
              name="slide-fade"
              mode="out-in"
            >
              <li
                v-if="authUser"
                key="logout"
                class="nav-item"
              >
                <router-link
                  to="#"
                  class="nav-link active"
                  @click.native="handleLogout"
                >
                  ログアウト
                </router-link>
              </li>
              <li
                v-if="!authUser"
                key="register"
                class="nav-item"
              >
                <router-link
                  :to="{ name: 'RegisterIndex' }"
                  class="nav-link active"
                  exact
                  active-class="fw-bold text-danger"
                >
                  ユーザー登録
                </router-link>
              </li>
            </transition>
            <li
              key="the-description"
              class="nav-item"
            >
              <button
                class="btn btn-default navbar-btn nav-link active"
                @click="changeDescriptionModal"
              >
                <font-awesome-icon class="text-info" :icon="['fas', 'circle-question']" />使い方
              </button>
            </li>
          </ul>
        </div>
      </div>
      <transition name="bounce">
        <the-description-modal
          v-if="descriptionModal"
          @close-description-modal="changeDescriptionModal"
        />
      </transition>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TheDescriptionModal from "./TheDescriptionModal.vue"

export default {
  components: {
    TheDescriptionModal
  },
  data() {
    return {
      descriptionModal: false
    }
  },
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
    },
    changeDescriptionModal() {
      this.descriptionModal = !this.descriptionModal
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
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>