<template>
  <div id="result-index" class="container-fluid ">
    <h2 class="text-center mb-4">集めたワード</h2>
    <div class="row row-cols-4">
      <div v-for="(resultWord, index) in resultWords" :key="index" class="col border">
        <div>{{ resultWord.word }}<button @click="getVoice(resultWord.word)">再生</button></div>
      </div>
    </div>
    <speech-setting-box class="mt-3" />
  </div>
</template>

<script>
import SpeechSettingBox from '../../components/SpeechSettingBox.vue'
import { mapGetters, mapActions } from "vuex"

export default {
  created() {
    this.fetchResultWords();
    speechSynthesis.getVoices();
  },
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