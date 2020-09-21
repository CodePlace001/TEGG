import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      //登录和注册
      path: '/p1',
      component: () => import('../views/p1.vue'),
    },
    {
      //个人中心
      path: '/my',
      component: () => import('../views/my.vue'),
    }
  ]
})

export default router
