<template>
  <div class="search-page" @wheel="handleWheel">
    <!-- 第一部分：搜索主体 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 0, 
        inactive: sectionStore.currentSection !== 0,
        'slide-next': sectionStore.currentSection < 0,
        'slide-prev': sectionStore.currentSection > 0
      }">
      <SearchMain />
    </div>
    
    <!-- 第二部分：搜索结果 -->
    <div 
      class="section" 
      :class="{ 
        active: sectionStore.currentSection === 1, 
        inactive: sectionStore.currentSection !== 1,
        'slide-next': sectionStore.currentSection < 1,
        'slide-prev': sectionStore.currentSection > 1
      }">
      <SearchResults />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import SearchMain from '@/components/search/SearchMain.vue'
import SearchResults from '@/components/search/SearchResults.vue'

const route = useRoute()
const router = useRouter()
const sectionStore = useSectionStore()

const scrolling = ref(false)
const scrollDelay = 100 // 滚动延迟，防止连续滚动

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return
  
  scrolling.value = true
  
  // 向下滚动，最大值为1
  if (e.deltaY > 0 && sectionStore.currentSection < 1) {
    sectionStore.currentSection++
  } 
  // 向上滚动
  else if (e.deltaY < 0 && sectionStore.currentSection > 0) {
    sectionStore.currentSection--
  }
  
  // 设置滚动延迟
  setTimeout(() => {
    scrolling.value = false
  }, scrollDelay)
}

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  if (scrolling.value) return
  
  scrolling.value = true
  
  // 向下箭头或Page Down
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && sectionStore.currentSection < 1) {
    sectionStore.nextSection(1)
  } 
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && sectionStore.currentSection > 0) {
    sectionStore.prevSection()
  }
  
  setTimeout(() => {
    scrolling.value = false
  }, scrollDelay)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  
  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden'

  // 检查URL参数中是否有section，有则跳转到对应section
  if (route.query.section) {
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 1) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
  
  // 如果有查询参数q但没有指定section，则自动跳转到结果部分
  if (route.query.q && !route.query.section) {
    sectionStore.setCurrentSection(1)
    router.replace({ 
      query: { 
        ...route.query, 
        section: '1'
      } 
    })
  }
})

// 监听路由变化，以支持浏览器前进后退按钮
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 1) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
})

// 监听sectionStore.currentSection变化并更新URL
watch(() => sectionStore.currentSection, (newSection) => {
  // 更新URL而不刷新页面
  router.replace({ 
    query: { 
      ...route.query, 
      section: newSection.toString() 
    } 
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  
  // 恢复浏览器默认滚动行为
  document.body.style.overflow = ''
  
  // 重置section状态，否则在返回时会停留在当前section
  sectionStore.setCurrentSection(0)
})
</script>

<style scoped>
.search-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.section {
  width: 100%;
  height: 100%;
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