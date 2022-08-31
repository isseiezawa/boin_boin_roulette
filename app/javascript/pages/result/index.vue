<template>
  <div
    id="result-index"
    class="container-fluid "
  >
    <div class="text-center mt-4">
      <div class="font-gold">
        集めた言葉
      </div>
      <div class="mt-2 mb-2 h3">
        <b>合計:{{ resultWords.length }}</b>
      </div>
      <div class="row flex-row flex-nowrap overflow-auto mb-3">
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">母音×2</div>
          <div><b>{{ maxBoinCount('boin_2') }}</b></div>
          <div>MAXボイン出現率<br>({{ Math.floor(maxBoinCount('boin_2') / resultWords.length * 100000) / 1000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">母音×3</div>
          <div><b>{{ maxBoinCount('boin_3') }}</b></div>
          <div>MAXボイン出現率<br>({{ Math.floor(maxBoinCount('boin_3') / resultWords.length * 100000) / 1000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">母音x4</div>
          <div><b>{{ maxBoinCount('boin_4') }}</b></div>
          <div>MAXボイン出現率<br>({{ Math.floor(maxBoinCount('boin_4') / resultWords.length * 100000) / 1000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">母音x5</div>
          <div><b>{{ maxBoinCount('boin_5') }}</b></div>
          <div>MAXボイン出現率<br>({{ Math.floor(maxBoinCount('boin_5') / resultWords.length * 100000) / 1000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">母音x6</div>
          <div><b>{{ maxBoinCount('boin_6') }}</b></div>
          <div>MAXボイン出現率<br>({{ Math.floor(maxBoinCount('boin_6') / resultWords.length * 100000) / 1000 + '%' }})</div>
        </div>
      </div>
    </div>
    <div class="row row-cols-4">
      <div
        v-for="(resultWord, index) in resultWords"
        :key="index"
        class="col border rounded shadow-sm bg-light"
      >
        <div>
          <font-awesome-icon
            :icon="['fas', 'circle-play']"
            class="btn p-0"
            @click="getVoice(resultWord.word)"
          />
          <span v-html="resultWordIsVowels(resultWord.word)" />
        </div>
      </div>
    </div>
    <speech-setting-box class="mt-3" />
  </div>
</template>

<script>
import SpeechSettingBox from '../../components/SpeechSettingBox.vue'
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    SpeechSettingBox
  },
  computed: {
    ...mapGetters("randomPickedUp", ["resultWords"]),
    ...mapGetters("voiceSetting", [
      "selectVoice",
      "volumeLevel",
      "speedSetting",
      "pitchSetting",
    ]),
    resultWordIsVowels() {
      return function (resultWord) {
        const vowels = "あいうえおゐゑ"
        let words = ''
        for(var i = 0; i < resultWord.length; i++) {
          let oneWord = resultWord.charAt(i)
          if (vowels.includes(oneWord)) {
            words += "<span class='text-danger fw-bolder'>" + oneWord + "</span>"
          } else {
            words += oneWord
          }
        }
        return words
      }
    },
    maxBoinCount() {
      return function (boin_status) {
        let num = 0
        for(var i = 0; i < this.resultWords.length; ++i) {
          if(this.resultWords[i].max_boin == boin_status) num++
        }
        return num
      }
    }
  },
  created() {
    this.fetchResultWords();
    speechSynthesis.getVoices();
  },
  methods: {
    ...mapActions("randomPickedUp", ["fetchResultWords"]),
    ...mapActions("voiceSetting", ["setVoiceList"]),
    getVoice(word) {
    const speechOption = new SpeechSynthesisUtterance();
    const voice = speechSynthesis.getVoices();
    this.setVoiceList(voice);
    speechOption.voice = voice[this.selectVoice];
    speechOption.volume = this.volumeLevel;
    speechOption.rate = this.speedSetting;
    speechOption.pitch = this.pitchSetting;
    speechOption.text = word;
    speechSynthesis.cancel();
    speechSynthesis.speak(speechOption);
    }
  }
}
</script>

<style scoped>
.font-gold {
	font-size: 8vw;
	text-align: center;
	line-height: 0.95em;
	font-weight: bold;
	color: transparent;
	background: repeating-linear-gradient(0deg, #B67B03 0.1em, #DAAF08 0.2em, #FEE9A0 0.3em, #DAAF08 0.4em, #B67B03 0.5em); 
	background-clip: text;
  -webkit-background-clip: text;
}
</style>