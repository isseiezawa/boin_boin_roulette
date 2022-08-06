const bgm = new Audio(require("../../../assets/audios/boin_bgm.mp3"))
bgm.loop = true

const state = {
  boinBgm: bgm
}

const getters = {
  boinBgm: state => state.boinBgm
}

const mutations = {
  playBgm(state) {
    state.boinBgm.playbackRate = 1
    state.boinBgm.play()
  },
  slowBgm(state) {
    state.boinBgm.playbackRate = 0.8
  },
  stopBgm(state) {
    state.boinBgm.pause()
    state.boinBgm.currentTime = 0
  }
}

const actions = {
  playBgm({ commit }) {
    commit('playBgm')
  },
  slowBgm({ commit }) {
    commit('slowBgm')
  },
  stopBgm({ commit }) {
    commit('stopBgm')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}