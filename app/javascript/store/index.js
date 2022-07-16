import Vue from 'vue'
import Vuex from 'vuex'
import selectedWords from './modules/selectedWords'
import randomPickedUp from './modules/randomPickedUp'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    selectedWords,
    randomPickedUp
  }
})