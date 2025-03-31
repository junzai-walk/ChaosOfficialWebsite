<template>
  <div class="product-ems-results">
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

    <!-- 标题区域 -->
    <div class="title-container">
      <!-- <h1 class="results-title">{{ title }}</h1> -->
    </div>

    <!-- 成效卡片区域 -->
    <div class="results-cards">
      <div class="result-card" v-for="(result, index) in results" :key="index">
        <div class="card-icon">
          <img :src="result.icon" :alt="`成效图标${index + 1}`" />
        </div>
        <h3 class="card-title">{{ result.title }}</h3>
        <div class="card-content">
          <p class="card-description">{{ result.description }}</p>
        </div>
        <div class="card-number" :class="`color-${index + 1}`">
          {{ result.number }}
        </div>
      </div>
    </div>

    <!-- 预约体验按钮 -->
    <div class="experience-button-container">
      <button class="experience-button" @click="handleConsult">预约体验</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';

interface Result {
  icon: string;
  title: string;
  description: string;
  number: string;
}

const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  title: string;
  results: Result[];
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 4);

// 自定义步骤，将"应用案例"改为"应用成效"
const customSteps = computed(() => {
  const steps = [...props.navSteps];
  if (steps.length >= 4) {
    steps[3] = '应用成效';
  }
  return steps;
});

const handleConsult = () => {
  router.push({
    path: '/partners',
    query: { section: '3' }  // 跳转到合作伙伴页面的咨询部分
  })
}

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped lang="less">
.product-ems-results {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fc;
  position: relative;
  padding: 100px 0;
  box-sizing: border-box;
}

.title-container {
  width: 100%;
  text-align: center;
  margin-bottom: 60px;
}

.results-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #333;
}

.results-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  max-width: 1400px;
  margin-top: 120px;
  margin-left: 120px;
}

.result-card {
  width: 416px;
  height: 289px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  text-align: center;
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.card-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.result-card:nth-child(1) .card-icon {
  background-color: rgba(0, 187, 152, 0.1);
}

.result-card:nth-child(2) .card-icon {
  background-color: rgba(43, 89, 255, 0.1);
}

.result-card:nth-child(3) .card-icon {
  background-color: rgba(0, 187, 152, 0.1);
}

.card-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 15px 0;
}

.card-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.card-number {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin: 0;
}

.color-1 {
  color: #00BB98;
}

.color-2 {
  color: #2B59FF;
}

.color-3 {
  color: #00BB98;
}

.experience-button-container {
  margin-top: 80px;
}

.experience-button {
  width: 200px;
  height: 56px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 28px;
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.experience-button:hover {
  background-color: #40a9ff;
}

@media (max-width: 1440px) {
  .results-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .result-card {
    width: 90%;
    max-width: 416px;
  }
}
</style>