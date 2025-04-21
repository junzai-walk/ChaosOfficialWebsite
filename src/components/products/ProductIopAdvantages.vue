<template>
  <div class="product-iop-advantages">
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
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 3);

// 功能数据
const advantages: Advantage[] = [
  {
    title: '多元产品',
    description: '库存健康诊断、库存需求预测、库存智能补货、库存网络优化等多种产品任由选择，满足不同客户的需求和场景。',
    icon: icon1,
    position: { top: 10.1875, left: 23.75 } // 163px/16=10.1875rem, (360+20)px/16=23.75rem
  },
  {
    title: '多模式交付',
    description: 'Web软件、API、SAAS、私有云等多种交付方式任由选择，满足不同客户的需求和场景。',
    icon: icon2,
    position: { top: 10.1875, left: 71.3125 } // 163px/16=10.1875rem, (1121+20)px/16=71.3125rem
  },
  {
    title: '界面/接口便捷实用',
    description: '移动端、网页端均可使用，操作简单。提供API接口和企业的ERP、WMS、EAM等系统对接，实现数据的互通。',
    icon: icon3,
    position: { top: 21.3125, left: 20.625 } // 341px/16=21.3125rem, (310+20)px/16=20.625rem
  },
  {
    title: '免费的POC验证',
    description: '以数据为核心，针对业务特点构建库存模型，充分的测试与数据分析，验证投资价值。',
    icon: icon4,
    position: { top: 21.3125, left: 74.4375 } // 341px/16=21.3125rem, (1171+20)px/16=74.4375rem
  }
];

// 获取卡片样式
const getCardStyle = (position: Position) => {
  return {
    top: `${position.top}rem`,
    left: `${position.left}rem`
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

.product-iop-advantages {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: 6.25rem; /* 100px/16=6.25rem */

  .background-image-container {
    position: absolute;
    width: 87.375rem; /* 1398px/16=87.375rem */
    height: 51.5625rem; /* 825px/16=51.5625rem */
    top: 4.125rem; /* 66px/16=4.125rem */
    left: 16.875rem; /* 270px/16=16.875rem */
    z-index: 1;

    .background-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .advantage-card {
    position: absolute;
    width: 27.5rem; /* 440px/16=27.5rem */
    height: 6.25rem; /* 100px/16=6.25rem */
    background-color: white;
    border-radius: 0.625rem; /* 10px/16=0.625rem */
    padding: 1.5rem; /* 24px/16=1.5rem */
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08); /* 4px/16=0.25rem, 12px/16=0.75rem */
    display: flex;
    align-items: flex-start;
    gap: 1rem; /* 16px/16=1rem */
    z-index: 2;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-0.3125rem); /* -5px/16=-0.3125rem */
      box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.12); /* 10px/16=0.625rem, 20px/16=1.25rem */
    }
  }

  .advantage-icon {
    width: 2.5rem; /* 40px/16=2.5rem */
    height: 2.5rem; /* 40px/16=2.5rem */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    img {
      width: 2.5rem; /* 40px/16=2.5rem */
      height: 2.5rem; /* 40px/16=2.5rem */
      object-fit: contain;
    }
  }

  .advantage-content {
    flex: 1;

    .advantage-title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-weight: 600;
      font-size: 1.25rem; /* 20px/16=1.25rem */
      line-height: 100%;
      margin-bottom: 0.75rem; /* 12px/16=0.75rem */
      color: #333;
      text-align: left;
    }

    .advantage-description {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-weight: 400;
      font-size: 0.875rem; /* 14px/16=0.875rem */
      line-height: 1.5rem; /* 24px/16=1.5rem */
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

/* 1920x1080分辨率适配 */
@media (min-width: 1367px) and (max-width: 1920px) {
  .product-iop-advantages {
    .side-nav-container {
      top: 21rem; /* 336px/16=21rem */
      left: 11.6875rem; /* 187px/16=11.6875rem */
      width: 7.5rem; /* 120px/16=7.5rem */
      height: 12rem; /* 192px/16=12rem */
    }
  }
}

/* 1366x768分辨率适配 */
@media (max-width: 1366px) {
  .product-iop-advantages {
    padding-top: 5rem;

    .side-nav-container {
      top: 18rem;
      left: 8rem;
      width: 6.5rem;
      height: 10.5rem;
    }

    .background-image-container {
      width: 85rem;
        height: 60rem;
        top: 3.5rem;
        left: 20rem;
    }

    .advantage-card {
      width: 30rem;
      height: 7rem;
      padding:2rem 20px 0;
      gap: 0.8rem;
    }

    .advantage-icon {
      width: 2.2rem;
      height: 2.2rem;

      img {
        width: 2.2rem;
        height: 2.2rem;
      }
    }

    .advantage-content {
      .advantage-title {
        font-size: 1.1rem;
        margin-bottom: 0.6rem;
      }

      .advantage-description {
        font-size: 1rem;
        line-height: 1.3rem;
      }
    }
  }
}
</style>