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
    <div class="partner-wall" ref="partnerWall">
      <div v-for="(logoRow, rowIndex) in partnerLogosAll" :key="`row-${rowIndex}`" class="partner-row" :ref="el => setRowRef(el, rowIndex)">
        <div v-for="(logo, index) in logoRow" :key="`logo-${rowIndex}-${index}`" class="logo-container" :ref="el => addLogoRef(el, rowIndex, index)">
          <logo-reflect
            :src="logo"
            :alt="`partner-${rowIndex}-${index}`"
            :weight="getLogoWeight(rowIndex, index)"
            :row-index="rowIndex"
            :col-index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, provide, reactive, onBeforeUnmount, onActivated, watch } from 'vue'
import LogoReflect from './LogoReflect.vue'  // 自定义立体效果组件
import gsap from 'gsap'
import { useRoute } from 'vue-router'

// 添加动画状态控制
const isAnimating = ref(true)
// 提供动画状态给子组件
provide('isAnimating', isAnimating)

// 创建引用收集数组
const rowRefs = reactive<(HTMLElement | null)[]>([])
const logoRefs = reactive<{el: HTMLElement | null, rowIndex: number, colIndex: number}[]>([])
const partnerWall = ref<HTMLElement | null>(null)

// 设置行引用的辅助函数
const setRowRef = (el: any, index: number) => {
  if (el) {
    rowRefs[index] = el as HTMLElement;
  }
}

// 添加Logo引用的辅助函数
const addLogoRef = (el: any, rowIndex: number, colIndex: number) => {
  if (el) {
    logoRefs.push({
      el: el as HTMLElement,
      rowIndex,
      colIndex
    });
  }
}

// 获取当前路由
const route = useRoute()

// 合作伙伴logo数据 - 修正图片路径
const partnerLogos1 = ref([
  new URL('@/assets/logo-wall/Group 422.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 423.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 424.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 425.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 426.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 427.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 428.png', import.meta.url).href,
])

const partnerLogos2 = ref([
  new URL('@/assets/logo-wall/Group 429.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 430.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 431.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 432.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 433.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 434.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 435.png', import.meta.url).href,
])

const partnerLogos3 = ref([
  new URL('@/assets/logo-wall/Group 437.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 438.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 439.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 440.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 441.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 442.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 443.png', import.meta.url).href,
])

const partnerLogos4 = ref([
  new URL('@/assets/logo-wall/Group 444.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 445.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 446.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 447.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 448.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 449.png', import.meta.url).href,
  new URL('@/assets/logo-wall/Group 450.png', import.meta.url).href, // 修正为Group 450.png
])

// 汇总所有logo行
const partnerLogosAll = computed(() => [
  partnerLogos1.value,
  partnerLogos2.value,
  partnerLogos3.value,
  partnerLogos4.value
])

// 获取Logo权重（用于动画变化）
const getLogoWeight = (rowIndex: number, colIndex: number): number => {
  // 设置一些重要品牌的权重更高
  if ((rowIndex === 0 && colIndex === 3) ||
      (rowIndex === 1 && colIndex === 0) ||
      (rowIndex === 2 && colIndex === 5) ||
      (rowIndex === 3 && colIndex === 2)) {
    return 4; // 设置为高权重
  }
  return 1 + Math.floor(Math.random() * 3); // 其他随机权重1-3
}

// GSAP时间线
let masterTimeline: gsap.core.Timeline | null = null;

// 创建进场动画
const createEntranceAnimation = () => {
  if (!partnerWall.value) return;

  // 创建主时间线
  masterTimeline = gsap.timeline({
    paused: true,
    onComplete: () => {
      isAnimating.value = false;
      startIdleAnimation();
    }
  });

  // 设置初始状态
  gsap.set(partnerWall.value, {
    perspective: 2000,
  });

  // 对每个logo容器应用初始状态
  logoRefs.forEach(({el, rowIndex, colIndex}) => {
    gsap.set(el, {
      autoAlpha: 0,
      scale: 0.5,
      rotationX: gsap.utils.random(-90, 90),
      rotationY: gsap.utils.random(-90, 90),
      rotationZ: gsap.utils.random(-45, 45),
      z: -1000,
      transformOrigin: "center center"
    });
  });

  // 对每行应用动画
  rowRefs.forEach((row, index) => {
    const delay = index * 0.2;

    masterTimeline!.to(row.children, {
      duration: 1.8,
      autoAlpha: 1,
      stagger: {
        each: 0.06,
        from: "random",
      },
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      z: 0,
      scale: 1,
      ease: "power3.out",
    }, delay);
  });

  // 播放动画
  masterTimeline.play();
}

