<template>
  <div class="product-ems-strategy">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps 
        :width="120" 
        :height="192" 
        :steps="customSteps" 
        v-model:activeStep="activeStep" 
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
import CustomNavSteps from '@/components/industry/CustomNavSteps.vue';
import laptopImage from '@/assets/products/ems-feature-2.png'; // 修改为实际使用的图片

interface Strategy {
  description: string;
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  title: string;
  strategies: Strategy[];
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
</script>

<style scoped>
.product-ems-strategy {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  position: relative;
  padding: 0;
  box-sizing: border-box;
}

.side-nav-container {
  width: 120px;
  position: absolute;
  left: 130px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.laptop-container {
  position: absolute;
  left: 260px;
  top: 50%;
  transform: translateY(-50%);
  width: 640px;
  height: 420px;
}

.laptop-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.content-container {
  position: absolute;
  left: 1200px;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
}

.strategy-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin-bottom: 40px;
  text-align: left;
}

.strategy-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.strategy-card {
  width: 542px;
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  gap: 16px;
}

.strategy-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
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
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  text-align: left;
  margin: 0;
}

/* 更好的响应式设计 */
@media (max-width: 1600px) {
  .laptop-container {
    left: 130px;
    width: 500px;
    height: 330px;
  }
  
  .content-container {
    left: 700px;
  }
}

@media (max-width: 1366px) {
  .product-ems-strategy {
    flex-direction: column;
    align-items: center;
    padding-top: 120px;
    height: auto;
  }
  
  .side-nav-container {
    position: fixed;
    left: 120px;
    top: 50%;
  }
  
  .laptop-container {
    position: relative;
    left: 0;
    top: 0;
    transform: none;
    width: 80%;
    max-width: 560px;
    height: auto;
    margin-bottom: 40px;
    margin-top: 60px;
  }
  
  .content-container {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    transform: none;
    width: 90%;
    max-width: 800px;
    padding: 0 20px;
  }
  
  .strategy-title {
    text-align: center;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .side-nav-container {
    left: 10px;
  }
  
  .laptop-container {
    width: 90%;
  }
  
  .strategy-title {
    font-size: 24px;
  }
  
  .strategy-card {
    padding: 15px;
  }
  
  .strategy-description {
    font-size: 14px;
  }
}
</style> 