import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import selectedWords from './modules/selectedWords'
import randomPickedUp from './modules/randomPickedUp'
import voiceSetting from './modules/voiceSetting'
import selectedWordBoxStyle from './modules/selectedWordBoxStyle'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    selectedWords,
    randomPickedUp,
    voiceSetting,
    selectedWordBoxStyle
  }
})