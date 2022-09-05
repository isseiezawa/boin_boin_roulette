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
        <b>総合計:{{ resultWords.length }}</b>
      </div>
      <div class="row flex-row flex-nowrap overflow-auto mb-3">
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">
            <b>母音×2</b>
          </div><hr class="mt-1 mb-1">
          <div>合計: {{ twoBoinLength }}</div>
          <div
            class="h2"
            :class="twoBoinCount > 0 ? 'rainbow' : ''"
          >
            <b>{{ twoBoinCount }}</b>
          </div>
          <div><span class="rainbow">MAXボイン</span>出現率<br>({{ Math.floor(twoBoinCount / twoBoinLength * 100000000) / 1000000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">
            <b>母音×3</b>
          </div><hr class="mt-1 mb-1">
          <div>合計: {{ threeBoinLength }}</div>
          <div
            class="h2"
            :class="threeBoinCount > 0 ? 'rainbow' : ''"
          >
            <b>{{ threeBoinCount }}</b>
          </div>
          <div><span class="rainbow">MAXボイン</span>出現率<br>({{ Math.floor(threeBoinCount / threeBoinLength * 100000000) / 1000000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">
            <b>母音x4</b>
          </div><hr class="mt-1 mb-1">
          <div>合計: {{ fourBoinLength }}</div>
          <div
            class="h2"
            :class="fourBoinCount > 0 ? 'rainbow' : ''"
          >
            <b>{{ fourBoinCount }}</b>
          </div>
          <div><span class="rainbow">MAXボイン</span>出現率<br>({{ Math.floor(fourBoinCount / fourBoinLength * 100000000) / 1000000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">
            <b>母音x5</b>
          </div><hr class="mt-1 mb-1">
          <div>合計: {{ fiveBoinLength }}</div>
          <div
            class="h2"
            :class="fiveBoinCount > 0 ? 'rainbow' : ''"
          >
            <b>{{ fiveBoinCount }}</b>
          </div>
          <div><span class="rainbow">MAXボイン</span>出現率<br>({{ Math.floor(fiveBoinCount / fiveBoinLength * 100000000) / 1000000 + '%' }})</div>
        </div>
        <div class="col-4 shadow-sm rounded bg-light pt-2 pb-3">
          <div class="text-info">
            <b>母音x6</b>
          </div><hr class="mt-1 mb-1">
          <div>合計: {{ sixBoinLength }}</div>
          <div
            class="h2"
            :class="sixBoinCount > 0 ? 'rainbow' : ''"
          >
            <b>{{ sixBoinCount }}</b>
          </div>
          <div><span class="rainbow">MAXボイン</span>出現率<br>({{ Math.floor(sixBoinCount / sixBoinLength * 100000000) / 1000000 + '%' }})</div>
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
  data() {
    return {
      twoBoinLength: 0,
      threeBoinLength: 0,
      fourBoinLength: 0,
      fiveBoinLength: 0,
      sixBoinLength: 0,
      twoBoinCount: 0,
      threeBoinCount: 0,
      fourBoinCount: 0,
      fiveBoinCount: 0,
      sixBoinCount: 0
    }
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
    }
  },
  created() {
    this.maxBoinCount();
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
    },
    async maxBoinCount() {
      await this.fetchResultWords()
      for(var i = 0; i < this.resultWords.length; i++) {
        if(this.resultWords[i].word.length == 2) { 
          this.twoBoinLength++
          if(this.resultWords[i].max_boin == 'boin_2') this.twoBoinCount++
        }else if(this.resultWords[i].word.length == 3) {
          this.threeBoinLength++
          if(this.resultWords[i].max_boin == 'boin_3') this.threeBoinCount++
        }else if(this.resultWords[i].word.length == 4) {
          this.fourBoinLength++
          if(this.resultWords[i].max_boin == 'boin_4') this.fourBoinCount++
        }else if(this.resultWords[i].word.length == 5) {
          this.fiveBoinLength++
          if(this.resultWords[i].max_boin == 'boin_5') this.fiveBoinCount++
        }else if(this.resultWords[i].word.length == 6) {
          this.sixBoinLength++
          if(this.resultWords[i].max_boin == 'boin_6') this.sixBoinCount++
        }
      }
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
.rainbow {
	background: linear-gradient(to right, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	background: -webkit-linear-gradient(left, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	background: -o-linear-gradient(right, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	background: -moz-linear-gradient(right, orange , rgb(223, 223, 0), rgb(0, 211, 0), cyan, blue, violet);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
  display: inline-block;
}
</style>