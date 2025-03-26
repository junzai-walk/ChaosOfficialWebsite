<template>
  <div class="home-page" @wheel="handleWheel">
    <!-- 第一部分：关于主体 -->
    <div class="section" :class="{ active: currentSection === 0, 'section-hidden': currentSection !== 0 }"
      ref="caseSection">
      <div class="about-customer-section">
        <div class="background-image">
          <div class="main-title">凯奥思数据 让工业更智能</div>
        </div>
      </div>
    </div>
    
    <!-- 第二部分：企业文化 -->
    <div 
      class="section" 
      :class="{ active: currentSection === 1, 'section-hidden': currentSection !== 1 }"
      ref="solutionSection">
      <CorporateCulture />
    </div>
    
    <!-- 第三部分：重要荣誉 -->
    <div 
      class="section" 
      :class="{ active: currentSection === 2, 'section-hidden': currentSection !== 2 }"
      ref="productSystemSection">
      <Honor />
    </div>
    
    <!-- 第四部分：诚聘英才 -->
    <div 
      class="section" 
      :class="{ active: currentSection === 3, 'section-hidden': currentSection !== 3 }"
      ref="companyProfileSection">
      <Invite />
    </div>
    
    <!-- 第五部分：联系我们 -->
    <div 
      class="section" 
      :class="{ active: currentSection === 4, 'section-hidden': currentSection !== 4 }"
      ref="caseShowcaseSection">
      <Contact />
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import CorporateCulture from '@/components/about/CorporateCulture.vue'
import Honor from '@/components/about/Honor.vue'
import Invite from '@/components/about/Invite.vue'
import Contact from '@/components/about/Contact.vue'

const currentSection = ref(0)
// 提供 currentSection 给子组件使用
provide('currentSection', currentSection)

const scrolling = ref(false);
const scrollDelay = 1000; // 滚动延迟，防止连续滚动

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return;
  
  scrolling.value = true;
  
  // 向下滚动，最大值改为5
  if (e.deltaY > 0 && currentSection.value < 5) {
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
  
  // 向下箭头或Page Down，最大值改为5
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection.value < 5) {
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

.about-customer-section {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.background-image {

  width: 100vw;
  height: 100vh;
  background: url('@/assets/about/Group 41.png') no-repeat center center;
  background-size: 100% 100%;
  z-index: 1;
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  .main-title{
    position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -300%);
  }
}


</style>