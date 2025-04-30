<template>
  <div class="case-showcase">
    <div class="showcase-content">
      <h2 class="title">以数据算法携手全球200+工业领跑者</h2>
      <br />
      <br />
      <h2 class="title">驱动每一次精准决策</h2>
    </div>
    <div class="bg"></div>
    <!-- <div class="logo-box">
      <div class="image-grid">
        <div class="image-item" v-for="item in logos">
          <img :src="item" alt="">
        </div>
      </div>
    </div> -->
    <div class="partner-wall">
      <div class="left-side">
        <div v-for="(logo, index) in leftLogos"
          :key="`left-${index}`"
          class="logo-container"
          :class="[`size-${getRandomSize()}`]"
          :style="getRandomLeftPosition(index)">
          <img :src="logo" :alt="`partner-left-${index}`">
        </div>
      </div>
      <div class="right-side">
        <div v-for="(logo, index) in rightLogos"
          :key="`right-${index}`"
          class="logo-container"
          :class="[`size-${getRandomSize()}`]"
          :style="getRandomRightPosition(index)">
          <img :src="logo" :alt="`partner-left-${index}`">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PartnerDisplay'
}
</script>

<script setup lang="ts">
import { ref, computed, provide, onMounted } from 'vue'

// 添加动画状态控制 - 始终保持动画开启
const isAnimating = ref(true)
// 提供动画状态给子组件
provide('isAnimating', isAnimating)

// 保留所有logo数据
const allLogos = ref([
  new URL('@/assets/logo-wall/Group 422.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 423.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 424.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 425.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 426.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 427.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 428.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 429.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 430.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 431.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 432.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 433.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 434.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 435.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 437.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 438.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 439.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 440.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 441.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 442.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 443.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 444.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 445.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 446.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 447.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 448.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 449.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 450.png', import.meta.url).href,
])

// 将logo分为左右两列
const leftLogos = computed(() => {
  const mid = Math.ceil(allLogos.value.length / 2)
  return allLogos.value.slice(0, mid)
})

const rightLogos = computed(() => {
  const mid = Math.ceil(allLogos.value.length / 2)
  return allLogos.value.slice(mid)
})

// 修改位置计算逻辑
const getFixedPosition = (index: number, isLeft: boolean) => {
  // 定义更分散的位置分布模式 - 确保不重叠
  // 为每个图片创建唯一的位置
  const positions = isLeft ? [
    // 第一列
    { x: 20, y: 10 },    // 左上角
    { x: 20, y: 30 },    // 左上
    { x: 20, y: 50 },    // 左中
    { x: 20, y: 70 },    // 左下
    { x: 20, y: 90 },    // 左下角
    // 第二列
    { x: 40, y: 20 },    // 左上中
    { x: 40, y: 40 },    // 左中上
    { x: 40, y: 60 },    // 左中下
    { x: 40, y: 80 },    // 左下中
    // 第三列
    { x: 60, y: 15 },    // 左上偏右
    { x: 60, y: 35 },    // 左中上偏右
    { x: 60, y: 55 },    // 左中偏右
    { x: 60, y: 75 },    // 左中下偏右
    { x: 60, y: 95 },    // 左下偏右
  ] : [
    // 第一列
    { x: 40, y: 10 },    // 右上角
    { x: 40, y: 30 },    // 右上
    { x: 40, y: 50 },    // 右中
    { x: 40, y: 70 },    // 右下
    { x: 40, y: 90 },    // 右下角
    // 第二列
    { x: 60, y: 20 },    // 右上中
    { x: 60, y: 40 },    // 右中上
    { x: 60, y: 60 },    // 右中下
    { x: 60, y: 80 },    // 右下中
    // 第三列
    { x: 80, y: 15 },    // 右上偏右
    { x: 80, y: 35 },    // 右中上偏右
    { x: 80, y: 55 },    // 右中偏右
    { x: 80, y: 75 },    // 右中下偏右
    { x: 80, y: 95 },    // 右下偏右
  ]

  const position = positions[index % positions.length]
  const duration = getBreathingDuration(index)

  return {
    position: 'absolute' as const,
    left: `${position.x}%`,
    '--y-pos': `${position.y}%`,  // 使用CSS变量来设置基础Y轴位置
    top: `${position.y}%`,  // 初始位置
    transform: 'translate(-50%, -50%)',
    animation: `breathingEffect ${duration}s infinite ease-in-out`,
    // 添加随机的动画延迟，使呼吸效果错开
    animationDelay: `${(index * 0.5) % 3}s`,
    // 确保动画效果能正确应用
    animationFillMode: 'both'
  }
}

// 左侧位置
const getRandomLeftPosition = (index: number) => {
  return getFixedPosition(index, true)
}

// 右侧位置
const getRandomRightPosition = (index: number) => {
  return getFixedPosition(index, false)
}

// 随机分配大小逻辑
const getRandomSize = () => {
  // 完全随机分配大小，每次渲染时随机选择一种尺寸
  const sizes = ['large', 'medium', 'small']
  const randomIndex = Math.floor(Math.random() * sizes.length)
  return sizes[randomIndex]
}

