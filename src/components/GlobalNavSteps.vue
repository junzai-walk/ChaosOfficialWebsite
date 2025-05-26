<template>
  <div
    v-show="shouldShow"
    class="global-nav-steps"
    :class="{ 'nav-visible': isVisible }"
  >
    <div class="steps-container">
      <div
        v-for="(step, index) in currentSteps"
        :key="`${currentPageKey}-${index}`"
        class="step-item"
        :class="{ 'active': index + 1 === currentActiveStep }"
        @click="updateActiveStep(index + 1)"
      >
        <div class="step-title">{{ step }}</div>
        <div class="step-indicator">
          <div class="step-dot-outer"></div>
          <div class="step-dot"></div>
          <div class="step-line" v-if="index < currentSteps.length - 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSectionStore } from '@/stores/sectionStore';

// 定义不同页面的导航配置
interface NavConfig {
  steps: string[];
  sectionNumbers: number[];
  startSection: number;
  endSection: number;
}

// 页面导航配置映射
const pageNavConfigs: Record<string, NavConfig[]> = {
  '/industry': [
    // 钢铁行业 sections 1-4 (跳过section 0，因为那是IndustryHero)
    {
      steps: ['行业挑战', '解决方案', '方案优势', '典型案例'],
      sectionNumbers: [1, 2, 3, 4],
      startSection: 1,
      endSection: 4
    },
    // 石化行业 sections 5-8
    {
      steps: ['行业挑战', '解决方案', '方案优势', '典型案例'],
      sectionNumbers: [ 6, 7, 8, 9],
      startSection: 6,
      endSection: 9
    },
    // 煤炭行业 sections 11-14
    {
      steps: ['行业挑战', '解决方案', '方案优势', '典型案例'],
      sectionNumbers: [ 11, 12, 13, 14],
      startSection: 11,
      endSection: 14
    },
    // 化工行业 sections 16-19
    {
      steps: ['行业挑战', '解决方案', '方案优势', '典型案例'],
      sectionNumbers: [16, 17, 18, 19],
      startSection: 16,
      endSection: 19
    },
    // 汽车行业 sections 21-24
    {
      steps: ['行业挑战', '解决方案', '方案优势', '典型案例'],
      sectionNumbers: [21, 22, 23, 24],
      startSection: 21,
      endSection: 24
    },
    // 新能源行业 sections 26-29
    {
      steps: ['行业挑战', '解决方案', '方案优势'],
      sectionNumbers: [26, 27, 28],
      startSection: 26,
      endSection: 28
    },
  ],
  '/products': [
    // PHM系统 sections 1-4 (跳过section 0，因为那是ProductHero)
    {
      steps: ['产品概述', '核心功能', '特色优势', '典型案例'],
      sectionNumbers: [1, 2, 3, 4],
      startSection: 1,
      endSection: 4
    },
    // EAM系统 sections 6-9
    {
      steps: ['产品概述', '核心功能', '特色优势', '典型案例'],
      sectionNumbers: [6, 7, 8, 9],
      startSection: 6,
      endSection: 9
    },
    // APC平台 sections 11-14
    {
      steps: ['产品概述', '核心功能', '特色优势', '典型案例'],
      sectionNumbers: [11, 12, 13, 14],
      startSection: 11,
      endSection: 14
    },
    // EMS系统 sections 16-19
    {
      steps: ['产品概述', '核心功能', '特色优势', '应用成效'],
      sectionNumbers: [16, 17, 18, 19],
      startSection: 16,
      endSection: 19
    },
    // IOP平台 sections 22-25
    {
      steps: ['产品概述', '核心功能', '特色优势', '应用成效'],
      sectionNumbers: [22, 23, 24, 25],
      startSection: 22,
      endSection: 25
    },
    // APS系统 sections 27-30
    {
      steps: ['产品概述', '核心功能', '特色优势'],
      sectionNumbers: [27, 28, 29],
      startSection: 27,
      endSection: 29
    },
    //有线传感器
    {
      steps: ['产品亮点', '规格参数'],
      sectionNumbers: [31, 32],
      startSection: 31,
      endSection: 32
    },
    //无线智能传感器
    {
      steps: ['产品亮点', '规格参数'],
      sectionNumbers: [34, 35],
      startSection: 34,
      endSection: 35
    },
    //边缘智能采集器
    {
      steps: ['产品亮点', '规格参数'],
      sectionNumbers: [37, 38],
      startSection: 37,
      endSection: 38
    },
    //无线智能网关
    {
      steps: ['产品亮点', '规格参数'],
      sectionNumbers: [40, 41],
      startSection: 40,
      endSection: 41
    }

    // 硬件传感器 sections 17-20
    // {
    //   steps: ['产品概述', '核心功能', '特色优势', '典型案例'],
    //   sectionNumbers: [17, 18, 19, 20],
    //   startSection: 17,
    //   endSection: 20
    // },
    // // 其他硬件产品 sections 21-41
    // {
    //   steps: ['产品概述', '核心功能', '特色优势', '典型案例'],
    //   sectionNumbers: [21, 22, 23, 24],
    //   startSection: 21,
    //   endSection: 41
    // }
  ]
};

