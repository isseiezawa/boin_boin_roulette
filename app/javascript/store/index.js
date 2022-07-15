import Vue from 'vue'
import Vuex from 'vuex'
import selectedWords from './modules/selectedWords'
import resultWord from './modules/resultWord'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    selectedWords,
    resultWord
  }
})