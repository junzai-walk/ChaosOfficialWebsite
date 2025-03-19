<template>
  <div class="side-nav-steps" :style="{ width: `${width}px`, height: `${height}px` }">
    <el-steps direction="vertical" :active="activeStep" finish-status="success" process-status="process">
      <el-step v-for="(step, index) in steps" :key="index" :title="step"></el-step>
    </el-steps>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 83
  },
  height: {
    type: Number,
    default: 120
  },
  steps: {
    type: Array as () => string[],
    required: true
  },
  activeStep: {
    type: Number,
    default: 0
  }
});

defineEmits(['update:activeStep']);
</script>

<style scoped lang="less">
.side-nav-steps {
  text-align: left;
  
  :deep(.el-steps) {
    height: 100%;
  }
  
  :deep(.el-step) {
    padding-bottom: 10px;
    
    &:last-child {
      padding-bottom: 0;
    }
    
    .el-step__title {
      font-size: 14px;
      color: #666;
    }
    
    &.is-process .el-step__title {
      color: #1890ff;
      font-weight: 500;
    }
  }
  
  :deep(.el-step__icon) {
    width: 24px;
    height: 24px;
  }
  
  :deep(.el-step__line) {
    margin-right: 8px;
  }
}
</style> 