const route = useRoute();
const sectionStore = useSectionStore();

const currentActiveStep = ref(1);
const isVisible = ref(false);
const currentPageKey = ref('');

// 计算当前页面是否应该显示导航
const shouldShow = computed(() => {
  const path = route.path;
  const currentSection = sectionStore.currentSection;

  // 只有在配置的页面且不在Hero section (section 0)时才显示
  return pageNavConfigs[path] !== undefined && currentSection > 0;
});

// 计算当前应该显示的导航配置
const currentNavConfig = computed(() => {
  const path = route.path;
  const configs = pageNavConfigs[path];
  if (!configs) return null;

  const currentSection = sectionStore.currentSection;

  // 找到当前section对应的配置
  for (const config of configs) {
    if (currentSection >= config.startSection && currentSection <= config.endSection) {
      return config;
    }
  }

  return null;
});

// 计算当前步骤
const currentSteps = computed(() => {
  return currentNavConfig.value?.steps || [];
});

// 计算当前激活步骤
watch([() => sectionStore.currentSection, currentNavConfig], () => {
  const currentSection = sectionStore.currentSection;

  // 如果在 Hero section (section 0) 或没有配置，则隐藏导航
  if (currentSection === 0 || !currentNavConfig.value) {
    isVisible.value = false;
    return;
  }

  const config = currentNavConfig.value;

  // 检查是否在当前配置的范围内
  if (currentSection >= config.startSection && currentSection <= config.endSection) {
    const stepIndex = config.sectionNumbers.findIndex(num => num === currentSection);
    if (stepIndex !== -1) {
      currentActiveStep.value = stepIndex + 1;
      isVisible.value = true;
      currentPageKey.value = `${route.path}-${config.startSection}`;
    } else {
      isVisible.value = false;
    }
  } else {
    isVisible.value = false;
  }
}, { immediate: true });

// 点击导航步骤时的处理函数
const updateActiveStep = (stepIndex: number) => {
  if (!currentNavConfig.value) return;

  currentActiveStep.value = stepIndex;
  const config = currentNavConfig.value;

  if (config.sectionNumbers && config.sectionNumbers.length >= stepIndex) {
    const sectionNumber = config.sectionNumbers[stepIndex - 1];
    if (sectionNumber !== undefined) {
      sectionStore.setCurrentSection(sectionNumber);
    }
  }
};

// 监听路由变化，重置状态
watch(() => route.path, () => {
  currentActiveStep.value = 1;
  isVisible.value = false;
});

onMounted(() => {
  // 初始化时检查是否应该显示
  if (shouldShow.value && currentNavConfig.value) {
    isVisible.value = true;
  }
});
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;

  @media (max-width: 1366px) {
    font-size: 14px;
  }
}

/* 淡入淡出动画 */
@keyframes fadeInNav {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOutNav {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-20px);
  }
}

.global-nav-steps {
  position: fixed;
  top: 21rem;
  left: 2rem;
  z-index: 1000;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.3s ease-in-out;
  pointer-events: none;

  &.nav-visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
    animation: fadeInNav 0.3s ease-in-out forwards;
  }

  .steps-container {
    display: flex;
    flex-direction: column;
  }

  .step-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.875rem;
    cursor: pointer;
    position: relative;
    padding-right: 0.5rem;
    min-width: 120px;

    &:last-child {
      margin-bottom: 0;
    }

    .step-title {
      font-size: 1rem;
      color: #666;
      line-height: 1.25rem;
      flex: 1;
      transition: color 0.2s ease;
      white-space: nowrap;
    }

    .step-indicator {
      position: relative;
      width: 0.75rem;
      height: 0.75rem;
      margin-left: 0.625rem;

      .step-dot {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background-color: #c0c4cc;
        transition: all 0.3s ease;
      }

      .step-dot-outer {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease;
      }

      .step-line {
        position: absolute;
        top: 1rem;
        right: 0.3125rem;
        width: 0.125rem;
        height: 1.875rem;
        background-color: #e4e7ed;
      }
    }

    &.active {
      .step-title {
        color: #1890ff;
        font-weight: 500;
      }

      .step-indicator {
        .step-dot {
          background-color: #1890ff;
        }

        .step-dot-outer {
          background-color: rgba(24, 144, 255, 0.2);
          opacity: 1;
        }
      }
    }

    &:hover:not(.active) {
      .step-title {
        color: #1890ff;
      }
    }
  }
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .global-nav-steps {
    top: 21rem;
    left: 11.6875rem;
  }
}

@media (max-width: 1366px) {
  .global-nav-steps {
    top: 22rem;
    left: 3rem;
  }

  .step-item {
    margin-bottom: 1.5rem;

    .step-title {
      font-size: 0.9rem;
    }

    .step-indicator {
      width: 0.7rem;
      height: 0.7rem;

      .step-dot {
        width: 0.7rem;
        height: 0.7rem;
      }

      .step-dot-outer {
        width: 1.1rem;
        height: 1.1rem;
      }

      .step-line {
        height: 1.5rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .global-nav-steps {
    display: none; /* 在移动端隐藏 */
  }
}
</style>
