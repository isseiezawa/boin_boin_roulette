<template>
  <div
    id="result-index"
    class="container-fluid "
  >
    <div class="text-center">
      <h2>
        集めた言葉
      </h2>
      <p>合計:{{ resultWords.length }}</p>
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