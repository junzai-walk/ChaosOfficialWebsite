import { createRouter, createWebHashHistory } from 'vue-router'
import routesConfig from './routes'  // 重命名导入
import SearchResults from '@/components/search/SearchResults.vue'
import { isAdminLoggedIn } from '@/api/admin'

// 添加搜索结果路由
const allRoutes = [...routesConfig]

// 添加搜索结果路由
allRoutes.push({
  path: '/search/results',
  name: 'SearchResults',
  component: SearchResults
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: allRoutes
})

router.beforeEach((to, from, next) => {
  // 重置页面滚动
  document.body.style.overflow = ''

  // 管理员权限检查
  if (to.meta?.requiresAuth) {
    // 需要登录的页面
    if (!isAdminLoggedIn()) {
      next('/admin/login')
      return
    }
  } else if (to.meta?.requiresGuest) {
    // 需要未登录的页面（如登录页）
    if (isAdminLoggedIn()) {
      next('/admin/dashboard')
      return
    }
  }

  next()
})

export default router
