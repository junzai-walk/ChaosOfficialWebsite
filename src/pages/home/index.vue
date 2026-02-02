<template>
  <div class="home-page">
    <swiper
      :modules="[SwiperMousewheel, SwiperKeyboard, SwiperEffectFade]"
      :direction="'vertical'"
      :slides-per-view="1"
      :space-between="0"
      :mousewheel="{ sensitivity: 0.3, thresholdDelta: 50, thresholdTime: 300, forceToAxis: true }"
      :keyboard="{ enabled: true, onlyInViewport: true }"
      :effect="'fade'"
      :fadeEffect="{ crossFade: true }"
      :speed="768"
      :resistance="false"
      :threshold="10"
      @swiper="onSwiperInitialized"
      @slideChange="onSlideChange"
      class="home-swiper">

      <!-- 第一部分：主体Banner -->
      <swiper-slide class="section">
        <home-banner />
      </swiper-slide>

      <!-- 第二部分：解决方案 -->
      <swiper-slide class="section">
        <keep-alive>
          <solution-section />
        </keep-alive>
      </swiper-slide>

      <!-- 第三部分：产品体系 -->
      <swiper-slide class="section">
        <product-system />
      </swiper-slide>

      <!-- 第四部分：公司简介 -->
      <swiper-slide class="section">
        <company-profile />
      </swiper-slide>

      <!-- 第五部分：标杆案例 -->
      <swiper-slide class="section">
        <case-showcase />
      </swiper-slide>

      <!-- 第六部分：新闻资讯 -->
      <swiper-slide class="section">
        <news-section />
      </swiper-slide>
    </swiper>
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

// 导入Swiper相关组件和模块
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Mousewheel as SwiperMousewheel, Keyboard as SwiperKeyboard, EffectFade as SwiperEffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

// 使用Pinia store
const sectionStore = useSectionStore()
const route = useRoute()
const router = useRouter()

// Swiper实例
import type { Swiper as SwiperType } from 'swiper'
const swiperInstance = ref<SwiperType | null>(null)

// 初始化Swiper
const onSwiperInitialized = (swiper: SwiperType) => {
  swiperInstance.value = swiper
  console.log('Swiper已初始化')

  // 设置额外的参数来提高无线鼠标的滚动体验
  swiper.mousewheel.enable()

  // 添加额外的事件处理来防止过度滚动
  swiper.on('scroll', (_swiper: SwiperType, event: WheelEvent) => {
    event.preventDefault()
  })

  // 检查URL参数中是否有section，有则跳转到对应section
  if (route.query.section) {
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 5) {
      // 使用slideTo方法跳转到指定页面
      swiper.slideTo(sectionNumber, 0)
      // 同步更新store状态
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
}

// 处理页面切换事件
const onSlideChange = (swiper: SwiperType) => {
  const currentIndex = swiper.activeIndex
  // 更新store中的当前页面索引
  sectionStore.setCurrentSection(currentIndex)
}

// 页面跳转函数
const goToSection = (sectionIndex: number) => {
  if (sectionIndex >= 0 && sectionIndex <= 5 && swiperInstance.value) {
    // 使用Swiper的slideTo方法切换页面
    swiperInstance.value.slideTo(sectionIndex)
  }
}

onMounted(() => {
  console.log('首页组件已挂载')

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden'
})

// 监听路由变化，以支持浏览器前进后退按钮
watch(() => route.query.section, (newSection) => {
  if (newSection && swiperInstance.value) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 5) {
      // 使用Swiper的slideTo方法切换页面
      swiperInstance.value.slideTo(sectionNumber)
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
  // 恢复浏览器默认滚动行为
  document.body.style.overflow = ''
})

onErrorCaptured((err) => {
  console.error('首页组件捕获到错误:', err)
  return false // 防止错误继续传播
})
</script>

<style scoped>
.home-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fff;
}

.home-swiper {
  width: 100%;
  height: 100%;
}

.section {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 自定义Swiper淡入淡出效果 */
:deep(.swiper-slide) {
  opacity: 0;
  transition: opacity 1s ease;
}

:deep(.swiper-slide-active) {
  opacity: 1;
  z-index: 10;
}

:deep(.swiper-slide-prev),
:deep(.swiper-slide-next) {
  opacity: 0;
  z-index: 5;
}

/* 增强淡入淡出效果 */
:deep(.swiper-fade .swiper-slide) {
  pointer-events: none;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

:deep(.swiper-fade .swiper-slide-active) {
  pointer-events: auto;
}

/* 确保内容在淡入淡出过程中不会抖动 */
:deep(.swiper-wrapper) {
  transition-timing-function: ease-out;
}

/* 优化鼠标滚轮交互 */
:deep(.swiper-container-vertical) {
  touch-action: pan-x;
}
</style>