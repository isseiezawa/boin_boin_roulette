<template>
  <div id="the-roulette">
    <div class="container pt-4 pb-4 mt-5 mb-5 shadow rounded">
      <div class="box">
        <word-box :selected-words="selectedWords" />
      </div>
      <div class="mx-auto text-center">
        <transition name="fade">
          <div>
            <button @click="startLoop(100)">
              おす
            </button>
            <button @click="slowLoop()">
              おす
            </button>
            <p>{{ pickedUpWords }}</p>
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
  data() {
    return {
      intervId: null
    }
  },
  computed: {
    ...mapGetters('selectedWords', ['selectedWords']),
    ...mapGetters('randomPickedUp', ['pickedUpWords'])
  },
  methods: {
    ...mapActions('randomPickedUp', ['randomPickedUpNumbers']),
    startLoop(time) {
      if (!this.intervId) {
        this.intervId = setInterval(this.randomPickedUpNumbers,
                                    time,
                                    this.selectedWords
                                    )
      }
    },
    slowLoop() {
      clearInterval(this.intervId)
      this.intervId = null
      this.startLoop(500)
      setTimeout(this.stopLoop, 3.0*1000)
    },
    stopLoop() {
      clearInterval(this.intervId)
      this.intervId = null
    }
  }
}
</script>

<style scoped>
.container {
  background: radial-gradient(#ffffff, #fde9ff);
}
</style>