<template>
  <div class="news-box" @wheel.stop="handleScroll" @touchmove.stop="handleScroll">
    <div class="news-header"> 新闻动态 </div>
    <div class="news-body">
      <div class="body-left">
        <div class="title">凯奥思资讯</div>
        <div class="main-news">
          <div v-if="featuredNews" class="main-news-left">
            <div class="news-left-content">
              <div class="content-main-title">
                {{ featuredNews.title }}
              </div>
              <div class="content-sub-title">
                {{ featuredNews.subTitle }}
              </div>
              <div class="time">
                {{ featuredNews.date }}
              </div>
            </div>
            <div class="content-main-action" @click="handleNews(featuredNews.id)">
              <div class="text">查看详情</div>
              <div class="icon">→</div>
            </div>
          </div>
          <div v-else class="main-news-left loading">
            <div class="news-left-content">
              <div class="content-main-title">加载中...</div>
              <div class="content-sub-title">正在获取最新新闻</div>
              <div class="time">--</div>
            </div>
          </div>
          <div class="main-news-right" :style="{ backgroundImage: `url(${featuredNews?.imgUrl || image4})` }"></div>
        </div>
        <div class="news-list">
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>加载新闻列表中...</p>
          </div>
          <template v-else>
            <div class="news-row" v-for="item in visibleNews" :key="item.id" @click="handleNews(item.id)">
              <div class="main-image" :style="{ backgroundImage: `url(${item.imgUrl})` }"></div>
              <div class="news-rows-content">
                <div class="rows-title">
                  <div class="row-main-title">{{ item.mainTitle }}</div>
                  <div class="row-sub-title">{{ item.subTitle }}</div>
                </div>
                <div class="rows-time">
                  <div class="icon">↗</div>
                  <div class="date">{{ item.date }}</div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="button">
          <el-button @click="loadMore" v-if="hasMore">加载更多</el-button>
          <el-divider content-position="center" v-else style="margin: 30px 0;">到底啦</el-divider>
        </div>
      </div>
      <div class="body-right">
        <div class="title">热点推荐</div>
        <div class="hotpot-list">
          <div v-if="loading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>加载热点推荐中...</p>
          </div>
          <template v-else>
            <div class="hotpot-row" v-for="item in hotpotList" :key="item.id" @click="handleNews(item.id)">
              <div class="hotpot-title">{{ item.mainTitle }}</div>
              <div class="hotpot-time">{{item.date}}</div>
            </div>
          </template>
        </div>
      </div>
    </div>

     <!-- 使用新的Footer组件 -->
     <div class='footer-wrapper'>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,computed, onMounted, onBeforeUnmount, nextTick} from 'vue'
import { useSectionStore } from '@/stores/sectionStore'
import Footer from '@/components/common/Footer.vue'
import newsService from '@/data/newsService.js'
import image4 from '@/assets/news/image4.png'
import type { NewsItem, NewsListItem, HotNewsItem } from '@/types/news'

const sectionStore = useSectionStore()
const emit = defineEmits(['handleNews'])

// 响应式数据
const newsList = ref<NewsListItem[]>([])
const hotpotList = ref<HotNewsItem[]>([])
const featuredNews = ref<NewsItem | null>(null)
const loading = ref(true)

// 加载新闻数据
const loadNewsData = async () => {
  try {
    loading.value = true

    // 获取所有新闻数据（已排序）
    const allNews = await newsService.getAllNews()

    if (allNews && allNews.length > 0) {
      // 设置主要新闻（第一条）
      featuredNews.value = allNews[0]

      // 设置新闻列表（除第一条外的其他新闻），转换数据格式以适配现有模板
      newsList.value = allNews.slice(1).map((news: NewsItem): NewsListItem => ({
        id: news.id,
        imgUrl: news.imgUrl,
        mainTitle: news.title,
        subTitle: news.subTitle,
        date: news.date
      }))
    }

    // 获取热点新闻
    const hotNews = await newsService.getHotNews()
    if (hotNews && hotNews.length > 0) {
      hotpotList.value = hotNews.map((news: NewsItem): HotNewsItem => ({
        id: news.id,
        mainTitle: news.title,
        date: news.date
      }))
    }

  } catch (error) {
    console.error('加载新闻数据失败:', error)
    // 可以设置默认数据或显示错误信息
  } finally {
    loading.value = false
  }
}
// 显示控制
const showCount = ref(8) // 限制显示8条新闻
const pageSize = ref(5)

// 计算属性
const visibleNews = computed(() => {
  return newsList.value.slice(0, showCount.value)
})

const hasMore = computed(() => {
  return showCount.value < newsList.value.length
})

