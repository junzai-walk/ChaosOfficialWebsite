<template>
  <div class="home-page" @wheel="handleWheel">
    <!-- 第一部分：主体Banner -->
    <div
      class="section"
      :class="{
        active: sectionStore.currentSection === 0,
        inactive: sectionStore.currentSection !== 0,
        'slide-next': sectionStore.currentSection < 0,
        'slide-prev': sectionStore.currentSection > 0
      }"
      ref="bannerSection">
      <home-banner />
    </div>

    <!-- 第二部分：解决方案 -->
    <div
      class="section"
      :class="{
        active: sectionStore.currentSection === 1,
        inactive: sectionStore.currentSection !== 1,
        'slide-next': sectionStore.currentSection < 1,
        'slide-prev': sectionStore.currentSection > 1
      }"
      ref="solutionSection">
      <keep-alive>
        <solution-section />
     </keep-alive>
    </div>

    <!-- 第三部分：产品体系 -->
    <div
      class="section"
      :class="{
        active: sectionStore.currentSection === 2,
        inactive: sectionStore.currentSection !== 2,
        'slide-next': sectionStore.currentSection < 2,
        'slide-prev': sectionStore.currentSection > 2
      }"
      ref="productSystemSection">
      <product-system />
    </div>

    <!-- 第四部分：公司简介 -->
    <div
      class="section"
      :class="{
        active: sectionStore.currentSection === 3,
        inactive: sectionStore.currentSection !== 3,
        'slide-next': sectionStore.currentSection < 3,
        'slide-prev': sectionStore.currentSection > 3
      }"
      ref="companyProfileSection">
      <company-profile />
    </div>

    <!-- 第五部分：标杆案例 -->
    <div
      class="section"
      :class="{
        active: sectionStore.currentSection === 4,
        inactive: sectionStore.currentSection !== 4,
        'slide-next': sectionStore.currentSection < 4,
        'slide-prev': sectionStore.currentSection > 4
      }"
      ref="caseShowcaseSection">
      <case-showcase />
    </div>

    <!-- 第六部分：新闻资讯 -->
    <div
      class="section"
      :class="{
        active: sectionStore.currentSection === 5,
        inactive: sectionStore.currentSection !== 5,
        'slide-next': sectionStore.currentSection < 5,
        'slide-prev': sectionStore.currentSection > 5
      }"
      ref="newsSectionRef">
      <news-section />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, onErrorCaptured, watch } from 'vue'
import { useSectionStore } from '@/stores/sectionStore'
import { useRoute, useRouter } from 'vue-router'
import HomeBanner from '@/components/HomeBanner.vue'
import SolutionSection from '@/components/SolutionSection.vue'
import ProductSystem from '@/components/ProductSystem.vue'
import CompanyProfile from '@/components/CompanyProfile.vue'
import CaseShowcase from '@/components/CaseShowcase.vue'
import NewsSection from '@/components/NewsSection.vue'
import { createWheelHandler } from '@/utils/scrollHandler'

// 使用Pinia store代替provide/inject
const sectionStore = useSectionStore()
const route = useRoute()
const router = useRouter()

const scrollDirection = ref<'up' | 'down'>('down');
// 使用统一的滚动延迟，提高响应性
const scrollDelay = 300;

// 页面跳转函数
const goToSection = (sectionIndex: number) => {
  if (sectionIndex >= 0 && sectionIndex <= 5) {
    scrollDirection.value = sectionIndex > sectionStore.currentSection ? 'down' : 'up';

    // 立即更新当前部分
    sectionStore.currentSection = sectionIndex;
  }
};

// 使用优化的滚轮事件处理器
const handleWheel = createWheelHandler(
  // 向上滚动回调
  () => {
    if (sectionStore.currentSection > 0) {
      scrollDirection.value = 'up';
      sectionStore.prevSection();
    }
  },
  // 向下滚动回调
  () => {
    if (sectionStore.currentSection < 5) {
      scrollDirection.value = 'down';
      sectionStore.nextSection(5);
    }
  },
  // 配置选项
  {
    delay: scrollDelay,
    preventDefault: true,
    // 检查是否应该锁定滚动
    checkLock: () => document.body.classList.contains('no-section-scroll')
  }
);

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  // 如果页面被锁定，不处理键盘事件
  if (document.body.classList.contains('no-section-scroll')) {
    return;
  }

  // 向下箭头或Page Down，最大值为5
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && sectionStore.currentSection < 5) {
    scrollDirection.value = 'down';
    sectionStore.nextSection(5);
  }
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && sectionStore.currentSection > 0) {
    scrollDirection.value = 'up';
    sectionStore.prevSection();
  }
};

onMounted(() => {
  console.log('首页组件已挂载')
  window.addEventListener('keydown', handleKeyDown);

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden';

  // 检查URL参数中是否有section，有则跳转到对应section
  if (route.query.section) {
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 5) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
});

// 监听路由变化，以支持浏览器前进后退按钮
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 5) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
});

// 监听sectionStore.currentSection变化并更新URL
watch(() => sectionStore.currentSection, (newSection) => {
  // 更新URL而不刷新页面
  router.replace({
    query: {
      ...route.query,
      section: newSection.toString()
    }
  })
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);

  // 恢复浏览器默认滚动行为
  document.body.style.overflow = '';
});

onErrorCaptured((err) => {
  console.error('首页组件捕获到错误:', err)
  return false // 防止错误继续传播
})
</script>

<style scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #fff;
}

.section {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
  will-change: transform, opacity;
}

.section.active {
  transform: translateY(0);
  opacity: 1;
  z-index: 10;
}

.section.inactive {
  opacity: 0;
  z-index: 5;
}

.section.slide-prev {
  transform: translateY(-10%);
}

.section.slide-next {
  transform: translateY(10%);
}
</style>