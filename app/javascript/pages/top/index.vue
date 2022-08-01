<template>
  <div class="container-fluid text-center">
    <the-roulette>
      <template v-slot:sub-title>
        <div
          v-if="authUser"
          class="mt-2"
        >
          収集モード
        </div>
      </template>
    </the-roulette>
    <speech-setting-box />
  </div>
</template>

<script>
import TheRoulette from '../../components/TheRoulette.vue'
import SpeechSettingBox from '../../components/SpeechSettingBox.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TheRoulette,
    SpeechSettingBox
  },
  computed: {
    ...mapGetters("users", ["authUser"])
  }
}
</script>