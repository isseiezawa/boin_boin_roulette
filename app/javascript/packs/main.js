import Vue from 'vue'
import App from '../app.vue'
import router from '../router'
import 'bootstrap/dist/css/bootstrap.css'
// ドロップダウン使用の為追加
import "bootstrap/dist/js/bootstrap.bundle.min.js"

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router,
    render: h => h(App)
  }).$mount()
  document.body.appendChild(app.$el)

  console.log(app)
})
