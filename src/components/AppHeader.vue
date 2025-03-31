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
          
          <!-- 行业方案菜单改为子菜单 -->
          <el-sub-menu index="/industry" popper-class="industry-submenu">
            <template #title>{{ $t('nav.industry') }}</template>
            <el-menu-item v-for="(industry, index) in industries" :key="industry.section" 
              :index="`/industry?section=${industry.section}`" class="industry-menu-item">
              <img :src="industry.icon" alt="" class="industry-icon" />
              <span>{{ industry.name }}</span>
            </el-menu-item>
          </el-sub-menu>
          
          <!-- 将产品中心改为下拉子菜单 -->
          <el-sub-menu index="/products" popper-class="products-submenu">
            <template #title>{{ $t('nav.products') }}</template>
            <!-- 智慧软件分组 -->
            <el-menu-item-group title="智慧软件">
              <el-menu-item index="/products?section=0" class="product-menu-item">
                设备预测性维护与健康管理(PHM)
              </el-menu-item>
              <el-menu-item index="/products?section=5" class="product-menu-item">
                设备全生命周期管理(EAM)
              </el-menu-item>
              <el-menu-item index="/products?section=10" class="product-menu-item">
                先进过程控制(APC)
              </el-menu-item>
              <el-menu-item index="/products?section=15" class="product-menu-item">
                能源管理与优化(EMS)
              </el-menu-item>
              <el-menu-item index="/products?section=21" class="product-menu-item">
                库存优化(IOP)
              </el-menu-item>
              <el-menu-item index="/products?section=26" class="product-menu-item">
                生产计划排程(APS)
                </el-menu-item>
            </el-menu-item-group>
            
            <!-- 智能硬件分组 -->
            <el-menu-item-group title="智能硬件">
              <el-menu-item index="/products?section=30" class="product-menu-item">
                有线传感器
              </el-menu-item>
              <el-menu-item index="/products?section=33" class="product-menu-item">
                无线智能传感器
              </el-menu-item>
              <el-menu-item index="/products?section=36" class="product-menu-item">
                边缘智能采集器
              </el-menu-item>
              <el-menu-item index="/products?section=39" class="product-menu-item">
                无线智能网关
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          
          <el-menu-item index="/customer">{{ $t('nav.customer') }}</el-menu-item>
          <el-menu-item index="/partners">{{ $t('nav.partners') }}</el-menu-item>
          <el-sub-menu  index="/about" popper-class="industry-submenu">
            <template #title>{{ $t('nav.about') }}</template>
            <el-menu-item v-for="(about, index) in abouts" :key="about.section" 
              :index="`/about?section=${about.section}`" class="industry-menu-item">
              <img :src="about.icon" alt="" class="industry-icon" />
              <span>{{ about.name }}</span>
            </el-menu-item>

          </el-sub-menu>
          <!-- <el-menu-item index="/news">{{ $t('nav.news') }}</el-menu-item> -->
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
      <img src="@/assets/header/search.png" alt="搜索" class="icon-img search-icon"/>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ref, watch, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSectionStore } from '@/stores/sectionStore'
import chaosWhite from '@/assets/logos/chaos_white.png'
import chaosBlue from '@/assets/logos/chaos_blue.png'
import telephoneWhite from '@/assets/header/telephone.png'
import telephoneBlack from '@/assets/header/black_telephone.png'
import earthWhite from '@/assets/header/earth.png'
import earthBlack from '@/assets/header/black_earth.png'

// 行业图标导入
import steelIcon from '@/assets/header/hover-steel.png'
import cementIcon from '@/assets/header/hover-cement.png'
import coalIcon from '@/assets/header/hover-coal.png'
import chemicalIcon from '@/assets/header/hover-chemical.png'
import carIcon from '@/assets/header/hover-car.png'
import newEnergyIcon from '@/assets/header/hover-new-energy.png'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()  // 使用i18n
const sectionStore = useSectionStore()

