import Vue from 'vue'
import App from '../app.vue'
import router from '../router'
import store from '../store'
import axios from '../plugins/axios'
import 'bootstrap/dist/css/bootstrap.css'
// ドロップダウン使用の為追加
import "bootstrap/dist/js/bootstrap.bundle.min.js"

Vue.prototype.$axios = axios

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})
