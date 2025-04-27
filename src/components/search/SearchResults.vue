<template>
  <div class="search-results" @wheel.stop="handleScroll" @touchmove.stop="handleScroll">
    <div class="results-container">
      <div class="back-button-container">
        <el-button type="text" @click="navigateBack" class="back-button">
          <el-icon><ArrowLeft /></el-icon> 返回搜索
        </el-button>
      </div>
      
      <div class="search-header">
        <div class="header-left">
          <h2 class="results-title">搜索结果: "{{ searchQuery }}"</h2>
          <span class="result-count" v-if="!loading && results.length > 0">
            共 {{ totalResults }} 条结果
          </span>
        </div>
        
        <div class="search-again">
          <el-input
            v-model="newSearchText"
            placeholder="请输入搜索关键词"
            class="search-input-small"
            @keyup.enter="performNewSearch"
          >
            <template #suffix>
              <el-button @click="performNewSearch" :icon="Search" circle size="small" />
            </template>
          </el-input>
        </div>
      </div>
      
      <div class="filter-bar" v-if="!loading && results.length > 0">
        <div class="filter-section">
          <span class="filter-label">分类:</span>
          <el-radio-group v-model="activeCategory" size="small" @change="filterResults">
            <el-radio-button label="全部">全部</el-radio-button>
            <el-radio-button label="产品">产品</el-radio-button>
            <el-radio-button label="行业">行业</el-radio-button>
            <el-radio-button label="解决方案">解决方案</el-radio-button>
            <el-radio-button label="新闻">新闻</el-radio-button>
          </el-radio-group>
        </div>
        
        <div class="sort-section">
          <span class="filter-label">排序:</span>
          <el-select v-model="sortBy" size="small" @change="sortResults" class="sort-select" popper-class="search-sort-popper">
            <el-option label="相关度" value="relevance"></el-option>
            <el-option label="最新发布" value="date"></el-option>
          </el-select>
        </div>
      </div>
      
      <div v-if="loading" class="loading">
        <el-skeleton :rows="10" animated />
      </div>
      
      <div v-else-if="results.length === 0" class="no-results">
        <el-empty description="没有找到相关结果">
          <template #image>
            <img src="@/assets/search/no-results.jpg" class="empty-image" />
          </template>
          <el-button type="primary" @click="navigateBack">返回搜索</el-button>
        </el-empty>
      </div>
      
      <div v-else class="results-list">
        <div v-for="(result, index) in displayResults" :key="index" class="result-item" :class="{ 'highlighted': index % 3 === 0 }">
          <div class="result-category-tag" :class="`category-${result.category}`">{{ result.category }}</div>
          <h3 class="result-title" @click="navigateToResult(result)">{{ result.title }}</h3>
          <p class="result-content">{{ result.content }}</p>
          <div class="result-meta">
            <span class="result-date">{{ result.date }}</span>
            <el-button type="text" @click="navigateToResult(result)" class="view-more">查看详情 <el-icon><ArrowRight /></el-icon></el-button>
          </div>
        </div>
        
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalResults"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import { Search, ArrowRight, ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const sectionStore = useSectionStore()

const loading = ref(true)
const results = ref<any[]>([])
const displayResults = ref<any[]>([])
const totalResults = ref(0)
const pageSize = ref(5)
const currentPage = ref(1)
const newSearchText = ref('')
const activeCategory = ref('全部')
const sortBy = ref('relevance')

// 从URL获取搜索查询
const searchQuery = computed(() => route.query.q || '')

