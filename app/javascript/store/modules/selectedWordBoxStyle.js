const state = {
  selectedStyle: true
}

const getters = {
  selectedStyle: state => state.selectedStyle
}

const mutations = {
  styleChange( state, truthValue) {
    state.selectedStyle = truthValue
  }
}

const actions = {
  styleChange({ commit }, truthValue) {
    commit('styleChange', truthValue)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}