const state = {
  selectVoice: 49,
  volumeLevel: 0.5,
  speedSetting: 0.2,
  pitchSetting: 0
}

const getters = {
  selectVoice: state => state.selectVoice,
  volumeLevel: state => state.volumeLevel,
  speedSetting: state => state.speedSetting,
  pitchSetting: state => state.pitchSetting
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