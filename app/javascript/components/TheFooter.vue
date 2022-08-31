<template>
  <footer class="footer pt-3 bg-secondary bg-gradient">
    <div class="container">
      <div class="d-flex justify-content-evenly">
        <button
          class="btn text-white"
          @click="changeTermsOfUseModal"
        >
          利用規約
        </button>
        <button
          class="btn text-white"
          @click="changePrivacyPolicyModal"
        >
          プライバシーポリシー
        </button>
        >
          お問合せ
        </router-link>
      </div>
      <p class="text-center mt-3 font-italic text-white">
        <small>Copyright © 2022 issei(e) All Rights Reserved.</small>
      </p>
    </div>
    <transition name="bounce">
      <the-privacy-policy-modal
        v-if="privacyPolicyModal"
        @close-privacy-policy-modal="changePrivacyPolicyModal"
      />
    </transition>
    <transition name="bounce">
      <the-terms-of-use-modal
        v-if="TermsOfUseModal"
        @close-terms-of-use-modal="changeTermsOfUseModal"
      />
    </transition>
    <transition name="bounce">
      <the-contact-us-modal
        v-if="ContactUsModal"
        @close-contact-us-modal="changeContactUsModal"
      />
    </transition>
  </footer>
</template>

<script>
import ThePrivacyPolicyModal from './ThePrivacyPolicyModal.vue'
import TheTermsOfUseModal from './TheTermsOfUseModal.vue'

export default {
  components: {
    ThePrivacyPolicyModal,
    TheTermsOfUseModal,
  },
  data() {
    return {
      privacyPolicyModal: false,
      TermsOfUseModal: false,
    }
  },
  methods: {
    changePrivacyPolicyModal() {
      this.privacyPolicyModal = !this.privacyPolicyModal
    },
    changeTermsOfUseModal() {
      this.TermsOfUseModal = !this.TermsOfUseModal
    },
  }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>