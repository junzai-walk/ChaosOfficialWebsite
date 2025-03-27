<template>
  <div class="case-showcase">
    <div class="showcase-content">
      <h2 class="title">以数据算法携手全球200+工业领跑者驱动每一次精准决策</h2>
    </div>
    <div class="logo-box">
      <div class="image-grid">
        <div class="image-item" v-for="item in logos">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
</style>