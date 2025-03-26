<template>
  <div class="home-page" @wheel="handleWheel">
    <!-- 第一部分：案例中心 -->
    <div class="section" :class="{ active: currentSection === 0, 'section-hidden': currentSection !== 0 }"
      ref="caseSection">
      <div class="parnter-customer-section">
        <div class="background-image"></div>
        <div class="content-wrapper">
          <div class="content">
            <div class="main-title">诚邀全球伙伴，赋能工业智能</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第二部分：合作伙伴 -->
    <div class="section" :class="{ active: currentSection === 1, 'section-hidden': currentSection !== 1 }"
      ref="solutionSection">
      <PartnerTypes @recruit="recruit" />
    </div>
    <!-- 第三部分：方位支持 -->
    <div class="section" :class="{ active: currentSection === 2, 'section-hidden': currentSection !== 2 }"
      ref="solutionSection">
      <ComprehensiveSupport  />
    </div>
    <!-- 第四部分：伙伴展示 -->
    <div v-if="currentSection === 3" class="section"
      :class="{ active: currentSection === 3, 'section-hidden': currentSection !== 3 }" ref="solutionSection">
      <Consult />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import PartnerTypes from '@/components/partners/PartnerTypes.vue';
import ComprehensiveSupport from '@/components/partners/ComprehensiveSupport.vue';
import Consult from '@/components/partners/consult.vue';

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

const recruit = (isToRecruit:Boolean) => {
  if(isToRecruit){
    currentSection.value = 3

  }
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

.parnter-customer-section {
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
  background: url('@/assets/partners/官网 1.png') no-repeat center center;
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
      font-size: 36px;
      font-weight: 700;
    }

    .sub-title {
      margin-top: 15px;
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