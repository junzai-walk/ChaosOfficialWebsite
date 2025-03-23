<template>
  <header class="app-header">
    <div class="container">
      <!-- 左侧Logo区域 -->
      <div class="logo">
        <div class="logo-icon">
          <img src="@/assets/logo.png" alt="logo" />
        </div>
      </div>
      
      <!-- 中间导航菜单 - 使用 el-menu 替代原来的导航 -->
      <nav class="nav-menu">
        <el-menu 
          :default-active="activeMenu" 
          mode="horizontal" 
          background-color="#000"
          text-color="#fff"
          active-text-color="#fff"
          @select="handleSelect"
          :ellipsis="false">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/industry">行业方案</el-menu-item>
          <el-menu-item index="/products">产品中心</el-menu-item>
          <el-menu-item index="/customer">客户案例</el-menu-item>
          <el-menu-item index="/partners">合作伙伴</el-menu-item>
          <el-menu-item index="/about">关于我们</el-menu-item>
          <el-menu-item index="/news">新闻资讯</el-menu-item>
        </el-menu>
      </nav>
      
      <!-- 右侧功能区 -->
      <div class="function-area">
        <div class="phone">
          <el-icon><Phone /></el-icon>
          <span>400-8375-7867</span>
        </div>
        <div class="lang-switch">
          <el-icon><Location /></el-icon>
          <span>中文</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
      </div>
    </div>
    <div class="search-btn">
      <el-icon><Search /></el-icon>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Phone, Location, ArrowDown, Search } from '@element-plus/icons-vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeMenu = ref('/')

// 监听路由变化
watch(() => route.path, (path) => {
  activeMenu.value = path
}, { immediate: true })

// 处理菜单选择
const handleSelect = (index: string) => {
  router.push(index)
}

// 初始化时设置当前路径
onMounted(() => {
  activeMenu.value = route.path
})
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height:70px;
  background-color: #000;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.container {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-icon {
  margin-right: 10px;
}

/* 调整导航菜单容器样式 */
.nav-menu {
  flex: 1.5;
  display: flex;
  justify-content: center;
}

:deep(.el-menu) {
  border: none !important;
  background-color: transparent !important;
  display: flex;
  justify-content: center;
  width: auto;
}

:deep(.el-menu-item) {
  height: 70px;
  line-height: 70px;
  font-size: 16px;
  padding: 0 15px;
  border-bottom: none !important;
}

:deep(.el-menu-item.is-active) {
  background-color: transparent !important;
  position: relative;
  font-weight: 500;
}

:deep(.el-menu-item.is-active)::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background-color: #fff;
  transition: all 0.3s ease;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.function-area {
  display: flex;
  align-items: center;
  gap: 20px;
}

.function-area > div {
  display: flex;
  align-items: center;
}

.phone, .lang-switch {
  cursor: pointer;
}

.phone span, .lang-switch span {
  margin: 0 5px;
}

.search-btn {
  width: 70px;
  height: 70px;
  background-color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  cursor: pointer;
  margin-left: 0;
}
</style> 