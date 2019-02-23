import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    email: {},
    loggedIn: false,
    fireid: {}
  },
  // mutations: コンポーネントでいうmethod
  mutations: {
    setEmail (state, value) {
      state.email = value
    },
    setLoggedIn (state) {
      state.loggedIn = true
    },
    setLogOut (state) {
      state.loggedIn = false
      state.userid = ''
    },
    setFireID (state, value) {
      state.fireid = value
    }
  },
  // getters: コンポーネントでいうcomputed
  getters: {
    email (state) {
      return state.email
    },
    isLoggedIn (state) {
      return state.loggedIn
    },
    fireid (state) {
      return state.fireid
    }
  },
  // mutationsで定義しているゲッタはここから呼ぶらしい
  actions: {
    setEmail ({commit}, value) {
      commit('setEmail', {value})
    },
    setLoggedIn ({commit}) {
      commit('setLoggedIn')
    },
    setLogOut ({commit}) {
      commit('setLogOut')
    },
    setFireID ({commit}, value) {
      commit('setFireID', {value})
    }
  },
  plugins: [
    createPersistedState({
      key: 'monosashi',
      paths: ['email', 'loggedIn', 'fireid'],
      storage: window.sessionStorage
    })
  ]
})
export default store