// 开始创建持续的悬停/呼吸动画
const startIdleAnimation = () => {
  // 为每个Logo添加轻微的悬浮动画
  logoRefs.forEach(({el, rowIndex, colIndex}) => {
    const weight = getLogoWeight(rowIndex, colIndex);
    const randomDelay = Math.random() * 2;

    // 较高权重的logo有更明显的动画
    const floatY = weight >= 4 ? gsap.utils.random(8, 12) : gsap.utils.random(3, 7);
    const duration = weight >= 4 ? gsap.utils.random(2.5, 3.5) : gsap.utils.random(3, 5);
    const rotationAmount = weight >= 4 ? 1.5 : 0.8;

    // 创建悬浮动画
    gsap.to(el, {
      y: floatY,
      rotationX: gsap.utils.random(-rotationAmount, rotationAmount),
      rotationY: gsap.utils.random(-rotationAmount, rotationAmount),
      duration: duration,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: randomDelay,
    });

    // 为高权重logo添加轻微的缩放动画
    if (weight >= 4) {
      gsap.to(el, {
        scale: 1.05,
        duration: gsap.utils.random(2, 3),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: randomDelay + 0.5,
      });
    }
  });

  // 为整体logo墙添加鼠标视差效果
  if (partnerWall.value) {
    partnerWall.value.addEventListener('mousemove', handleMouseParallax);
  }
}

// 鼠标视差效果
const handleMouseParallax = (e: MouseEvent) => {
  if (!partnerWall.value || isAnimating.value) return;

  const rect = partnerWall.value.getBoundingClientRect();
  const mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
  const mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

  // 对每行应用不同强度的视差
  rowRefs.forEach((row, index) => {
    if (row && row.children) {
      const depth = (4 - index) * 5; // 上面的行移动更多
      gsap.to(row, {
        x: mouseX * depth,
        duration: 1,
        ease: "power1.out"
      });
    }
  });
}

// 清理函数
onBeforeUnmount(() => {
  if (partnerWall.value) {
    partnerWall.value.removeEventListener('mousemove', handleMouseParallax);
  }

  // 清理所有GSAP动画
  if (masterTimeline) {
    masterTimeline.kill();
  }

  logoRefs.forEach(({el}) => {
    gsap.killTweensOf(el);
  });
})

// 重置和初始化动画的函数
const initAnimation = () => {
  // 重置状态
  isAnimating.value = true;

  // 清理之前的动画
  if (masterTimeline) {
    masterTimeline.kill();
  }

  logoRefs.forEach(({el}) => {
    gsap.killTweensOf(el);
  });

  // 清空引用数组
  rowRefs.length = 0;
  logoRefs.length = 0;

  // 下一帧执行以确保DOM已完全渲染
  setTimeout(() => {
    createEntranceAnimation();
  }, 100);
}

// 添加URL变化监听
let lastUrl = window.location.href
const checkURLChange = () => {
  if (window.location.href !== lastUrl) {
    lastUrl = window.location.href
    if (window.location.href.includes('section=4')) {
      initAnimation()
    }
  }
}

onMounted(() => {
  initAnimation()

  // 设置URL变化检测
  window.addEventListener('popstate', checkURLChange)
  const intervalId = setInterval(checkURLChange, 500)

  // 清理监听器
  onBeforeUnmount(() => {
    window.removeEventListener('popstate', checkURLChange)
    clearInterval(intervalId)
  })
})

// 每次从路由返回该页面时重新激活动画
onActivated(() => {
  initAnimation()
})
</script>

<script lang="ts">
// 为组件添加默认导出
export default {
  name: 'CaseShowcase'
}
</script>

<style lang="less" scoped>
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
  
  @media (max-width: 1366px) {
    font-size: 14px;
  }
}

