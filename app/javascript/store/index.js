import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import freeChoiceWords from './modules/freeChoiceWords'
import randomPickedUp from './modules/randomPickedUp'
import voiceSetting from './modules/voiceSetting'
import selectedWordBoxStyle from './modules/selectedWordBoxStyle'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    freeChoiceWords,
    randomPickedUp,
    voiceSetting,
    selectedWordBoxStyle
  }
})