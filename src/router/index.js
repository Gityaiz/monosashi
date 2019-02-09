import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin'
import signup from '@/components/signup'
import authstore from '../store.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: signin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !authstore.state.loggedIn) {
    next({
      path: '/signin', query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
