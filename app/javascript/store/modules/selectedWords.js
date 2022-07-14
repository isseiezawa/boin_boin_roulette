const state = {
  selectedWords: Array.from('おこそとのほもよろんえけせてねへめえれゑうくすつぬふむゆるをいきしちにひみいりゐあかさたなはまやらわ').reverse()
}

const getters = {
  selectedWords: state => state.selectedWords
}

const mutations = {
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}