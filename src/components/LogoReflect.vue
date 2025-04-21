<template>
  <div 
    class="logo-depth-container" 
    ref="container" 
    :class="{ 'animating': isAnimating, 'weighted': isWeighted }"
  >
    <img :src="src" :alt="alt" class="logo-image" ref="logoImg" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, computed, watch } from 'vue';
import gsap from 'gsap';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'logo'
  },
  weight: {
    type: Number,
    default: 1 // 1-5 表示品牌权重
  },
  rowIndex: {
    type: Number,
    default: 0
  },
  colIndex: {
    type: Number,
    default: 0
  }
});

// 从父组件注入动画状态
const isAnimating = inject('isAnimating', ref(false));

const container = ref<HTMLElement | null>(null);
const logoImg = ref<HTMLImageElement | null>(null);
const isWeighted = computed(() => props.weight >= 4); // 权重高的品牌有特殊效果

// 监听动画状态变化
watch(isAnimating, (newValue) => {
  if (!newValue && container.value) {
    // 动画结束后，设置初始状态用于GSAP动画
    gsap.set(container.value, {
      clearProps: "all",
    });
    
    // 让组件能够响应鼠标悬停
    container.value.addEventListener('mouseenter', handleMouseEnter);
    container.value.addEventListener('mouseleave', handleMouseLeave);
  }
});

// 鼠标悬停动画
const handleMouseEnter = () => {
  if (!container.value || isAnimating.value) return;
  
  // Logo弹出效果
  gsap.to(container.value, {
    scale: 1.1,
    y: -5,
    duration: 0.3,
    ease: "back.out(1.5)",
  });
};

// 鼠标离开恢复
const handleMouseLeave = () => {
  if (!container.value || isAnimating.value) return;
  
  // 恢复原状
  gsap.to(container.value, {
    scale: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
  });
};

// 初始化
onMounted(() => {
  // 初始化鼠标事件
  if (!isAnimating.value && container.value) {
    container.value.addEventListener('mouseenter', handleMouseEnter);
    container.value.addEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style lang="less" scoped>
.logo-depth-container {
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
  
  &.weighted {
    z-index: 10;
  }
  
  .logo-image {
    display: block;
    max-height: 60%;
    max-width: 80%;
    transform-style: preserve-3d;
    transform-origin: center center;
    position: relative;
    z-index: 2;
    object-fit: contain;
    filter: none;
  }
}

@media (max-width: 1920px) {
  .logo-depth-container {
    .logo-image {
      max-height: 42%;
      max-width: 60%;
    }
  }
}

@media (max-width: 1232px) {
  .logo-depth-container {
    transform: perspective(800px);
    
    .logo-image {
      max-height: 42%;
      max-width: 60%;
    }
  }
}

@media (max-width: 768px) {
  .logo-depth-container {
    transform: perspective(600px);
    
    .logo-image {
      max-height: 42%;
      max-width: 60%;
    }
  }
}
</style>

<script lang="ts">
// 添加默认导出
export default {
  name: 'LogoReflect'
}
</script> 