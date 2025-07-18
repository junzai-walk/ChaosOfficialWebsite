<template>
  <div class="news-detail" @wheel.stop="handleScroll" @touchmove.stop="handleScroll">
    <div class="detail-header"> 新闻动态 </div>
    <div class="detail-body">
      <div class="return-button" @click="handleReturn">
        <el-icon><ArrowLeft /></el-icon>
        <span>返回</span>
      </div>
      <div class="news-container">
        <div v-if="loading" class="loading-container">
          <div class="loading-spinner"></div>
          <p>加载新闻详情中...</p>
        </div>
        <template v-else-if="newsDetail">
          <div class="news-header">
            <h1 class="title">{{ newsDetail.title }}</h1>
            <div class="meta-info">
              <span class="date">发布时间：{{ newsDetail.date }}</span>
              <span class="source">来源：凯奥思数据</span>
            </div>
          </div>
          <div class="content-wrapper">
            <div class="content" v-html="newsDetail.content"></div>
          </div>
        </template>
        <div v-else class="error-container">
          <p>未找到对应的新闻内容</p>
          <el-button @click="handleReturn" type="primary">返回新闻列表</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, onBeforeUnmount, nextTick} from 'vue'
import { useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import newsService from '@/data/newsService.js'
import type { NewsItem } from '@/types/news'

const router = useRouter()
const sectionStore = useSectionStore()

// 响应式数据
const newsDetail = ref<NewsItem | null>(null)
const loading = ref(true)

// 组件属性定义
const props = defineProps({
  newsId: {
    type: String,
    required: true
  },
})

// 加载新闻详情数据
const loadNewsDetail = async (newsId: string) => {
  if (!newsId) return

  try {
    loading.value = true
    const detail = await newsService.getNewsDetail(newsId)

    if (detail) {
      newsDetail.value = detail
    } else {
      console.error('未找到对应的新闻ID:', newsId)
    }
  } catch (error) {
    console.error('加载新闻详情失败:', error)
  } finally {
    loading.value = false
  }
}

// 监听newsId变化并更新新闻详情
watch(
  () => props.newsId,
  (newVal) => {
    console.log('NewsDetail接收到新的newsId:', newVal)
    if (newVal) {
      loadNewsDetail(newVal)
    }
  },
  { immediate: true } // 添加immediate:true确保组件挂载时立即执行一次
)

// 返回处理函数
const handleReturn = () => {
  // 始终返回到新闻列表页，而不是使用浏览器的历史记录

  // 先移除特殊标记，表示可以触发页面切换
  document.body.classList.remove('no-section-scroll')

  // 解除锁定，允许页面切换
  sectionStore.lockSection(false)

  // 先将section设置为0（新闻列表页）
  sectionStore.setCurrentSection(0)

  // 然后跳转到新闻页面，并清除newsId参数
  router.push({
    path: '/news',
    query: { section: '0' }
  })
}

// 处理滚动事件，阻止触发页面切换
const handleScroll = (event: Event) => {
  // 阻止事件冒泡，避免触发页面切换逻辑
  event.stopPropagation()
}

onMounted(() => {
  // 给新闻详情页添加特殊标记，表示不应触发页面切换
  document.body.classList.add('no-section-scroll')

  // 确保页面固定在新闻详情区域
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

<style scoped lang="less">
.news-detail {
  box-sizing: border-box;
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #f5f5f5;

  .detail-header {
    box-sizing: border-box;
    padding: 0 15rem;
    width: 100%;
    height: 11rem;
    background: url('@/assets/news/detail_header.jpg') no-repeat center center;
    background-size: 100% 100%;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    line-height: 11rem;
    display: flex;
    align-items: flex-start;
  }

  .detail-body {
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1rem;
    position: relative;

    .return-button {
      position: absolute;
      top: 25px;
      right: 10%;
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 8px 15px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: normal;
      transition: all 0.3s ease;
      z-index: 10;
      color: #2985f7;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

      &:active{
        font-weight: bolder;
        color: #0572f8;
      }

      &:hover {
        background-color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .el-icon {
        font-size: 16px;
      }
    }

    .news-container {
      max-width: 768px;
      width: 100%;
      margin: 2rem auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .news-header {
      padding: 2rem 3rem;
      border-bottom: 1px solid #eaeaea;
    }

    .title {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 1.5rem 0;
      line-height: 1.4;
    }

    .meta-info {
      display: flex;
      gap: 2rem;
      color: #888;
      font-size: 0.9rem;
    }

    .content-wrapper {
      padding: 2rem 3rem 3rem;
    }

    .content {
      width: 100%;
      text-align: left;
      line-height: 1.8;
      color: #333;
      font-size: 1rem;

      :deep(img) {
        max-width: 100%;
        height: auto;
        margin: 1.5rem auto;
        display: block;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      :deep(p) {
        margin: 1.2rem 0;
        text-indent: 2em;
      }

      :deep(b) {
        display: block;
        font-size: 1.2rem;
        margin: 1.5rem 0 1rem;
        color: #222;
      }
    }
  }
}

@media screen and (max-width: 1366px) {
  .news-detail {
    .detail-body {
      .news-container {
        max-width: 900px;
      }

      .title {
        font-size: 1.6rem;
      }

      .content-wrapper {
        padding: 1.5rem 2.5rem 2.5rem;
      }
    }
  }
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #666;

  p {
    margin-top: 1rem;
    font-size: 1rem;
  }
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #278AFA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 错误状态样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #666;

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
}
</style>