<template>
  <div id="the-roulette">
    <div class="container pt-4 pb-4 mt-5 mb-5 shadow rounded">
      <div class="box">
        <word-box :selectedWords="selectedWords" />
      </div>
      <div class="mx-auto text-center">
        <transition name="fade">
          <div>
            <button @click="randomPickedUpWords(selectedWords)">
            おす
          </button>
            <p>{{ resultWord }}</p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import WordBox from './WordBox.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    WordBox
  },
  computed: {
    ...mapGetters('selectedWords', ['selectedWords']),
    ...mapGetters('resultWord', ['resultWord'])
  },
  methods: {
    ...mapActions('resultWord', ['randomPickedUpWords'])
  }
}
</script>

<style scoped>
.container {
  background: radial-gradient(#ffffff, #fde9ff);
}
</style>