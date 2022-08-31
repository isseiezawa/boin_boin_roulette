import axios from '../../plugins/axios'

const state = {
  pickedUpNumbers: '',
  pickedUpWords: '',
  resultWords: []
}

const getters = {
  pickedUpNumbers: state => state.pickedUpNumbers,
  pickedUpWords: state => state.pickedUpWords,
  resultWords: state => state.resultWords
}

const mutations = {
  randomPickedUpNumbers(state, numberStorage) {
    state.pickedUpNumbers = numberStorage
  },
  randomPickedUpWords(state, wordStorage) {
    state.pickedUpWords = wordStorage
  },
  fetchResultWords(state, words) {
    state.resultWords = words
  },
  saveWord(state, word) {
    state.resultWords.push(word)
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
  },
  fetchResultWords({ commit }) {
    axios.get('results')
      .then(res => {
        commit('fetchResultWords', res.data)
      })
      .catch(err => console.log(err.response))
  },
  saveWord({ commit, state }, max_boin) {
    return axios.post('results', {
      word: state.pickedUpWords.join(''),
      max_boin: max_boin
    })
    .then(res => {
      commit('saveWord', res.data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}