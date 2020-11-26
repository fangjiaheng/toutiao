import Vue from 'vue'
import Vuex from 'vuex'

import { setLocalStorage, getLocalStorage } from '@/utils/transform.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getLocalStorage('user')
  },
  mutations: {
    getUserInfo (state, data) {
      state.user = data
      setLocalStorage('user', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
