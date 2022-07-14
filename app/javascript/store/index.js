import Vue from 'vue'
import Vuex from 'vuex'
import boins from './modules/boins'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    boins
  }
})