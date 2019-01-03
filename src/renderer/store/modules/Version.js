const state = {
  version: '0.0.0',
  subjectAboutInfo: {},
  unitAndSubUnit: {}
}

const mutations = {
  //修改version
  CHANGE_VERSION(state, payload) {
    state.version = payload.version
  },
  //更新subjectAboutInfo
  SUBJECT_ABOUT_INFO(state, payload) {
    state.subjectAboutInfo = payload.subjectAboutInfo
  },
  //更新unitAndSubUnit
  UNIT_AND_SUBUINT(state, payload) {
    state.unitAndSubUnit = payload.unitAndSubUnit
  }
}

const actions = {
  CHANGE_VERSION({commit}, payload) {
    commit('CHANGE_VERSION', payload)
  },
  SUBJECT_ABOUT_INFO({commit}, payload) {
    commit('SUBJECT_ABOUT_INFO', payload)
  },
  UNIT_AND_SUBUINT({commit}, payload) {
    commit('UNIT_AND_SUBUINT', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
