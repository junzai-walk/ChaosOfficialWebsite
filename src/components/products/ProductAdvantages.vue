<template>
  <div class="product-advantages">
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
            <p class="advantage-description" style="text-align: left;" :title="advantage.description">{{ advantage.description }}</p>
          </div>
        </template>
        <template v-else>
          <div class="advantage-content">
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-description" style="text-align: right;" :title="advantage.description">{{ advantage.description }}</p>
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
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 3);

// 计算卡片样式，包括响应式位置
const getCardStyle = (position: Position) => {
  // 根据窗口宽度决定基准字体大小
  const baseSize = window.innerWidth > 1366 ? 16 : 14;
  
  return {
    top: `${position.top / baseSize}rem`,
    left: `${position.left / baseSize}rem`,
  };
};

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
  
  @media (max-width: 1366px) {
    font-size: 14px;
  }
}

.product-advantages {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 14.375rem 0 0 11.6875rem;
  box-sizing: border-box;
  gap: 3.1875rem;
  position: relative;
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
  width: 27.5rem;
  height: 6.25rem;
  position: absolute;
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  border: 0.0625rem solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.advantage-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.25rem;
  opacity: 0.6;
  border-radius: 0.5rem 0.5rem 0 0;
}

.advantage-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.625rem;
  right: 0.625rem;
  height: 0.0625rem;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  border-radius: 50%;
}

.advantage-card:hover {
  transform: translateY(-0.3125rem);
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.12);
  border: 0.0625rem solid rgba(255, 255, 255, 1);
}

.advantage-card:hover .advantage-icon {
  transform: scale(1.05);
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(174, 174, 192, 0.2), -0.25rem -0.25rem 0.5rem hsla(0, 0%, 100%, 0.8);
}

.advantage-icon {
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem;
  transition: all 0.3s ease;
  box-shadow: 0.1875rem 0.1875rem 0.375rem rgba(174, 174, 192, 0.18), -0.1875rem -0.1875rem 0.375rem hsla(0, 0%, 100%, 0.8);
}

.advantage-icon img {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  object-fit: contain;
  filter: drop-shadow(0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1));
}

.advantage-content {
  flex: 1;
}

.advantage-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 100%;
  margin-bottom: 0.75rem;
  color: #333;
  text-shadow: 0 0.0625rem 0.0625rem rgba(255, 255, 255, 0.8);
}

.advantage-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #666;
  text-shadow: 0 0.0625rem 0.0625rem rgba(255, 255, 255, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .product-advantages {
    padding: 14.375rem 0 0 11.6875rem;
    gap: 3.1875rem;
  }
  
  .advantage-card {
    width: 27.5rem;
    height: 6.25rem;
    padding: 1.5rem;
    gap: 1.25rem;
  }
  
  .advantage-icon {
    width: 2.25rem;
    height: 2.25rem;
    padding: 0.375rem;
  }
  
  .advantage-title {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
  
  .advantage-description {
    font-size: 0.875rem;
    line-height: 1.5;
  }
}

@media (max-width: 1366px) {
  .product-advantages {
    padding: 10rem 0 0 7rem;
    gap: 2.5rem;
  }
  
  .advantages-container {
    margin-left: 13rem;
  }
  
  .advantage-card {
    width: 25rem;
    height: 8rem;
    padding: 2rem;
    gap: 1rem;
  }
  
  .advantage-icon {
    width: 3rem;
    height: 3rem;
  }
  
  .advantage-icon img {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .advantage-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .advantage-description {
    font-size: 1rem;
    line-height: 1.4;
  }
}

@media (max-width: 1200px) {
  .product-advantages {
    padding: 8rem 2rem 4rem;
  }
  
  .advantages-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-left: 6rem;
    margin-top: 2rem;
  }
  
  .advantage-card {
    position: relative;
    top: auto !important;
    left: auto !important;
    width: 100%;
    max-width: 40rem;
  }
}

@media (max-width: 992px) {
  .product-advantages {
    flex-direction: column;
    padding: 6rem 2rem 4rem;
    align-items: center;
  }
  
  .side-nav-container {
    width: 100%;
    justify-content: center;
    margin-bottom: 3rem;
  }
  
  .advantages-container {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .product-advantages {
    padding: 5rem 1.5rem 3rem;
  }
  
  .advantage-card {
    height: auto;
    min-height: 7rem;
    padding: 1.25rem;
  }
  
  .advantage-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .advantage-title {
    font-size: 1.125rem;
  }
}

@media (max-width: 576px) {
  .product-advantages {
    padding: 4rem 1rem 2rem;
  }
  
  .advantage-card {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .advantage-icon {
    margin-bottom: 0.5rem;
  }
  
  .advantage-title {
    font-size: 1rem;
  }
  
  .advantage-description {
    font-size: 0.875rem;
  }
}
</style> 