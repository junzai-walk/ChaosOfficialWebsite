import { createRouter, createWebHistory } from 'vue-router'
import routesConfig from './routes'  // 重命名导入
import SearchResults from '@/components/search/SearchResults.vue'

// 添加搜索结果路由
const allRoutes = [...routesConfig]

// 添加搜索结果路由
allRoutes.push({
  path: '/search/results',
  name: 'SearchResults',
  component: SearchResults
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes
})

router.beforeEach((to, from, next) => {
  // 重置页面滚动
  document.body.style.overflow = ''
  next()
})

export default router
