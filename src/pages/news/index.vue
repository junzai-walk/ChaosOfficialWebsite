<template>
  <div class="news-page" @wheel="handleWheel">
    <!-- 第一部分：新闻首页 -->
    <div 
      class="section" 
      :class="{ active: currentSection === 0, 'section-hidden': currentSection !== 0 }"
      ref="bannerSection">
      <NewsHome @handleNews="handleNews"/>
    </div>
    
    <!-- 第二部分：新闻详情 -->
    <div 
      class="section" 
      :class="{ active: currentSection === 1, 'section-hidden': currentSection !== 1 }"
      ref="solutionSection">
      <NewsDetail :newsId="newsId"/>
    </div>
    
    
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import NewsHome from '@/components/news/NewsHome.vue'
import NewsDetail from '@/components/news/NewsDetail.vue'

const route = useRoute()
const newsId = ref()
const currentSection = ref(0)
// 提供 currentSection 给子组件使用
provide('currentSection', currentSection)


const scrolling = ref(false);
const scrollDelay = 1000; // 滚动延迟，防止连续滚动
const caseId = ref()

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return;

  scrolling.value = true;

  if(e.deltaY < 0 &&currentSection.value ===1){
    currentSection.value--;
  }
  // 设置滚动延迟
  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  if (scrolling.value) return;

  scrolling.value = true;

  // 向上箭头或Page Up
  if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection.value ==1) {
    currentSection.value--;
  }

  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

const handleNews = (val: Number | String | string) => {
  newsId.value = val
  currentSection.value = 1
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden';
  
  // 检查URL参数中是否有newsId，有则跳转到对应的新闻详情
  if (route.query.newsId) {
    newsId.value = route.query.newsId
    currentSection.value = 1
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);

  // 恢复浏览器默认滚动行为
  document.body.style.overflow = '';
});
</script>

<style scoped>
.news-page {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.section {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.section.active {
  transform: translateY(0);
  opacity: 1;
  z-index: 10;
}

.section-hidden {
  transform: translateY(100%);
  opacity: 0;
  z-index: 5;
}
</style>