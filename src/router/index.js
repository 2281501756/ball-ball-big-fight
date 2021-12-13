import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../components/Login')
  },
  {
    path: '/menu',
    component: () => import('../components/Menu')
  },
  {
    path: '/setting/personSetting',
    component: () => import('../view/setting/PersonSetting')
  },
  {
    path: '/single',
    component: () => import('../view/playground/SingleMode')
  }
]

const router = new VueRouter({
  routes,
})

export default router