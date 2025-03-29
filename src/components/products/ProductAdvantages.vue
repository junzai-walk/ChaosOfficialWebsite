<template>
  <div class="product-advantages">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps 
        :width="120" 
        :height="192" 
        :steps="navSteps" 
        v-model:activeStep="activeStep" 
      />
    </div>
    
    <!-- 右侧特色优势卡片区域 -->
    <div class="advantages-container">
      <div 
        v-for="(advantage, index) in advantages" 
        :key="index"
        class="advantage-card"
        :style="getCardStyle(advantage.position)"
      >
        <!-- 根据图标位置决定显示在左侧还是右侧 -->
        <template v-if="advantage.iconPosition !== 'right'">
          <div class="advantage-icon">
            <img :src="advantage.icon" alt="特色优势图标" />
          </div>
          <div class="advantage-content">
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-description" style="text-align: left;">{{ advantage.description }}</p>
          </div>
        </template>
        <template v-else>
          <div class="advantage-content">
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-description" style="text-align: right;">{{ advantage.description }}</p>
          </div>
          <div class="advantage-icon">
            <img :src="advantage.icon" alt="特色优势图标" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';

interface Position {
  top: number;
  left: number;
}

interface Advantage {
  title: string;
  description: string;
  icon: string;
  position: Position;
  iconPosition?: 'left' | 'right'; // 新增图标位置属性
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  advantages: Advantage[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 3);

// 计算卡片样式，包括响应式位置
const getCardStyle = (position: Position) => {
  return {
    top: `${position.top}px`,
    left: `${position.left}px`,
  };
};
</script>

<style scoped>
.product-advantages {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 230px 0 0 187px;
  box-sizing: border-box;
  gap: 51px;
  position: relative; /* 必须启用相对定位，否则绝对定位的卡片无法正确定位 */
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.advantages-container {
  flex: 1;

  height: 100%;
}

.advantage-card {
  width: 440px;
  height: 100px;
  position: absolute;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.advantage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}

.advantage-icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  background-color: #f0f7ff; /* 添加浅蓝色背景 */
  border-radius: 6px; /* 圆角背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  border-radius: 50%;
}

.advantage-icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 50%;
}

.advantage-content {
  flex: 1;
}

.advantage-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  margin-bottom: 12px;
  color: #333;
}

.advantage-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #666;
}

@media (max-width: 1920px) {
  .product-advantages {
    padding: calc(230px * 100vw / 1920) 0 0 calc(187px * 100vw / 1920);
    gap: calc(51px * 100vw / 1920);
  }
  
  .advantage-card {
    width: calc(440px * 100vw / 1920);
    height: calc(100px * 100vw / 1920);
    padding: calc(24px * 100vw / 1920);
    gap: calc(20px * 100vw / 1920);
  }
  
  .advantage-icon {
    width: calc(36px * 100vw / 1920);
    height: calc(36px * 100vw / 1920);
    padding: calc(6px * 100vw / 1920);
  }
  
  .advantage-icon img {
    width: calc(20px * 100vw / 1920);
    height: calc(20px * 100vw / 1920);
  }
  
  .advantage-title {
    font-size: calc(20px * 100vw / 1920);
    margin-bottom: calc(12px * 100vw / 1920);
  }
  
  .advantage-description {
    font-size: calc(14px * 100vw / 1920);
    line-height: calc(24px * 100vw / 1920);
  }
}
</style> 