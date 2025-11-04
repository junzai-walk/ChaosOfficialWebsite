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
  min-height: 100vh;
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
  font-size: clamp(24px, 2vw, 32px);
  font-weight: 600;
  color: #333;
  margin-bottom: clamp(20px, 3vh, 40px);
  text-align: left;
}

.strategy-cards {
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 2vh, 20px);
  width: 100%;
}

.strategy-card {
  width: 100%;
  max-width: 542px;
  display: flex;
  align-items: flex-start;
  padding: clamp(15px, 1.5vw, 20px);
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  gap: clamp(12px, 1vw, 16px);
  transition: all 0.3s ease;
  cursor: pointer;
}

.strategy-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  background-color: #eef5ff;
}

.strategy-number {
  width: clamp(28px, 2vw, 32px);
  height: clamp(28px, 2vw, 32px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: clamp(14px, 1vw, 16px);
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
  font-size: clamp(14px, 1vw, 16px);
  line-height: 1.6;
  color: #666;
  text-align: left;
  margin: 0;
}

/* 响应式设计 - 使用百分比和flex */
/* 中等屏幕适配 */
@media (min-width: 1367px) and (max-width: 1600px) {
  .laptop-container {
    left: 15%;
    width: 35%;
  }

  .content-container {
    left: 52%;
    right: 4%;
  }
}

/* 小屏幕适配 */
@media (max-width: 1366px) {
  .product-ems-strategy {
    flex-direction: column;
    align-items: center;
    padding-top: 10vh;
    height: auto;
  }

  .side-nav-container {
    position: absolute;
    top: 2vh;
    left: 2%;
  }

  .laptop-container {
    position: relative;
    left: 0;
    top: 0;
    transform: none;
    width: 60%;
    max-width: 560px;
    margin: 5vh auto 3vh;
  }

  .content-container {
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    transform: none;
    width: 85%;
    max-width: 800px;
    padding: 0 3%;
    margin: 0 auto;
  }

  .strategy-title {
    text-align: center;
    width: 100%;
    font-size: clamp(22px, 3vw, 26px);
    margin-bottom: clamp(20px, 2.5vh, 25px);
  }

  .strategy-card {
    width: 100%;
    max-width: 100%;
    padding: clamp(12px, 1.5vw, 15px);
  }

  .strategy-cards {
    gap: clamp(12px, 1.5vh, 15px);
  }
}

/* 平板设备适配 */
@media (max-width: 992px) {
  .laptop-container {
    width: 70%;
    max-width: 500px;
  }

  .content-container {
    width: 90%;
  }

  .strategy-title {
    font-size: clamp(20px, 3.5vw, 24px);
  }
}

/* 移动设备适配 */
@media (max-width: 768px) {
  .product-ems-strategy {
    padding-top: 8vh;
  }

  .side-nav-container {
    left: 1%;
  }

  .laptop-container {
    width: 85%;
    max-width: 400px;
    margin: 4vh auto 2vh;
  }

  .content-container {
    width: 92%;
    padding: 0 2%;
  }

  .strategy-title {
    font-size: clamp(18px, 4vw, 22px);
  }

  .strategy-card {
    padding: clamp(10px, 2vw, 12px);
  }

  .strategy-description {
    font-size: clamp(13px, 2vw, 14px);
  }

  .strategy-number {
    width: clamp(24px, 3vw, 28px);
    height: clamp(24px, 3vw, 28px);
    font-size: clamp(12px, 1.5vw, 14px);
  }
}

/* 小型移动设备适配 */
@media (max-width: 576px) {
  .product-ems-strategy {
    padding-top: 6vh;
  }

  .laptop-container {
    width: 90%;
    margin: 3vh auto 2vh;
  }

  .content-container {
    width: 95%;
  }

  .strategy-title {
    font-size: clamp(16px, 4.5vw, 20px);
    margin-bottom: clamp(15px, 2vh, 20px);
  }

  .strategy-cards {
    gap: clamp(10px, 1.5vh, 12px);
  }

  .strategy-card {
    padding: 12px;
    gap: 10px;
  }
}
</style>