import axios from '../../plugins/axios'

const state = {
  freeWords: [],
  freeDelectTheNumberOfPickups: []
}

const getters = {
  freeWords: state => state.freeWords,
  freeSelectTheNumberOfPickups(state) {
    let arr = []
    for(let i = 0; i < state.freeWords.length; i++) {
      let hash = {}
      hash.text = `${i + 1}個`
      hash.value = i + 1
      arr.push(hash)
    }
    return arr
  }
}

const mutations = {
  setWords(state, words) {
    if(words)state.freeWords = words
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