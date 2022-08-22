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
            <div class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-outline-dark"
                @click="$emit('close-modal')"
              >
                ×
              </button>
              <button
                class="btn btn-outline-light"
                @click="audioPlay(soundUrl)"
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
export default {
  props: {
    // eslint-disable-next-line 
    boinStatus: Number
  },
  data() {
    return {
      videoTitle: "",
      videoUrl: "",
      soundUrl: ""
    }
  },
  mounted() {
    this.showVideo()
  },
  methods: {
    showVideo() {
      this.$axios.get(`performances/${this.boinStatus}`)
        .then(res => {
          console.log(res.data)
          this.videoTitle = res.data.title
          this.videoUrl = res.data.video_url
          this.soundUrl = res.data.sound_url
          setTimeout(this.audioPlay, 1000, res.data.sound_url)
        })
        .catch(err => {
          console.log(err)
        })
    },
    audioPlay(url) {
      const audio = new Audio(url)
      audio.volume = 0.5
      audio.play()
    }
  }
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