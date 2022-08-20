<template>
  <div class="container-fluid text-center">
    <the-roulette
      :selected-words="defaultWord"
      :free-mode="false"
      :select-the-number-of-pickups="defaultSelectTheNumberOfPickups"
      :selected-pickup-number="defaultSelectedPickupNumber"
      @input="defaultSelectedPickupNumber = $event"
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
      defaultWord: Array.from('おこそとのほもよろんえけせてねへめえれゑうくすつぬふむゆるをいきしちにひみいりゐあかさたなはまやらわ').reverse(),
      defaultSelectTheNumberOfPickups: [
        { text: "2個", value: 2 },
        { text: "3個", value: 3 },
        { text: "4個", value: 4 },
        { text: "5個", value: 5 },
        { text: "6個", value: 6 },
      ],
      defaultSelectedPickupNumber: 2
    }
  },
  computed: {
    ...mapGetters("users", ["authUser"])
  }
}
</script>