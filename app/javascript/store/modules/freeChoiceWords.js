const state = {
  freeWords: []
}

const getters = {
  freeWords: state => state.freeWords
}

const mutations = {
  changeWords( state, inputWords ) {
    state.freeWords = inputWords.split(/\s/)
    if(!inputWords) state.freeWords = []
  }
}

const actions = {
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