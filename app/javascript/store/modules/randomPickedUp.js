const state = {
  pickedUpNumbers: ''
}

const getters = {
  pickedUpNumbers: state => state.pickedUpNumbers
}

const mutations = {
  randomPickedUpNumbers(state, wordStorage) {
    state.pickedUpNumbers = wordStorage
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}