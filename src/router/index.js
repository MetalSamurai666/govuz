import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SingleView from '../views/SingleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/single',
      name: 'single',
      children: [
        {
          path: ':id',
          name: 'info',
          component: SingleView,
        }
      ]
    },
  ]
})

export default router
