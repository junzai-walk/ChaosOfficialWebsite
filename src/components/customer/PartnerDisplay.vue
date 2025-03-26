<template>
  <div class="case-showcase">
    <div class="showcase-content">
      <h2 class="title">以数据算法携手全球200+工业领跑者驱动每一次精准决策</h2>

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
import LogoReflect from '../LogoReflect.vue'  // 自定义立体效果组件

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
  .title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}
}



.partner-wall {
  width: 100%;
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