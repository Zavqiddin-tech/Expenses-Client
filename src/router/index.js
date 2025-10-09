import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth/auth'

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
          meta: { secure: true, admin: true },
        },
        {
          path: '/expenses',
          name: 'expenses',
          component: () => import('../pages/expenses.vue'),
          meta: { secure: true },
        },
        {
          path: '/utility',
          name: 'kommunal',
          component: () => import('../pages/utility.vue'),
          meta: { secure: true },
        },
        {
          path: '/invest/:id',
          component: () => import('../views/invest/oneInvest.vue'),
          meta: { secure: true, admin: true },
        },
        {
          path: '/expenses/:departmentId/:name',
          component: () => import('../views/expenses/oneDepartmentExpenses.vue'),
          meta: { secure: true },
        },
        {
          path: '/oneCategoryExpenses/:categoryId/:name',
          component: () => import('../views/expenses/oneCategoryExpenses.vue'),
          meta: { secure: true },
        },
        {
          path: '/utility/client/:clientId/:name',
          component: () => import('../views/utility/payment.vue'),
          meta: { secure: true },
        },
        {
          path: '/utility/listwithdraw',
          component: () => import('../views/utility/list/listWithdraw.vue'),
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
