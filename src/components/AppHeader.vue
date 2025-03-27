<template>
  <header class="app-header" :class="{ 'home-header': isHomePage }">
    <div class="container">
      <!-- 左侧Logo区域 -->
      <div class="logo">
        <div class="logo-icon">
          <img :src="logoSrc" alt="logo" />
        </div>
      </div>

      <!-- 中间导航菜单 - 使用 el-menu 替代原来的导航 -->
      <nav class="nav-menu">
        <el-menu :default-active="activeMenu" mode="horizontal" :background-color="isHomePage ? '#000' : '#F4FCFF'"
          :text-color="isHomePage ? '#fff' : '#333'" :active-text-color="isHomePage ? '#fff' : '#1890ff'"
          @select="handleSelect" :ellipsis="false">
          <el-menu-item index="/">{{ $t('nav.home') }}</el-menu-item>
          <el-menu-item index="/industry">{{ $t('nav.industry') }}</el-menu-item>
          <el-menu-item index="/products">{{ $t('nav.products') }}</el-menu-item>
          <el-menu-item index="/customer">{{ $t('nav.customer') }}</el-menu-item>
          <el-menu-item index="/partners">{{ $t('nav.partners') }}</el-menu-item>
          <el-menu-item index="/about">{{ $t('nav.about') }}</el-menu-item>
          <el-menu-item index="/news">{{ $t('nav.news') }}</el-menu-item>
        </el-menu>
      </nav>

      <!-- 右侧功能区 -->
      <div class="function-area">
        <div class="phone">
          <img :src="isHomePage ? telephoneWhite : telephoneBlack" alt="电话" class="icon-img"/>
          <span>{{ $t('common.phone') }}</span>
        </div>
        <el-dropdown @command="handleLanguageChange">
          <div class="lang-switch">
            <img :src="isHomePage ? earthWhite : earthBlack" alt="位置" class="icon-img"/>
            <span>{{ $t('common.language') }}</span>
            <el-icon>
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">英文</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="search-btn" @mouseenter="showSearchInput = true" @mouseleave="showSearchInput = false">
      <div class="search-container" :class="{ 'active': showSearchInput }">
        <input 
          type="text" 
          :placeholder="$t('common.search')" 
          class="search-input"
          v-show="showSearchInput"
          v-model="searchText"
          @keyup.enter="handleSearch"
          ref="searchInputRef"
        />
      </div>
      <img src="@/assets/top/search.png" alt="搜索" class="icon-img search-icon"/>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import chaosWhite from '@/assets/logos/chaos_white.png'
import chaosBlue from '@/assets/logos/chaos_blue.png'
import telephoneWhite from '@/assets/top/telephone.png'
import telephoneBlack from '@/assets/top/black_telephone.png'
import earthWhite from '@/assets/top/earth.png'
import earthBlack from '@/assets/top/black_earth.png'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()  // 使用i18n

const activeMenu = ref('/')

// 搜索相关状态
const showSearchInput = ref(false)
const searchText = ref('')
const searchInputRef = ref<HTMLInputElement | null>(null)

// 处理语言切换
const handleLanguageChange = (command: string) => {
  locale.value = command  // 设置i18n的语区
  // 可以保存用户的语言偏好到localStorage
  localStorage.setItem('language', command)
}

// 计算属性：判断是否在首页
const isHomePage = computed(() => {
  return route.path === '/' || route.path === '/home'
})

// 计算属性：根据页面动态选择 logo
const logoSrc = computed(() => {
  return isHomePage.value ? chaosWhite : chaosBlue
})

// 监听路由变化
watch(() => route.path, (path) => {
  activeMenu.value = path
}, { immediate: true })

// 处理菜单选择
const handleSelect = (index: string) => {
  router.push(index)
}

// 监听搜索框显示状态，当显示时自动聚焦
watch(showSearchInput, (newVal) => {
  if (newVal) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
})

