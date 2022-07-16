<template>
  <div id="the-roulette">
    <div class="container pt-4 pb-4 mt-5 mb-5 shadow rounded">
      <div class="box">
        <word-box :selected-words="selectedWords" />
      </div>
      <div class="mx-auto text-center">
        <transition name="fade">
          <div>
            <button @click="startOrStop ? startLoop(100) : slowLoop()" class="btn btn-pink-moon">
              {{ startOrStopButton }}
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
      intervId: null,
      startOrStop: true
    }
  },
  computed: {
    ...mapGetters('selectedWords', ['selectedWords']),
    ...mapGetters('randomPickedUp', ['pickedUpWords']),
    startOrStopButton() {
      return this.startOrStop ? 'スタート' : 'ストップ'
    }
  },
  methods: {
    ...mapActions('randomPickedUp', ['randomPickedUpNumbers']),
    startLoop(time) {
      if (!this.intervId) {
        this.intervId = setInterval(this.randomPickedUpNumbers,
                                    time,
                                    this.selectedWords
                                    )
        this.startOrStop = false
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
      this.startOrStop = true
    }
  }
}
</script>

<style scoped>
.container {
  background: radial-gradient(#ffffff, #fde9ff);
}
.btn-pink-moon {
    background: #ff8ad0;
    background: -webkit-linear-gradient(to top, #fc7a7a, #fc81cb);
    background: linear-gradient(to top, #fc7a7a, #fc81cb);
    color: #fff;
    border: 3px solid #eee;
    border-radius: 15px;
    transition: 0.3s;
}
.btn-pink-moon:hover {
  color: #ff0000;
}
</style>