// 行业数据定义
const industries = [
  { name: '钢铁', section: 0, icon: steelIcon },
  { name: '水泥', section: 5, icon: cementIcon },
  { name: '煤炭', section: 10, icon: coalIcon },
  { name: '化工', section: 15, icon: chemicalIcon },
  { name: '汽车', section: 20, icon: carIcon },
  { name: '新能源', section: 25, icon: newEnergyIcon }
]
// 关于我们数据定义
const abouts = [
  { name: '公司概况', section: 1, icon: steelIcon },
  { name: '重要荣誉', section: 2, icon: cementIcon },
  { name: '加入我们', section: 3, icon: coalIcon },
  { name: '联系我们', section: 4, icon: chemicalIcon },
  { name: '新闻动态', section: 5, icon: carIcon },
]

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

// 计算属性：判断是否在首页，需满足两个条件：
// 1.route.path为首页
// 2.store中的currentSection为0
const isHomePage = computed(() => {
  return (route.path === '/' || route.path === '/home') && sectionStore.currentSection === 0
})

// 计算属性：根据页面动态选择 logo
const logoSrc = computed(() => {
  return isHomePage.value ? chaosWhite : chaosBlue
})

// 监听路由变化
watch(() => route.path, (path) => {
  // 只设置主路径，不包括查询参数
  activeMenu.value = path
  
  // 如果有子菜单选中，处理子菜单高亮
  if (path === '/industry' && route.query.section) {
    activeMenu.value = `/industry?section=${route.query.section}`
  }
  if (path === '/about' && route.query.section) {
    activeMenu.value = `/about?section=${route.query.section}`
  }
}, { immediate: true })

// 处理菜单选择
const handleSelect = (index: string) => {
  // 判断是否点击了主菜单项
  if (index === '/industry') {
    // 点击行业方案，直接跳转到钢铁行业（section=0）
    router.push('/industry?section=0')
  } else if (index === '/products') {
    // 点击产品中心，直接跳转到第一个产品（section=0）
    router.push('/products?section=0')
  } else if (index === '/about') {
    // 点击产品中心，直接跳转到第一个产品（section=0）
    router.push('/about?section=0')
  } else {
    // 其他正常跳转
    router.push(index)
  }
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
  
  // 处理子菜单高亮
  if (route.path === '/industry' && route.query.section) {
    activeMenu.value = `/industry?section=${route.query.section}`
  }
  if (route.path === '/about' && route.query.section) {
    activeMenu.value = `/about?section=${route.query.section}`
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

/* 行业子菜单样式 */
:deep(.el-sub-menu) {
  height: 4.375rem; /* 70px */
  
  .el-sub-menu__title {
    height: 4.375rem; /* 70px */
    line-height: 4.375rem; /* 70px */
    font-size: 1rem; /* 16px */
    padding: 0 0.9375rem; /* 15px */
    border-bottom: none !important;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
}

/* 行业子菜单项样式 */
.industry-menu-item {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0 1.25rem; /* 20px */
  
  .industry-icon {
    width: 1.875rem; /* 30px */
    height: 0.875rem; /* 30px */
    object-fit: contain;
    margin-right: 0.625rem; /* 10px */
  }
}

/* 调整弹出菜单样式 */
:deep(.industry-submenu) {
  min-width: 10rem; /* 160px */
  
  .el-menu-item {
    height: 3.125rem; /* 50px */
    line-height: 3.125rem; /* 50px */
    
    &:hover {
      background-color: #f5f7fa !important;
    }
  }
}

.home-header {
  :deep(.el-menu-item.is-active::after) {
    background-color: #fff;
  }
  
  :deep(.el-sub-menu.is-active .el-sub-menu__title::after) {
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
  
  :deep(.el-sub-menu.is-active .el-sub-menu__title::after) {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1.5rem; /* 24px */
    height: 0.125rem; /* 2px */
    background-color: #1890ff;
    transition: all 0.3s ease;
  }
  
  :deep(.el-sub-menu__title:hover) {
    background-color: rgba(0, 0, 0, 0.05) !important;
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
    border-top-left-radius: 3rem; /* 10px */
    border-bottom-left-radius: 3rem; /* 10px */
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

/* 隐藏导航菜单中的下拉箭头 */
:deep(.el-sub-menu__icon-arrow) {
  display: none !important;
}
</style>