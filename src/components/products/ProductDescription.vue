<template>
  <div class="product-description">
      <!-- 左侧导航栏 - 使用自定义组件 -->
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
    <div class="content">
      <div class="description">
        <p>{{ description }}</p>
      </div>
      <div class="video-container">
        <video 
          controls 
          class="video-player" 
          :src="videoSrc"
          poster="@/assets/products/video-1.png"
        >
          您的浏览器不支持视频播放
        </video>
        <!-- <div class="play-button">
          <i class="play-icon"></i>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';

const props = defineProps<{
  description: string;
  videoSrc: string;
  navSteps: string[];
  defaultActiveStep: number;
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 1); // 默认显示产品概述

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped>
.product-description {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 336px 187px 0 295px; /* 顶部对齐 336px，左侧对齐 187px */
  box-sizing: border-box;
  gap: 51px; /* 左侧导航与内容区域的间距 */
}

.left-side {
  width: 83px;
  height: 192px;
  flex-shrink: 0; /* 防止宽度被压缩 */
}

.content {
  flex: 1;
  display: flex;
  gap: 221px; /* description 与 video-container 的间距 */
}

.description {
    text-indent: 2em;
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    text-align: left;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center; 
}

.description p {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.video-container {
  width: 636px;
  height: 355px;
  flex-shrink: 0; /* 防止尺寸被压缩 */
  position: relative;
  transform: translateY(-108px);
}

.video-player {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover; /* 确保视频填充容器 */
}

.play-button {
  position: absolute;
  width: 80px;
  height: 80px;
  background-color: rgba(24, 144, 255, 0.9);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background-color: rgba(24, 144, 255, 1);
}

.play-button:active {
  transform: scale(0.95);
}

.play-button::before {
  content: '点击播放视频';
  position: absolute;
  bottom: -30px;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.play-button:hover::before {
  opacity: 1;
  transform: translateY(0);
}

.play-icon {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 0 15px 25px;
  border-color: transparent transparent transparent white;
  margin-left: 5px;
}

@media (max-width: 1920px) {
  .product-description {
    padding: calc(336px * 100vw / 1920) calc(187px * 100vw / 1920) 0;
    gap: calc(51px * 100vw / 1920);
  }
  
  .content {
    gap: calc(221px * 100vw / 1920);
  }
  
  .left-side {
    width: calc(83px * 100vw / 1920);
    height: calc(192px * 100vw / 1920);
  }
  
  .description {
    width: calc(439px * 100vw / 1920);
  }
  
  .video-container {
    width: calc(636px * 100vw / 1920);
    height: calc(355px * 100vw / 1920);
  }
}
</style> 