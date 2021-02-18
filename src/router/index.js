import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/*webpackChunkName: home */ '../views/home')
  },
  {
    path: '/boards',
    name: 'boards',
    component: () => import(/*webpackChunkName: boards */ '../views/boards')
  },
  {
    path: '/boards/:boardId',
    name: 'boardDetails',
    props: true,
    component: () => import(/*webpackChunkName: boardDetails */ '../views/boardDetails')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/*webpackChunkName: about */ '../views/about')
  },
]

const router = new VueRouter({
  routes
})

export default router
