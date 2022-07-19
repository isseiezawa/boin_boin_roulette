<template>
  <div
    id="speech-setting-box"
    class="container setting-box"
  >
    <h5 class="pt-2 pb-2 shadow-sm rounded">
      読み上げ設定
    </h5>
    <transition name="slide-fade">
      <div
        v-if="voiceList.length"
        class="form-group"
      >
        <label
          for="voice"
          class="shadow-sm rounded"
        >音声</label>
        <select
          id="voice"
          name="voice"
          class="form-control"
          :value="selectVoice"
          @input="changeVoice($event.target.value)"
        >
          <option
            v-for="(voice, index) in voiceList"
            :key="index"
            :value="index"
            class="text-center"
          >
            <span class="h6">{{ voice }}</span>
          </option>
        </select>
      </div>
    </transition>
    <div class="form-group">
      <label for="volume">音量</label>
      <span class="h6">{{ volumeLevel }}</span>
      <input
        id="volume"
        type="range"
        class="form-range"
        min="0"
        max="1"
        step="0.1"
        :value="volumeLevel"
        @input="changeVolume($event.target.value)"
      >
    </div>
    <div class="form-group">
      <label for="speed">スピード</label>
      <span class="h6">{{ speedSetting }}</span>
      <input
        id="speed"
        type="range"
        class="form-range"
        min="0"
        max="1"
        step="0.1"
        :value="speedSetting"
        @input="changeSpeed($event.target.value)"
      >
    </div>
    <div class="form-group">
      <label for="pitch">ピッチ</label>
      <span class="h6">{{ pitchSetting }}</span>
      <input
        id="pitch"
        type="range"
        class="form-range"
        min="0"
        max="2"
        step="0.1"
        :value="pitchSetting"
        @input="changePitch($event.target.value)"
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("voiceSetting", [
      "voiceList",
      "selectVoice",
      "volumeLevel",
      "speedSetting",
      "pitchSetting",
    ]),
  },
  methods: {
    ...mapActions("voiceSetting", [
      "changeVoice",
      "changeVolume",
      "changeSpeed",
      "changePitch",
    ]),
  },
};
</script>

<style scoped>
.setting-box {
  width: 50%;
  background: #fff;
  border-radius: 2%;
  box-shadow: -20px -10px 50px 5px rgb(150, 147, 147) inset;
}
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-enter{
  transform: translateY(10px);
  opacity: 0;
}
</style>