// 模拟搜索功能
const performSearch = async () => {
  loading.value = true
  newSearchText.value = searchQuery.value as string
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 768))
    
    // 确保搜索查询存在且不为空
    if (searchQuery.value && searchQuery.value.toString().trim()) {
      // 根据关键词智能匹配相关内容
      const keyword = searchQuery.value.toString().toLowerCase().trim()
      console.log("执行搜索:", keyword) // 添加调试日志
      
      // 生成更相关的搜索结果
      let resultItems = []
      
      // 汽车行业相关
      if (keyword.includes('汽车')) {
        resultItems.push({
          id: 1,
          title: '汽车行业智能制造解决方案',
          content: '凯奥思为汽车行业提供全面的智能制造解决方案，包括生产线优化、质量控制、能源管理等多方面，助力汽车制造企业降本增效。',
          category: '行业',
          date: '2023-10-12',
          path: '/industry?section=20'
        })
        
        resultItems.push({
          id: 2,
          title: '汽车零部件制造数字化转型',
          content: '针对汽车零部件厂商的特定需求，提供数字化转型整体解决方案，包括智能生产排程、设备健康管理、质量追溯等系统。',
          category: '解决方案',
          date: '2023-09-18',
          path: '/industry?section=20'
        })
        
        resultItems.push({
          id: 3,
          title: '新能源汽车制造智能化应用案例',
          content: '凯奥思助力某知名新能源汽车制造商实现生产全流程智能化管理，显著提升生产效率和产品质量。',
          category: '客户案例',
          date: '2023-11-05',
          path: '/customer'
        })
      }
      
      // 添加新能源相关结果
      if (keyword.includes('新能源')) {
        resultItems.push({
          id: 10,
          title: '新能源产业智能解决方案',
          content: '面向新能源产业链的智能化解决方案，包括光伏、风电、储能等领域的智能化生产与管理系统，助力新能源企业提质增效。',
          category: '行业',
          date: '2023-11-20',
          path: '/industry?section=25'
        })
        
        resultItems.push({
          id: 11,
          title: '新能源汽车制造智能化应用',
          content: '针对新能源汽车制造全流程的智能化解决方案，覆盖电池、电机、电控等核心部件的生产与质量管控。',
          category: '解决方案',
          date: '2023-10-25',
          path: '/industry?section=25'
        })
        
        resultItems.push({
          id: 12,
          title: '某头部新能源企业智能工厂案例',
          content: '凯奥思协助某知名新能源企业打造智能工厂，实现设备健康管理、生产过程优化、质量预测与控制等功能。',
          category: '客户案例',
          date: '2023-12-05',
          path: '/customer'
        })
      }
      
      // 预测性维护相关
      if (keyword.includes('预测') || keyword.includes('维护') || keyword.includes('phm')) {
        resultItems.push({
          id: 4,
          title: '设备预测性维护与健康管理(PHM)',
          content: '凯奥思预测性维护系统通过实时监测设备运行状态，利用AI算法预测可能发生的故障，提前预警并给出维护建议，降低设备非计划停机风险。',
          category: '产品',
          date: '2023-09-15',
          path: '/products?section=0'
        })
      }
      
      // 能源管理相关
      if (keyword.includes('能源') || keyword.includes('管理') || keyword.includes('优化')) {
        resultItems.push({
          id: 5,
          title: '能源管理与优化(EMS)',
          content: '智能能源管理系统通过多维度数据采集与分析，实现能源消耗可视化、智能预测与调度优化，助力企业节能降耗。',
          category: '产品',
          date: '2023-08-20',
          path: '/products?section=15'
        })
      }
      
      // 钢铁行业相关
      if (keyword.includes('钢铁') || keyword.includes('钢厂')) {
        resultItems.push({
          id: 6,
          title: '钢铁行业智能化解决方案',
          content: '面向钢铁制造全流程的智能化解决方案，覆盖原料、炼铁、炼钢、轧制等工序，实现质量提升、能耗降低、成本优化。',
          category: '行业',
          date: '2023-10-05',
          path: '/industry?section=0'
        })
      }
      
      // 如果没有匹配到特定内容，生成通用结果
      if (resultItems.length === 0) {
        // 确保生成至少3条通用结果
        resultItems = Array(3).fill(null).map((_, i) => ({
          id: i + 100,
          title: `关于"${searchQuery.value}"的搜索结果 ${i + 1}`,
          content: `这是与"${searchQuery.value}"相关的内容描述，包含了相关技术说明和应用场景介绍。`,
          category: ['产品', '行业', '解决方案', '新闻'][Math.floor(Math.random() * 4)],
          date: '2023-' + (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0') + '-' + 
                (Math.floor(Math.random() * 28) + 1).toString().padStart(2, '0'),
          path: '/'
        }))
      }
      
      results.value = resultItems
      totalResults.value = results.value.length
      filterResults()
    } else {
      console.log("搜索查询为空") // 添加调试日志
      results.value = []
      displayResults.value = []
      totalResults.value = 0
    }
  } catch (error) {
    console.error('搜索出错:', error)
    results.value = []
    displayResults.value = []
    totalResults.value = 0
  } finally {
    loading.value = false
  }
}

