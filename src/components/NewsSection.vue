<template>
  <div class="news-section">
    <h2 class="section-title">新闻资讯</h2>

    <!-- 主要内容区 -->
    <div class="content-container">
      <!-- 左侧新闻卡片 -->
      <div v-if="featuredNews" class="news-card" @click="handleNewsItemClick(featuredNews)">
        <img :src="featuredNews.imgUrl" :alt="featuredNews.title" class="news-image">
        <div class="news-content">
          <h3>{{ featuredNews.title }}</h3>
          <div class="news-content-p">
            <span>{{ featuredNews.subTitle }}</span>
            <span>{{ featuredNews.date }}</span>
          </div>
        </div>
      </div>

      <!-- 加载状态或默认内容 -->
      <div v-else class="news-card loading-placeholder">
        <div class="news-image-placeholder"></div>
        <div class="news-content">
          <h3>加载中...</h3>
          <div class="news-content-p">
            <span>正在获取最新新闻</span>
            <span>--</span>
          </div>
        </div>
      </div>

      <!-- 右侧新闻列表 -->
      <div class="news-list">
        <div class="news-item" v-for="(item, index) in newsItems" :key="index" @click="handleNewsItemClick(item)">
          <div class="news-item-left">
            <!-- 左侧图片区域 -->
            <div class="news-item-image">
              <img :src="item.image" alt="新闻图片" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
          <div class="news-item-content">
            <h4>{{ item.title }}</h4>
            <p class="item-date">{{ item.date }}</p>
            <p v-for="(line, i) in item.description.split('...')" :key="i" class="news-item-content-p">
              {{ line }}{{ i < item.description.split('...').length - 1 ? '...' : '' }} </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- 咨询区域 -->
      <div class="consultation-section">
        <h3 style="font-weight: bolder;">工业智能化升级，凯奥思数据与您同行</h3>
        <el-button type="primary" class="consult-btn" @click="handleConsult">
          马上咨询
        </el-button>
      </div>

      <!-- 使用新的Footer组件 -->
      <Footer />
    </div>

    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog
      v-model:visible="consultDialogVisible"
      @submit="handleConsultSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ConsultDialog from '@/components/common/ConsultDialog.vue'
import Footer from '@/components/common/Footer.vue'
import newsService from '@/data/newsService.js'

const router = useRouter()

// 定义咨询表单数据类型
interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

// 新闻数据响应式引用
const newsItems = ref([])
const featuredNews = ref(null)

// 加载新闻数据
const loadNewsData = async () => {
  try {
    // 获取最新的4条新闻用于展示
    const latestNews = await newsService.getLatestNews(4)

    if (latestNews && latestNews.length > 0) {
      // 第一条作为主要新闻卡片
      featuredNews.value = latestNews[0]

      // 其余作为右侧新闻列表，转换数据格式以适配现有模板
      newsItems.value = latestNews.slice(1).map(news => ({
        id: news.id,
        title: news.title,
        description: news.description,
        date: news.date,
        image: news.imgUrl
      }))
    }
  } catch (error) {
    console.error('加载新闻数据失败:', error)
    // 如果加载失败，可以设置默认数据或显示错误信息
  }
}

const consultDialogVisible = ref(false)

const handleConsult = () => {
  consultDialogVisible.value = true
}

const handleConsultSubmit = (formData:ConsultFormData) => {
  console.log('提交的咨询表单数据：', formData)
  // 这里可以添加表单提交到服务器的逻辑
}

const handleNewsItemClick = (item: any) => {
  console.log('新闻卡片被点击', item)
  // 跳转到新闻详情页并传递新闻ID
  router.push({
    path: '/news',
    query: {
      newsId: item.id
    }
  })
}

// 组件挂载时加载数据
onMounted(() => {
  loadNewsData()
})
</script>

<style lang="less" scoped>
// 保留原有样式，但移除footer相关样式
// 定义变量
@primary-color: #2d374b;
@text-primary: rgba(255, 255, 255, 0.9);
@text-secondary: rgba(255, 255, 255, 0.7);
@section-bg: rgba(255, 255, 255, 0.05);
@border-radius: 0.25rem;
@base-font-size: 16px; // 添加基本字体大小参考

// rem计算函数
.px2rem(@px) {
  return: unit(@px / @base-font-size, rem);
}

