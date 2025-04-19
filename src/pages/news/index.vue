<template>
  <div class="news-page" @wheel.stop="handleWheel" @touchmove.stop="handleTouchMove">
    <!-- 第一部分：新闻首页 -->
    <div
      class="section"
      :class="{ active: sectionStore.currentSection === 0, 'section-hidden': sectionStore.currentSection !== 0 }"
      ref="bannerSection">
      <NewsHome @handleNews="handleNews"/>
    </div>

    <!-- 第二部分：新闻详情 -->
    <div
      class="section"
      :class="{ active: sectionStore.currentSection === 1, 'section-hidden': sectionStore.currentSection !== 1 }"
      ref="solutionSection">
      <NewsDetail :newsId="newsId"/>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import NewsHome from '@/components/news/NewsHome.vue'
import NewsDetail from '@/components/news/NewsDetail.vue'

const route = useRoute()
const router = useRouter()
const sectionStore = useSectionStore()
const newsId = ref()

const scrolling = ref(false);
const scrollDelay = 100; // 滚动延迟，防止连续滚动
const caseId = ref()

// 判断是否是新闻详情页
const isNewsDetailActive = () => {
  return document.body.classList.contains('no-section-scroll');
}

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  // 如果是在新闻详情页面，阻止事件冒泡，允许页面内部滚动
  if (isNewsDetailActive()) {
    return;
  }

  if (scrolling.value) return;

  scrolling.value = true;

  if(e.deltaY < 0 && sectionStore.currentSection === 1){
    sectionStore.prevSection();
  }
  // 设置滚动延迟
  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

// 处理触摸移动事件
const handleTouchMove = (e: TouchEvent) => {
  // 如果是在新闻详情页面，允许页面内部滚动
  if (isNewsDetailActive()) {
    return;
  }

  // 触摸事件的其他处理逻辑可以在这里添加
}

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  // 如果是在新闻详情页面，不处理键盘事件
  if (isNewsDetailActive()) return;

  if (scrolling.value) return;

  scrolling.value = true;

  // 向上箭头或Page Up
  if ((e.key === 'ArrowUp' || e.key === 'PageUp') && sectionStore.currentSection === 1) {
    sectionStore.prevSection();
  }

  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

const handleNews = (val: Number | String | string) => {
  console.log("%c 新闻详情页", "color: red; font-size: 20px;", val)
  // 先确保解除锁定，以便能够切换section
  sectionStore.lockSection(false);
  // 设置新闻ID
  newsId.value = val;

  // 直接更新URL，包含newsId和section参数
  router.replace({
    query: {
      newsId: val.toString(),
      section: '1'
    }
  });

  // 切换到新闻详情section
  sectionStore.setCurrentSection(1);

  // 在下一个tick中重新锁定section，以便新闻详情页可以正常滚动
  nextTick(() => {
    // 给新闻详情页添加特殊标记，表示不应触发页面切换
    document.body.classList.add('no-section-scroll');
    sectionStore.lockSection(true);
  });
}

// 监听路由参数变化，支持浏览器前进后退按钮
// 监听 section 参数变化
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 1) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
})

// 监听 newsId 参数变化
watch(() => route.query.newsId, (newNewsId) => {
  if (newNewsId) {
    newsId.value = newNewsId
    sectionStore.setCurrentSection(1)
  }
}, { immediate: true })

// 监听 sectionStore.currentSection 变化并更新URL
watch(() => sectionStore.currentSection, (newSection, oldSection) => {
  // 更新URL而不刷新页面
  const query: Record<string, string> = { section: newSection.toString() }

  // 如果是新闻详情页且有newsId，保留newsId参数
  if (newSection === 1 && newsId.value) {
    query.newsId = newsId.value.toString()
  } else if (newSection === 0) {
    // 如果返回到新闻列表页，清除newsId
    newsId.value = undefined

    // 确保从详情页返回列表页时，清除特殊标记和锁定
    if (oldSection === 1) {
      document.body.classList.remove('no-section-scroll')
      sectionStore.lockSection(false)
    }
  }

  router.replace({ query })
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden';

  // 检查URL参数中是否有newsId，有则跳转到对应的新闻详情
  if (route.query.newsId) {
    newsId.value = route.query.newsId
    sectionStore.setCurrentSection(1);
  } else if (route.query.section) {
    // 如果有section参数，跳转到对应section
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 1) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  } else {
    // 确保初始化时重置为第一个section
    sectionStore.setCurrentSection(0);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);

  // 恢复浏览器默认滚动行为
  document.body.style.overflow = '';

  // 确保清除锁定
  document.body.classList.remove('no-section-scroll');
  sectionStore.lockSection(false);

  // 重置section状态
  sectionStore.setCurrentSection(0);
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