// 处理搜索提交
const handleSearch = () => {
  if (searchText.value.trim()) {
    console.log('搜索内容:', searchText.value)
    // 这里可以实现搜索逻辑，例如跳转到搜索结果页
    // router.push({ path: '/search', query: { q: searchText.value } })
    searchText.value = ''
  }
}

// 初始化时设置当前路径和语言
onMounted(() => {
  activeMenu.value = route.path
  
  // 从localStorage恢复用户上次的语言设置
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
  }
})
</script>

<style scoped lang="less">
.app-header {
  display: flex;
  justify-content: space-between;
  height: 4.375rem; /* 70px */
  background-color: #F4FCFF;
  color: #333;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  
  &.home-header {
    background-color: #000;
    color: #fff;
  }
}

.container {
  width: 90%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 1.25rem; /* 20px */
}

.logo {
  display: flex;
  align-items: center;
  
  &-icon {
    margin-right: 0.625rem; /* 10px */
    width: 9.375rem; /* 150px */
    height: 2.125rem; /* 34px */
    position: absolute;
    top: 1rem; /* 24px */
    left: 5.625rem; /* 90px */
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
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
  height: 4.375rem; /* 70px */
  line-height: 4.375rem; /* 70px */
  font-size: 1rem; /* 16px */
  padding: 0 0.9375rem; /* 15px */
  border-bottom: none !important;
  
  &.is-active {
    background-color: transparent !important;
    position: relative;
    font-weight: 500;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 1.5rem; /* 24px */
      height: 0.125rem; /* 2px */
      background-color: #fff;
      transition: all 0.3s ease;
    }
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
}

.home-header {
  :deep(.el-menu-item.is-active::after) {
    background-color: #fff;
  }
}

/* 非首页菜单项hover和active样式 */
.app-header:not(.home-header) {
  :deep(.el-menu-item) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.05) !important;
    }
    
    &.is-active::after {
      background-color: #1890ff;
    }
  }
}

.function-area {
  display: flex;
  align-items: center;
  gap: 1.25rem; /* 20px */
  
  > div {
    display: flex;
    align-items: center;
  }
}

.phone, .lang-switch {
  cursor: pointer;
  
  span {
    margin: 0 0.3125rem; /* 5px */
    color: inherit;
  }
}

.search-btn {
  width: 4.375rem; /* 70px */
  height: 4.375rem; /* 70px */
  background-color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  cursor: pointer;
  margin-left: 0;
  position: relative;
  overflow: visible;
}

.search-container {
  position: absolute;
  right: 100%;
  top: 0;
  height: 100%;
  width: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  
  &.active {
    width: 25rem; /* 从15rem增加到25rem (400px) */
  }
}

.search-input {
  width: 100%;
  height: 70%;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-size: 1rem;
  background-color: transparent;
  
  &::placeholder {
    color: #bbb;
    font-style: italic;
  }
}

.icon-img {
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  object-fit: contain;

  &.search-icon {
    width: 1.5rem; /* 调整为更合适的尺寸 */
    height: 1.5rem;
    transition: transform 0.3s ease;
    
    .search-btn:hover & {
      transform: scale(1.1);
    }
  }
}

/* 语言切换下拉菜单样式 */
.lang-switch {
  display: flex;
  align-items: center;
  padding: 0.3125rem 0.625rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: transparent;
  }

  &:focus-visible {
    outline: none;
  }
}

.home-header .lang-switch {
  color: #fff;
  
  &:hover {
    background-color: transparent;
  }
}

/* 非首页下拉菜单颜色 */
.app-header:not(.home-header) {
  .lang-switch {
    color: #333;
  }
  
  .phone span {
    color: #333;
  }
}

:deep(.el-dropdown-menu) {
  padding: 0.625rem 0;
  min-width: 6.25rem;
  
  .el-dropdown-menu__item {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    color: #333;
    cursor: pointer;
    
    &:hover {
      background-color: #f5f7fa;
      color: #1890ff;
    }
  }
}
</style>