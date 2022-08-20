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
          <div class="text-center">
            <span class="text-danger">{{ errors[0] }}</span>
          </div>
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
        ref="provider"
        rules="required|gif_image"
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
          <span class="text-danger">{{ errors[0] }}</span>
        </div>
      </validation-provider>
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
        video: ""
      },
      selectBoinStatus: [
        { text: "母音x2", value: 0 },
        { text: "母音x3", value: 1 },
        { text: "母音x4", value: 2 },
        { text: "母音x5", value: 3 },
        { text: "母音x6", value: 4 },
      ],
      errorMessage: []
    }
  },
  methods: {
    async handleChange(event) {
      const { valid } = await this.$refs.provider.validate(event)
      if(valid) this.performance.video = event.target.files[0]
    },
    handleCreate() {
      const formData = new FormData()
      formData.append("performance[title]", this.performance.title)
      formData.append("performance[boin_status]", this.performance.boinStatus)
      formData.append("performance[video]", this.performance.video)
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