.case-showcase {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2.5rem; /* 40px -> 2.5rem */
  align-items: center;

  /* 媒体查询 - 适配不同分辨率 */
  @media (min-width: 1920px) {
    .showcase-content {
      max-width: 75rem; /* 1200px -> 75rem */
    }

    .case-grid {
      gap: 1.25rem; /* 20px -> 1.25rem */

      .case-item {
        width: 20.375rem; /* 326px -> 20.375rem */
        height: 12.5rem; /* 200px -> 12.5rem */
      }
    }

    .partner-wall {
      top: 23.75rem; /* 380px -> 23.75rem */
      
      .partner-row {
        gap: 1.5625rem; /* 25px -> 1.5625rem */
        margin-bottom: 1.875rem; /* 30px -> 1.875rem */
      }
      
      .logo-container {
        width: 11.25rem; /* 180px -> 11.25rem */
        height: 5.625rem; /* 90px -> 5.625rem */
      }
    }
  }

  @media (max-width: 1920px) {
    .showcase-content {
      max-width: 75rem; /* 1200px -> 75rem */
    }

    .case-grid {
      gap: 0.9375rem; /* 15px -> 0.9375rem */

      .case-item {
        width: 17.5rem; /* 280px -> 17.5rem */
        height: 11.25rem; /* 180px -> 11.25rem */
      }
    }

    .partner-wall {
      .logo-container {
        width: 10rem; /* 160px -> 10rem */
        height: 5rem; /* 80px -> 5rem */
      }
    }
  }

  /* 添加针对1366*768分辨率的特殊处理 */
  @media (max-width: 1366px) {
    .showcase-content {
      max-width: 68.75rem; /* 1100px -> 68.75rem */
    }

    .title {
      font-size: 2rem; /* 32px -> 2rem */
    }

    .subtitle {
      font-size: 1rem; /* 16px -> 1rem */
      margin: 1.5rem 0; /* 24px -> 1.5rem */
    }

    .case-grid {
      gap: 0.75rem; /* 12px -> 0.75rem */

      .case-item {
        width: 16.25rem; /* 260px -> 16.25rem */
        height: 10rem; /* 160px -> 10rem */
      }
    }

    .partner-wall {
      top: 21.875rem; /* 350px -> 21.875rem */

      .partner-row {
        gap: 0.9375rem; /* 15px -> 0.9375rem */
        margin-bottom: 1.25rem; /* 20px -> 1.25rem */
      }

      .logo-container {
        width: 8.75rem; /* 140px -> 8.75rem */
        height: 4.375rem; /* 70px -> 4.375rem */
      }
    }
  }

  @media (max-width: 1232px) {
    height: auto;
    min-height: 100vh;
    padding-top: 1.25rem; /* 20px -> 1.25rem */

    .showcase-content {
      width: 95%;
      margin-bottom: 1.25rem; /* 20px -> 1.25rem */
    }

    .title {
      font-size: 1.75rem; /* 28px -> 1.75rem */
    }

    .subtitle {
      font-size: 0.875rem; /* 14px -> 0.875rem */
      margin: 1.25rem 0; /* 20px -> 1.25rem */
    }

    .case-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.625rem; /* 10px -> 0.625rem */
      margin-bottom: 1.25rem; /* 20px -> 1.25rem */

      .case-item {
        width: 100%;
        height: 7.5rem; /* 120px -> 7.5rem */
      }
    }

    .partner-wall {
      position: relative;
      top: 0;
      height: auto;
      padding: 1.25rem 0; /* 20px -> 1.25rem */
      margin-top: 1.25rem; /* 20px -> 1.25rem */

      .partner-row {
        gap: 0.5rem; /* 8px -> 0.5rem */
        margin-bottom: 0.5rem; /* 8px -> 0.5rem */
        flex-wrap: wrap;
        padding: 0 0.625rem; /* 10px -> 0.625rem */

        .logo-container {
          width: 6.25rem; /* 100px -> 6.25rem */
          height: 3.125rem; /* 50px -> 3.125rem */
          margin: 0.3125rem; /* 5px -> 0.3125rem */
        }
      }
    }
  }

  @media (max-width: 768px) {
    .case-grid {
      grid-template-columns: 1fr;
    }

    .partner-wall {
      .partner-row {
        .logo-container {
          width: 5rem; /* 80px -> 5rem */
          height: 2.5rem; /* 40px -> 2.5rem */
        }
      }
    }
  }
}

.showcase-content {
  width: 90%;
  max-width: 87.5rem; /* 1400px -> 87.5rem */

  @media screen and (max-width: 1232px) {
    width: 95%;
    margin-bottom: 1.25rem; /* 20px -> 1.25rem */
  }
}

.title {
  font-size: 2.25rem; /* 36px -> 2.25rem */
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 0.9375rem; /* 15px -> 0.9375rem */

  @media screen and (max-width: 1232px) {
    font-size: 1.75rem; /* 28px -> 1.75rem */
  }
}

