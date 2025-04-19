<template>
  <div class="search-main" @wheel.stop="handleScroll" @touchmove.stop="handleScroll">
    <div class="search-container">
      <h1 class="title">搜索</h1>
      <div class="search-input-container">
        <el-input
          v-model="searchText"
          placeholder="请输入搜索关键词"
          class="search-input"
          :suffix-icon="Search"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button 
              type="primary" 
              class="custom-primary-button" 
              @click="handleSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
      
      <div class="hot-search">
        <h3>热门搜索</h3>
        <div class="hot-tags">
          <el-tag 
            v-for="(tag, index) in hotTags" 
            :key="index"
            @click="quickSearch(tag)"
            :type="getTagType(index)"
            effect="light"
            class="hot-tag"
          >{{ tag.text }}</el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { useSectionStore } from '@/stores/sectionStore'

const router = useRouter()
const route = useRoute()
const sectionStore = useSectionStore()
const searchText = ref('')
const hasSearched = ref(false)

// 热门搜索标签
const hotTags = [
  {text: '预测性维护', path: '/products?section=0'},
  {text: '能源管理', path: '/products?section=15'},
  {text: '汽车行业', path: '/industry?section=20'},
  {text: '钢铁行业', path: '/industry?section=0'},
  {text: '化工行业', path: '/industry?section=15'},
  {text: '设备健康管理', path: '/products?section=0'},
  {text: '库存优化', path: '/products?section=21'},
  {text: '先进过程控制', path: '/products?section=10'},
  {text: '新能源', path: '/industry?section=25'},
]

const getTagType = (index: number) => {
  const types = ['', 'success', 'info', 'warning', 'danger']
  return types[index % types.length]
}

const handleSearch = () => {
  if (searchText.value.trim()) {
    hasSearched.value = true
    console.log("执行搜索:", searchText.value) // 添加调试信息
    
    // 修改路由导航方式，确保使用正确的路径和参数
    router.push({ 
      path: '/search/results',  // 确保这个路径在路由配置中存在
      query: { 
        q: searchText.value.trim()  // 确保搜索文本被正确传递
      } 
    })
  }
}

const quickSearch = (tag: {text: string, path: string}) => {
  // 直接跳转到相应页面
  router.push(tag.path);
}

// 处理滚动事件，阻止触发页面切换
const handleScroll = (event: Event) => {
  // 阻止事件冒泡，避免触发页面切换逻辑
  event.stopPropagation()
}

onMounted(() => {
  // 给搜索页添加特殊标记，表示不应触发页面切换
  document.body.classList.add('no-section-scroll')
  
  // 如果URL已经有搜索查询，填充到搜索框
  if (route.query.q) {
    searchText.value = route.query.q as string
    console.log("从URL加载搜索查询:", searchText.value) // 添加调试信息
  }
  
  // 确保页面固定在搜索区域
  nextTick(() => {
    sectionStore.lockSection(true) // 锁定当前部分，防止滚动切换
  })
})

// 组件卸载时移除标记和锁定
onBeforeUnmount(() => {
  document.body.classList.remove('no-section-scroll')
  sectionStore.lockSection(false) // 解除锁定
})
</script>

<style scoped>
.search-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #f5f7fa; */
  background-image: url('@/assets/search/search_bg.jpg');
  background-size: cover;
  background-position: 100% 100%;
  background-repeat: no-repeat;
}

.search-container {
  width: 80%;
  max-width: 800px;
  text-align: center;
  background-color: #ffffff9c;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-110px);
}

.title {
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  font-weight: 500;
}

.search-input-container {
  width: 100%;
  margin-bottom: 40px;
}

.search-input {
  width: 100%;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #1890ff inset !important;
}

:deep(.el-input-group__append) {
  padding: 0;
}

:deep(.el-input-group__append .el-button) {
  margin: 0;
  border-radius: 0 4px 4px 0;
  height: 40px;
  padding: 0 20px;
}

.hot-search {
  margin-top: 20px;
}

.hot-search h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
}

.hot-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.hot-tag {
  cursor: pointer;
  margin: 5px;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
}

:deep(.el-tag) {
  transition: all 0.3s;
}

:deep(.el-tag:hover) {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.custom-primary-button {
  background-color: #1890ff !important;
  border-color: #1890ff !important;
  color: #fff !important;
}
</style> 