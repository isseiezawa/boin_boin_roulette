<template>
  <div id="result-index" class="container-fluid ">
    <h2 class="text-center mb-4">集めたワード</h2>
    <div class="row row-cols-4">
      <div v-for="(resultWord, index) in resultWords" :key="index" class="col border">
        {{ resultWord.word }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  created() {
    this.fetchResultWords()
  },
  computed: {
    ...mapGetters("randomPickedUp", ["resultWords"])
  },
  methods: {
    ...mapActions("randomPickedUp", ["fetchResultWords"])
  }
}
</script>