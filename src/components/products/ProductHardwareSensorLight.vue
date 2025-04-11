<template>
  <div class="product-hardware-sensor-light">
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
.product-hardware-sensor-light {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #fff;

  .content-container {
    position: absolute;
    width: 603px;
    top: 239px;
    left: 314px;
    z-index: 2;

    .title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 36px;
      font-weight: 600;
      color: #333;
      margin-bottom: 32px;
      text-align: left;
    }

    .feature-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 40px;

      .feature-item {
        display: flex;
        align-items: flex-start;

        .check-icon {
          width: 14px;
          height: 12px;
          flex-shrink: 0;
          margin-right: 12px;
          transform: translateY(3px);
        }

        .feature-content {
          flex: 1;

          .feature-title {
            font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #333;
            margin-bottom: 8px;
            text-align: left;
          }

          .feature-description {
            font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
            font-size: 14px;
            line-height: 24px;
            color: #666;
            text-align: left;
          }
        }
      }
    }
  }

  @media (max-width: 1920px) {
    .side-nav-container {
      top: calc(336px * 100vw / 1920);
      left: calc(187px * 100vw / 1920);
    }

    .content-container {
      width: calc(603px * 100vw / 1920);
      top: calc(239px * 100vw / 1920);
      left: calc(314px * 100vw / 1920);

      .title {
        font-size: calc(36px * 100vw / 1920);
        margin-bottom: calc(32px * 100vw / 1920);
      }

      .feature-list {
        gap: calc(24px * 100vw / 1920);
        margin-bottom: calc(40px * 100vw / 1920);

        .feature-item {
          .check-icon {
            width: calc(24px * 100vw / 1920);
            height: calc(24px * 100vw / 1920);
            font-size: calc(16px * 100vw / 1920);
            margin-right: calc(12px * 100vw / 1920);
          }

          .feature-content {
            .feature-title {
              font-size: calc(18px * 100vw / 1920);
              margin-bottom: calc(8px * 100vw / 1920);
            }

            .feature-description {
              font-size: calc(14px * 100vw / 1920);
              line-height: calc(24px * 100vw / 1920);
            }
          }
        }
      }
    }
  }

  :deep(.right-images .main-image-container) {
    width: 840px !important;
    height: 690px !important;
    top: 120px !important;
    right: 40px !important;
  }
}
</style>