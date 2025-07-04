import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './style.css'
import "@/assets/css/reset.css"
import "@/styles/global.less"
import "@/styles/responsive.less"

// 计算滚动条宽度并设置 CSS 变量
const calculateScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.className = 'scrollbar-measure'
  document.body.appendChild(outer)
  const scrollbarWidth = outer.offsetWidth - outer.clientWidth
  document.body.removeChild(outer)
  document.documentElement.style.setProperty('--el-scrollbar-width', `${scrollbarWidth}px`)
  document.documentElement.style.setProperty('--original-right', '20px') // 设置默认右侧位置
}
const app = createApp(App)
const pinia = createPinia()

// 注册Element Plus with 中文语言包
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(i18n)

// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)

// 在挂载应用前计算滚动条宽度
calculateScrollbarWidth()

// 直接挂载应用
app.mount('#app')
