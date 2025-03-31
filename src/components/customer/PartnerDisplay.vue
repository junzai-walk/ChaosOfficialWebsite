<template>
  <div class="case-showcase">
    <div class="showcase-content">
      <h2 class="title">以数据算法携手全球200+工业领跑者驱动每一次精准决策</h2>
    </div>
    <!-- <div class="logo-box">
      <div class="image-grid">
        <div class="image-item" v-for="item in logos">
          <img :src="item" alt="">
        </div>
      </div>
    </div> -->
    <div class="partner-wall">
      <div v-for="(logoRow, rowIndex) in partnerLogosAll" :key="`row-${rowIndex}`" class="partner-row">
        <div v-for="(logo, index) in logoRow" :key="`logo-${rowIndex}-${index}`" class="logo-container">
          <logo-reflect :src="logo" :alt="`partner-${rowIndex}-${index}`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed,provide } from 'vue'

import LogoReflect from '../LogoReflect.vue' // 自定义立体效果组件
// 添加动画状态控制
const isAnimating = ref(true)
// 提供动画状态给子组件
provide('isAnimating', isAnimating)

// 合作伙伴logo数据 - 修正图片路径
const partnerLogos1 = ref([
  new URL('@/assets/logo-wall/Group 422-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 423-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 424-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 425-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 426-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 427-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 428-Photoroom.png', import.meta.url).href,
])

const partnerLogos2 = ref([
  new URL('@/assets/logo-wall/Group 429-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 430-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 431-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 432-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 433-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 434-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 435-Photoroom.png', import.meta.url).href,
])

const partnerLogos3 = ref([
  new URL('@/assets/logo-wall/Group 437-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 438-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 439-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 440-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 441-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 442-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 443-Photoroom.png', import.meta.url).href,
])

const partnerLogos4 = ref([
  new URL('@/assets/logo-wall/Group 444-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 445-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 446-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 447-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 448-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 449-Photoroom.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 450-Photoroom.png', import.meta.url).href, // 修正为Group 450.png
])

// 汇总所有logo行
const partnerLogosAll = computed(() => [
  partnerLogos1.value,
  partnerLogos2.value,
  partnerLogos3.value,
  partnerLogos4.value
])

// 合作伙伴logo数据 - 修正图片路径
const logos = [
  '/src/assets/logos/Group 422.png',
  '/src/assets/logos/Group 423.png',
  '/src/assets/logos/Group 424.png',
  '/src/assets/logos/Group 425.png',
  '/src/assets/logos/Group 426.png',
  '/src/assets/logos/Group 427.png',
  '/src/assets/logos/Group 428.png',
  '/src/assets/logos/Group 429.png',
  '/src/assets/logos/Group 430.png',
  '/src/assets/logos/Group 431.png',
  '/src/assets/logos/Group 432.png',
  '/src/assets/logos/Group 433.png',
  '/src/assets/logos/Group 434.png',
  '/src/assets/logos/Group 435.png',
  '/src/assets/logos/Group 437.png',
  '/src/assets/logos/Group 438.png',
  '/src/assets/logos/Group 439.png',
  '/src/assets/logos/Group 440.png',
  '/src/assets/logos/Group 441.png',
  '/src/assets/logos/Group 442.png',
  '/src/assets/logos/Group 443.png',
  '/src/assets/logos/Group 444.png',
  '/src/assets/logos/Group 445.png',
  '/src/assets/logos/Group 446.png',
  '/src/assets/logos/Group 447.png',
  '/src/assets/logos/Group 448.png',
  '/src/assets/logos/Group 449.png',
  '/src/assets/logos/Group 450.png'
]

</script>

<style lang="less" scoped>
.case-showcase {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;       
  background-color: #f7f9fc;
  padding-top: 4.25rem;

  .showcase-content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    .title {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      color: #333;
      margin-bottom: 15px;
    }
  }

  .logo-box {
    perspective: 300px;
    /* 3D 景深 */
    height: 100vh;
    width: 100%;
    position: relative;
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
    transform: scale(2);
    z-index: 1;
  }

  .image-grid {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform-origin: 50% 100%;
    transform: rotateX(45deg);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    padding: 20px;
    animation: crawl 30s linear;
  }

  .image-item {
    height: 55px; 
    width: 25rem;
    aspect-ratio: 1;
    overflow: hidden;
  }

  .image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes crawl {
    0% {
      transform: rotateX(45deg) translateY(100%);
      opacity: 1;
    }

    25% {
      opacity: 1;
    }

    100% {
      transform: rotateX(45deg) translateY(-200%);
      opacity: 0;
    }
  }
}


.partner-wall {
  width: 100%;
  height: 100vh;
  padding: 30px 0 40px 20px;
  perspective: 2000px;
  transform-style: preserve-3d;
  position: absolute;
  top: 450px;
  // overflow: hidden;

  .partner-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;

    &:last-child {
      margin-bottom: 0;
    }

    .logo-container {
      perspective: 800px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.5s ease-out;
    }
  }
}

/* 添加动画类 */
.partner-wall {
  .partner-row {
    transition: transform 5s ease-out, opacity 5s ease-out;

    &:nth-child(1) {
      transform: v-bind("isAnimating ? 'translateZ(800px) scale(2.0)' : 'translateZ(0) scale(1)'");
      opacity: v-bind("isAnimating ? '0.2' : '1'");
    }

    &:nth-child(2) {
      transform: v-bind("isAnimating ? 'translateZ(600px) scale(1.8)' : 'translateZ(0) scale(1)'");
      opacity: v-bind("isAnimating ? '0.4' : '1'");
    }

    &:nth-child(3) {
      transform: v-bind("isAnimating ? 'translateZ(400px) scale(1.6)' : 'translateZ(0) scale(1)'");
      opacity: v-bind("isAnimating ? '0.6' : '1'");
    }

    &:nth-child(4) {
      transform: v-bind("isAnimating ? 'translateZ(200px) scale(1.4)' : 'translateZ(0) scale(1)'");
      opacity: v-bind("isAnimating ? '0.8' : '1'");
    }
  }
}
</style>