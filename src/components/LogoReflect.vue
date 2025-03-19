<template>
  <div class="logo-depth-container" ref="container" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <img :src="src" :alt="alt" class="logo-image" ref="logoImg" />
    <div class="depth-effect"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'logo'
  }
});

const container = ref<HTMLElement | null>(null);
const logoImg = ref<HTMLImageElement | null>(null);

// 鼠标移动时的3D效果
const handleMouseMove = (event: MouseEvent) => {
  if (!container.value || !logoImg.value) return;
  
  const rect = container.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // 计算鼠标位置相对于元素中心的偏移
  const offsetX = (event.clientX - centerX) / (rect.width / 2);
  const offsetY = (event.clientY - centerY) / (rect.height / 2);
  
  // 根据鼠标位置调整3D旋转角度（最大±3度）
  const rotateX = -offsetY * 3;
  const rotateY = offsetX * 3;
  
  // 应用3D变换
  container.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

// 鼠标离开时恢复原状
const handleMouseLeave = () => {
  if (!container.value) return;
  container.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
};
</script>

<style lang="less" scoped>
.logo-depth-container {
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  transition: transform 0.3s ease;
  display: inline-block;
  
  .logo-image {
    display: block;
    height: 55px; // 增大图片尺寸
    width: auto;
    transform-style: preserve-3d;
    transform-origin: center center;
    position: relative;
    z-index: 2;
    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.1));
  }
  
  // 立体效果层 - 从右下角开始
  .depth-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    transform: translateZ(-20px) scale(0.98);
    filter: blur(4px) brightness(0.9);
    background: linear-gradient(135deg, transparent, rgba(0,0,0,0.15));
    border-radius: 4px;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.1);
    opacity: 0.7;
    transform-origin: bottom right; // 从右下角开始效果
  }
  
  &:hover {
    .depth-effect {
      filter: blur(3px) brightness(0.95);
      transform: translateZ(-15px) scale(0.99);
    }
  }
}
</style> 