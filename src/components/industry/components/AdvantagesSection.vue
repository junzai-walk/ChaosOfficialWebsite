<template>
  <div class="advantages-section">
    <div class="advantages-container">
      <!-- 左侧导航栏 -->
      <!-- <div class="side-nav-container">
        <CustomNavSteps 
          :width="120" 
          :height="192" 
          :steps="navSteps" 
          :active-step="activeStep" 
          :section-numbers="sectionNumbers" 
          @update:active-step="updateActiveStep" 
        />
      </div> -->

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

<script lang="ts">
export default {
  name: 'AdvantagesSection'
}
</script>

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
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
  
  @media (max-width: 1366px) {
    font-size: 14px;
  }
}

.advantages-section {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem;
  display: flex;
  justify-content: center;
}

.advantages-container {
  margin: 6.25rem auto;
  max-width: 75rem;
  width: 100%;
  display: flex;
  gap: 1.875rem;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.advantage-content {
  flex: 1;
  display: inline-flex;
  justify-content: center;
  align-items: flex-start;
}

.advantage-cards {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.25rem;
  width: 90%;
}

.card-row {
  display: flex;
  gap: 1.25rem;
  justify-content: flex-start;
  width: 100%;
}

.advantage-card {
  height: 15.9375rem;
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 1rem;
  padding: 1.875rem;
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.06), 0 0.125rem 0.375rem rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 0.0625rem solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
  
  width: calc(50% - 0.625rem); // 默认大宽度卡片
  
  .small-cards & {
    width: calc(33.33% - 0.875rem); // 小宽度卡片
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.375rem;
    opacity: 0.6;
    border-radius: 1rem 1rem 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0.625rem;
    right: 0.625rem;
    height: 0.0625rem;
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-0.5rem) scale(1.02);
    box-shadow: 0 1.25rem 1.875rem rgba(0, 0, 0, 0.1), 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.05);
    border: 0.0625rem solid rgba(255, 255, 255, 1);
    
    .card-icon {
      transform: translateY(-0.3125rem);
      box-shadow: 0.75rem 0.75rem 1.25rem rgba(174, 174, 192, 0.2), -0.75rem -0.75rem 1.25rem hsla(0, 0%, 100%, 0.8);
    }
  }
}

.card-icon {
  width: 3.125rem;
  height: 3.125rem;
  background: linear-gradient(145deg, #e9f8f1, #dfeee6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.125rem;
  box-shadow: 0.5rem 0.5rem 1rem rgba(174, 174, 192, 0.18), -0.5rem -0.5rem 1rem hsla(0, 0%, 100%, 0.8);
  transition: all .4s cubic-bezier(.4, 0, .2, 1);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(120, 200, 160, 0.05) 0%, rgba(120, 200, 160, 0) 70%);
    z-index: -1;
  }

  img {
    width: 1.5625rem;
    height: 1.5625rem;
    filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.1));
  }
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.875rem;
  text-shadow: 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.8);
}

.card-desc {
  color: #666;
  font-size: 0.9375rem;
  text-align: left;
  line-height: 1.6;
  text-shadow: 0 0.0625rem 0.0625rem rgba(255, 255, 255, 0.5);
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .advantages-container {
    max-width: 90rem;
    margin: 7.5rem auto;
  }
  
  .advantage-card {
    height: 18.75rem;
    padding: 2.25rem;
  }
  
  .card-icon {
    width: 3.75rem;
    height: 3.75rem;
    margin-bottom: 1.5rem;
  }
  
  .card-title {
    font-size: 1.3125rem;
    margin-bottom: 1.125rem;
  }
  
  .card-desc {
    font-size: 1.0625rem;
  }
}

@media (max-width: 1366px) {
  .advantages-section {
    padding: 1.875rem;
  }
  
  .advantages-container {
    margin: 5rem auto;
  }
  
  .advantage-cards {
    gap: 1rem;
  }
  
  .card-row {
    gap: 1rem;
  }
  
  .advantage-card {
    height: 19.375rem;
    padding: 4.5rem 2rem;
  }
  
  .card-icon {
    width: 2.8125rem;
    height: 2.8125rem;
    margin-bottom: 0.875rem;
  }
  
  .card-title {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .card-desc {
    font-size: 0.875rem;
  }
}

@media (max-width: 1200px) {
  .advantage-card {
    width: 100%;
    height: auto;
    min-height: 15.9375rem;
  }
  
  .card-row {
    flex-direction: column;
  }
}

@media (max-width: 992px) {
  .advantages-section {
    padding: 1.25rem;
  }

  .advantages-container {
    flex-direction: column;
    align-items: center;
    margin: 3.75rem auto;
  }

  .side-nav-container {
    width: 100%;
    max-width: 18.75rem;
    margin-bottom: 1.25rem;
  }
}

@media (max-width: 768px) {
  .advantages-container {
    margin: 2.5rem auto;
  }
  
  .advantage-card {
    padding: 1.25rem;
    min-height: 12.5rem;
  }
  
  .card-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .card-title {
    font-size: 0.9375rem;
  }
  
  .card-desc {
    font-size: 0.8125rem;
  }
}

@media (max-width: 576px) {
  .advantages-section {
    padding: 1rem;
  }
  
  .advantage-card {
    min-height: 11.25rem;
    padding: 1rem;
  }
}
</style> 