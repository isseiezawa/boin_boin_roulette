<template>
  <div id="speech-setting-box" class="container setting-box">
    <h4>読み上げ設定</h4>
    <div class="form-group" v-if="voiceList.length">
      <label for="voice">音声</label>
      <select
        name="voice"
        id="voice"
        class="form-control"
        :value="selectVoice"
        @input="changeVoice($event.target.value)"
      >
        <option v-for="(voice, index) in voiceList" :value="index" :key="index">
          {{ voice }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="volume">音量</label>
      {{ volumeLevel }}
      <input
        type="range"
        id="volume"
        class="form-range"
        min="0"
        max="1"
        step="0.1"
        :value="volumeLevel"
        @input="changeVolume($event.target.value)"
      />
    </div>
    <div class="form-group">
      <label for="speed">スピード</label>
      {{ speedSetting }}
      <input
        type="range"
        id="speed"
        class="form-range"
        min="0"
        max="1"
        step="0.1"
        :value="speedSetting"
        @input="changeSpeed($event.target.value)"
      />
    </div>
    <div class="form-group">
      <label for="pitch">ピッチ</label>
      {{ pitchSetting }}
      <input
        type="range"
        id="pitch"
        class="form-range"
        min="0"
        max="2"
        step="0.1"
        :value="pitchSetting"
        @input="changePitch($event.target.value)"
      />
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
</style>