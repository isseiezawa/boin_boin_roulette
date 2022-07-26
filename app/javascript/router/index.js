import Vue from 'vue'
import Router from 'vue-router'
import TopIndex from '../pages/top/index'
import ResultIndex from '../pages/result/index'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: TopIndex,
      name: "TopIndex"
    },
    {
      path: "/results",
      component: ResultIndex,
      name: "ResultIndex"
    }
  ]
})

export default router