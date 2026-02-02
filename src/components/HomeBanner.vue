<template>
  <div class="home-hero">
    <div class="video-container">
      <!-- 视频加载前或加载失败时显示的占位图片 -->
      <div v-if="!isVideoLoaded || isVideoError" class="placeholder-container">
        <img :src="placeholderImage" alt="背景图片" class="placeholder-image" />
        <div v-if="!isVideoError" class="loading-indicator">
          <div class="loading-spinner"></div>
          <span>视频加载中...</span>
        </div>
      </div>

      <!-- 视频元素 -->
      <video
        ref="videoElement"
        autoplay
        loop
        muted
        playsinline
        class="background-video"
        :class="{ 'video-loaded': isVideoLoaded && !isVideoError }"
        @canplay="handleVideoCanPlay"
        @error="handleVideoError"
        v-show="!isVideoError"
      >
        <source :src="videoSource" type="video/mp4">
        您的浏览器不支持 HTML5 视频。
      </video>
      <div class="overlay"></div>
    </div>
    <div class="content">
      <h1 class="title">基于核心数据算法 提供工业智能服务</h1>
      <p class="subtitle">凯奥思数据 让工业更智能</p>
      <el-button type="primary" size="large" class="cta-button" @click="handleConsult">了解更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// 直接导入视频文件
import videoSource from '@/assets/video/official_video.mp4'
// 导入占位图片
import placeholderImage from '@/assets/home/video_placeholder.jpg'

const videoElement = ref<HTMLVideoElement | null>(null)
const router = useRouter()
const isVideoLoaded = ref(false)
const isVideoError = ref(false)

const handleConsult = () => {
  // 处理咨询按钮点击
  console.log('咨询按钮被点击')
  router.push('/about?section=0')
}

// 视频可以播放时触发
const handleVideoCanPlay = () => {
  console.log('视频已加载，可以播放')
  isVideoLoaded.value = true
}

// 视频加载失败时触发
const handleVideoError = (error: any) => {
  console.error('视频加载失败:', error)
  isVideoError.value = true
}

onMounted(() => {
  // 设置超时，如果视频在指定时间内未加载完成，也显示占位图片
  const loadTimeout = setTimeout(() => {
    if (!isVideoLoaded.value && !isVideoError.value) {
      console.log('视频加载超时')
      // 可以选择在这里设置 isVideoError.value = true 来显示占位图片
    }
  }, 15000) // 15秒超时

  if (videoElement.value) {
    // 检查视频是否已经缓存
    if (videoElement.value.readyState >= 3) {
      isVideoLoaded.value = true
    }

    // 尝试播放视频
    videoElement.value.play().catch(error => {
      console.error('视频播放失败:', error)
      isVideoError.value = true
    })

    // 添加网络状态监听
    videoElement.value.addEventListener('stalled', () => {
      console.warn('视频加载停滞')
      // 如果视频加载停滞时间过长，可以考虑设置 isVideoError.value = true
    })

    // 监听视频加载进度
    videoElement.value.addEventListener('progress', () => {
      // 如果视频已经有足够的缓冲，可以提前设置为已加载
      if (videoElement.value && videoElement.value.buffered.length > 0) {
        const bufferedEnd = videoElement.value.buffered.end(0)
        const duration = videoElement.value.duration
        if (bufferedEnd / duration > 0.1) { // 缓冲了至少10%
          isVideoLoaded.value = true
        }
      }
    })
  }

  // 组件卸载时清除超时
  return () => clearTimeout(loadTimeout)
})
</script>

<style scoped>
.home-hero {
  position: relative;
  width: 100%;
  height: 100%;
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

/* 占位图片容器样式 */
.placeholder-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

/* 加载指示器样式 */
.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  z-index: 3;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 0.25rem solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.background-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

/* 视频加载完成后的样式 */
.video-loaded {
  opacity: 1;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.title {
  font-size: 48px;
  font-weight: bold;
  letter-spacing: 2px;
  max-width: 90%;
  margin: 0 auto 20px;
}

.subtitle {
  font-size: 24px;
  opacity: 0.9;
  margin: 0 auto 30px;
}

.cta-button {
  padding: 12px 30px;
  font-size: 18px;
  border-radius: 34px;
  transition: all 0.3s ease;
  background-color: transparent;
  border: 1px solid #fff;
  width: 200px;
  height: 56px;
  color: #fff;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>