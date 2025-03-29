<template>
  <div class="custom-nav-steps" :style="{ width: `${width}px`, height: `${height}px` }">
    <div class="steps-container">
      <div 
        v-for="(step, index) in steps" 
        :key="index" 
        class="step-item"
        :class="{ 'active': index + 1 === activeStep }"
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
  }
});

const emit = defineEmits(['update:activeStep']);

const updateActiveStep = (stepIndex: number) => {
  emit('update:activeStep', stepIndex);
};
</script>

<style scoped lang="less">
.custom-nav-steps {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  top: 336px;
  left: 187px;
  
  .steps-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .step-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.875rem; // 30px
    cursor: pointer;
    position: relative;
    padding-right: 0.5rem; // 8px
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .step-title {
      font-size: 1rem; // 16px
      color: #666;
      line-height: 1.25rem; // 20px
      flex: 1;
    }
    
    .step-indicator {
      position: relative;
      width: 0.75rem; // 12px
      height: 0.75rem; // 12px
      margin-left: 0.625rem; // 10px
      
      .step-dot {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.75rem; // 12px
        height: 0.75rem; // 12px
        border-radius: 50%;
        background-color: #c0c4cc;
        transition: all 0.3s;
      }
      
      .step-dot-outer {
        position: absolute;
        top: -0.25rem; // -4px
        right: -0.25rem; // -4px
        width: 1.25rem; // 20px
        height: 1.25rem; // 20px
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s;
      }
      
      .step-line {
        position: absolute;
        top: 1rem; // 16px
        right: 0.3125rem; // 5px
        width: 0.125rem; // 2px
        height: 1.875rem; // 30px
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
</style> 