import Vue from 'vue'
import Router from 'vue-router'
import { authenticationGuard, roleGuardian } from "@/helpers/authenticationGuard";
import Meta from 'vue-meta'

// Views
import Home from '@/views/Home.vue'
import Profile from '@/views/Profile.vue'

Vue.use(Meta, {
	keyName: 'metaInfo',
	attribute: 'data-vue-meta',
	tagIDKeyName: 'vmid',
	refreshOnceOnNavigation: true
})
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      authenticationGuard
    }
  ]
})

export default router
