import axios from '../../plugins/axios'

const state = {
  freeWords: []
}

const getters = {
  freeWords: state => state.freeWords
}

const mutations = {
  setWords(state, words) {
    if(words) state.freeWords.push(words)
  },
  changeWords( state, inputWords ) {
    state.freeWords = inputWords.split(/\s/)
    if(!inputWords) state.freeWords = []
  }
}

const actions = {
  fetchWords({ commit }) {
    axios.get('settings')
      .then(res => {
        commit('setWords', res.data.word)
      })
      .catch(err => console.log(err.response))
  },
  changeWords({ commit }, inputWords) {
    commit('changeWords', inputWords)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}