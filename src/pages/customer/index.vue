<template>
  <div class="home-page" @wheel="handleWheel">
    <!-- 第一部分：案例中心 -->
    <div 
      class="section" 
      :class="{ 
        active: currentSection === 0, 
        inactive: currentSection !== 0,
        'slide-next': currentSection < 0,
        'slide-prev': currentSection > 0
      }"
      ref="caseSection">
      <div class="case-customer-section">
        <div class="background-image"></div>
        <div class="content-wrapper">
          <div class="content">
            <div class="main-title">凯奥思数据案例中心</div>
            <div class="sub-title">用算法穿透噪声，用数据定义可靠</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 第二部分：标杆案例 -->
    <div 
      class="section" 
      :class="{ 
        active: currentSection === 1, 
        inactive: currentSection !== 1,
        'slide-next': currentSection < 1,
        'slide-prev': currentSection > 1
      }"
      ref="solutionSection">
      <BenchmarkCase @selectActiveCard="selectActiveCard" />
    </div>
    
    <!-- 第三部分：伙伴展示 -->
    <div 
      class="section" 
      :class="{ 
        active: currentSection === 2, 
        inactive: currentSection !== 2,
        'slide-next': currentSection < 2,
        'slide-prev': currentSection > 2
      }"
      ref="solutionSection">
      <PartnerDisplay />
    </div>
    
    <!-- 第四部分：案例展示 -->
    <div 
      class="section"
      :class="{ 
        active: currentSection === 3, 
        inactive: currentSection !== 3,
        'slide-next': currentSection < 3,
        'slide-prev': currentSection > 3
      }" 
      ref="solutionSection">
      <CaseDetail :caseId="caseId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BenchmarkCase from '@/components/customer/BenchmarkCase.vue';
import PartnerDisplay from '@/components/customer/PartnerDisplay.vue';
import CaseDetail from '@/components/customer/CaseDetail.vue';

const route = useRoute();
const router = useRouter();
const currentSection = ref(0)
// 提供 currentSection 给子组件使用
provide('currentSection', currentSection)

// 定义caseId变量来传递给CaseDetail组件
const caseId = ref('')

// 监听路由参数变化
watch(() => route.query, (newQuery) => {
  if (newQuery.section) {
    currentSection.value = parseInt(newQuery.section as string);
  }
  
  // 如果URL中有caseId参数，更新caseId值
  if (newQuery.caseId) {
    caseId.value = newQuery.caseId as string;
  }
}, { immediate: true, deep: true });

// 监听 currentSection 变化，更新 URL
watch(() => currentSection.value, (newSection) => {
  // 只有当 section 变化且不是从 URL 参数触发的变化时才更新 URL
  if (parseInt(route.query.section as string) !== newSection) {
    router.replace({ 
      query: { 
        ...route.query, 
        section: newSection.toString() 
      } 
    })
  }
});

const scrolling = ref(false);
const scrollDelay = 100; // 滚动延迟，防止连续滚动

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return;

  scrolling.value = true;

  // 向下滚动，最大值改为2
  if (e.deltaY > 0 && currentSection.value < 2) {
    currentSection.value++;
  }
  // 向上滚动
  else if (e.deltaY < 0 && currentSection.value > 0) {
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

  // 向下箭头或Page Down，最大值改为2
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection.value < 2) {
    currentSection.value++;
  }
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection.value > 0) {
    currentSection.value--;
  }

  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

// BenchmarkCase组件点击卡片时触发的事件
const selectActiveCard = (val: Number | String | string) => {
  caseId.value = val as string
  currentSection.value = 3
  
  // 更新URL，添加caseId参数
  router.replace({ 
    query: { 
      ...route.query, 
      section: '3',
      caseId: val as string
    } 
  })
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden';
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);

  // 恢复浏览器默认滚动行为
  document.body.style.overflow = '';
});
</script>

<style scoped lang="less">
.customer-page {
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

/* 案例中心部分样式 */
.case-customer-section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/customer/Group454.png') no-repeat center center;
  background-size: 100% 100%;
  z-index: 1;
  opacity: 90%;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {
    max-width: 610px;
    color: #000000;

    .main-title {
      font-size: 48px;
      font-weight: 700;
    }

    .sub-title {
      font-size: 24px;
      margin-top: 30px;
    }
  }
}

@media (max-width: 768px) {
  .content {
    padding-left: 5%;
    padding-right: 5%;
  }

  .customer-title {
    font-size: 36px;
  }

  .customer-desc {
    font-size: 14px;
  }
}

/* 当滚动到第二部分时，第一部分向上移动 */
.section:first-child.section-hidden {
  transform: translateY(-100%);
}
</style>