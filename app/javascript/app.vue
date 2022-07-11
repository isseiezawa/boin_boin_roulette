<template>
  <div class="d-flex flex-column min-vh-100">
    <the-header class="mb-auto" />
    <router-view />
    <the-footer class="mt-auto" />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
