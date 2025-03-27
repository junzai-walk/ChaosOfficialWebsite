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
import { ref, computed } from 'vue'
import LogoReflect from './LogoReflect.vue'  // 自定义立体效果组件

// 合作伙伴logo数据 - 修正图片路径
const partnerLogos1 = ref([
  new URL('@/assets/logos/Group 422.png', import.meta.url).href,
  new URL('@/assets/logos/Group 423.png', import.meta.url).href,
  new URL('@/assets/logos/Group 424.png', import.meta.url).href,
  new URL('@/assets/logos/Group 425.png', import.meta.url).href,
  new URL('@/assets/logos/Group 426.png', import.meta.url).href,
  new URL('@/assets/logos/Group 427.png', import.meta.url).href,
  new URL('@/assets/logos/Group 428.png', import.meta.url).href,
])

const partnerLogos2 = ref([
  new URL('@/assets/logos/Group 429.png', import.meta.url).href,
  new URL('@/assets/logos/Group 430.png', import.meta.url).href,
  new URL('@/assets/logos/Group 431.png', import.meta.url).href,
  new URL('@/assets/logos/Group 432.png', import.meta.url).href,
  new URL('@/assets/logos/Group 433.png', import.meta.url).href,
  new URL('@/assets/logos/Group 434.png', import.meta.url).href,
  new URL('@/assets/logos/Group 435.png', import.meta.url).href,
])

const partnerLogos3 = ref([
  new URL('@/assets/logos/Group 437.png', import.meta.url).href,
  new URL('@/assets/logos/Group 438.png', import.meta.url).href,
  new URL('@/assets/logos/Group 439.png', import.meta.url).href,
  new URL('@/assets/logos/Group 440.png', import.meta.url).href,
  new URL('@/assets/logos/Group 441.png', import.meta.url).href,
  new URL('@/assets/logos/Group 442.png', import.meta.url).href,
  new URL('@/assets/logos/Group 443.png', import.meta.url).href,
])

const partnerLogos4 = ref([
  new URL('@/assets/logos/Group 444.png', import.meta.url).href,
  new URL('@/assets/logos/Group 445.png', import.meta.url).href,
  new URL('@/assets/logos/Group 446.png', import.meta.url).href,
  new URL('@/assets/logos/Group 447.png', import.meta.url).href,
  new URL('@/assets/logos/Group 448.png', import.meta.url).href,
  new URL('@/assets/logos/Group 449.png', import.meta.url).href,
  new URL('@/assets/logos/Group 450.png', import.meta.url).href, // 修正为Group 450.png
])

// 汇总所有logo行
const partnerLogosAll = computed(() => [
  partnerLogos1.value,
  partnerLogos2.value,
  partnerLogos3.value,
  partnerLogos4.value
])
</script>

<style lang="less" scoped>
.case-showcase {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
  margin-bottom: 40px;
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
  margin-top: 60px;
  padding: 40px 20px;
  background-color: #ffffff;
  perspective: 1000px;
  box-shadow: inset 0 10px 20px -10px rgba(0, 0, 0, 0.05),
              inset 0 -10px 20px -10px rgba(0, 0, 0, 0.05);
              
  .partner-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px; // 减小间距
    margin-bottom: 30px; // 减小行间距
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .logo-container {
      perspective: 800px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>