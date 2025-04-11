<template>
  <div class="advantages-section">
    <div class="advantages-container">
      <!-- 左侧导航栏 -->
      <div class="side-nav-container">
        <CustomNavSteps 
          :width="120" 
          :height="192" 
          :steps="navSteps" 
          :active-step="activeStep" 
          :section-numbers="sectionNumbers" 
          @update:active-step="updateActiveStep" 
        />
      </div>

      <!-- 右侧内容区 -->
      <div class="advantage-content">
        <!-- 卡片部分 -->
        <div class="advantage-cards" :class="{'small-cards': isSmallCard}">
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
import CustomNavSteps from './CustomNavSteps.vue';

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
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 3); // 默认显示方案优势（第三项）

// 添加计算属性判断是否为小卡片
const isSmallCard = computed(() => props.cards.length > 4);

// 修改计算属性
const chunkedCards = computed(() => {
  const result = [];
  const cardsPerRow = isSmallCard.value ? 3 : 2; // 小卡片时每行3个，大卡片时每行2个
  
  for (let i = 0; i < props.cards.length; i += cardsPerRow) {
    result.push(props.cards.slice(i, i + cardsPerRow));
  }
  return result;
});

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
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
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  
  width: calc(50% - 10px); // 默认大宽度卡片
  
  .small-cards & {
    width: calc(33.33% - 14px); // 小宽度卡片
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    opacity: 0.6;
    border-radius: 16px 16px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 1);
    
    .card-icon {
      transform: translateY(-5px);
      box-shadow: 12px 12px 20px rgba(174, 174, 192, 0.2), -12px -12px 20px hsla(0, 0%, 100%, 0.8);
    }
  }
}

.card-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(145deg, #e9f8f1, #dfeee6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
  box-shadow: 8px 8px 16px rgba(174, 174, 192, 0.18), -8px -8px 16px hsla(0, 0%, 100%, 0.8);
  transition: all .4s cubic-bezier(.4, 0, .2, 1);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(120, 200, 160, 0.05) 0%, rgba(120, 200, 160, 0) 70%);
    z-index: -1;
  }

  img {
    width: 25px;
    height: 25px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 14px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.card-desc {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
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