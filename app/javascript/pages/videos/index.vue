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
        />
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
    }
  }
}
</script>