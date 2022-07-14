<template>
  <div id="the-roulette">
    <div class="container pt-4 pb-4 mt-5 mb-5 shadow rounded">
      <div class="box">
        <word-box :selectedWords="selectedWords" />
      </div>
    </div>
  </div>
</template>

<script>
import WordBox from './WordBox.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    WordBox
  },
  computed: {
    ...mapGetters('selectedWords', ['selectedWords'])
  }
}
</script>

<style scoped>
.container {
  background: radial-gradient(#ffffff, #fde9ff);
}
</style>