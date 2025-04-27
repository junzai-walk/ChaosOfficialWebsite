<template>
  <div class="challenges-section">
    <div class="challenges-container">
      <!-- 左侧导航 - 使用自定义组件 -->
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
import CustomNavSteps from './CustomNavSteps.vue';

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
  sectionNumbers: number[];
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

.challenges-section {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem;
  display: flex;
  justify-content: center;
}

.challenges-container {
  max-width: 75rem;
  width: 100%;
  display: flex;
  gap: 1.875rem;
  margin: 6.25rem auto; /* 100px -> 6.25rem */
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.challenges-content {
  flex: 1;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.challenge-cards {
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* 20px -> 1.25rem */
}

.challenge-row {
  display: flex;
  gap: 1.25rem; /* 20px -> 1.25rem */

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.challenge-card {
  flex: 1;
  background-color: #fff;
  border-radius: 1rem; /* 16px -> 1rem */
  padding: 1.875rem; /* 30px -> 1.875rem */
  height: 12.5rem; /* 200px -> 12.5rem */
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.06), 0 0.125rem 0.375rem rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border: 0.0625rem solid rgba(255, 255, 255, 0.8); /* 1px -> 0.0625rem */
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 0.375rem; /* 6px -> 0.375rem */
    opacity: 0.6;
    border-radius: 1rem 1rem 0 0; /* 16px -> 1rem */
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0.625rem; /* 10px -> 0.625rem */
    right: 0.625rem; /* 10px -> 0.625rem */
    height: 0.0625rem; /* 1px -> 0.0625rem */
    background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
    border-radius: 50%;
  }
  
  &:hover {
    transform: translateY(-0.5rem) scale(1.02); /* -8px -> -0.5rem */
    box-shadow: 0 1.25rem 1.875rem rgba(0, 0, 0, 0.1), 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.05);
    border: 0.0625rem solid rgba(255, 255, 255, 1);
    
    .card-icon {
      transform: translateY(-0.3125rem); /* -5px -> -0.3125rem */
      box-shadow: 0.75rem 0.75rem 1.25rem rgba(174, 174, 192, 0.2), -0.75rem -0.75rem 1.25rem hsla(0, 0%, 100%, 0.8);
    }
  }
}

.card-icon {
  width: 3.125rem; /* 50px -> 3.125rem */
  height: 3.125rem; /* 50px -> 3.125rem */
  background: linear-gradient(145deg, rgba(244, 40, 43, 0.123), rgba(244, 40, 43, 0.034));
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.125rem; /* 18px -> 1.125rem */
  box-shadow: 0.5rem 0.5rem 1rem rgba(174, 174, 192, 0.18), -0.5rem -0.5rem 1rem hsla(0, 0%, 100%, 0.8);
  transition: all .4s cubic-bezier(.4, 0, .2, 1);
  border-radius: 50%;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    width: 4.75rem; /* 76px -> 4.75rem */
    height: 4.75rem; /* 76px -> 4.75rem */
    border-radius: 50%;
    background: radial-gradient(circle, rgba(120, 200, 255, 0.05) 0%, rgba(120, 200, 255, 0) 70%);
    z-index: -1;
  }

  img {
    width: 1.5625rem; /* 25px -> 1.5625rem */
    height: 1.5625rem; /* 25px -> 1.5625rem */
    filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.1));
  }
}

.card-title {
  font-size: 1.125rem; /* 18px -> 1.125rem */
  font-weight: 600;
  color: #333;
  margin-bottom: 0.875rem; /* 14px -> 0.875rem */
  text-shadow: 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.8);
}

.card-desc {
  text-align: left;
  color: #666;
  font-size: 0.9375rem; /* 15px -> 0.9375rem */
  line-height: 1.6;
  text-shadow: 0 0.0625rem 0.0625rem rgba(255, 255, 255, 0.5);
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .challenges-container {
    max-width: 80rem;
    gap: 2.5rem;
    margin: 7.5rem auto;
  }
  
  .challenge-card {
    height: 13.75rem;
    padding: 2.25rem;
  }
  
  .card-icon {
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: 1.5rem;
    
    img {
      width: 1.75rem;
      height: 1.75rem;
    }
  }
  
  .card-title {
    font-size: 1.3125rem;
    margin-bottom: 1rem;
  }
  
  .card-desc {
    font-size: 1.0625rem;
  }
}

@media (max-width: 1366px) {
  .challenges-section {
    padding: 1.8rem;
  }
  
  .challenges-container {
    max-width: 65rem;
    gap: 1.5rem;
    margin: 5rem auto;
  }
  
  .challenge-cards {
    gap: 1rem;
  }
  
  .challenge-row {
    gap: 1rem;
  }
  
  .challenge-card {
    height: 10rem;
    padding: 4.5rem 2rem;
    border-radius: 0.75rem;
  }
  
  .card-icon {
    width: 2.8rem;
    height: 2.8rem;
    margin-bottom: 1rem;
    
    &::before {
      width: 4.2rem;
      height: 4.2rem;
    }
    
    img {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  
  .card-title {
    font-size: 1rem;
    margin-bottom: 0.7rem;
  }
  
  .card-desc {
    font-size: 0.85rem;
  }
}

@media (max-width: 992px) {
  .challenges-section {
    padding: 1.25rem;
  }

  .challenges-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    max-width: 18.75rem; /* 300px -> 18.75rem */
    margin-bottom: 1.25rem; /* 20px -> 1.25rem */
  }
}
</style>