const filterResults = () => {
  if (activeCategory.value === '全部') {
    displayResults.value = [...results.value]
  } else {
    displayResults.value = results.value.filter(item => item.category === activeCategory.value)
  }
  totalResults.value = displayResults.value.length
  sortResults()
}

const sortResults = () => {
  if (sortBy.value === 'date') {
    displayResults.value.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else {
    // 默认按相关度排序，这里简单实现
    displayResults.value.sort((a, b) => a.id - b.id)
  }
}

const performNewSearch = () => {
  if (newSearchText.value.trim()) {
    router.replace({ 
      query: { 
        q: newSearchText.value,
        section: '1'
      } 
    })
  }
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  // 这里应该重新获取对应页的数据
}

const navigateToResult = (result: any) => {
  // 如果结果有特定路径，则直接跳转到该路径
  if (result.path) {
    router.push(result.path)
  } else {
    // 默认跳转逻辑
    if (result.category === '产品') {
      router.push('/products')
    } else if (result.category === '行业') {
      router.push('/industry')
    } else if (result.category === '解决方案') {
      router.push('/solution')
    } else if (result.category === '新闻') {
      router.push('/news')
    } else if (result.category === '客户案例') {
      router.push('/customer')
    } else {
      router.push('/')
    }
  }
}

const navigateBack = () => {
  // 使用路由导航替代section状态切换
  router.push('/search')
}

// 处理滚动事件，阻止触发页面切换
const handleScroll = (event: Event) => {
  // 阻止事件冒泡，避免触发页面切换逻辑
  event.stopPropagation()
}

onMounted(() => {
  // 给搜索结果页添加特殊标记，表示不应触发页面切换
  document.body.classList.add('no-section-scroll')
  
  // 执行搜索
  performSearch()
  
  // 确保页面固定在搜索结果区域
  nextTick(() => {
    sectionStore.lockSection(true) // 锁定当前部分，防止滚动切换
  })
})

// 组件卸载时移除标记和锁定
onBeforeUnmount(() => {
  document.body.classList.remove('no-section-scroll')
  sectionStore.lockSection(false) // 解除锁定
})

// 修改watch，确保当路由参数改变时重新搜索
watch(() => route.query.q, (newValue) => {
  console.log("搜索查询参数变化:", newValue) // 添加调试日志
  performSearch()
}, { immediate: true })
</script>

<style scoped>
.search-results {
  width: 100%;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 3rem 0 6rem;
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.results-container {
  width: 80%;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
  margin-bottom: 3rem;
}

.back-button-container {
  margin-bottom: 1.5rem;
}

.back-button {
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #1890ff;
}

.back-button:hover {
  color: #40a9ff;
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.results-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.result-count {
  color: #666;
  font-size: 0.9rem;
}

.search-again {
  width: 280px;
}

.search-input-small {
  width: 100%;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-section, .sort-section {
  display: flex;
  align-items: center;
}

.filter-label {
  margin-right: 0.5rem;
  color: #666;
  white-space: nowrap;
}

.loading {
  padding: 2rem 0;
}

.no-results {
  padding: 3rem 0;
  text-align: center;
  color: #666;
}

.empty-image {
  width: 180px;
  height: 180px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.result-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.result-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.result-item.highlighted {
  border-left: 4px solid #1890ff;
}

.result-category-tag {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  color: white;
  border-radius: 0 8px 0 8px;
}

.category-产品 {
  background-color: #1890ff;
}

.category-行业 {
  background-color: #52c41a;
}

.category-解决方案 {
  background-color: #722ed1;
}

.category-新闻 {
  background-color: #fa8c16;
}

.result-title {
  color: #1890ff;
  cursor: pointer;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
  padding-right: 80px;
}

.result-title:hover {
  text-decoration: underline;
}

.result-content {
  color: #333;
  margin-bottom: 1.2rem;
  line-height: 1.6;
}

.result-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.9rem;
}

.view-more {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

.pagination {
  margin-top: 3.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 1rem;
}

.sort-section {
  display: flex;
  align-items: center;
  z-index: 10;
  position: relative;
}

.sort-select {
  width: 120px;
}

:deep(.el-select .el-input__wrapper) {
  background-color: #fff;
}

:deep(.el-select .el-input__inner) {
  cursor: pointer;
}

:deep(.search-sort-popper) {
  z-index: 3000 !important;
}
</style> 