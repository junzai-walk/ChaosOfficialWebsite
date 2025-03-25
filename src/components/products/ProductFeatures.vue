<template>
  <div class="product-features">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps 
        :width="120" 
        :height="192" 
        :steps="navSteps" 
        v-model:activeStep="activeStep" 
      />
    </div>
    
    <!-- 右侧功能卡片区域 -->
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <div class="feature-icon">
          <img :src="feature.icon" alt="功能图标" />
        </div>
        <div class="feature-content">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/CustomNavSteps.vue';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  features: Feature[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 1);
</script>

<style scoped>
.product-features {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 230px 0 0 187px; /* 顶部对齐 336px，左侧对齐 187px */
  box-sizing: border-box;
  gap: 51px; /* 左侧导航与内容区域的间距 */
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 416px);
  grid-template-rows: repeat(2, 220px);
  gap: 20px;
  padding-right: 187px;
}

.feature-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.feature-icon {
  width: 20px;
  height: 20px;
  margin-bottom: 16px;
}

.feature-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.feature-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  margin-bottom: 12px;
  color: #333;
}

.feature-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #666;
}

@media (max-width: 1920px) {
  .product-features {
    padding: calc(336px * 100vw / 1920) 0 0 calc(187px * 100vw / 1920);
    gap: calc(51px * 100vw / 1920);
  }
  
  .features-grid {
    grid-template-columns: repeat(3, calc(416px * 100vw / 1920));
    grid-template-rows: repeat(2, calc(220px * 100vw / 1920));
    gap: calc(20px * 100vw / 1920);
    padding-right: calc(187px * 100vw / 1920);
  }
  
  .feature-icon {
    width: calc(20px * 100vw / 1920);
    height: calc(20px * 100vw / 1920);
  }
  
  .feature-title {
    font-size: calc(20px * 100vw / 1920);
  }
  
  .feature-description {
    font-size: calc(14px * 100vw / 1920);
    line-height: calc(24px * 100vw / 1920);
  }
}
</style> 