<template>
  <div class="container-fluid text-center">
    <the-roulette />
    <speech-setting-box />
  </div>
</template>

<script>
import TheRoulette from '../../components/TheRoulette.vue'
import SpeechSettingBox from '../../components/SpeechSettingBox.vue'

export default {
  components: {
    TheRoulette,
    SpeechSettingBox
  }
}
</script>