import axios from '../../plugins/axios'

const state = {
  performance: {
    videoTitle: '',
    videoUrl: '',
    soundUrl: ''
  },
  audioInstance: ''
}

const getters = {
  videoTitle: state => state.performance.videoTitle,
  videoUrl: state => state.performance.videoUrl,
  soundUrl: state => state.performance.soundUrl,
  audioInstance: state => state.audioInstance
}

const mutations = {
  setTitle(state, title) {
    state.performance.videoTitle = title
  },
  setVideo(state, video) {
    state.performance.videoUrl = video
  },
  setSound(state, sound) {
    state.performance.soundUrl = sound
  },
  createAudioInstance(state, audioInstance) {
    state.audioInstance = audioInstance
  }
}

const actions = {
  fetchPerformance({ commit }, boinStatus) {
    return axios.get(`performances/${boinStatus}`)
      .then(res => {
        commit('setTitle', res.data.title)
        commit('setVideo', res.data.video_url)
        commit('setSound', res.data.sound_url)
      })
      .catch(err => {
        console.log(err.responce)
      })
  },
  createAudioInstance({ commit }) {
    const audioInstance = new Audio()
    commit('createAudioInstance', audioInstance)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}