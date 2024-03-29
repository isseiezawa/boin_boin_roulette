import Vue from 'vue'
import Router from 'vue-router'
import TopIndex from '../pages/top/index'
import FreeIndex from '../pages/free/index'
import ResultIndex from '../pages/result/index'
import RegisterIndex from '../pages/register/index'
import LoginIndex from '../pages/login/index'
import VideosIndex from '../pages/videos/index'
import PerformanceIndex from '../pages/performance/index'
import store from '../store'

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
      path: "/free",
      component: FreeIndex,
      name: "FreeIndex"
    },
    {
      path: "/results",
      component: ResultIndex,
      name: "ResultIndex",
      meta: { requiredAuth: true }
    },
    {
      path: "/register",
      component: RegisterIndex,
      name: "RegisterIndex"
    },
    {
      path: '/login',
      component: LoginIndex,
      name: 'LoginIndex'
    },
    {
      path: '/videos',
      component: VideosIndex,
      name: 'VideosIndex',
      meta: { requiredAuth: true }
    },
    {
      path: '/performances',
      component: PerformanceIndex,
      name: 'PerformanceIndex',
      meta: { requiredAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.dispatch('users/fetchAuthUser').then((authUser) => {
    if (to.matched.some(record => record.meta.requiredAuth) && !authUser) {
      next({ name: 'LoginIndex' });
    } else {
      next();
    }
  })
})

export default router