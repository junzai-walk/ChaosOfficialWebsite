import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'
import "@/assets/css/reset.css"
import "@/styles/global.less"

// 计算滚动条宽度并设置 CSS 变量
const calculateScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.className = 'scrollbar-measure'
  document.body.appendChild(outer)
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth
  document.body.removeChild(outer)
  document.documentElement.style.setProperty('--el-scrollbar-width', `${scrollbarWidth}px`)
  // 保存原始右侧位置
  document.querySelectorAll('.floating-menu').forEach(el => {
    const style = window.getComputedStyle(el)
    const right = style.getPropertyValue('right')
    document.documentElement.style.setProperty('--original-right', right)
  })
}
const app = createApp(App)
const pinia = createPinia()

// 注册Element Plus
app.use(ElementPlus)
app.use(i18n)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 必须在使用任何 store 之前注册 pinia
app.use(pinia)
app.use(router)

// 在挂载应用前计算滚动条宽度
calculateScrollbarWidth()

app.mount('#app')
