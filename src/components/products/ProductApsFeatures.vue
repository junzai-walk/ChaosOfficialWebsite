<template>
  <div class="product-aps-features">
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
    
    <!-- 左侧图片 -->
    <div class="picture-left-container">
      <img :src="pictureLeft" alt="APS核心功能-左" class="picture-left" />
    </div>
    
    <!-- 右侧图片 -->
    <div class="picture-right-container">
      <img :src="pictureRight" alt="APS核心功能-右" class="picture-right" />
    </div>
    
    <!-- 底部图片 -->
    <div class="picture-bottom-container">
      <img :src="pictureBottom" alt="APS核心功能-底部" class="picture-bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import pictureLeft from '@/assets/products/aps-core-2.png';
import pictureRight from '@/assets/products/aps-core-3.png';
import pictureBottom from '@/assets/products/aps-core-1.png';

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 2);

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
}

@media (max-width: 1366px) {
  :root {
    font-size: 14px;
  }
}

.product-aps-features {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: white;
  padding-top: 6.25rem;
  overflow: hidden;
  
  .picture-left-container {
    position: absolute;
    width: 40rem;
    height: 29.0625rem;
    top: 11.875rem;
    left: 21.875rem;
    z-index: 2;
    
    .picture-left {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .picture-right-container {
    position: absolute;
    width: 40rem;
    height: 29.0625rem;
    top: 11.875rem;
    left: 49.0625rem;
    z-index: 2;
    
    .picture-right {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .picture-bottom-container {
    position: absolute;
    width: 67.625rem;
    height: 38.0625rem;
    top: 16.0625rem;
    left: 26.1875rem;
    z-index: 1;
    
    .picture-bottom {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  /* 媒体查询 - 针对1920*1080分辨率 */
  @media (min-width: 1920px) {
    padding-top: 6.25rem;
    
    .picture-left-container {
      width: 40rem;
      height: 29.0625rem;
      top: 11.875rem;
      left: 21.875rem;
    }
    
    .picture-right-container {
      width: 40rem;
      height: 29.0625rem;
      top: 11.875rem;
      left: 49.0625rem;
    }
    
    .picture-bottom-container {
      width: 67.625rem;
      height: 38.0625rem;
      top: 16.0625rem;
      left: 26.1875rem;
    }
  }
  
  /* 媒体查询 - 针对1366*768分辨率 */
  @media (max-width: 1366px) {
    padding-top: 4.5rem;
    
    .picture-left-container {
      width: 34rem;
        height: 20.35rem;
        top: 26rem;
        left: 31rem;
    }
    
    .picture-right-container {
      width: 34rem;
        height: 20.35rem;
        top: 26rem;
        left: 57rem;
    }
    
    .picture-bottom-container {
      width: 47.5rem;
        height: 26.75rem;
        top: 32rem;
        left: 41rem;
    }
  }
  
  /* 媒体查询 - 针对平板设备 */
  @media (max-width: 992px) {
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .side-nav-container {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
    }
    
    .picture-left-container,
    .picture-right-container,
    .picture-bottom-container {
      position: relative;
      width: 90%;
      height: auto;
      top: auto;
      left: auto;
      margin-bottom: 2rem;
    }
    
    .picture-left-container,
    .picture-right-container {
      z-index: 3;
    }
    
    .picture-bottom-container {
      margin-top: -5rem;
    }
  }
  
  /* 媒体查询 - 移动设备 */
  @media (max-width: 768px) {
    padding-top: 3rem;
    
    .picture-left-container,
    .picture-right-container,
    .picture-bottom-container {
      width: 95%;
      margin-bottom: 1.5rem;
    }
    
    .picture-bottom-container {
      margin-top: -3rem;
    }
  }
}
</style> 