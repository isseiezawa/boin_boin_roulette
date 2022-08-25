<template>
  <div>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="image-group">
              <img
                :src="videoUrl"
                width="100%"
              >
              <div class="inner-title">
                <small>{{ videoTitle }}</small>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-5">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="$emit('close-modal')"
              >
                ×
              </button>
              <button
                class="btn btn-outline-secondary"
                @click="audioPlay(soundUrl)"
                @click.once="$emit('push-allow', true)"
              >
                演出音
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop show" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    // eslint-disable-next-line 
    boinStatus: Number
  },
  computed: {
    ...mapGetters('performance', [
      'videoTitle',
      'videoUrl',
      'soundUrl',
      'audioInstance'
    ])
  },
  mounted() {
    this.showVideoAndSound()
  },
  methods: {
    ...mapActions('performance', [
      'fetchPerformance',
      'createAudioInstance'
      ]),
    async showVideoAndSound() {
      try {
        await this.fetchPerformance(this.boinStatus)
        setTimeout(this.audioPlay, 2000, this.soundUrl)
      } catch( error ) {
        console.log(error)
      }
    },
    async audioPlay() {
      if(!this.audioInstance) {
        await this.createAudioInstance()
      }
      this.audioInstance.src = this.soundUrl
      this.audioInstance.volume = 0.5
      this.audioInstance.play()
    }
  },
}
</script>

<style scoped>
.modal {
  display: block;
}
.modal-dialog {
  max-width: none;
  margin-top: 10vh;
}
.modal-content {
  background-color: transparent;
  border: 0;
}
.modal-header {
  border: none;
}
.image-group{
  position: relative;
}
.inner-title {
    position: absolute;
    color: rgba(255, 255, 255, 0.1);
    margin-right: 5px;
    right: 0;
    bottom: 0;
}
</style>