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

      <div class="feature-list">
        <div v-for="(item, index) in content" :key="index" class="feature-item">
          <img class="check-icon" src="@/assets/products/hardware-yes.png" alt="勾选图标" />
          <div class="feature-content">
            <div class="feature-title">{{ item.title }}</div>
            <div class="feature-description">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧图片 -->
    <ProductRightImages :mainImage="mainImage" :secondaryImage="secondaryImage" mainAlt="有线传感器主图"
      secondaryAlt="有线传感器辅助图" />
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
  content: {
    type: Array as PropType<FeatureContent[]>,
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
  min-height: 100vh;
  position: relative;
  background: #fff;

  .content-container {
    position: absolute;
    width: 37.6875rem;
    top: 14.9375rem;
    left: 19.625rem;
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
          width: 0.875rem;
          height: 0.75rem;
          flex-shrink: 0;
          margin-right: 0.75rem;
          transform: translateY(0.1875rem);
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

  :deep(.right-images .main-image-container) {
    width: 52.5rem !important;
    height: 43.125rem !important;
    top: 7.5rem !important;
    right: 2.5rem !important;
  }
}

/* 媒体查询 - 1920*1080分辨率 */
@media (max-width: 1920px) {
  :root {
    font-size: 16px;
  }
}

/* 媒体查询 - 1366*768分辨率 */
@media (max-width: 1366px) {
  :root {
    font-size: 11.38px; /* 16px * (1366/1920) = ~11.38px */
  }
}
</style>