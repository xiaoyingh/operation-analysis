const state = {
  buttontime: '',
  timetype: '',
  sliderShow: true
}

const mutations = {
  buttontimeaction(state, name) {
    state.buttontime = name
  },
  timetypeaction(state, name) {
    state.timetype = name
  },
  widthCol(state, name) {
    state.sliderShow = name
  }
}

const action = {}

export default {
  namespaced: true,
  state,
  action,
  mutations
}
