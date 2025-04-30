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
        <!-- 根据媒体类型展示视频或图片 -->
        <video 
          v-if="mediaType === 'video'"
          controls 
          class="video-player" 
          :src="mediaSrc"
        >
          您的浏览器不支持视频播放
        </video>
        <img 
          v-else
          class="image-player"
          :src="mediaSrc"
          alt="产品图片"
        />
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
  mediaSrc: string;
  mediaType: 'video' | 'image'; // 新增：媒体类型，可以是视频或图片
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

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
  
  @media (max-width: 1366px) {
    font-size: 14px;
  }
}

.product-description {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 21rem 11.6875rem 0 18.4375rem;
  box-sizing: border-box;
  gap: 3.1875rem;
}

.left-side {
  width: 5.1875rem;
  height: 12rem;
  flex-shrink: 0;
}

.content {
  flex: 1;
  display: flex;
  gap: 13.8125rem;
}

.description {
  text-indent: 2em;
  font-size: 1rem;
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
  font-size: 1rem;
  line-height: 1.8;
  color: #333;
}

.video-container {
  width: 39.75rem;
  height: 22.1875rem;
  flex-shrink: 0;
  position: relative;
  transform: translateY(-6.75rem);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.video-player, .image-player {
  max-width: 100%;
  max-height: 100%;
  border-radius: 0.5rem;
  object-fit: contain;
  width: auto;
  height: auto;
}

.play-button {
  position: absolute;
  width: 5rem;
  height: 5rem;
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
  bottom: -1.875rem;
  white-space: nowrap;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3125rem 0.625rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  opacity: 0;
  transform: translateY(0.625rem);
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
  border-width: 0.9375rem 0 0.9375rem 1.5625rem;
  border-color: transparent transparent transparent white;
  margin-left: 0.3125rem;
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .product-description {
    padding: 21rem 11.6875rem 0 18.4375rem;
    gap: 4rem;
  }
  
  .content {
    gap: 13.8125rem;
  }
  
  .video-container {
    width: 39.75rem;
    height: 22.1875rem;
  }
}

@media (max-width: 1470px) {
  .product-description {
    padding: 15rem 5rem 0 10rem;
    gap: 2.5rem;
  }
  
  .content {
    gap: 0rem;
  }
  
  .video-container {
    width: 46rem;
    height: 21rem;
    transform: translateY(-1rem);
  }
  
  .description {
    margin-left: 10rem;
  }
  
  .description p {
    font-size: 1.2rem;
  }
}

@media (max-width: 1200px) {
  .product-description {
    padding: 12rem 3rem 0 6rem;
    gap: 2rem;
  }
  
  .content {
    gap: 5rem;
  }
  
  .video-container {
    width: 25rem;
    height: 14.0625rem;
  }
}

@media (max-width: 992px) {
  .product-description {
    flex-direction: column;
    padding: 8rem 2rem 4rem;
    align-items: center;
  }
  
  .side-nav-container {
    width: 100%;
    justify-content: center;
    margin-bottom: 3rem;
  }
  
  .content {
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }
  
  .video-container {
    width: 100%;
    max-width: 40rem;
    height: auto;
    transform: translateY(0);
    margin-top: 3rem;
  }
  
  .description {
    width: 100%;
    max-width: 40rem;
  }
}

@media (max-width: 768px) {
  .product-description {
    padding: 6rem 1.5rem 3rem;
  }
  
  .description {
    font-size: 0.875rem;
  }
  
  .description p {
    font-size: 0.875rem;
  }
  
  .play-button {
    width: 4rem;
    height: 4rem;
  }
}

@media (max-width: 576px) {
  .product-description {
    padding: 5rem 1rem 2rem;
  }
  
  .description {
    font-size: 0.8125rem;
  }
  
  .description p {
    font-size: 0.8125rem;
  }
}
</style> 