.subtitle {
  font-size: 1rem; /* 16px -> 1rem */
  color: #666;
  text-align: center;
  margin: 1.875rem 0; /* 30px -> 1.875rem */

  @media screen and (max-width: 1232px) {
    font-size: 0.875rem; /* 14px -> 0.875rem */
    margin: 1.25rem 0; /* 20px -> 1.25rem */
  }
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem; /* 20px -> 1.25rem */
  margin-bottom: 2.5rem; /* 40px -> 2.5rem */

  @media screen and (max-width: 1232px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem; /* 10px -> 0.625rem */
    margin-bottom: 1.25rem; /* 20px -> 1.25rem */
  }

  .case-item {
    width: 20.375rem; /* 326px -> 20.375rem */
    height: 12.5rem; /* 200px -> 12.5rem */
    background-color: #fff;
    border-radius: 0.5rem; /* 8px -> 0.5rem */
    overflow: hidden;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1); /* 4px 12px -> 0.25rem 0.75rem */
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-0.3125rem); /* -5px -> -0.3125rem */
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

    @media screen and (max-width: 1232px) {
      width: 100%;
      height: 7.5rem; /* 120px -> 7.5rem */
    }
  }
}

.partner-wall {
  width: 100%;
  height: 100vh;
  perspective: 2000px;
  transform-style: preserve-3d;
  position: absolute;
  top: 23.75rem; /* 380px -> 23.75rem */

  @media screen and (max-width: 1232px) {
    position: relative;
    top: 0;
    height: auto;
    padding: 1.25rem 0; /* 20px -> 1.25rem */
    margin-top: 1.25rem; /* 20px -> 1.25rem */
  }

  .partner-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5625rem; /* 25px -> 1.5625rem */
    margin-bottom: 1.875rem; /* 30px -> 1.875rem */
    transform-style: preserve-3d;

    &:last-child {
      margin-bottom: 0;
    }

    @media screen and (max-width: 1232px) {
      gap: 0.5rem; /* 8px -> 0.5rem */
      margin-bottom: 0.5rem; /* 8px -> 0.5rem */
      flex-wrap: wrap;
      padding: 0 0.625rem; /* 10px -> 0.625rem */
    }

    .logo-container {
      perspective: 800px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: box-shadow 0.5s ease-out;
      width: 11.25rem; /* 180px -> 11.25rem */
      height: 5.625rem; /* 90px -> 5.625rem */
      background: #ffffff;
      border-radius: 0.625rem; /* 10px -> 0.625rem */
      box-shadow: 0.3125rem 0.3125rem 0.9375rem rgba(0, 0, 0, 0.1),
                  -0.3125rem -0.3125rem 0.9375rem rgba(255, 255, 255, 0.8),
                  inset 0 0 0 0.0625rem rgba(255, 255, 255, 0.5); /* 5px -> 0.3125rem, 15px -> 0.9375rem, 1px -> 0.0625rem */
      position: relative;
      overflow: hidden;
      transform-style: preserve-3d;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 40%;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);
        border-radius: 0.625rem 0.625rem 0 0; /* 10px -> 0.625rem */
      }

      &:hover {
        box-shadow: 0.5rem 0.5rem 1.25rem rgba(0, 0, 0, 0.1),
                    -0.5rem -0.5rem 1.25rem rgba(255, 255, 255, 0.8),
                    inset 0 0 0 0.0625rem rgba(255, 255, 255, 0.7); /* 8px -> 0.5rem, 20px -> 1.25rem, 1px -> 0.0625rem */
      }

      @media screen and (max-width: 1232px) {
        width: 6.25rem; /* 100px -> 6.25rem */
        height: 3.125rem; /* 50px -> 3.125rem */
        margin: 0.3125rem; /* 5px -> 0.3125rem */
      }
    }
  }
}

/* Logo图片样式增强 */
:deep(.logo-img) {
  max-width: 80%;
  max-height: 60%;
  object-fit: contain;
  filter: none;
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

/* 添加动态光泽效果 - 更加微妙 */
.logo-container::after {
  content: '';
  position: absolute;
  top: -150%;
  left: -150%;
  width: 400%;
  height: 400%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: rotate(45deg);
  animation: shineEffect 6s infinite cubic-bezier(0.25, 0.1, 0.25, 1);
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