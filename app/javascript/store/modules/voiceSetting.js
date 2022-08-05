import axios from '../../plugins/axios'

const state = {
  voiceList: [],
  selectVoice: 49,
  volumeLevel: 0.5,
  speedSetting: 0.2,
  pitchSetting: 0
}

const getters = {
  voiceList: state => state.voiceList,
  selectVoice: state => state.selectVoice,
  volumeLevel: state => state.volumeLevel,
  speedSetting: state => state.speedSetting,
  pitchSetting: state => state.pitchSetting
}

const mutations = {
  setVoiceList(state, voiceList) {
    state.voiceList = []
    for(var i = 0; i < voiceList.length; i++) {
      state.voiceList.push(voiceList[i].name)
    }
  },
  changeVoice(state, selectVoice) {
    state.selectVoice = Number(selectVoice)
  },
  changeVolume(state, selectVolume) {
    state.volumeLevel = Number(selectVolume)
  },
  changeSpeed(state, selectSpeed) {
    state.speedSetting = Number(selectSpeed)
  },
  changePitch(state, selectPitch) {
    state.pitchSetting = Number(selectPitch)
  }
}

const actions = {
  setVoiceList({ commit }, voiceList) {
    commit('setVoiceList', voiceList)
  },
  changeVoice({ commit }, selectVoice) {
    commit('changeVoice', selectVoice)
  },
  changeVolume({ commit }, selectVolume) {
    commit('changeVolume', selectVolume)
  },
  changeSpeed({ commit }, selectSpeed) {
    commit('changeSpeed', selectSpeed)
  },
  changePitch({ commit }, selectPitch) {
    commit('changePitch', selectPitch)
  },
  saveVoiceSetting({ state }) {
    axios.patch('settings', {
      voice: state.selectVoice,
      volume: state.volumeLevel,
      speed: state.speedSetting,
      pitch: state.pitchSetting
    })
    .catch(err => {
      console.log(err)
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