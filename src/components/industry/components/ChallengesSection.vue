<template>
  <div class="challenges-section">
    <div class="challenges-container">
      <!-- 左侧导航 - 使用自定义组件 -->
      <div class="side-nav-container">
        <CustomNavSteps 
          :width="120" 
          :height="192" 
          :steps="navSteps" 
          v-model:activeStep="activeStep" 
        />
      </div>

      <!-- 右侧内容 -->
      <div class="challenges-content">
        <div class="challenge-cards">
          <!-- 挑战卡片以每行两个的形式显示 -->
          <div class="challenge-row" v-for="(rowCards, rowIndex) in chunkedCards" :key="rowIndex">
            <div class="challenge-card" v-for="(card, cardIndex) in rowCards" :key="cardIndex">
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
interface ChallengeCard {
  icon: string;
  title: string;
  description: string;
}

// 定义组件属性
const props = defineProps<{
  cards: ChallengeCard[];
  navSteps: string[];
  defaultActiveStep?: number;
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 1);

// 将卡片数组分成两两一组
const chunkedCards = computed(() => {
  const result = [];
  for (let i = 0; i < props.cards.length; i += 2) {
    result.push(props.cards.slice(i, i + 2));
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

.challenges-section {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem; // 40px
  display: flex;
  justify-content: center;
}

.challenges-container {
  max-width: 75rem; // 1200px
  width: 100%;
  display: flex;
  gap: 1.875rem; // 30px
  margin: 100px auto; // 添加水平居中
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start; // 改为flex-start使文字靠左
  align-items: center; // 确保顶部对齐
}

.challenges-content {
  flex: 1;
  display: inline-flex;
  justify-content: flex-start; // 修改为左对齐
  align-items: flex-start; // 确保顶部对齐
}

.challenge-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.challenge-row {
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.challenge-card {
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  height: 200px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-icon {
  width: 60px;
  height: 60px;
  background-color: #ffe7e7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

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
  text-align: left;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 992px) {
  .challenges-section {
    padding: 20px;
  }

  .challenges-container {
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