// 获取随机的呼吸动画持续时间
const getBreathingDuration = (index: number) => {
  // 基础持续时间在3-7秒之间，根据索引变化以确保不同频率
  const baseDuration = 3 + (index % 5) * 0.8
  // 添加一点随机性，使每个卡片的呼吸频率更加不同
  return baseDuration + Math.random() * 1.2
}

// 组件挂载后确保动画始终运行
onMounted(() => {
  // 保持isAnimating为true，确保动画一直运行
  isAnimating.value = true
})
</script>

<style lang="less" scoped>
.case-showcase {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  padding-top: 4.25rem;
  overflow: hidden;

  .showcase-content {
    position: relative;
    width: 100%;
    padding: 2rem 0 0 0;
    text-align: center;
    z-index: 2;
    transform: translateY(30%);

    .title {
      font-size: 36px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }
  }

  .bg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/customer/logo-wall-bg.jpg') no-repeat center center;
    background-size: cover;
    z-index: 0;
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

  @keyframes breathing {
    0% {
      transform: translate(-50%, calc(-50% - 5px));
      background-color: rgba(255, 255, 255, 0.35);
      box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.08),
        0 4px 8px rgba(0, 0, 0, 0.06),
        inset 0 -2px 5px rgba(255, 255, 255, 0.8),
        inset 0 2px 2px rgba(255, 255, 255, 0.9);
    }
    50% {
      transform: translate(-50%, calc(-50% + 5px));
      background-color: rgba(255, 255, 255, 0.55);
      box-shadow:
        0 10px 20px rgba(0, 0, 0, 0.1),
        0 6px 10px rgba(0, 0, 0, 0.08),
        inset 0 -2px 5px rgba(255, 255, 255, 0.8),
        inset 0 2px 2px rgba(255, 255, 255, 0.9);
    }
    100% {
      transform: translate(-50%, calc(-50% - 5px));
      background-color: rgba(255, 255, 255, 0.35);
      box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.08),
        0 4px 8px rgba(0, 0, 0, 0.06),
        inset 0 -2px 5px rgba(255, 255, 255, 0.8),
        inset 0 2px 2px rgba(255, 255, 255, 0.9);
    }
  }

  /* 定义一个简单的呼吸动画 */
  @keyframes logoBreathing {
    0% {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.35);
    }
    50% {
      transform: translateY(5px);
      background-color: rgba(255, 255, 255, 0.55);
    }
    100% {
      transform: translateY(-5px);
      background-color: rgba(255, 255, 255, 0.35);
    }
  }

  .partner-wall {
    position: absolute;
    top: 140px;
    width: 100%;
    height: calc(100vh - 180px);
    display: flex;
    justify-content: space-between;

    .left-side,
    .right-side {
      position: relative;
      width: 50%;  // 增加两侧区域宽度
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .logo-container {
      position: absolute;
      // background: linear-gradient(145deg, #ffffff, #f5f5f5);
      border-radius: 50%;  // 确保是圆形
      // box-shadow:
      //   0 8px 16px rgba(0, 0, 0, 0.08),
      //   0 4px 8px rgba(0, 0, 0, 0.06),
      //   inset 0 -2px 5px rgba(255, 255, 255, 0.8),
      //   inset 0 2px 2px rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;  // 减少内边距以显示更多内容
      transform-style: preserve-3d;
      perspective: 800px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.35);
      // 添加默认的呼吸动画，使用新定义的breathingEffect动画
      animation: breathingEffect 4s infinite ease-in-out;
      // 添加will-change属性来优化动画性能
      will-change: transform, background-color;
      transition: transform 0.3s ease-in-out;

      // 添加白色半透明覆盖层，增强立体感
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 100%);
        border-radius: 50%;
        z-index: 1;
        pointer-events: none;
      }

      &.size-small {
        width: 80px;
        height: 80px;
      }

      &.size-medium {
        width: 100px;
        height: 100px;
      }

      &.size-large {
        width: 120px;
        height: 120px;
      }

      &:hover {
        transform: scale(1.2) !important;
        // 移除缩放效果
        // box-shadow:
        //   0 12px 24px rgba(0, 0, 0, 0.12),
        //   0 8px 12px rgba(0, 0, 0, 0.08),
        //   inset 0 -2px 5px rgba(255, 255, 255, 0.8),
        //   inset 0 2px 2px rgba(255, 255, 255, 0.9);
        z-index: 1;
      }

      ::v-deep(img) {
        width: 90%;  // 增加图片大小比例
        height: 90%;
        object-fit: contain;
        position: relative;
        z-index: 2;
      }
    }
  }
}


@media (min-width: 1200px) and (max-width: 1500px) {
  .case-showcase {
    .partner-wall {

      .logo-container {
        &.size-small {
          width: 60px;
          height: 60px;
        }

        &.size-medium {
          width: 65px;
          height: 65px;
        }

        &.size-large {
          width: 70px;
          height: 70px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .case-showcase {
    .partner-wall {
      flex-direction: column;
      align-items: center;
      padding: 0;

      .left-side,
      .right-side {
        width: 100%;
        height: 45%;
      }

      .logo-container {
        &.size-small {
          width: 50px;
          height: 50px;
        }

        &.size-medium {
          width: 55px;
          height: 55px;
        }

        &.size-large {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
}
</style>
