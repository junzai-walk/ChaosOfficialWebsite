import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isAdminLoggedIn } from '@/api/admin'

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
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('../pages/news/index.vue')
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import('../pages/search/index.vue')
      }
    ]
  },
  // 管理员路由
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        name: 'AdminLogin',
        component: () => import('../views/admin/Login.vue'),
        meta: {
          title: '管理员登录',
          requiresGuest: true // 需要未登录状态
        }
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue'),
        meta: {
          title: '管理员后台',
          requiresAuth: true // 需要登录状态
        }
      },
      {
        path: 'charts',
        name: 'AdminCharts',
        component: () => import('../views/admin/Charts.vue'),
        meta: {
          title: '数据图表',
          requiresAuth: true // 需要登录状态
        }
      },
      {
        path: '',
        redirect: '/admin/dashboard'
      }
    ]
  }
]

export default routes
