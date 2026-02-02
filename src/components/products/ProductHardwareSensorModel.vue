<template>
  <div class="product-hardware-sensor-light">
    <!-- 左侧导航栏 -->
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
    
    <!-- 中间内容区域 -->
    <div class="content-container">
      <h1 class="title">{{ title }}</h1>
    </div>
    
    <!-- 右侧图片 -->
    <ProductRightImages 
      :mainImage="mainImage" 
      :secondaryImage="secondaryImage" 
      mainAlt="有线传感器主图" 
      secondaryAlt="有线传感器辅助图" 
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import ProductRightImages from '@/components/products/ProductRightImages.vue';

interface FeatureContent {
  title: string;
  description: string;
}

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  navSteps: {
    type: Array as PropType<string[]>,
    required: true
  },
  defaultActiveStep: {
    type: Number,
    default: 1
  },
  mainImage: {
    type: String,
    required: true
  },
  secondaryImage: {
    type: String,
    default: ''
  },
  sectionNumbers: {
    type: Array as PropType<number[]>,
    required: true
  }
});

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 1);

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped lang="less">
:root {
  /* 基准字体大小，1920px宽度下为16px */
  font-size: 16px;
}

.product-hardware-sensor-light {
  width: 100%;
  min-height: 100%;
  position: relative;
  background: #fff;
  
  .content-container {
    position: absolute;
    width: 37.6875rem;
    top: 12.5rem;
    left: 21.5625rem;
    z-index: 2;
    
    .title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 2.25rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 2rem;
      text-align: left;
    }
    
    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2.5rem;
      
      .feature-item {
        display: flex;
        align-items: flex-start;
        
        .check-icon {
          width: 1.5rem;
          height: 1.5rem;
          background-color: rgba(0, 187, 152, 0.1);
          color: #00BB98;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1rem;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }
        
        .feature-content {
          flex: 1;
          
          .feature-title {
            font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
            font-size: 1.125rem;
            font-weight: 600;
            color: #333;
            margin-bottom: 0.5rem;
            text-align: left;
          }
          
          .feature-description {
            font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
            font-size: 0.875rem;
            line-height: 1.5rem;
            color: #666;
            text-align: left;
          }
        }
      }
    }
  }

  .right-images{
    :deep(.main-image-container){
      width: 80.1875rem;
      height: 27.4375rem;
      top: 16.875rem;
      right: 17.5rem;
    }
    :deep(.secondary-image-container){
      right: 14.375rem;
    }
  }

}

/* 媒体查询 - 1920*1080分辨率 */
/* 媒体查询 - 1366*768分辨率 */
</style> 