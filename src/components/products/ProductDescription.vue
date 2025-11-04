<template>
  <div class="product-description">
      <!-- 左侧导航栏 - 使用自定义组件 -->
      <!-- <div class="side-nav-container">
        <CustomNavSteps 
          :width="120" 
          :height="192" 
          :steps="navSteps" 
          :active-step="activeStep" 
          :section-numbers="sectionNumbers" 
          @update:active-step="updateActiveStep" 
        />
      </div> -->
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
.product-description {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 15vh 8% 0 10%;
  box-sizing: border-box;
  gap: 2%;
}

.left-side {
  width: 8%;
  min-width: 80px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  display: flex;
  gap: 5%;
  align-items: flex-start;
}

.description {
  flex: 1;
  text-indent: 2em;
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.8;
  color: #333;
  text-align: left;
  min-width: 0;
  margin-top: 20px;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.description p {
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.8;
  color: #333;
}

.video-container {
  width: 45%;
  max-width: 636px;
  aspect-ratio: 16 / 9;
  flex-shrink: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.video-player, .image-player {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: contain;
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

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .product-description {
    padding: 18vh 10% 0 12%;
  }

  .content {
    gap: 8%;
  }

  .video-container {
    width: 42%;
  }
}

@media (max-width: 1470px) {
  .product-description {
    padding: 12vh 5% 0 8%;
    gap: 3%;
  }

  .content {
    gap: 4%;
  }

  .video-container {
    width: 48%;
  }
}

@media (max-width: 1200px) {
  .product-description {
    padding: 10vh 4% 0 6%;
    gap: 2%;
  }

  .content {
    gap: 3%;
  }

  .video-container {
    width: 50%;
  }
}

@media (max-width: 992px) {
  .product-description {
    flex-direction: column;
    padding: 8vh 5% 4vh;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    justify-content: center;
    margin-bottom: 5vh;
  }

  .content {
    flex-direction: column;
    gap: 5vh;
    align-items: center;
    width: 100%;
  }

  .video-container {
    width: 90%;
    max-width: 640px;
  }

  .description {
    width: 90%;
    max-width: 640px;
  }
}

@media (max-width: 768px) {
  .product-description {
    padding: 6vh 4% 3vh;
  }

  .description {
    font-size: clamp(13px, 2vw, 16px);
  }

  .description p {
    font-size: clamp(13px, 2vw, 16px);
  }

  .play-button {
    width: 60px;
    height: 60px;
  }

  .video-container {
    width: 95%;
  }
}

@media (max-width: 576px) {
  .product-description {
    padding: 5vh 3% 2vh;
  }

  .description {
    font-size: clamp(12px, 2.5vw, 14px);
  }

  .description p {
    font-size: clamp(12px, 2.5vw, 14px);
  }

  .play-button {
    width: 50px;
    height: 50px;
  }

  .play-icon {
    border-width: 12px 0 12px 20px;
  }

  .content {
    gap: 4vh;
  }
}
</style>