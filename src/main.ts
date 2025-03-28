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

app.mount('#app')
