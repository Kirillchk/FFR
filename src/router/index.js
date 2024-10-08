import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RedactorView from '../views/RedactorView.vue'
import SupportView from '../views/SupportView.vue'
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
    }
  ]
})

export default router
