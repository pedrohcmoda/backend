
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import Home from '../pages/Index.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import Profile from '../pages/Profile.vue'
import Register from '@/pages/Register.vue'

const router = createRouter({
  history: createWebHistory("/"),
})



router.addRoute({ path: '/', component: Home })
router.addRoute({ path: '/Login', component: Login })
router.addRoute({ path: '/Profile', component: Profile })
router.addRoute({ path: '/Register', component: Register })
router.addRoute({ path: '/Index', redirect: '/' })
router.addRoute({path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound})



export default router
