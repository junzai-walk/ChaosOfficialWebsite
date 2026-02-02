<template>
  <div class="right-images">
    <div class="main-image-container">
      <img :src="mainImage" :alt="mainAlt" class="main-image" @load="adjustContainer" ref="mainImageRef" />
    </div>
    <div class="secondary-image-container" v-if="secondaryImage">
      <img :src="secondaryImage" :alt="secondaryAlt" class="secondary-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  mainImage: {
    type: String,
    required: true
  },
  secondaryImage: {
    type: String,
    default: ''
  },
  mainAlt: {
    type: String,
    default: '主图'
  },
  secondaryAlt: {
    type: String,
    default: '辅助图'
  }
});

const mainImageRef = ref<HTMLImageElement | null>(null);

const adjustContainer = () => {
  if (mainImageRef.value) {
    const img = mainImageRef.value;
    const container = img.parentElement;
    if (container) {
      // 保持容器的宽度不变，调整高度以匹配图片比例
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const containerWidth = container.offsetWidth;
      container.style.height = `${containerWidth / imgRatio}px`;
    }
  }
};

onMounted(() => {
  // 如果图片已经加载，直接调整
  if (mainImageRef.value && mainImageRef.value.complete) {
    adjustContainer();
  }
});
</script>

<style lang="less" scoped>
.right-images {
  position: absolute;
  top: 0;
  right: 0;
  
  .main-image-container {
    position: absolute;
    width: 488px;
    height: 651px;
    top: 123px;
    right: 230px;
    z-index: 2;
    
    .main-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .secondary-image-container {
    position: absolute;
    width: 204px;
    height: 132px;
    top: 203px;
    right: 200px;
    
    .secondary-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
}
</style> 