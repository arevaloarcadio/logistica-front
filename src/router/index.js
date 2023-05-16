import { createRouter, createWebHistory } from '@ionic/vue-router';

import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/views/InitApp.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/user/envios',
    component: TabsPage,
    children: [
      {
        path: '',
        component: () => import('@/views/Shipments.vue')
      },
    ]
  },
  {
    path: '/user/mis_envios',
    component: TabsPage,
    children: [
      {
        path: '',
        component: () => import('@/views/MyShipments.vue')
      },
    ]
  },
  {
    path: '/admin/users',
    component: TabsPage,
    children: [
      {
        path: '',
        component: () => import('@/views/Users.vue')
      },
    ]
  },
  {
    path: '/admin/reports',
    component: TabsPage,
    children: [
      {
        path: '',
        component: () => import('@/views/Reports.vue')
      },
    ]
  },
  {
    path: '/admin/type-shipments',
    component: TabsPage,
    children: [
      {
        path: '',
        component: () => import('@/views/TypeShipments.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
