<template>
  <div class="container-fluid text-center">
    <the-roulette
      :selected-words="defaultWord"
      :free-mode="false"
    >
      <template v-slot:sub-title>
        <div
          v-if="authUser"
          class="mt-2 font-gold"
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
  data() {
    return {
      defaultWord: Array.from('おこそとのほもよろんえけせてねへめえれゑうくすつぬふむゆるをいきしちにひみいりゐあかさたなはまやらわ').reverse()
    }
  },
  computed: {
    ...mapGetters("users", ["authUser"])
  }
}
</script>