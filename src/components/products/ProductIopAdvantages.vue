<template>
  <div class="product-iop-advantages">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps :width="120" :height="192" :steps="navSteps" v-model:activeStep="activeStep" />
    </div>

    <!-- 背景图片 -->
    <div class="background-image-container">
      <img :src="backgroundImage" alt="库存优化特色优势背景" class="background-image" />
    </div>

    <!-- 四个优势卡片 -->
    <div v-for="(advantage, index) in advantages" :key="index" class="advantage-card"
      :style="getCardStyle(advantage.position)">
      <!-- 左侧图标布局（位置在1,3的卡片） -->
      <template v-if="index === 0 || index === 2">
        <div class="advantage-icon">
          <img :src="advantage.icon" alt="优势图标" />
        </div>
        <div class="advantage-content">
          <h3 class="advantage-title">{{ advantage.title }}</h3>
          <p class="advantage-description">{{ advantage.description }}</p>
        </div>
      </template>

      <!-- 右侧图标布局（位置在2,4的卡片） -->
      <template v-else>
        <div class="advantage-content right-align">
          <h3 class="advantage-title">{{ advantage.title }}</h3>
          <p class="advantage-description">{{ advantage.description }}</p>
        </div>
        <div class="advantage-icon">
          <img :src="advantage.icon" alt="优势图标" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import backgroundImage from '@/assets/products/iop-feature.png';
import icon1 from '@/assets/products/iop-feature-1.png';
import icon2 from '@/assets/products/iop-feature-2.png';
import icon3 from '@/assets/products/iop-feature-3.png';
import icon4 from '@/assets/products/iop-feature-4.png';

interface Position {
  top: number;
  left: number;
}

interface Advantage {
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
const activeStep = ref(props.defaultActiveStep || 3);

// 功能数据
const advantages: Advantage[] = [
  {
    title: '多元产品',
    description: '系统提供全球服，解决常见多级库存，满足各种规模企业的核心产品功能需求，更适不同客户需求适配。',
    icon: icon1,
    position: { top: 163, left: 360 + 20 }
  },
  {
    title: '多模式支付',
    description: 'Web钱包、API、SAAS、私有云等多场景的部署方式在企业中实现，满足不同客户的自由选择能力。',
    icon: icon2,
    position: { top: 163, left: 1121 + 20 }
  },
  {
    title: '界面/接口便捷应用',
    description: '系统运行，简洁操作管理调整，采用新UI框架，系统对接API生成标准服标准，支持多版本转换，支持环境。',
    icon: icon3,
    position: { top: 341, left: 310 + 20 }
  },
  {
    title: '免费的POC验证',
    description: '以数据为驱动，针对海量客户和场景进行建模与诊断，满足不同行业和规模企业的预测流能力。',
    icon: icon4,
    position: { top: 341, left: 1171 + 20 }
  }
];

// 获取卡片样式
const getCardStyle = (position: Position) => {
  return {
    top: `${position.top}px`,
    left: `${position.left}px`
  };
};
</script>

<style scoped lang="less">
.product-iop-advantages {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: 100px;

  .background-image-container {
    position: absolute;
    width: 1398px;
    height: 825px;
    top: 66px;
    left: 270px;
    z-index: 1;

    .background-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .advantage-card {
    position: absolute;
    width: 440px;
    height: 100px;
    background-color: white;
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: flex-start;
    gap: 16px;
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    }
  }

  .advantage-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  }

  .advantage-content {
    flex: 1;

    .advantage-title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-weight: 600;
      font-size: 20px;
      line-height: 100%;
      margin-bottom: 12px;
      color: #333;
      text-align: left;
    }

    .advantage-description {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #666;
      text-align: left;
    }

    &.right-align {

      .advantage-title,
      .advantage-description {
        text-align: right;
      }
    }
  }
}

@media (max-width: 1920px) {
  .product-iop-advantages {
    padding-top: calc(100px * 100vw / 1920);

    .side-nav-container {
      top: calc(336px * 100vw / 1920);
      left: calc(187px * 100vw / 1920);
      width: calc(120px * 100vw / 1920);
      height: calc(192px * 100vw / 1920);
    }

    .background-image-container {
      width: calc(1398px * 100vw / 1920);
      height: calc(825px * 100vw / 1920);
      top: calc(66px * 100vw / 1920);
      left: calc(270px * 100vw / 1920);
    }

    .advantage-card {
      width: calc(440px * 100vw / 1920);
      height: calc(148px * 100vw / 1920);
      padding: calc(24px * 100vw / 1920);
      gap: calc(16px * 100vw / 1920);
    }

    .advantage-icon {
      width: calc(40px * 100vw / 1920);
      height: calc(40px * 100vw / 1920);

      img {
        width: calc(40px * 100vw / 1920);
        height: calc(40px * 100vw / 1920);
      }
    }

    .advantage-content {
      .advantage-title {
        font-size: calc(20px * 100vw / 1920);
        margin-bottom: calc(12px * 100vw / 1920);
      }

      .advantage-description {
        font-size: calc(14px * 100vw / 1920);
        line-height: calc(24px * 100vw / 1920);
      }
    }
  }
}
</style>