import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../pages/home/index.vue')
      },
      {
        path: 'industry',
        name: 'Industry',
        component: () => import('../pages/industry/index.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../pages/products/index.vue')
      },
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('../pages/customer/index.vue')
      },
      {
        path: 'partners',
        name: 'Partners',
        component: () => import('../pages/partners/index.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../pages/about/index.vue')
      }
    ]
  }
]

export default routes
