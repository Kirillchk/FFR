import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RedactorView from '../views/RedactorView.vue'
import SupportView from '../views/SupportView.vue'
import Cotalog from '../views/Cotalog.vue'
import Test from '../views/test.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Redactor',
      name: 'redactor',
      component: RedactorView
    },
    {
      path: '/Support',
      name: 'support',
      component: SupportView
    },
    {
      path: '/Cotalog',
      name: 'cotalog',
      component: Cotalog
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ]
})

export default router
