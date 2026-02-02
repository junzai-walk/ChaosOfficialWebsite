<template>
  <div class="product-ems-strategy">
    <!-- 左侧导航栏 - 已隐藏，使用全局导航 -->
    <!-- <div class="side-nav-container">
      <CustomNavSteps
          :width="120"
          :height="192"
          :steps="navSteps"
          :active-step="activeStep"
          :section-numbers="sectionNumbers"
          @update:active-step="updateActiveStep"
        />
    </div> -->

    <!-- 左侧笔记本图片展示 -->
    <div class="laptop-container">
      <img :src="laptopImage" alt="能源管理系统" class="laptop-image" />
    </div>

    <!-- 右侧内容区域 -->
    <div class="content-container">
      <!-- 标题 -->
      <h1 class="strategy-title">{{ title }}</h1>

      <!-- 策略卡片列表 -->
      <div class="strategy-cards">
        <div
          v-for="(strategy, index) in strategies"
          :key="index"
          class="strategy-card"
        >
          <div class="strategy-number" :class="`number-${index + 1}`">{{ index + 1 }}</div>
          <div class="strategy-content">
            <p class="strategy-description">{{ strategy.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import laptopImage from '@/assets/products/ems-feature-2.png'; // 修改为实际使用的图片

interface Strategy {
  description: string;
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  title: string;
  strategies: Strategy[];
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 3);
// 自定义步骤，将"应用案例"改为"应用成效"
const customSteps = computed(() => {
  const steps = [...props.navSteps];
  if (steps.length >= 4) {
    steps[3] = '应用成效';
  }
  return steps;
});

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped>
/* 基于百分比和flex的响应式布局 */
.product-ems-strategy {
  width: 100%;
  min-height: 100%;
  display: flex;
  background-color: white;
  position: relative;
  padding: 0;
  box-sizing: border-box;
}

.laptop-container {
  position: absolute;
  left: 18%;
  top: 50%;
  transform: translateY(-50%);
  width: 33%;
  max-width: 640px;
  aspect-ratio: 16 / 10.5;
}

.laptop-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.content-container {
  position: absolute;
  left: 55%;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
}

.strategy-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: clamp(24px, 2%, 32px);
  font-weight: 600;
  color: #333;
  margin-bottom: clamp(20px, 3%, 40px);
  text-align: left;
}

.strategy-cards {
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 2%, 20px);
  width: 100%;
}

.strategy-card {
  width: 100%;
  max-width: 542px;
  display: flex;
  align-items: flex-start;
  padding: clamp(15px, 1.5%, 20px);
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  gap: clamp(12px, 1%, 16px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.strategy-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  background-color: #eef5ff;
}

.strategy-number {
  width: clamp(28px, 2%, 32px);
  height: clamp(28px, 2%, 32px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: clamp(14px, 1%, 16px);
  flex-shrink: 0;
}

.number-1 {
  background-color: #FFC83E;
}

.number-2 {
  background-color: #00BB98;
}

.strategy-content {
  flex: 1;
  min-width: 0;
}

.strategy-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: clamp(14px, 1%, 16px);
  line-height: 1.6;
  color: #666;
  text-align: left;
  margin: 0;
}

/* 响应式设计 - 使用百分比和flex */
/* 中等屏幕适配 */
/* 小屏幕适配 */
/* 平板设备适配 */
/* 移动设备适配 */
/* 小型移动设备适配 */
</style>