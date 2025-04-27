<template>
  <div class="invite">
    <div class="main-title">诚邀英才</div>
    <div class="info">
      <div class="info-card" v-for="(card, index) in cards" :key="index"
        :style="{ backgroundImage: `url(${card.background})` }">
        <div class="mask"></div>
        <p>{{ card.mainTitle }}</p>
        <span>{{ card.subTitle }}</span>
      </div>
    </div>
    <div class="carousel-container">
      <div class="carousel-controls">
        <!-- <div class="carousel-control prev" @click="prevSlide">&lt;</div> -->
        <!-- <div class="carousel-control next" @click="nextSlide">&gt;</div> -->
      </div>
      <!-- <div class="carousel-track" :style="trackStyle">
        <div v-for="(img, index) in images" :key="index" class="carousel-slide">
          <img :src="img" alt="轮播图" class="slide-img" />
        </div>
      </div> -->
      <el-carousel :interval="3000" type="card" height="300px">
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item" alt="轮播图" class="slide-img" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="join" :style="{ backgroundImage: `url(${joinBackground})` }">
      <el-button type="primary" round size="large" @click="goToboss">加入我们</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import block12Image from '@/assets/about/Block-12.png'
import block12Image1 from '@/assets/about/Block-12-1.png'
import block12Image2 from '@/assets/about/Block-12-2.png'

import banner12 from '@/assets/about/banner-12.png'
import banner12_1 from '@/assets/about/banner-12-1.png'
import banner12_2 from '@/assets/about/banner-12-2.png'
import banner12_3 from '@/assets/about/banner-12-3.png'
import banner12_4 from '@/assets/about/banner-12-4.png'
import banner12_5 from '@/assets/about/banner-12-5.png'
import banner12_6 from '@/assets/about/banner-12-6.png'

import joinBackground from '@/assets/about/Group 42.png'

const cards = ref([
  { background: block12Image, mainTitle: '坚实的保障', subTitle: '我们为每位伙伴提供贴心保障，涵盖五险一金，出差补贴，加班福利，下午茶等，全方位护航你的职场征程。' },
  { background: block12Image1, mainTitle: '多彩的活动', subTitle: '为点亮员工业余时光，我们活力满满的运动打卡活动火热进行中！无论你是健身达人还是运动小白，都可以自由加入，收获健康体魄，释放工作压力。' },
  { background: block12Image2, mainTitle: '丰富的福利', subTitle: '在每一个值得纪念的时刻，公司都为你准备了关怀，包括节日礼品、生日礼品、结婚、生育等福利，让你在人生的重要节点收获喜悦。' },
]);
// 原始图片数组
const originalImages = [
  banner12,
  banner12_1,
  banner12_2,
  banner12_3,
  banner12_4
]

// 创建无缝轮播的图片数组：在开头添加最后一张图片，在结尾添加第一张图片
const images = [
  banner12,
  banner12_1,
  banner12_2,
  banner12_3,
  banner12_4,
  banner12_5,
  banner12_6
]

const currentIndex = ref(1) // 从索引1开始（即实际的第一张图片）
const isTransitioning = ref(false) // 是否正在过渡中
const isTransition = ref(true) // 是否应用过渡效果
const transitionDuration = 500 // 过渡动画持续时间（毫秒）

// 自动轮播函数
const startAutoPlay = () => {
  setInterval(() => {
    nextSlide()
  }, 2500) // 2.5 秒切换一次
}

// 下一张幻灯片
const nextSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value++

  // 如果到达了最后一张图片（克隆的第一张），等待过渡结束后无缝跳回真正的第一张
  if (currentIndex.value >= images.length - 1) {
    setTimeout(() => {
      // 取消过渡动画
      isTransition.value = false
      // 重置到第一张图片
      currentIndex.value = 1
      // 恢复过渡动画
      setTimeout(() => {
        isTransition.value = true
        isTransitioning.value = false
      }, 50)
    }, transitionDuration) // 与过渡时间相同
  } else {
    setTimeout(() => {
      isTransitioning.value = false
    }, transitionDuration)
  }
}

// 上一张幻灯片
const prevSlide = () => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value--

  // 如果到达了第一张图片（克隆的最后一张），等待过渡结束后无缝跳回真正的最后一张
  if (currentIndex.value <= 0) {
    setTimeout(() => {
      // 取消过渡动画
      isTransition.value = false
      // 重置到最后一张图片
      currentIndex.value = images.length - 2
      // 恢复过渡动画
      setTimeout(() => {
        isTransition.value = true
        isTransitioning.value = false
      }, 50)
    }, transitionDuration) // 与过渡时间相同
  } else {
    setTimeout(() => {
      isTransitioning.value = false
    }, transitionDuration)
  }
}

// 计算轮播轨道样式
const trackStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 25}%)`, // 每次移动 25%
    transition: isTransition.value ? `transform ${transitionDuration}ms ease` : 'none',
  }
})

// 在组件挂载后初始化轮播图
onMounted(() => {
  // 确保初始状态正确
  currentIndex.value = 1
  isTransition.value = true
  // 启动自动轮播
  startAutoPlay()
})


//跳转至boss页

const goToboss = () => {
  window.open('https://m.zhipin.com/job_detail/?query=%E5%8D%97%E4%BA%AC%E5%87%AF%E5%A5%A5%E6%80%9D%E6%95%B0%E6%8D%AE%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&city=101190200&industry=&position=', '_blank')
}
</script>

<style scoped lang="less">
.invite {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #F9F9F9;

  .main-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;
    padding: 3rem 18rem 0 18rem;
    font-weight: 700;
    font-size: 2.5rem;
    margin-top: 2.5rem;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    padding: 3rem 18rem 0 18rem;

    .info-card {
      width: 30%;
      height: 13.125rem;
      border-radius: 15px;
      background-size: cover;
      background-position: center;
      background-blend-mode: overlay;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      box-sizing: border-box;
      padding: 1.5rem;
      gap: 0.5rem;
      position: relative;
      overflow: hidden;

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 1;
      }

      p {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        color: #333333;
        position: relative;
        z-index: 2;
      }

      span {
        text-align: left;
        font-size: 0.75rem;
        line-height: 1.8;
        color: #61656A;
        position: relative;
        z-index: 2;
      }
    }
  }

  .carousel-container {
    width: 100%;
    height: 15rem;
    margin-top: 5rem;
    overflow: hidden;
    position: relative;

    .carousel-controls {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 2rem;
      z-index: 10;
      pointer-events: none;
    }

    .carousel-control {
      width: 2.5rem;
      height: 2.5rem;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      pointer-events: auto;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }

    .carousel-track {
      display: flex;
      width:100%;
      /* 7 张图片 / 4 张显示 = 100% */
    }

    .carousel-slide {
      flex: 0 0 25%;
      box-sizing: border-box;
      margin-right: 1.5rem;

      img{
        object-fit: cover;
        border-radius: 1rem;
      }
    }

    .slide-img {
      border-radius: 15px;
      width: 63%;
      height: 14rem;
      // padding: 10px;
    }
  }

  .join {
    box-sizing: border-box;
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    background-position: center;
    padding-bottom: 3rem;

    button{
      width: 8%;
    }
  }
}

@media (max-width: 1000px) {
  .title {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: transparent;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: transparent;
}
</style>