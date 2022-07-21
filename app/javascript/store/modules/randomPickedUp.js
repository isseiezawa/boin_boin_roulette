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
  randomPickedUpNumbers({ commit, dispatch }, { selectedWords, selectedPickupNumber }) {
    var eachNumber = [];
    for(var i = 0; i < selectedWords.length; i++){
      eachNumber[i] = i;
    }
    var numberStorage = [];
    for(var j = 0, len = eachNumber.length; j < selectedPickupNumber; j++, len--) {
      var randomNumber = Math.floor(Math.random()*len);
      numberStorage.push(eachNumber[randomNumber]);
      eachNumber[randomNumber] = eachNumber[len-1];
    }
    commit('randomPickedUpNumbers', numberStorage)
    dispatch('randomPickedUpWords', { selectedWords, selectedPickupNumber })
  },
  randomPickedUpWords({ commit, state }, { selectedWords, selectedPickupNumber }){
    var wordStorage = []
    if(state.pickedUpNumbers.length) {
      for(var i = 0; i < selectedPickupNumber; i++) {
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