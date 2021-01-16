import Vue from 'vue'
import VueRouter from 'vue-router'
import about from '../views/about'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/*webpackChunkName: home */ '../views/home')
  },
  {
    path: '/about',
    name: 'About',
    component: about
  }
]

const router = new VueRouter({
  routes
})

export default router
