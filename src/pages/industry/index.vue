<template>
  <div class="industry-page" @wheel="handleWheel">
    <!-- 第一部分：钢铁行业 -->
    <div class="section" :class="{ active: currentSection === 0, 'section-hidden': currentSection !== 0 }"
      ref="steelSection">
      <div class="steel-industry-section">
        <div class="background-image"></div>
        <div class="content-wrapper">
          <div class="content">
            <div class="title-container">
              <div class="title-line"></div>
              <h1 class="industry-title">钢铁行业</h1>
            </div>
            <p class="industry-desc">
              结合机理模型、数据模型、数字孪生技术、多变量预测控制技术，解决钢铁企业生产工艺、设备控制等一系列工业生产痛点，实现工艺流、生产信息流、设备流"三流合一"，稳定提升成品质量，降低生产线设备故障风险、人力成本和能源消耗。
            </p>
            <div class="button-container">
              <el-button type="primary" size="large" round class="consult-button">立即咨询</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二部分：钢铁行业挑战 -->
    <div class="section" :class="{ active: currentSection === 1, 'section-hidden': currentSection !== 1 }"
      ref="challengesSection">
      <SteelChallenges />
    </div>

    <!-- 第三部分：钢铁行业解决方案 -->
    <div class="section" :class="{ active: currentSection === 2, 'section-hidden': currentSection !== 2 }"
      ref="solutionsSection">
      <SteelSolutions />
    </div>

    <!-- 第四部分：方案优势 -->
    <div class="section" :class="{ active: currentSection === 3, 'section-hidden': currentSection !== 3 }"
      ref="advantageSection">
      <SteelAdvantages />
    </div>

    <!-- 第五部分：典型案例 -->
    <div class="section" :class="{ active: currentSection === 4, 'section-hidden': currentSection !== 4 }"
      ref="caseSection">
      <SteelCases />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import SteelChallenges from '@/components/industry/SteelChallenges.vue'
import SteelSolutions from '@/components/industry/SteelSolutions.vue'
import SteelAdvantages from '@/components/industry/SteelAdvantages.vue'
import SteelCases from '@/components/industry/SteelCases.vue'

const currentSection = ref(0)
// 提供 currentSection 给子组件使用
provide('currentSection', currentSection)

const scrolling = ref(false)
const scrollDelay = 1000 // 滚动延迟，防止连续滚动

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return

  scrolling.value = true

  // 向下滚动
  if (e.deltaY > 0 && currentSection.value < 4) {
    currentSection.value++
  }
  // 向上滚动
  else if (e.deltaY < 0 && currentSection.value > 0) {
    currentSection.value--
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
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection.value < 4) {
    currentSection.value++
  }
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection.value > 0) {
    currentSection.value--
  }

  setTimeout(() => {
    scrolling.value = false
  }, scrollDelay)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  
  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  
  // 恢复浏览器默认滚动行为
  document.body.style.overflow = ''
})
</script>

<style scoped lang="less">
.industry-page {
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

/* 钢铁行业部分样式 */
.steel-industry-section {
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
  background: url('@/assets/02/Rectangle_8.png') no-repeat center center;
  background-size: 100% 100%;
  z-index: 1;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  padding-left: 10%;
  max-width: 610px;
  color: #ffffff;
}

.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.title-line {
  width: 8px;
  height: 50px;
  background-color: #ffffff;
  margin-right: 15px;
}

.industry-title {
  font-size: 48px;
  font-weight: bold;
  line-height: 1.2;
  position: relative;
  white-space: nowrap;
}

.industry-desc {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 35px;
  opacity: 0.9;
  letter-spacing: 0.5px;
  text-align: justify;
}

.button-container {
  text-align: left;
  margin-top: 15px;
}

.consult-button {
  font-size: 16px;
  padding: 12px 35px;
  background-color: #1890ff;
  border: none;
  transition: all 0.3s ease;
  border-radius: 50px;
}

.consult-button:hover {
  background-color: #40a9ff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .content {
    padding-left: 5%;
    padding-right: 5%;
  }
  
  .industry-title {
    font-size: 36px;
  }
  
  .industry-desc {
    font-size: 14px;
  }
}

/* 当滚动到第二部分时，第一部分向上移动 */
.section:first-child.section-hidden {
  transform: translateY(-100%);
}
</style>