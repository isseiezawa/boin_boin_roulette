const state = {
  pickedUpNumbers: '',
  pickedUpWords: ''
}

const getters = {
  pickedUpNumbers: state => state.pickedUpNumbers,
  pickedUpWords: state => state.pickedUpWords
}

const mutations = {
  randomPickedUpNumbers(state, numberStorage) {
    state.pickedUpNumbers = numberStorage
  },
  randomPickedUpWords(state, wordStorage) {
    state.pickedUpWords = wordStorage
  }
}

const actions = {
  randomPickedUpNumbers({ commit }, selectedWords) {
    var eachNumber = [];
    for(var i = 0; i < selectedWords.length; i++){
      eachNumber[i] = i;
    }
    var numberStorage = [];
    for(var j = 0, len = eachNumber.length; j < 2; j++, len--) {
      var randomNumber = Math.floor(Math.random()*len);
      numberStorage.push(eachNumber[randomNumber]);
      eachNumber[randomNumber] = eachNumber[len-1];
    }
    commit('randomPickedUpNumbers', numberStorage)
  },
  randomPickedUpWords({ commit, state }, selectedWords){
    var wordStorage = []
    if(state.pickedUpNumbers.length) {
      for(var i = 0; i < 2; i++) {
        wordStorage.push(selectedWords[state.pickedUpNumbers[i]])
      }
      commit('randomPickedUpWords', wordStorage)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}