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
      <div v-for="(logoRow, rowIndex) in partnerLogosAll" :key="`row-${rowIndex}`" class="partner-row" :ref="el => { if(el) rowRefs[rowIndex] = el as HTMLElement }">
        <div v-for="(logo, index) in logoRow" :key="`logo-${rowIndex}-${index}`" class="logo-container" :ref="el => { if(el) logoRefs.push({el: el as HTMLElement, rowIndex, colIndex: index}) }">
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
const rowRefs = reactive<HTMLElement[]>([])
const logoRefs = reactive<{el: HTMLElement, rowIndex: number, colIndex: number}[]>([])
const partnerWall = ref<HTMLElement | null>(null)

// 获取当前路由
const route = useRoute()

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
    const depth = (4 - index) * 5; // 上面的行移动更多
    gsap.to(row, {
      x: mouseX * depth,
      duration: 1,
      ease: "power1.out"
    });
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

<style lang="less" scoped>
.case-showcase {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 40px;
  align-items: center;

  @media (max-width: 1920px) {
    .showcase-content {
      max-width: 1200px;
    }

    .case-grid {
      gap: 15px;
      
      .case-item {
        width: 280px;
        height: 180px;
      }
    }

    .partner-wall {
      .logo-container {
        width: 160px;
        height: 80px;
      }
    }
  }

  @media (max-width: 1232px) {
    height: auto;
    min-height: 100vh;
    padding-top: 20px;

    .showcase-content {
      width: 95%;
      margin-bottom: 20px;
    }

    .title {
      font-size: 28px;
    }

    .subtitle {
      font-size: 14px;
      margin: 20px 0;
    }

    .case-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 20px;

      .case-item {
        width: 100%;
        height: 120px;
      }
    }

    .partner-wall {
      position: relative;
      top: 0;
      height: auto;
      padding: 20px 0;
      margin-top: 20px;

      .partner-row {
        gap: 8px;
        margin-bottom: 8px;
        flex-wrap: wrap;
        padding: 0 10px;

        .logo-container {
          width: 100px;
          height: 50px;
          margin: 5px;
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
          width: 80px;
          height: 40px;
        }
      }
    }
  }
}

.showcase-content {
  width: 90%;
  max-width: 1400px;

  @media screen and (max-width: 1232px) {
    width: 95%;
    margin-bottom: 20px;
  }
}

.title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 15px;
  
  @media screen and (max-width: 1232px) {
    font-size: 28px;
  }
}

.subtitle {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin: 30px 0;
  
  @media screen and (max-width: 1232px) {
    font-size: 14px;
    margin: 20px 0;
  }
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  
  @media screen and (max-width: 1232px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
  }

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

    @media screen and (max-width: 1232px) {
      width: 100%;
      height: 120px;  // 减小高度
    }
  }
}

.partner-wall {
  width: 100%;
  height: 100vh;
  // padding: 30px 0 40px 0px;
  perspective: 2000px;
  transform-style: preserve-3d;
  position: absolute;
  top: 380px;

  @media screen and (max-width: 1232px) {
    position: relative;  // 改为相对定位
    top: 0;
    height: auto;  // 自适应高度
    padding: 20px 0;
    margin-top: 20px;
  }

  .partner-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;
    transform-style: preserve-3d;

    &:last-child {
      margin-bottom: 0;
    }

    @media screen and (max-width: 1232px) {
      gap: 8px;  // 减小间距
      margin-bottom: 8px;
      flex-wrap: wrap;
      padding: 0 10px;
    }

    .logo-container {
      perspective: 800px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: box-shadow 0.5s ease-out;
      width: 180px;
      height: 90px;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
                  -5px -5px 15px rgba(255, 255, 255, 0.8),
                  inset 0 0 0 1px rgba(255, 255, 255, 0.5);
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
        border-radius: 10px 10px 0 0;
      }
      
      &:hover {
        box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.1),
                    -8px -8px 20px rgba(255, 255, 255, 0.8),
                    inset 0 0 0 1px rgba(255, 255, 255, 0.7);
      }

      @media screen and (max-width: 1232px) {
        width: 100px;  // 进一步减小logo大小
        height: 50px;
        margin: 5px;
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