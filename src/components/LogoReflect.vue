<template>
  <div 
    class="logo-depth-container" 
    ref="container" 
    @mousemove="!isAnimating && handleMouseMove" 
    @mouseleave="!isAnimating && handleMouseLeave"
    :class="{ 'animating': isAnimating, 'weighted': isWeighted }"
    :style="logoStyle"
  >
    <img :src="src" :alt="alt" class="logo-image" ref="logoImg" @load="extractLogoColor" />
    <div class="depth-effect" :style="shadowStyle"></div>
    <div class="glow-effect" :style="glowStyle" v-if="isWeighted"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, computed, reactive } from 'vue';

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
const mainColor = ref('rgba(0,120,255,0.5)'); // 默认光晕颜色
const isWeighted = computed(() => props.weight >= 4); // 权重高的品牌有特殊效果

// 提取logo主色
const extractLogoColor = () => {
  // 这里简化处理，实际应该使用canvas提取颜色
  // 根据不同的logo设置不同的颜色
  if (props.alt.includes('0-0') || props.alt.includes('2-3')) {
    mainColor.value = 'rgba(220,50,50,0.6)';
  } else if (props.alt.includes('1-2') || props.alt.includes('3-1')) {
    mainColor.value = 'rgba(30,120,220,0.5)';
  } else if (props.alt.includes('2-0') || props.alt.includes('3-5')) {
    mainColor.value = 'rgba(50,180,80,0.5)';
  }
};

// 动态计算位置和动画
const position = reactive({
  x: 0,
  y: 0,
  z: 0,
  scale: 1,
  opacity: 1,
  rotateX: 0,
  rotateY: 0
});

// 根据行列和权重计算动画参数
const calculatePosition = () => {
  // 根据权重计算不同的动画参数
  if (isAnimating.value) {
    const baseDelay = props.rowIndex * 0.2 + props.colIndex * 0.05;
    const zOffset = (props.weight * 20) + Math.random() * 30;
    
    position.z = -500 + props.rowIndex * 100 + zOffset;
    position.scale = 0.7 + props.weight * 0.15;
    position.opacity = 0.3 + props.rowIndex * 0.2;
    
    // 添加微颤动效果
    position.x = (Math.random() - 0.5) * 6;
    position.y = (Math.random() - 0.5) * 6;
    
    // 添加随机旋转
    position.rotateX = (Math.random() - 0.5) * 10;
    position.rotateY = (Math.random() - 0.5) * 10;
  } else {
    // 动画结束后的状态
    position.z = 0;
    position.scale = 1 + (props.weight - 1) * 0.1; // 权重高的略大
    position.opacity = 1;
    position.x = 0;
    position.y = 0;
    
    // 重要品牌有轻微的浮动效果
    if (isWeighted.value) {
      const time = Date.now() / 1000;
      position.y = Math.sin(time + props.colIndex) * 5;
      position.rotateX = Math.sin(time * 0.7) * 2;
      position.rotateY = Math.cos(time * 0.5) * 2;
    } else {
      position.rotateX = 0;
      position.rotateY = 0;
    }
  }
};

// logo样式计算属性
const logoStyle = computed(() => {
  calculatePosition();
  
  return {
    transform: `translateX(${position.x}px) translateY(${position.y}px) translateZ(${position.z}px) 
                scale(${position.scale}) rotateX(${position.rotateX}deg) rotateY(${position.rotateY}deg)`,
    opacity: position.opacity,
    transition: isAnimating.value ? `transform 5s cubic-bezier(0.19, 1, 0.22, 1) ${props.rowIndex * 0.2 + props.colIndex * 0.05}s, 
                                     opacity 5s cubic-bezier(0.19, 1, 0.22, 1) ${props.rowIndex * 0.2 + props.colIndex * 0.05}s` :
                                    'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
  };
});

// 投影样式
// const shadowStyle = computed(() => ({
//   background: isWeighted.value ? 
//     `radial-gradient(circle at center, rgba(0,0,0,0.25), rgba(0,0,0,0.15))` : 
//     `linear-gradient(135deg, transparent, rgba(0,0,0,0.2))`,
//   transform: isAnimating.value ? 
//     `translateZ(${-50 - props.rowIndex * 10}px) translateY(10px) scale(0.9)` : 
//     `translateZ(-20px) scale(0.98)`
// }));

