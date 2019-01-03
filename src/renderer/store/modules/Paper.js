
const state = {
    jsonArr: []
}

const mutations = {
    //导入成功  payload => {jsonArr: [{},{},{}]}
    CHANGE_jSON_ARR(state, payload) {
        //state.jsonArr.concat(payload.jsonArr)
        state.jsonArr = state.jsonArr.concat(payload.jsonArr)
    },
    //上传成功 payload => {localId: Number}
    DELETE_ONE_PAPER(state, payload) {
        for (let i = 0, len = state.jsonArr.length; i < len; i++) {
            if (!state.jsonArr[i]) {
                continue
            } else if (payload.localId == state.jsonArr[i].localId) {
                state.jsonArr.splice(i, 1)
            }
        }
    },
    //修改某个试卷 payload => {paper: {}}
  	CHANGE_ONE_PAPER(state, payload) {
	    for (let i = 0, len = state.jsonArr.length; i < len; i++) {
	      if (!state.jsonArr[i]) {
	        continue
	      } else if (payload.paper.localId == state.jsonArr[i].localId) {
	        state.jsonArr.splice(i, 1, payload.paper)
	      }
	    }
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
    }
}

export default {
    state,
    mutations,
    actions
}
