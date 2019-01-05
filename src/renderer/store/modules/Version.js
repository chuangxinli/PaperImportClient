const writeFile = require('write')

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
    console.log(11111)
    state.subjectAboutInfo = payload.subjectAboutInfo
    writeFile('json/subjectAboutInfo.json', JSON.stringify(payload), (err) => {
      console.log(err)
    })
  },
  //更新unitAndSubUnit
  UNIT_AND_SUBUINT(state, payload) {
    console.log(22222)
    state.unitAndSubUnit = payload.unitAndSubUnit
    writeFile('json/unitAndSubUnit.json', JSON.stringify(payload), (err) => {
      console.log(err)
    })
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
