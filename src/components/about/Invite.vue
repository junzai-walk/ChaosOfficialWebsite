<template>
  <div class="invite">
    <div class="main-title">诚邀英才</div>
    <div class="info">
      <div class="info-card" v-for="(card, index) in cards" :key="index"
        :style="{ backgroundImage: `linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0)),url(${card.background})` }">
        <p>{{ card.mainTitle }}</p>
        <span>{{ card.subTitle }}</span>
      </div>
    </div>
    <div class="carousel-container">
      <div class="carousel-track" :style="trackStyle">
        <div v-for="(img, index) in images" :key="index" class="carousel-slide">
          <img :src="img" alt="轮播图" class="slide-img" />
        </div>
      </div>
    </div>
    <div class="join">
      <el-button type="primary" round size="large">加入我们</el-button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
const cards = ref([
  { background: '/src/assets/about/Block-12.png', mainTitle: '坚实的保障', subTitle: '我们为每位伙伴提供贴心保障，涵盖五险一金，出差补贴，加班福利，下午茶等，全方位护航你的职场征程。' },
  { background: '/src/assets/about/Block-12-1.png', mainTitle: '多彩的活动', subTitle: '为点亮员工业余时光，我们活力满满的运动打卡活动火热进行中！无论你是健身达人还是运动小白，都可以自由加入，收获健康体魄，释放工作压力。' },
  { background: '/src/assets/about/Block-12-2.png', mainTitle: '丰富的福利', subTitle: '在每一个值得纪念的时刻，公司都为你准备了关怀，包括节日礼品、生日礼品、结婚、生育等福利，让你在人生的重要节点收获喜悦。' },
]);
const currentIndex = ref(0)
const images = [
  '/src/assets/about/banner-12.png',
  '/src/assets/about/banner-12-1.png',
  '/src/assets/about/banner-12-2.png',
  '/src/assets/about/banner-12-3.png',
  '/src/assets/about/banner-12-4.png'
]
const startAutoPlay = () => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 2500); // 2.5 秒切换一次
}
const trackStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * 25}%)`, // 每次移动 25%（因为 4 张占 100%）
    transition: 'transform 0.5s ease',
  };
})
startAutoPlay()
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
    font-size: 1.75rem;
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

      p {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      span {
        text-align: left;
        font-size: 0.75rem;
        line-height: 1.8;
        color: #bbb;
      }
    }
  }

  .carousel-container {
    width: 100%;
    height: 15rem;
    margin-top: 5rem;
    overflow: hidden;
    position: relative;
    .carousel-track {
      display: flex;
      width: 110%;
      /* 7 张图片 / 4 张显示 = 175% */
    }

    .carousel-slide {
      flex: 0 0 25%;
      box-sizing: border-box;
      margin-right: 1.5rem;
    }

    .slide-img {
      border-radius: 15px;
      width: 100%;
      height: 20rem;
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
    background-image: url('/src/assets/about/Group 42.png');
    background-size: 100% 100%;
    background-position: center;
    padding-bottom: 3rem;
  }
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