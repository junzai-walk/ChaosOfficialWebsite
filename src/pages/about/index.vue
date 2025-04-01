<template>
  <div class="home-page" @wheel="handleWheel">
    <!-- 第一部分：关于主体 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 0, 
        inactive: sectionStore.currentSection !== 0,
        'slide-next': sectionStore.currentSection < 0,
        'slide-prev': sectionStore.currentSection > 0
      }"
      ref="bannerSection">
      <AboutHome />
    </div>
    
    <!-- 第二部分：企业文化 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 1, 
        inactive: sectionStore.currentSection !== 1,
        'slide-next': sectionStore.currentSection < 1,
        'slide-prev': sectionStore.currentSection > 1
      }"
      ref="solutionSection">
      <CorporateCulture />
    </div>
    
    <!-- 第三部分：重要荣誉 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 2, 
        inactive: sectionStore.currentSection !== 2,
        'slide-next': sectionStore.currentSection < 2,
        'slide-prev': sectionStore.currentSection > 2
      }"
      ref="productSystemSection">
      <Honor />
    </div>
    
    <!-- 第四部分：诚聘英才 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 3, 
        inactive: sectionStore.currentSection !== 3,
        'slide-next': sectionStore.currentSection < 3,
        'slide-prev': sectionStore.currentSection > 3
      }"
      ref="companyProfileSection">
      <Invite />
    </div>
    
    <!-- 第五部分：联系我们 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 4, 
        inactive: sectionStore.currentSection !== 4,
        'slide-next': sectionStore.currentSection < 4,
        'slide-prev': sectionStore.currentSection > 4
      }"
      ref="caseShowcaseSection">
      <Contact />
    </div>

    <!-- 第六部分：新闻 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 5, 
        inactive: sectionStore.currentSection !== 5,
        'slide-next': sectionStore.currentSection < 5,
        'slide-prev': sectionStore.currentSection > 5
      }"
      ref="caseShowcaseSection">
      <NewsHome @handleNews="handleNews"/>
    </div>
    
     <!-- 第七部分：新闻详情 -->
     <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 6, 
        inactive: sectionStore.currentSection !== 6,
        'slide-next': sectionStore.currentSection < 6,
        'slide-prev': sectionStore.currentSection > 6
      }"
      ref="solutionSection">
      <NewsDetail :newsId="newsId"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount ,watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import AboutHome from '@/components/about/AboutHome.vue'
import CorporateCulture from '@/components/about/CorporateCulture.vue'
import Honor from '@/components/about/Honor.vue'
import Invite from '@/components/about/Invite.vue'
import Contact from '@/components/about/Contact.vue'
import NewsHome from '@/components/news/NewsHome.vue'
import NewsDetail from '@/components/news/NewsDetail.vue'

// const currentSection = ref(0)

const route = useRoute()
const router = useRouter()
// 使用 Pinia store 代替本地状态
const sectionStore = useSectionStore()
// 提供 currentSection 给子组件使用
// provide('currentSection', sectionStore.currentSection)
const newsId =ref()
const scrolling = ref(false);
const scrollDelay = 1000; // 滚动延迟，防止连续滚动

const handleNews = (val: Number | String | string) => {
  newsId.value = val
  sectionStore.currentSection = 6
}

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return;
  
  scrolling.value = true;
  
  // 向下滚动，最大值改为5
  if (e.deltaY > 0 && sectionStore.currentSection < 4) {
    sectionStore.currentSection++;
  } 
  // 向上滚动
  else if (e.deltaY < 0 && sectionStore.currentSection > 0) {
    sectionStore.currentSection--;
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
  
  // 向下箭头或Page Down
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && sectionStore.currentSection < 4) {
    sectionStore.nextSection(4)
  } 
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && sectionStore.currentSection > 0) {
    sectionStore.prevSection()
  }
  
  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  
  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden';


  // 检查URL参数中是否有section，有则跳转到对应section
  if (route.query.section) {
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 29) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
});
// 监听路由变化，以支持浏览器前进后退按钮
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 29) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
})

// 监听 currentSection 变化，更新 URL
watch(() => sectionStore.currentSection, (newSection) => {
  // 只有当 section 变化且不是从 URL 参数触发的变化时才更新 URL
  if (parseInt(route.query.section as string) !== newSection) {
    router.replace({ 
      query: { 
        ...route.query, 
        section: newSection.toString() 
      } 
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  
  // 恢复浏览器默认滚动行为
  document.body.style.overflow = '';
    // 重置section状态, 否则在返回时会停留在当前section
    sectionStore.setCurrentSection(0)
});
</script>

<style scoped>
.home-page {
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

.about-customer-section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

</style>