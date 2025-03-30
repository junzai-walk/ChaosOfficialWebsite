<template>
  <div class="product-aps-features">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps 
        :width="120" 
        :height="192" 
        :steps="navSteps" 
        v-model:activeStep="activeStep" 
      />
    </div>
    
    <!-- 左侧图片 -->
    <div class="picture-left-container">
      <img :src="pictureLeft" alt="APS核心功能-左" class="picture-left" />
    </div>
    
    <!-- 右侧图片 -->
    <div class="picture-right-container">
      <img :src="pictureRight" alt="APS核心功能-右" class="picture-right" />
    </div>
    
    <!-- 底部图片 -->
    <div class="picture-bottom-container">
      <img :src="pictureBottom" alt="APS核心功能-底部" class="picture-bottom" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import pictureLeft from '@/assets/products/aps-core-2.png';
import pictureRight from '@/assets/products/aps-core-3.png';
import pictureBottom from '@/assets/products/aps-core-1.png';

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 2);
</script>

<style scoped lang="less">
.product-aps-features {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: white;
  padding-top: 100px;
  overflow: hidden;
  
  .side-nav-container {
    position: absolute;
    top: 336px;
    left: 187px;
    z-index: 10;

    .custom-nav-steps {
      top: 0;
      left: 0;
    }
  }
  
  .picture-left-container {
    position: absolute;
    width: 541.870361328125px;
    height: 365.0000305175781px;
    top: 225px;
    left: 463px;
    z-index: 2;
    
    .picture-left {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .picture-right-container {
    position: absolute;
    width: 541.87px;
    height: 365px;
    top: 225px;
    left: 805px;
    z-index: 2;
    
    .picture-right {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .picture-bottom-container {
    position: absolute;
    width: 1082px;
    height: 609px;
    top: 257px;
    left: 419px;
    z-index: 1;
    
    .picture-bottom {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  @media (max-width: 1920px) {
    padding-top: calc(100px * 100vw / 1920);
    
    .side-nav-container {
      top: calc(336px * 100vw / 1920);
      left: calc(187px * 100vw / 1920);
    }
    
    .picture-left-container {
      width: calc(541.870361328125px * 100vw / 1920);
      height: calc(365.0000305175781px * 100vw / 1920);
      top: calc(225px * 100vw / 1920);
      left: calc(463px * 100vw / 1920);
    }
    
    .picture-right-container {
      width: calc(541.870361328125px * 100vw / 1920);
      height: calc(365.0000305175781px * 100vw / 1920);
      top: calc(590px * 100vw / 1920);
      left: calc(1456px * 100vw / 1920);
    }
    
    .picture-bottom-container {
      width: calc(1082px * 100vw / 1920);
      height: calc(609px * 100vw / 1920);
      top: calc(257px * 100vw / 1920);
      left: calc(419px * 100vw / 1920);
    }
  }
}
</style> 