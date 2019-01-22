const state = {
  jsonArr: []
}

const dealAllScoreAndNum = function(row){
  row.lackScoreArr = []
  let scoreSum = 0
  let partLength = row.AllQuestionArr.length
  let AllNum = 0
  for(let i = 0; i < partLength; i++){
    if(row.AllQuestionArr && row.AllQuestionArr.length != 0){
      AllNum = row.AllQuestionArr[row.AllQuestionArr.length - 1].rangeMax
    }
    if(row.AllQuestionArr[i].children && row.AllQuestionArr[i].children.length == 0){
      let qLength = row.AllQuestionArr[i].question.length
      for(let j = 0; j < qLength; j++){
        if(!row.AllQuestionArr[i].question[j].Score){
          row.lackScoreArr.push(row.AllQuestionArr[i].question[j].Serial_num)
        }else{
          scoreSum = Number(row.AllQuestionArr[i].question[j].Score) + scoreSum
        }
      }
    }else{
      let briefLength = row.AllQuestionArr[i].children.length
      for(let j = 0; j < briefLength; j++){
        let qLength = row.AllQuestionArr[i].children[j].question.length
        for(let m = 0; m < qLength; m ++){
          console.log(i,j,m)
          if(!row.AllQuestionArr[i].children[j].questionr[m].Score){
            row.push(row.AllQuestionArr[i].children[j].question[m].Serial_num)
          }else{
            scoreSum = Number(row.AllQuestionArr[i].children[j].questionr[m].Score) + scoreSum
          }
        }
      }
    }
  }
  row.Score = scoreSum
  row.AllNum = AllNum
  return row
}
const getters = {
  dealNull: state => {
    return state.jsonArr.filter(function (item) {
      return item != null
    })
  }
}
const mutations = {
  //导入成功  payload => {jsonArr: [{},{},{}]}
  CHANGE_jSON_ARR(state, payload) {
    //state.jsonArr.concat(payload.jsonArr)
    state.jsonArr = state.jsonArr.concat(payload.jsonArr)
  },
  //上传成功 payload => {localId: Number}
  DELETE_ONE_PAPER(state, payload) {
    if(payload.localId == '-1'){
      state.jsonArr = []
    }else{
      let arr = String(payload.localId).split(';')
      for (let j = 0, len2 = arr.length; j < len2; j++) {
        for (let i = 0, len = state.jsonArr.length; i < len; i++) {
          if (!state.jsonArr[i]) {
            continue
          } else if (arr[j] == state.jsonArr[i].localId) {
            state.jsonArr.splice(i, 1)
          }
        }
      }
    }
  },
  //修改某个试卷 payload => {paper: {}}
  CHANGE_ONE_PAPER(state, payload) {
    for (let i = 0, len = state.jsonArr.length; i < len; i++) {
      if (!state.jsonArr[i]) {
        continue
      } else if (payload.paper.localId == state.jsonArr[i].localId) {

        state.jsonArr.splice(i, 1, dealAllScoreAndNum(payload.paper))
      }
    }
  },
  //修改试卷题目
  CHANGE_ONE_ITEM(state,payload){
  	console.log(state);
  	console.log(payload);
  }
}

const actions = {
  CHANGE_jSON_ARR({commit}, payload) {
    commit('CHANGE_jSON_ARR', payload)
  },
  DELETE_ONE_PAPER({commit}, payload) {
    commit('DELETE_ONE_PAPER', payload)
  },
  CHANGE_ONE_PAPER({commit}, payload) {
    commit('CHANGE_ONE_PAPER', payload)
  },
  CHANGE_ONE_ITEM({commit}, payload) {
    commit('CHANGE_ONE_PAPER', payload)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
