<template>
  <div id="the-roulette">
    <div class="container pt-4 pb-4 mt-5 mb-5 shadow rounded">
      <div class="box">
        <word-box :selected-words="selectedWords" />
      </div>
      <div class="mx-auto text-center">
        <transition name="fade">
          <div v-if="pickedUpWords" class="stylish-box">
            <div class="h3">{{ pickedUpWords.join('') }}</div>
            <div class="judge-box">
            <span
              v-for="(vowelOrConsonant, index) in vowelOrConsonantJudgement"
              :key="index"
              :style="vowelOrConsonant == '母音' ? 'color: red;' : 'font-size: 10px' "
            >{{ vowelOrConsonant }}</span>
            </div>
          </div>
        </transition>
        <button
          class="btn btn-pink-moon"
          @click="startOrStop ? startLoop(100) : slowLoop()"
        >
          {{ startOrStopButton }}
        </button>
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
  created() {
    speechSynthesis.getVoices()
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
    ...mapGetters('voiceSetting', [
      'selectVoice',
      'volumeLevel',
      'speedSetting',
      'pitchSetting'
      ]),
    startOrStopButton() {
      return this.startOrStop ? 'スタート' : 'ストップ'
    },
    vowelOrConsonantJudgement() {
      const vowels = 'あいうえおゐゑ'
      var judgementResult = []
      for(var i = 0; i < this.pickedUpWords.length; i++) {
        if (vowels.includes(this.pickedUpWords.join('').charAt(i))) {
          judgementResult.push('母音')
        }else{
          judgementResult.push('子音')
        }
      }
      return judgementResult
    }
  },
  methods: {
    ...mapActions('randomPickedUp', ['randomPickedUpNumbers']),
    ...mapActions('voiceSetting', ['setVoiceList']),
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
      this.getVoice();
    },
    getVoice() {
      const speechOption = new SpeechSynthesisUtterance()
      const voice = speechSynthesis.getVoices()
      this.setVoiceList(voice)
      speechOption.voice = voice[this.selectVoice]
      speechOption.volume = this.volumeLevel
      speechOption.rate = this.speedSetting
      speechOption.pitch = this.pitchSetting
      speechOption.text = this.pickedUpWords.join('')
      speechSynthesis.cancel();
      speechSynthesis.speak(speechOption);
    }
  }
}
</script>

<style scoped>
.container {
  background: radial-gradient(#ffffff, #fde9ff);
}
.stylish-box {
  padding-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
  background-color: #F0F0F3;
  display: block;
  box-shadow: 1.5px 1.5px 2px rgba(174, 174, 192, 0.4), -1px -1px 3px #FFF;
}
.judge-box {
  height: 2rem;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 2.0s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>