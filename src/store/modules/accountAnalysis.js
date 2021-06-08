import { updateTemplate } from '@/api/commonInterface'

const state = {
  startTime: '', // 起始时间
  endTime: '', // 结束时间
  timeType: '',
  sliderShow: true,
  buttonTimeEnd: ''
}

const mutations = {
  startTimeAction(state, value) {
    state.startTime = value
  },
  endTimeAction(state, value) {
    state.endTime = value
  },
  timeTypeAction(state, value) {
    state.timeType = value
  },
  widthCol(state, value) {
    state.sliderShow = value
  }
}

const actions = {
  updateLayoutAction({ commit }, params) {
    updateTemplate(params)
      .then(res => {
      })
      .catch(err => {
        console.log(err, '模板更新失败')
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
