const writeFile = require('write')
const path = require('path')
const exec = require('child_process').exec

let appPath =  path.join(__dirname, '../../api/startPort.js')
let num = 0

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
    writeFile(path.join(__dirname, '../../api/json/subjectAboutInfo.json'), JSON.stringify(payload), (err) => {
      console.log(err)
      if(!err){
        num++
        if(num % 2 == 0){
          exec(`node ${appPath}`, function (err) {
            console.log(err)
          })
        }
      }
    })
  },
  //更新unitAndSubUnit
  UNIT_AND_SUBUINT(state, payload) {
    state.unitAndSubUnit = payload.unitAndSubUnit
    writeFile(path.join(__dirname, '../../api/json/unitAndSubUnit.json'), JSON.stringify(payload), (err) => {
      console.log(err)
      if(!err){
        num++
        if(num % 2 == 0){
          exec(`node ${appPath}`, function (err) {
            console.log(err)
          })
        }
      }
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
