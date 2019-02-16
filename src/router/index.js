import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin'
import authstore from '../store.js'
import home from '@/components/home'
import mypage from '@/components/mypage'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: mypage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !authstore.state.loggedIn) {
    console.log('not logged in')
    next({
      path: '/signin', query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
})

export default router