// 方法
const loadMore = () => {
  showCount.value = Math.min(showCount.value + pageSize.value, newsList.value.length)
}

const handleNews = (id: any) => {
  console.log('点击新闻项，触发handleNews事件，ID:', id);
  // 解除锁定，确保父组件可以切换section
  sectionStore.lockSection(false);
  // 触发事件
  emit('handleNews', id);
}

// 处理滚动事件，阻止触发页面切换
const handleScroll = (event: Event) => {
  // 阻止事件冒泡，避免触发页面切换逻辑
  event.stopPropagation()
}

onMounted(() => {
  // 给新闻页面添加特殊标记，表示不应触发页面切换
  document.body.classList.add('no-section-scroll')

  // 在新闻首页不锁定section，以便可以切换到新闻详情页
  // 仅在新闻详情页才锁定section

  // 加载新闻数据
  loadNewsData()
})

// 组件卸载时移除标记和锁定
onBeforeUnmount(() => {
  document.body.classList.remove('no-section-scroll')
  sectionStore.lockSection(false) // 解除锁定
})
</script>

<style scoped lang="less">
.news-box {
  box-sizing: border-box;
  padding-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: scroll;

  .footer-wrapper {
    width: 100%;

    :deep(.footer){
      padding: 2.5rem 0 1rem 0 !important;
    }
  }

  .news-header {
    box-sizing: border-box;
    padding: 0 0 0 11.5rem;
    width: 100%;
    min-height: 14rem;
    background: url("@/assets/news/banner.jpg") no-repeat center center;
    background-size: 100% 100%;
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    line-height: 14rem;
    display: flex;
    align-items: flex-start;
  }

  .news-body {
    box-sizing: border-box;
    flex: 1;
    width: 100vw;
    display: flex;
    padding: 0 11.5rem;
    padding-top: 2rem;
    gap: 2rem;
    // overflow-y: auto;

    .title {
      width: 100%;
      height: 3.5rem;
      background-color: #fff;
      text-align: left;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .body-left {
      flex: 1;
      height: 100%;

      .main-news {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: 12rem;
        margin-bottom: 2rem;

        .main-news-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 70%;
          height: 100%;

          .news-left-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .content-main-title {
              font-size: 1rem;
              font-weight: 700;
              margin-bottom: 0.75rem;
            }

            .content-sub-title {
              font-size: 0.85rem;
              font-weight: 700;
              margin-bottom: 0.75rem;
              color: #bbb;
            }

            .time {
              font-size: 0.85rem;
              color: #bbb;
            }
          }

          .content-main-action {
            cursor: pointer;
            width: 4rem;
            padding: 0.5rem;
            background-color: #278AFA;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            color: #fff;
            font-size: 0.75rem;
          }
        }

        .main-news-right {
          flex: 1;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-blend-mode: overlay;
        }
      }

      .news-list {
        min-height: 30vh;

        .news-row {
          display: flex;
          width: 100%;
          height: 7rem;
          margin-bottom: 1rem;
          cursor: pointer;

          .main-image {
            height: 100%;
            width: 12rem;
            margin-right: 2rem;
            background-size: cover;
            background-position: center;
            background-blend-mode: overlay;
          }

          .news-rows-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            flex: 1;
            height: 100%;

            .rows-title {
              text-align: left;

              .row-main-title {
                font-weight: 700;
                margin-bottom: 0.75rem;
              }

              .row-sub-title {
                font-weight: 700;
                margin-bottom: 0.5rem;
                color: #bbb;
                font-size: 0.85rem;
              }
            }

            .rows-time {
              width: 100%;
              display: flex;
              justify-content: space-between;
              color: #bbb;
              font-size: 0.75rem;
            }
          }
        }
      }

      .button{
        margin-bottom: 1rem;
      }
    }

    .body-right {
      width: 30%;
      .hotpot-list{
        .hotpot-row{
          box-sizing: border-box;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
          height: 5rem;
          text-align: left;
          margin-bottom: 0.75rem;
          cursor: pointer;
          
          .hotpot-title{
            font-weight: 700;
            margin-bottom: 0.75rem;
            line-height: 1.3;
          }
          .hotpot-time{
            font-weight: 700;
            font-size: 0.75rem;
            color: #aaa;
          }
        }
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
  padding: 2rem;
  color: #666;

  p {
    margin-top: 1rem;
    font-size: 0.9rem;
  }
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #278AFA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading {
  opacity: 0.6;

  .content-main-title {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    height: 1.2rem;
    margin-bottom: 0.75rem;
  }

  .content-sub-title {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    height: 1rem;
    margin-bottom: 0.75rem;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>