.news-section {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  padding-bottom: 2.5rem; // 40px -> 2.5rem
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.section-title {
  font-size: 2.25rem; // 36px -> 2.25rem
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 2rem 0 1rem 0; // 20px -> 1.25rem
}

.content-container {
  display: flex;
  justify-content: space-between;
  gap: 1.25rem; // 20px -> 1.25rem
  max-width: 75rem; // 1200px -> 75rem
  margin: 0 auto;
  padding: 0 1.25rem; // 20px -> 1.25rem
}

/* 左侧新闻卡片样式 */
.news-card {
  width: 38.5rem; // 616px -> 38.5rem
  height: 19.25rem; // 308px -> 19.25rem
  flex: 2;
  border-radius: 0.25rem; // 4px -> 0.25rem
  transition: transform 0.3s ease;
  cursor: pointer;
}

/* 加载状态样式 */
.loading-placeholder {
  opacity: 0.7;

  .news-image-placeholder {
    width: 38.5rem;
    height: 17.875rem;
    background-color: #f0f0f0;
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
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

.news-image {
  width: 38.5rem; // 616px -> 38.5rem
  height: 17.875rem; // 318px -> 19.875rem
  object-fit: cover;
}

.news-content {
  padding: 0.5rem; // 15px -> 0.9375rem
  padding-left: 0;
  text-align: left;

  .news-content-p {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem; // 14px -> 0.875rem
    color: #666;
    line-height: 1.5;
    margin-bottom: 0.625rem; // 10px -> 0.625rem
    overflow: hidden;
  }
}

.news-content h3 {
  font-size: 1.125rem; // 18px -> 1.125rem
  margin-bottom: 0.625rem; // 10px -> 0.625rem
  color: #333;
  font-weight: 600;
}

.news-content p {
  font-size: 0.875rem; // 14px -> 0.875rem
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.625rem; // 10px -> 0.625rem
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/* 右侧新闻列表样式 */
.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem; // 15px -> 0.9375rem
}

.news-item {
  width: 41.0625rem; // 657px -> 41.0625rem
  height: 5.625rem; // 90px -> 5.625rem
  padding: 0.9375rem; // 15px -> 0.9375rem
  padding-top: 0;
  border-radius: 0.25rem; // 4px -> 0.25rem
  display: flex;
  cursor: pointer;
}

.news-item-left {
  flex: 0 0 7.5rem; // 120px -> 7.5rem
  margin-right: 0.9375rem; // 15px -> 0.9375rem
}

.news-item-image {
  width: 100%;
  height: 5.7rem; // 80px -> 5rem
  background-color: #f5f5f5;
  border-radius: 0.1875rem; // 3px -> 0.1875rem
}

.news-item-content {
  flex: 1;
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-evenly;

  .item-date{
    width: 100%;
    text-align: right;
  }

  .news-item-content-p {
    font-size: 0.875rem; // 14px -> 0.875rem
    color: #666;
    line-height: 1.5;
    margin-bottom: 0.625rem; // 10px -> 0.625rem
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.news-item h4 {
  font-size: 1rem; // 16px -> 1rem
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem; // 8px -> 0.5rem
  line-height: 1.3;
  text-align: left;
}

.news-item p {
  font-size: 0.8125rem; // 13px -> 0.8125rem
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.25rem; // 4px -> 0.25rem
  text-align: left;
}

.news-item p:last-child {
  margin-bottom: 0;
}

/* 咨询区域样式 */
.consultation-section {
  margin-top: 1.25rem; // 20px -> 1.25rem
  text-align: center;
  padding: 2.5rem 0; // 40px -> 2.5rem
  background: url('@/assets/06.png') no-repeat center center;
  background-size: cover;
}

.consultation-section h3 {
  font-size: 1.5rem; // 24px -> 1.5rem
  margin-bottom: 1.25rem; // 20px -> 1.25rem
  color: #333;
}

.consult-btn {
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 1rem 1.875rem; // 12px 30px -> 0.75rem 1.875rem
  font-size: 1rem; // 16px -> 1rem
  border-radius: 1rem; // 4px -> 0.25rem
  background-color: #0072FF;
  color: #fff;
}

// 响应式样式
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .news-card,
  .news-image {
    width: 100%;
    height: auto;
  }

  .news-item {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.75rem; // 更小的标题字体
  }
}

// 添加一个用于小屏幕手机的媒体查询
@media (max-width: 375px) {
  html {
    font-size: 14px; // 在小屏幕上减小基础字体大小
  }
}

@media (max-width: 1920px) {
  .news-section {
    .content-container {
      max-width: 1200px;
    }

    .news-card {
      width: 37.5rem;
      height: 18.75rem;
    }

    .news-image {
      width: 37.5rem;
      height: 18.75rem;
    }

    .news-item {
      width: 37.5rem;
    }
  }
}

@media (max-width: 1232px) {
  .news-section {
    height: auto;
    min-height: 100vh;
    padding-bottom: 1.5rem;

    .content-container {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .news-card {
      width: 100%;
      height: auto;
    }

    .news-image {
      width: 100%;
      height: 200px;
    }

    .news-item {
      width: 100%;
      height: auto;
      flex-direction: column;
    }

    .news-item-left {
      flex: 0 0 100%;
      margin-right: 0;
      margin-bottom: 0.5rem;
    }

    .news-item-image {
      height: 150px;
    }

    .consultation-section {
      padding: 1.5rem 0;
    }

    .consultation-section h3 {
      font-size: 1.25rem;
    }
  }
}

@media (max-width: 768px) {
  .news-section {
    .section-title {
      font-size: 1.75rem;
    }

    .news-item-image {
      height: 120px;
    }
  }
}
</style>