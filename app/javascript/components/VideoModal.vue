<template>
  <div>
    <div
      class="modal"
      @click.self="$emit('close-modal')"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="btn btn-outline-dark"
              @click="$emit('close-modal')"
            >
              ×
            </button>
            <video
              :src="videoUrl"
              width="100%"
              muted
              autoplay
            />
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
        videoUrl: ""
      }
    },
    mounted() {
      this.showVideo()
    },
    methods: {
      showVideo() {
      this.$axios.get(`performances/${this.boinStatus}`)
        .then(res => {
          this.videoUrl = res.data.video_url
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
}
.modal-content {
  background-color: transparent;
  border: 0;
}
.modal-header {
  border: none;
}
</style>