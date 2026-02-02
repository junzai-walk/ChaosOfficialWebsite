<template>
  <div class="product-iop-features">
    <!-- 左侧导航栏 - 已隐藏，使用全局导航 -->
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

    <!-- 中心图片 -->
    <div class="center-image-container">
      <img :src="centerImage" alt="库存优化核心功能" class="center-image" />
    </div>

    <!-- 四个功能卡片 -->
    <div v-for="(feature, index) in features" :key="index" class="feature-card" :style="getCardStyle(feature.position)">
      <div class="feature-icon" :class="`bg-color-${index + 1}`">
        <img :src="feature.icon" alt="功能图标" />
      </div>
      <div class="feature-content">
        <h3 class="feature-title">{{ feature.title }}</h3>
        <p class="feature-description">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import centerImage from '@/assets/products/iop-core.png';

// 导入图标
import icon1 from '@/assets/products/iop-1.png';
import icon2 from '@/assets/products/iop-2.png';
import icon3 from '@/assets/products/iop-3.png';
import icon4 from '@/assets/products/iop-4.png';

interface Position {
  top: number;
  left: number;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  position: Position;
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 2);

// 功能数据
const features: Feature[] = [
  {
    title: '库存健康诊断',
    description: '助力中大型企业，进行库存健康智能诊断。',
    icon: icon1,
    position: { top: 12.1875, left: 20.8125 } // 195px/16=12.1875rem, (313+20)px/16=20.8125rem
  },
  {
    title: '库存需求预测',
    description: '助力中大型企业，针对性挖掘分析数据，构建需求预测模型。',
    icon: icon2,
    position: { top: 12.1875, left: 75.8125 } // 195px/16=12.1875rem, (1193+20)px/16=75.8125rem
  },
  {
    title: '库存智能补货',
    description: '助力中大型企业，针对性挖掘分析数据，构建智能补货模型。',
    icon: icon3,
    position: { top: 28.1875, left: 20.8125 } // 451px/16=28.1875rem, (313+20)px/16=20.8125rem
  },
  {
    title: '库存网络优化',
    description: '面向大型企业多级仓储网络，进行供应链规划与优化 。',
    icon: icon4,
    position: { top: 28.1875, left: 75.8125 } // 451px/16=28.1875rem, (1193+20)px/16=75.8125rem
  }
];

// 计算卡片样式，包括响应式位置
const getCardStyle = (position: Position) => {
  return {
    top: `${position.top}rem`,
    left: `${position.left}rem`,
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

}

.product-iop-features {
  width: 100%;
  min-height: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 6.25rem; /* 100px/16=6.25rem */

  .center-image-container {
    position: absolute;
    width: 28.1575rem; /* 450.52px/16=28.1575rem */
    height: 27.0625rem; /* 433px/16=27.0625rem */
    top: 12rem; /* 200px/16=12.5rem */
    left: 45.625rem; /* 730px/16=45.625rem */
    z-index: 1;

    .center-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .feature-card {
    position: absolute;
    width: 19.75rem; /* 316px/16=19.75rem */
    height: 10.625rem; /* 170px/16=10.625rem */
    background-color: white;
    border-radius: 0.625rem; /* 10px/16=0.625rem */
    padding: 1.5rem; /* 24px/16=1.5rem */
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08); /* 4px/16=0.25rem, 12px/16=0.75rem */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem; /* 16px/16=1rem */
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-0.3125rem); /* -5px/16=-0.3125rem */
      box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.12); /* 10px/16=0.625rem, 20px/16=1.25rem */
    }
  }

  .feature-icon {
    width: 2.5rem; /* 40px/16=2.5rem */
    height: 2.5rem; /* 40px/16=2.5rem */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 0 auto;
  }

  .feature-content {
    width: 100%;
  }

  .bg-color-1 {
    background-color: #fd4c5b5d;
  }

  .bg-color-2 {
    background-color: #377cfd41;
  }

  .bg-color-3 {
    background-color: #00bb9954;
  }

  .bg-color-4 {
    background-color: #761bff4b;
  }

  .feature-icon img {
    width: 1.25rem; /* 20px/16=1.25rem */
    height: 1.25rem; /* 20px/16=1.25rem */
    object-fit: contain;
  }

  .feature-title {
    font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
    font-weight: 600;
    font-size: 1.25rem; /* 20px/16=1.25rem */
    line-height: 100%;
    margin-bottom: 0.75rem; /* 12px/16=0.75rem */
    color: #333;
    text-align: center;
  }

  .feature-description {
    font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
    font-weight: 400;
    font-size: 0.875rem; /* 14px/16=0.875rem */
    line-height: 1.5rem; /* 24px/16=1.5rem */
    color: #666;
    text-align: left;
  }
}

/* 1920x1080分辨率适配 */
/* 1366x768分辨率适配 */
</style>