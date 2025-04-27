<template>
  <div class="custom-nav-steps" :style="{ width: `${width}px`, height: `${height}px` }">
    <div class="steps-container">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        class="step-item"
        :class="{ 'active': index + 1 === currentActiveStep }"
        @click="updateActiveStep(index + 1)"
      >
        <div class="step-title">{{ step }}</div>
        <div class="step-indicator">
          <div class="step-dot-outer"></div>
          <div class="step-dot"></div>
          <div class="step-line" v-if="index < steps.length - 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSectionStore } from '@/stores/sectionStore';
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 120
  },
  height: {
    type: Number,
    default: 192
  },
  steps: {
    type: Array as () => string[],
    required: true
  },
  activeStep: {
    type: Number,
    default: 1
  },
  sectionNumbers: {
    type: Array as () => number[],
    default: () => []
  }
});

const emit = defineEmits(['update:activeStep']);
const sectionStore = useSectionStore();
const currentActiveStep = ref(props.activeStep);

// 点击导航步骤时的处理函数
const updateActiveStep = (stepIndex: number) => {
  currentActiveStep.value = stepIndex;
  emit('update:activeStep', stepIndex);
  
  if (props.sectionNumbers && props.sectionNumbers.length >= stepIndex) {
    const sectionNumber = props.sectionNumbers[stepIndex - 1];
    if (sectionNumber !== undefined) {
      sectionStore.setCurrentSection(sectionNumber);
    }
  }
};

// 监听当前Section的变化，反向更新导航的激活状态
watch(() => sectionStore.currentSection, (newSection) => {
  if (props.sectionNumbers && props.sectionNumbers.length > 0) {
    // 找到当前section对应的导航索引
    const activeIndex = props.sectionNumbers.findIndex(num => num === newSection);
    if (activeIndex !== -1) {
      currentActiveStep.value = activeIndex + 1;
      emit('update:activeStep', activeIndex + 1);
    }
  }
});

// 当组件挂载时，确保初始状态正确
onMounted(() => {
  // 如果当前section已经在sectionNumbers中，则初始化activeStep
  if (props.sectionNumbers && props.sectionNumbers.length > 0) {
    const activeIndex = props.sectionNumbers.findIndex(num => num === sectionStore.currentSection);
    if (activeIndex !== -1) {
      currentActiveStep.value = activeIndex + 1;
      emit('update:activeStep', activeIndex + 1);
    }
  }
});

// 暴露组件属性和方法
defineExpose({
  currentActiveStep,
  updateActiveStep
});
</script>

<script lang="ts">
// 添加默认导出
export default {
  name: 'CustomNavSteps'
}
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
  
  @media (max-width: 1500px) {
    font-size: 14px;
  }
}

.custom-nav-steps {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  top: 21rem; /* 336px -> 21rem */
  left: 11.6875rem; /* 187px -> 11.6875rem */
  
  .steps-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .step-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.875rem;
    cursor: pointer;
    position: relative;
    padding-right: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .step-title {
      font-size: 1rem;
      color: #666;
      line-height: 1.25rem;
      flex: 1;
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
        transition: all 0.3s;
      }
      
      .step-dot-outer {
        position: absolute;
        top: -0.25rem;
        right: -0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s;
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
  }
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .custom-nav-steps {
    top: 21rem;
    left: 11.6875rem;
  }
}

@media (max-width: 1500px) {
  .custom-nav-steps {
    top: 18rem;
    left: 8rem;
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

@media (max-width: 1000px) {
  .custom-nav-steps {
    position: relative;
    top: 0;
    left: 0;
    width: 100% !important;
    margin-bottom: 1.5rem;
  }
  
  .steps-container {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .step-item {
    margin-right: 1rem;
    margin-bottom: 1rem;
    
    .step-line {
      display: none;
    }
  }
}
</style> 