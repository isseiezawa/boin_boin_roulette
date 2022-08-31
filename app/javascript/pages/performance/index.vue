<template>
  <div
    id="performance-create-form"
    class="container"
  >
    <div class="h1 text-center mb-3 shadow-sm bg-light">
      演出追加画面
    </div>
    <div
      v-if="errorMessage"
      class="text-center"
    >
      <span
        v-for="(error, index) in errorMessage"
        :key="index"
        class="text-danger"
      >{{ error.key }}{{ error }}</span>
    </div>
    <validation-observer v-slot="{ handleSubmit }">
      <div class="shadow-sm bg-light">
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:255"
        >
          <div class="form-floating">
            <input
              id="title"
              v-model="performance.title"
              name="タイトル"
              type="text"
              class="form-control"
              placeholder="boin@example.com"
            >
            <label for="title">
              <font-awesome-icon :icon="['fas', 'at']" /> タイトル
            </label>
          </div>
          <transition name="fade">
            <div
              v-if="errors[0]"
              class="text-center"
            >
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </transition>
        </validation-provider>
        <div class="form-group text-center mt-3">
          <label for="boin-status">母音の数</label>
          <select
            id="boin-status"
            v-model="performance.boinStatus"
            class="form-control text-center"
          >
            <option
              v-for="status in selectBoinStatus"
              :key="status.value"
              :value="status.value"
            >
              {{ status.text }}
            </option>
          </select>
        </div>
      </div>
      <!-- eslint-disable vue/no-unused-vars -->
      <validation-provider
        v-slot="{ errors, validate }"
        ref="video_provider"
        name="GIF画像"
        rules="required|image_gif"
      >
        <div class="form-group text-center mt-3">
          <label for="file">GIF画像選択</label>
          <input
            id="file"
            class="form-control"
            type="file"
            accept="image/gif"
            @change="handleChange"
          >
          <transition name="fade">
            <span
              v-if="errors[0]"
              class="text-danger"
            >{{ errors[0] }}</span>
          </transition>
        </div>
      </validation-provider>
      <div
        v-if="previewVideoUrl"
        class="shadow bg-light mt-2"
      >
        <img
          :src="previewVideoUrl"
          width="100%"
        >
      </div>
      <validation-provider
        v-slot="{ errors, validate }"
        ref="sound_provider"
        name="音声ファイル"
        rules="required|audio_mp3"
      >
        <div class="form-group text-center mt-3">
          <label for="file">音声ファイル選択<small>(.mp3)</small></label>
          <input
            id="file"
            class="form-control"
            type="file"
            accept="audio/mp3"
            @change="handleChangeSound"
          >
          <transition name="fade">
            <span
              v-if="errors[0]"
              class="text-danger"
            >{{ errors[0] }}</span>
          </transition>
        </div>
      </validation-provider>
      <div
        v-if="previewSoundUrl"
        class="mt-2 text-center"
      >
        <audio
          :src="previewSoundUrl"
          controls
        />
      </div>
      <div class="d-grid gap-2 col-6 mt-3 mx-auto">
        <button
          type="submit"
          class="btn btn-outline-dark shadow-sm"
          @click="handleSubmit(handleCreate)"
        >
          作成
        </button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: "PerformanceNew",
  data() {
    return {
      performance: {
        title: "",
        boinStatus: 0,
        video: "",
        sound: ""
      },
      selectBoinStatus: [
        { text: "母音x2", value: 0 },
        { text: "母音x3", value: 1 },
        { text: "母音x4", value: 2 },
        { text: "母音x5", value: 3 },
        { text: "母音x6", value: 4 },
      ],
      previewVideoUrl: "",
      previewSoundUrl: "",
      errorMessage: []
    }
  },
  methods: {
    async handleChange(event) {
      const { valid } = await this.$refs.video_provider.validate(event)
      if(valid) {
        const file = event.target.files[0]
        this.performance.video = file
        this.previewVideoUrl = URL.createObjectURL(file)
      }
    },
    async handleChangeSound(event) {
      const { valid } = await this.$refs.sound_provider.validate(event)
      if(valid) {
        const file = event.target.files[0]
        this.performance.sound = file
        this.previewSoundUrl = URL.createObjectURL(file)
      }
    },
    handleCreate() {
      const formData = new FormData()
      formData.append("performance[title]", this.performance.title)
      formData.append("performance[boin_status]", this.performance.boinStatus)
      formData.append("performance[video]", this.performance.video)
      formData.append("performance[sound]", this.performance.sound)
      this.$axios.post("performances", formData)
        .then(res => {
          this.$router.push({ name: "VideosIndex" })
        })
        .catch(err => {
          console.log(err)
          this.errorMessage.push(err.response.data)
        })
    }
  }
}
</script>

<style scoped>
.fade-enter-active {
  transition: all 2s;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>