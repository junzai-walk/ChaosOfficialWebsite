<template>
  <div class="product-ems-features">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps 
        :width="120" 
        :height="192" 
        :steps="navSteps" 
        v-model:activeStep="activeStep" 
      />
    </div>
    
    <!-- 标题区域 -->
    <div class="title-container">
      <h1 class="main-title">{{ mainTitle }}</h1>
      <h2 class="sub-title">{{ subTitle }}</h2>
    </div>
    
    <!-- 左侧卡片列表 -->
    <div class="features-list" :style="featuresContainerStyle">
      <div 
        v-for="(feature, index) in features" 
        :key="index" 
        class="feature-card"
        :class="{'active': activeFeature === index}"
        @click="activeFeature = index"
      >
        <div class="feature-number">{{ index + 1 }}</div>
        <div class="feature-content">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- 右侧图片 -->
    <div class="feature-image-container" :style="imageContainerStyle">
      <img :src="emsFeatureImage" alt="EMS特性" class="feature-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import emsFeatureImage from '@/assets/products/ems-feature.png';

interface Feature {
  title: string;
  description: string;
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  mainTitle: string;
  subTitle: string;
  features: Feature[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 1);

// 当前活动特性
const activeFeature = ref(0);

// 修改计算样式，使用更灵活的响应式布局
const featuresContainerStyle = computed(() => ({
  width: 'clamp(320px, 28vw, 542px)',
  height: 'auto',
  maxHeight: 'clamp(350px, 29vw, 556px)',
  top: 'clamp(120px, 10.5vw, 205px)',
  left: 'clamp(200px, 16vw, 313px)',
  borderRadius: '10px',
}));

const imageContainerStyle = computed(() => ({
  width: 'clamp(400px, 36vw, 692.56px)',
  height: 'clamp(250px, 21vw, 407.45px)',
  top: 'clamp(180px, 9.5vw, 279px)',
  right: 'clamp(80px, 10vw, 207px)',
  left: 'auto', // 移除左侧定位，改用右侧定位
}));
</script>

<style scoped>
.product-ems-features {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: clamp(120px, 12vw, 230px) clamp(30px, 3vw, 60px) 0 clamp(100px, 9.7vw, 187px);
  box-sizing: border-box;
  gap: clamp(20px, 2.6vw, 51px);
  position: relative;
}

.side-nav-container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.title-container {
  position: absolute;
  top: clamp(80px, 6.25vw, 120px);
  left: clamp(200px, 16vw, 313px);
}

.main-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: clamp(24px, 1.66vw, 32px);
  color: #333;
  margin-bottom: clamp(6px, 0.52vw, 10px);
}

.sub-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 500;
  font-size: clamp(16px, 1.04vw, 20px);
  color: #666;
  text-align: left;
}

.features-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 0.83vw, 16px);
  padding: clamp(12px, 1.04vw, 20px);
  border-radius: 10px;
  overflow: auto;
  max-height: 80vh;
}

.feature-card {
  width: 100%;
  height: auto;
  min-height: clamp(80px, 6vw, 116px);
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  padding: clamp(10px, 0.83vw, 16px);
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:nth-of-type(1) {
    .feature-number {
      background-color: #FFC83E;
    }
  }

  &:nth-of-type(2) {
    .feature-number {
      background-color: #00BB98;
    }
  }

  &:nth-of-type(3) {
    .feature-number {
      background-color:#2B59FF;
    }
  }
}

.feature-card:hover{
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  background-color: #eef5ff;
}

.feature-number {
  min-width: clamp(24px, 1.87vw, 36px);
  min-height: clamp(24px, 1.87vw, 36px);
  width: clamp(24px, 1.87vw, 36px);
  height: clamp(24px, 1.87vw, 36px);
  background-color: #2B7FE8;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(14px, 0.94vw, 18px);
  font-weight: 600;
  margin-right: clamp(10px, 0.83vw, 16px);
  flex-shrink: 0;
}

.feature-content {
  text-align: left;
  flex: 1;
}

.feature-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.feature-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}

.feature-image-container {
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
}

.feature-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 1920px) {
  /* 可以删除这部分 */
}
</style> 