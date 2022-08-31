<template>
  <div
    class="backdrop"
    @click.self="$emit('close-contact-us-modal')"
  >
    <div class="popup overflow-auto shadow-lg rounded-3">
      <div class="container-fluid text-center">
        <div class="h2">
          <b>お問い合わせ</b>
        </div><hr>
        <div class="popup-body" />
        ボインボインルーレットをご利用いただきありがとうございます！<br>
        サービスの利用に関するお問い合わせ、不具合の報告などがございましたら、<br>
        お手数ですが、下記の <a
          href="https://twitter.com/issei423"
          target="_blank"
          rel="noopener noreferrer"
        >Twitterアカウント</a>までご連絡ください。<hr>
        <a
          href="https://twitter.com/issei423"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter']"
            class="twitter-icon"
          />
        </a>
        <div>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="$emit('close-contact-us-modal')"
          >
            閉じる
          </button>
        </div>
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
.twitter-icon {
  color: rgb(1, 71, 249);
  font-size: 2rem;
}
</style>