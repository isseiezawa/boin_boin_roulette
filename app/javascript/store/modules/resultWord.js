const state = {
  resultWord: ''
}

const getters = {
  resultWord: state => state.resultWord
}

const mutations = {
  randomPickedUpWords(state, wordStorage) {
    state.resultWord = wordStorage
  }
}

const actions = {
  randomPickedUpWords({ commit }, selectedWords) {
    var wordStorage = [];
    for(var j = 0, len = selectedWords.length; j < 2; j++, len--) {
      var randomNumber = Math.floor(Math.random()*len);
      wordStorage.push(selectedWords[randomNumber]);
      selectedWords[randomNumber] = selectedWords[len-1];
    }
    commit('randomPickedUpWords', wordStorage)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}