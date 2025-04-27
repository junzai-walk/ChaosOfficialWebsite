<template>
  <div class="product-ems-strategy">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps 
          :width="120" 
          :height="192" 
          :steps="navSteps" 
          :active-step="activeStep" 
          :section-numbers="sectionNumbers" 
          @update:active-step="updateActiveStep" 
        />
    </div>
    
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
:root {
  font-size: 16px;
}

/* 基于1920*1080的rem计算，以16px为基准 */
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
  left: 22.5rem; /* 360px */
  top: 40%;
  transform: translateY(-40%);
  width: 40rem; /* 640px */
  height: 26.25rem; /* 420px */
}

.laptop-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.content-container {
  position: absolute;
  left: 75rem; /* 1200px */
  right: 6.25rem; /* 100px */
  top: 43%;
  transform: translateY(-43%);
}

.strategy-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 2rem; /* 32px */
  font-weight: 600;
  color: #333;
  margin-bottom: 2.5rem; /* 40px */
  text-align: left;
}

.strategy-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* 20px */
  width: 100%;
}

.strategy-card {
  width: 33.875rem; /* 542px */
  display: flex;
  align-items: flex-start;
  padding: 1.25rem; /* 20px */
  background-color: #fff;
  box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05); /* 0 2px 8px */
  border-radius: 0.625rem; /* 10px */
  gap: 1rem; /* 16px */
  transition: all 0.3s ease;
  cursor: pointer;
}

.strategy-card:hover {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1); /* 0 4px 12px */
  transform: translateY(-0.125rem); /* -2px */
  background-color: #eef5ff;
}

.strategy-number {
  width: 2rem; /* 32px */
  height: 2rem; /* 32px */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 1rem; /* 16px */
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
}

.strategy-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 1rem; /* 16px */
  line-height: 1.6;
  color: #666;
  text-align: left;
  margin: 0;
}

/* 更好的响应式设计 */
/* 1600px以下的屏幕适配 */
@media (max-width: 1600px) {
  .laptop-container {
    left: 8.125rem; /* 130px */
    width: 31.25rem; /* 500px */
    height: 20.625rem; /* 330px */
  }
  
  .content-container {
    left: 43.75rem; /* 700px */
  }
}

/* 1500px屏幕专用适配 */
@media (max-width: 1500px) {
  :root {
    font-size: 14px; /* 调整基础字体大小，使rem更适合1500分辨率 */
  }
  
  .product-ems-strategy {
    flex-direction: column;
    align-items: center;
    padding-top: 8.57rem; /* 120px */
    height: auto;
  }
  
  .side-nav-container {
    position: absolute;
    top: 1.42rem; /* 20px */
    left: 1.42rem; /* 20px */
  }
  
  .laptop-container {
    position: relative;
    left: -18rem;
    right: 0;
    transform: none;
    width: 80%;
    max-width: 40rem; /* 560px */
    height: auto;
    margin-bottom: 2.85rem; /* 40px */
    margin-top: 4.28rem; /* 60px */
  }
  
  .content-container {
    position: relative;
    left: 25.875rem;
    top: -22rem;
    transform: none;
    width: 90%;
    max-width: 45rem; /* 800px */
    padding: 0 1.42rem; /* 0 20px */
  }
  
  .strategy-title {
    text-align: center;
    width: 100%;
    font-size: 1.85rem; /* ~26px */
    margin-bottom: 1.78rem; /* ~25px */
  }
  
  .strategy-card {
    width: 100%;
    padding: 1.07rem; /* ~15px */
  }
  
  .strategy-cards {
    gap: 1.07rem; /* ~15px */
  }
}

/* 移动设备适配 */
@media (max-width: 1000px) {
  :root {
    font-size: 12px;
  }
  
  .side-nav-container {
    left: 0.83rem; /* 10px */
  }
  
  .laptop-container {
    width: 90%;
  }
  
  .strategy-title {
    font-size: 2rem; /* 24px */
  }
  
  .strategy-card {
    padding: 1.25rem; /* 15px */
  }
  
  .strategy-description {
    font-size: 1.16rem; /* 14px */
  }
}
</style> 