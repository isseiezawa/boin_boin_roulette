<template>
  <div
    id="performance-index"
    class="container"
  >
    <div class="row row-cols-auto">
      <div
        v-for="(performance, index) in performances"
        :key="index"
        class="col border"
      >
        <div class="text-center">
          {{ performance.title }}({{ performance.boin_status }})
        </div>
        <img
          :src="performance.video_url"
          width="200vw"
        >
        <div class="text-center">
          <button
            class="btn btn-outline-success"
            @click="audioPlay(performance.sound_url)"
          >
            音声再生
          </button>
          <button
            class="btn btn-outline-danger"
            @click="deleteVideo(performance.id, index)"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mame: "PerformanceIndex",
  data() {
    return {
      performances: []
    }
  },
  created() {
    this.setVideo()
  },
  methods: {
    setVideo() {
      this.$axios.get("performances")
        .then(res => {
          this.performances = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    audioPlay(audio_url) {
      const audio = new Audio(audio_url)
      audio.volume = 0.5
      audio.play()
    },
    deleteVideo(videoId, index) {
      this.$axios.delete(`performances/${videoId}`)
        .then(res => {
          this.performances.splice(index, 1)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>