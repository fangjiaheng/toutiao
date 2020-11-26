import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/layout/mine/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
