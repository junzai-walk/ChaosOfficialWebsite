<template>
  <div class="case-showcase">
    <div class="showcase-content">
      <h2 class="title">标杆案例</h2>
      <p class="subtitle">超200+企业选择了凯奥思数据</p>

      <!-- 案例展示区 -->
      <div class="case-grid">
        <!-- 宝武案例 -->
        <div class="case-item baowu"></div>

        <!-- 山西焦煤案例 -->
        <div class="case-item shanxi"></div>

        <!-- 海螺水泥案例 -->
        <div class="case-item conch"></div>

        <!-- 河北钢铁案例 -->
        <div class="case-item hebei"></div>
      </div>
    </div>
    <!-- 合作伙伴logo墙 -->
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
import { ref, computed, onMounted, provide } from 'vue'
import LogoReflect from './LogoReflect.vue'  // 自定义立体效果组件

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

// 初始化动画
onMounted(() => {
  // 动画持续5秒后结束
  setTimeout(() => {
    isAnimating.value = false
  }, 5000)
})
</script>

<style lang="less" scoped>
.case-showcase {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 40px;
  align-items: center
}

.showcase-content {
  width: 90%;
  max-width: 1400px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 30px 0;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  .case-item {
    width: 326px;
    height: 200px;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    &.baowu {
      object-fit: cover;
      background: url('@/assets/home/Group_417.png') no-repeat center center;
      background-size: 100% 100%;
    }

    &.shanxi {
      background: url('@/assets/home/Group_418.png') no-repeat center center;
      background-size: 100% 100%;
    }

    &.conch {
      background: url('@/assets/home/Group_419.png') no-repeat center center;
      background-size: 100% 100%;
    }

    &.hebei {
      background: url('@/assets/home/Group_420.png') no-repeat center center;
      background-size: 100% 100%;
    }
  }
}

.partner-wall {
  width: 100%;
  height: 100vh;
  padding: 30px 0 40px 0px;
  perspective: 2000px;
  transform-style: preserve-3d;
  position: absolute;
  top: 380px;
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
      width: 180px;
      height: 90px;
      background: linear-gradient(145deg, #ffffff, #f0f0f0);
      border-radius: 10px;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
                  -5px -5px 15px rgba(255, 255, 255, 0.8),
                  inset 0 0 0 1px rgba(255, 255, 255, 0.5);
      position: relative;
      overflow: hidden;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 40%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 10px 10px 0 0;
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.1),
                    -8px -8px 20px rgba(255, 255, 255, 0.8),
                    inset 0 0 0 1px rgba(255, 255, 255, 0.7);
      }
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

/* Logo图片样式增强 */
:deep(.logo-img) {
  max-width: 80%;
  max-height: 60%;
  object-fit: contain;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.15));
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

:deep(.logo-reflect) {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
}

/* 添加动态光泽效果 */
.logo-container::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  animation: shineEffect 3s infinite linear;
  pointer-events: none;
}

@keyframes shineEffect {
  0% {
    transform: rotate(45deg) translateY(-100%) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateY(100%) translateX(100%);
  }
}
</style>