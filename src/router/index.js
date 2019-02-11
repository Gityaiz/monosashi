import Vue from 'vue'
import Router from 'vue-router'
import signin from '@/components/signin'
import signup from '@/components/signup'
import authstore from '../store.js'
import home from '@/components/home'

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

router.afterEach((to, from) => {
  console.log('yobaretayo!!')
})

export default router