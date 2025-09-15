import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      component: () => import('../layout/default.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
          meta: { secure: true },
        },
        {
          path: '/invest',
          name: 'invest',
          component: () => import('../pages/invest.vue'),
          meta: { secure: true },
        },
        {
          path: '/expense',
          name: 'expense',
          component: () => import('../pages/expense.vue'),
          meta: { secure: true },
        },
        {
          path: '/messages',
          name: 'messages',
          component: () => import('../pages/messages.vue'),
          meta: { secure: true },
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../layout/auth.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.secure) {
    useAuthStore().checkUser()
  }
  next()
})


export default router
