<template>
  <div class="container-fluid text-center">
    <the-roulette
      :selected-words="freeWords"
      :free-mode="true"
      :select-the-number-of-pickups="freeSelectTheNumberOfPickups"
      :selected-pickup-number="freeSelectedPickupNumber"
      @input="freeSelectedPickupNumber = $event"
    >
      <template v-slot:sub-title>
        <div
          class="mt-2 font-gold"
        >
          フリーモード
        </div>
        <p class="text-black-50 ">
          <small>※フリーモードでは言葉は保存されません</small>
        </p>
      </template>
    </the-roulette>
    <div class="row">
      <speech-setting-box />
      <input-field />
    </div>
  </div>
</template>

<script>
import TheRoulette from '../../components/TheRoulette.vue'
import SpeechSettingBox from '../../components/SpeechSettingBox.vue'
import InputField from '../../components/InputField.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TheRoulette,
    SpeechSettingBox,
    InputField
  },
  data() {
    return {
      freeSelectedPickupNumber: 1
    }
  },
  computed: {
    ...mapGetters('freeChoiceWords', [
      'freeWords',
      'freeSelectTheNumberOfPickups'
      ]
    )
  }
}
</script>