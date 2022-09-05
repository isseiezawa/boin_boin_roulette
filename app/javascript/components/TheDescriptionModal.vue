<template>
  <div
    class="backdrop"
    @click.self="$emit('close-description-modal')"
  >
    <div class="popup overflow-auto shadow-lg rounded-3">
      <div class="container-fluid  text-center">
        <div class="h1">
          <b>使い方</b>
        </div><hr>
        <div class="popup-body lh-lg">
          <div class="h2">
            ボインボインルーレット
          </div>
          <div /><hr>
          <div class="h2">
            フリールーレット
          </div>
          <div /><hr>
          <div class="h2">
            集めた言葉
          </div>
          <div /><hr>
        </div>
      </div>
      <div class="text-center">
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="$emit('close-description-modal')"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
.popup {
  position: fixed;
  inset: 0;
  background-color: azure;
  margin: 1rem;
  padding: 1rem;
}
.h4 {
  margin-bottom: 0.5rem;
}
</style>