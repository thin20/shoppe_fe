import Vue from 'vue'
import Router from 'vue-router'
import { asyncRouterMapUser } from '@/config/router.config.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [].concat(asyncRouterMapUser)
})
