<template>
  <div class="advantages-section">
    <div class="advantages-container">
      <!-- 左侧导航栏 -->
      <div class="side-nav-container">
        <CustomNavSteps :width="120" :height="192" :steps="navSteps" v-model:activeStep="activeStep" />
      </div>

      <!-- 右侧内容区 -->
      <div class="advantage-content">
        <!-- 卡片部分 -->
        <div class="advantage-cards">
          <!-- 按行分组展示卡片 -->
          <div class="card-row" v-for="(rowCards, rowIndex) in chunkedCards" :key="rowIndex">
            <div class="advantage-card" v-for="(card, cardIndex) in rowCards" :key="cardIndex">
              <div class="card-icon">
                <img :src="card.icon" :alt="card.title" />
              </div>
              <div class="card-title">{{ card.title }}</div>
              <div class="card-desc">{{ card.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomNavSteps from '../CustomNavSteps.vue';

// 定义接口
interface AdvantageCard {
  icon: string;
  title: string;
  description: string;
}

// 定义组件属性
const props = defineProps<{
  cards: AdvantageCard[];
  navSteps: string[];
  defaultActiveStep?: number;
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 3); // 默认显示方案优势（第三项）

// 修改计算属性
const chunkedCards = computed(() => {
  const result = [];
  const isSmallCard = props.cards.length > 4; // 超过4个卡片时使用小宽度
  const cardsPerRow = isSmallCard ? 3 : 2; // 小卡片时每行3个，大卡片时每行2个
  
  for (let i = 0; i < props.cards.length; i += cardsPerRow) {
    result.push(props.cards.slice(i, i + cardsPerRow));
  }
  return result;
});
</script>

<style scoped lang="less">
/* 添加根字体设置用于rem计算 */
html {
  font-size: 16px;
  
  @media (min-width: 1920px) {
    font-size: calc(16px * (1920 / 1920));
  }
  
  @media (max-width: 1440px) {
    font-size: calc(16px * (1440 / 1920));
  }
  
  @media (max-width: 1280px) {
    font-size: calc(16px * (1280 / 1920));
  }
}

.advantages-section {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem; // 40px
  display: flex;
  justify-content: center;
}

.advantages-container {
  margin: 100px auto;
  max-width: 75rem; // 1200px
  width: 100%;
  display: flex;
  gap: 1.875rem; // 30px
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start; // 改为flex-start使文字靠左
  align-items: center; // 确保顶部对齐
}

.advantage-content {
  flex: 1;
  display: inline-flex;
  justify-content: flex-start; // 修改为左对齐
  align-items: flex-start; // 确保顶部对齐
}

.advantage-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.card-row {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  width: 100%;
}

.advantage-card {
  height: 255px;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  
  // 根据父元素的类名来确定宽度
  .advantage-cards:has(> .card-row:nth-child(3)) & {
    width: calc(33.33% - 14px); // 小宽度卡片
  }
  
  .advantage-cards:not(:has(> .card-row:nth-child(3))) & {
    width: calc(50% - 10px); // 大宽度卡片
  }
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  background-color: #e8f7f0;

  img {
    width: 30px;
    height: 30px;
  }
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.card-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 1200px) {
  .advantage-card {
    width: 100%;
    height: auto;
    min-height: 255px;
  }
  
  .card-row {
    flex-direction: column;
  }
}

@media (max-width: 992px) {
  .advantages-section {
    padding: 20px;
  }

  .advantages-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
  }
}
</style> 