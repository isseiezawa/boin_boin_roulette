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
                to="/"
                class="nav-link active"
              >
                Top
              </router-link>
            </li>
            <li class="nav-item">
              <transition name="slide-fade" mode="out-in">
                <button @click="styleChange(!selectedStyle)" class="btn btn-default navbar-btn" v-if="selectedStyle" key="simple-button">
                  シンプルモードに切り替え
                </button>
                <button @click="styleChange(!selectedStyle)" class="btn btn-default navbar-btn" v-else key="boin-button">
                  ボインモードに切り替え
                </button>
              </transition>
            </li>
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
    ...mapGetters("selectedWordBoxStyle", ["selectedStyle"])
  },
  methods: {
    ...mapActions("selectedWordBoxStyle", ["styleChange"])
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