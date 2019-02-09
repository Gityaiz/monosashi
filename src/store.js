import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userid: {},
    loggedIn: false
  },
  // mutations: コンポーネントでいうmethod
  mutations: {
    setUserID (state, value) {
      state.userid = value
    },
    setLoggedIn (state) {
      state.loggedIn = true
    },
    setLogOut (state) {
      state.loggedIn = false
      state.userid = ''
    }
  },
  // getters: コンポーネントでいうcomputed
  getters: {
    userid (state) {
      return state.userid
    },
    isLoggedIn (state) {
      return state.loggedIn
    }
  },
  // mutationsで定義しているゲッタはここから呼ぶらしい
  actions: {
    setUserID ({commit}, value) {
      commit('setUserID', {value})
    },
    setLoggedIn ({commit}) {
      commit('setLoggedIn')
    },
    setLogOut ({commit}) {
      commit('setLogOut')
    }
  },
  plugins: [createPersistedState({
    key: 'scrappy',
    paths: ['userid', 'loggedIn'],
    storage: window.sessionStorage
  })]
})
export default store
