<template>
  <div class="product-iop-features">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps :width="120" :height="192" :steps="navSteps" v-model:activeStep="activeStep" />
    </div>

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
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 2);

// 功能数据
const features: Feature[] = [
  {
    title: '库存健康诊断',
    description: '助力中大型企业，进行库存健康智能诊断。',
    icon: icon1,
    position: { top: 195, left: 313 + 20 }
  },
  {
    title: '库存需求预测',
    description: '助力中大型企业，针对库存做分析数据，构建需求预测模型。',
    icon: icon2,
    position: { top: 195, left: 1193 + 20 }
  },
  {
    title: '库存智能补货',
    description: '助力中大型企业，针对性设置分析数据，构建智能补货模型。',
    icon: icon3,
    position: { top: 451, left: 313 + 20 }
  },
  {
    title: '库存网络优化',
    description: '面向大型企业多级供应网络，进行供应链规划与优化。',
    icon: icon4,
    position: { top: 451, left: 1193 + 20 }
  }
];

// 计算卡片样式，包括响应式位置
const getCardStyle = (position: Position) => {
  return {
    top: `${position.top}px`,
    left: `${position.left}px`,
  };
};
</script>

<style scoped lang="less">
.product-iop-features {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: 100px;

  .center-image-container {
    position: absolute;
    width: 450.52px;
    height: 433px;
    top: 200px;
    left: 730px;
    z-index: 1;

    .center-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .feature-card {
    position: absolute;
    width: 316px;
    height: 170px;
    background-color: white;
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    }
  }

  .feature-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 20px auto;
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
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  .feature-title {
    font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 100%;
    margin-bottom: 12px;
    color: #333;
    text-align: center;
  }

  .feature-description {
    font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #666;
    text-align: left;
  }
}

@media (max-width: 1920px) {
  .product-iop-features {
    padding-top: calc(100px * 100vw / 1920);

    .side-nav-container {
      top: calc(336px * 100vw / 1920);
      left: calc(187px * 100vw / 1920);
      width: calc(120px * 100vw / 1920);
      height: calc(192px * 100vw / 1920);
    }

    .center-image-container {
      width: calc(450.52px * 100vw / 1920);
      height: calc(433px * 100vw / 1920);
      top: calc(200px * 100vw / 1920);
      left: calc(730px * 100vw / 1920);
    }

    .feature-card {
      width: calc(316px * 100vw / 1920);
      height: calc(170px * 100vw / 1920);
      padding: calc(24px * 100vw / 1920);
    }

    .feature-icon {
      width: calc(40px * 100vw / 1920);
      height: calc(40px * 100vw / 1920);
      margin-bottom: calc(16px * 100vw / 1920);
    }

    .feature-icon img {
      width: calc(20px * 100vw / 1920);
      height: calc(20px * 100vw / 1920);
    }

    .feature-title {
      font-size: calc(20px * 100vw / 1920);
      margin-bottom: calc(12px * 100vw / 1920);
    }

    .feature-description {
      font-size: calc(14px * 100vw / 1920);
      line-height: calc(24px * 100vw / 1920);
    }
  }
}
</style>