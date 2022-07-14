import Vue from 'vue'
import Vuex from 'vuex'
import selectedWords from './modules/selectedWords'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    selectedWords
  }
})