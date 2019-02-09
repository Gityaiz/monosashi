// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import Vuex from 'vuex'
import authStore from './store.js'

Vue.use(Vuex)
Vue.config.productionTip = false

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyDw7414ij2BMEcx-zF_CmQPMNdvIRnWmck',
  authDomain: 'monosashi-1173a.firebaseapp.com',
  databaseURL: 'https://monosashi-1173a.firebaseio.com',
  projectId: 'monosashi-1173a',
  storageBucket: 'monosashi-1173a.appspot.com',
  messagingSenderId: '320413114490'
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: {
    auth: authStore
  },
  template: '<App/>',
  components: { App }
})
