import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
  state: {
    route_name: 'PaperNotYet'
  },
  mutations: {
    change_route(state, payload) {
      state.route_name = payload.route_name
    }
  }
})

export default store
