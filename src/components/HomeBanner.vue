<template>
  <div class="home-hero">
    <div class="video-container">
      <video ref="videoElement" autoplay loop muted playsinline class="background-video">
        <source :src="videoSource" type="video/mp4">
        您的浏览器不支持 HTML5 视频。
      </video>
      <div class="overlay"></div>
    </div>
    <div class="content">
      <h1 class="title">基于核心数据算法 提供工业智能服务</h1>
      <p class="subtitle">凯奥思数据 让工业更智能</p>
      <el-button type="primary" size="large" class="cta-button">了解更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 直接导入视频文件
import videoSource from '@/assets/video/official_video.mp4'

const videoElement = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (videoElement.value) {
    videoElement.value.play().catch(error => {
      console.error('视频播放失败:', error)
    })
  }
})
</script>

<style scoped>
.home-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色遮罩 */
  z-index: 2;
}

.content {
  z-index: 3;
  text-align: center;
  color: #fff;
  padding: 0 20px;
  max-width: 800px;
}

.title {
  width: 976px;
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
  letter-spacing: 2px;
  position: absolute;
  top: 333px; 
  left: 472px;
}

.subtitle {
  font-size: 24px;
  margin-bottom: 30px;
  opacity: 0.9;
  width: 353px;
  height: 42px;
  top: 457px;
  left: 783px;
  position: absolute;
}

.cta-button {
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 4px;
  transition: all 0.3s ease;
  width: 200px;
  height: 56px;
  top: 580px;
  left: 860px;
  border-radius: 34px;
  position: absolute;
  background-color: transparent;
  border: 1px solid #fff;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }
  
  .subtitle {
    font-size: 18px;
  }
}
</style> 