const shadowStyle = computed(() => ({
  background: isWeighted.value ? 
    `transparent` : 
    `transparent`,
  transform: isAnimating.value ? 
    `translateZ(${-50 - props.rowIndex * 10}px) translateY(10px) scale(0.9)` : 
    `translateZ(-20px) scale(0.98)`
}));

// 高光效果
const glowStyle = computed(() => ({
  background: `radial-gradient(circle at center, ${mainColor.value}, transparent 70%)`,
  opacity: isAnimating.value ? 0.2 : 0.7,
  transform: `translateZ(-5px) scale(1.2)`
}));

// 鼠标移动时的3D效果
const handleMouseMove = (event: MouseEvent) => {
  if (!container.value || !logoImg.value || isAnimating.value) return;
  
  const rect = container.value.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // 计算鼠标位置相对于元素中心的偏移
  const offsetX = (event.clientX - centerX) / (rect.width / 2);
  const offsetY = (event.clientY - centerY) / (rect.height / 2);
  
  // 根据鼠标位置调整3D旋转角度（最大±5度）
  const rotateX = -offsetY * 5;
  const rotateY = offsetX * 5;
  
  // 应用3D变换
  container.value.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) 
                                    scale(${1 + (props.weight - 1) * 0.1})`;
  
  // 权重高的logo有特殊光效
  if (isWeighted.value && container.value.querySelector('.glow-effect')) {
    const glowEl = container.value.querySelector('.glow-effect') as HTMLElement;
    glowEl.style.opacity = '1';
    glowEl.style.transform = `translateZ(-5px) scale(1.3) translateX(${-offsetX * 10}px) translateY(${-offsetY * 10}px)`;
  }
};

// 鼠标离开时恢复原状
const handleMouseLeave = () => {
  if (!container.value || isAnimating.value) return;
  container.value.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(${1 + (props.weight - 1) * 0.1})`;
  
  if (isWeighted.value && container.value.querySelector('.glow-effect')) {
    const glowEl = container.value.querySelector('.glow-effect') as HTMLElement;
    glowEl.style.opacity = '0.7';
    glowEl.style.transform = 'translateZ(-5px) scale(1.2)';
  }
};

// 初始化
onMounted(() => {
  // 提取logo主色调
  extractLogoColor();
  
  // 高权重logo添加动态效果
  if (isWeighted.value && !isAnimating.value) {
    setInterval(() => {
      if (container.value && !isAnimating.value) {
        const time = Date.now() / 1000;
        const y = Math.sin(time + props.colIndex) * 5;
        container.value.style.transform = `perspective(1000px) translateY(${y}px) scale(${1 + (props.weight - 1) * 0.1})`;
      }
    }, 50);
  }
});
</script>

<style lang="less" scoped>
.logo-depth-container {
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  transition: transform 0.3s ease;
  display: inline-block;
  will-change: transform, opacity;
  
  &.animating {
    transition: transform 5s cubic-bezier(0.19, 1, 0.22, 1), opacity 5s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  &.weighted {
    z-index: 10;
    
    .logo-image {
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.25));
    }
  }
  
  .logo-image {
    display: block;
    height: 62px;
    width: auto;
    transform-style: preserve-3d;
    transform-origin: center center;
    position: relative;
    z-index: 2;
    // filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
  }
  
  .depth-effect {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 5px;
    left: 0;
    z-index: 1;
    transform: translateZ(-20px) scale(0.98);
    //filter: blur(4px) brightness(0.8);
    //background: linear-gradient(135deg, transparent, rgba(0,0,0,0.2));
    border-radius: 4px;
   // box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    opacity: 0.8;
    transform-origin: bottom center;
    transition: all 0.3s ease;
  }
  
  .glow-effect {
    position: absolute;
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    z-index: 0;
    transform: translateZ(-5px) scale(1.2);
    filter: blur(15px);
    opacity: 0.7;
    transition: all 0.5s ease;
    border-radius: 50%;
    pointer-events: none;
  }
  
  &:hover {
    .depth-effect {
      filter: blur(3px) brightness(0.95);
      transform: translateZ(-15px) scale(0.99);
    }
    
    .glow-effect {
      opacity: 1;
      transform: translateZ(-5px) scale(1.3);
    }
  }
  
  &.animating .depth-effect {
    transform: translateZ(-30px) translateY(5px) scale(0.95);
    opacity: 0.7;
  }
  
  &.animating .glow-effect {
    opacity: 0.2;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
</style> 