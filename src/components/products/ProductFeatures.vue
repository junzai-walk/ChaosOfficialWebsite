<template>
  <div class="product-features">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps :width="120" :height="192" :steps="navSteps" v-model:activeStep="activeStep" />
    </div>

    <!-- 右侧功能卡片区域 -->
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <div class="feature-icon">
          <img :src="feature.icon" alt="功能图标" />
        </div>
        <div class="feature-content">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description" :title="feature.description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';

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
  padding: 230px 0 0 187px;
  /* 顶部对齐 336px，左侧对齐 187px */
  box-sizing: border-box;
  gap: 51px;
  /* 左侧导航与内容区域的间距 */
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
  padding-left: 100px;
}

.feature-card {
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 16px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    opacity: 0.6;
    border-radius: 16px 16px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 1);
    
    .feature-icon {
      transform: translateY(-5px);
      box-shadow: 12px 12px 20px rgba(174, 174, 192, 0.2), -12px -12px 20px hsla(0, 0%, 100%, 0.8);
    }
  }
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  box-shadow: 8px 8px 16px rgba(174, 174, 192, 0.18), -8px -8px 16px hsla(0, 0%, 100%, 0.8);
  transition: all .4s cubic-bezier(.4, 0, .2, 1);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(120, 200, 160, 0.05) 0%, rgba(120, 200, 160, 0) 70%);
    z-index: -1;
  }

  img {
    width: 24px;
    height: 24px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    object-fit: contain;
  }
}

.feature-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  margin-bottom: 12px;
  color: #333;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.feature-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #666;
  text-align: left;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
    width: calc(50px * 100vw / 1920);
    height: calc(50px * 100vw / 1920);
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