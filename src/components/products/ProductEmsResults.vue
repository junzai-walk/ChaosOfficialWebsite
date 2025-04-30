<template>
  <div class="product-ems-results">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <!-- <CustomNavSteps 
          :width="120" 
          :height="192" 
          :steps="navSteps" 
          :active-step="activeStep" 
          :section-numbers="sectionNumbers" 
          @update:active-step="updateActiveStep" 
        /> -->
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
          <span class="card-description">{{ result.description }}</span>
          <span class="card-number" :class="`color-${index + 1}`">
            {{ result.number }}
          </span>
        </div>
      </div>
    </div>

    <!-- 预约体验按钮 -->
    <div class="experience-button-container">
      <button class="experience-button" @click="handleConsult">预约体验</button>
    </div>

    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog v-model:visible="consultDialogVisible" @submit="handleConsultSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import ConsultDialog from '@/components/common/ConsultDialog.vue'

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

interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 4);

const consultDialogVisible = ref(false)


// 自定义步骤，将"应用案例"改为"应用成效"
const customSteps = computed(() => {
  const steps = [...props.navSteps];
  if (steps.length >= 4) {
    steps[3] = '应用成效';
  }
  return steps;
});


const handleConsult = () => {
  consultDialogVisible.value = true
}

const handleConsultSubmit = (formData: ConsultFormData) => {
  console.log('提交的咨询表单数据：', formData)
  // 这里可以添加表单提交到服务器的逻辑
}

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
}

/* 媒体查询 - 针对1366*768屏幕，设置不同的基准字体大小 */
@media (min-width: 1367px) and (max-width: 1500px) {
  :root {
    font-size: 14px;
  }
}

.product-ems-results {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fc;
  position: relative;
  padding: 6.25rem 0;
  box-sizing: border-box;
}

// .side-nav-container {
//   position: absolute;
//   top: 15.625rem;
//   left: 11.6875rem;
// }

.title-container {
  width: 100%;
  text-align: center;
  margin-bottom: 3.75rem;
}

.results-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.results-cards {
  display: flex;
  justify-content: center;
  gap: 1.875rem;
  width: 100%;
  max-width: 87.5rem;
}

.result-card {
  width: 26rem;
  height: 18.0625rem;
  border-radius: 0.625rem;
  background-color: white;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.875rem 3.125rem;
  box-sizing: border-box;
  text-align: center;
}

.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5rem;
  height: 5rem;
  border-radius: 50%;
  margin-bottom: 0.9375rem;
}

.card-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.card-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0.9375rem 0;
}

.card-content {
  text-align: left;
}

.card-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.25rem 0;
}

.card-number {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 2.25rem;
  font-weight: 600;
  margin-left: 0.625rem;
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
  margin-top: 5rem;
}

.experience-button {
  width: 12.5rem;
  height: 3.5rem;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 1.75rem;
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.experience-button:hover {
  background-color: #40a9ff;
}

/* 媒体查询 - 针对大屏幕 */
@media (min-width: 1920px) {
  .results-cards {
    margin-top: 7.5rem;
    gap: 1.875rem;
  }

  :deep(.side-nav-container) {
    top: 0rem;
    left: 0rem;
  }
  
  .result-card {
    width: 26rem;
    height: 18.0625rem;
    padding: 1.875rem 3.125rem;
  }
  
  .card-title {
    font-size: 1.25rem;
  }
  
  .card-description {
    font-size: 1rem;
  }
  
  .card-number {
    font-size: 2.25rem;
  }
  
  .experience-button {
    width: 12.5rem;
    height: 3.5rem;
    font-size: 1.125rem;
  }
}

/* 媒体查询 - 针对1366*768屏幕 */
@media (max-width: 1366px) {
  .product-ems-results {
    padding: 5rem 0;
  }
  
  :deep(.side-nav-container) {
    top: 0rem;
    left: 0rem;
  }

  .results-cards {
    margin-top: 5rem;
    gap: 1.5rem;
  }
  
  .result-card {
    width: 22rem;
    height: 16rem;
    padding: 1.5rem 2.5rem;
  }
  
  .card-icon {
    width: 4rem;
    height: 4.5rem;
    margin-bottom: 0.75rem;
  }
  
  .card-title {
    font-size: 1.125rem;
    margin: 0.75rem 0;
  }
  
  .card-description {
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
  }
  
  .card-number {
    font-size: 2rem;
  }
  
  .experience-button-container {
    margin-top: 4rem;
  }
  
  .experience-button {
    width: 11rem;
    height: 3rem;
    font-size: 1rem;
  }
}

/* 媒体查询 - 针对小屏幕 */
@media (max-width: 1200px) {
  .results-cards {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
  
  .result-card {
    width: 90%;
    max-width: 26rem;
  }
}

/* 媒体查询 - 移动设备 */
@media (max-width: 768px) {
  .product-ems-results {
    padding: 4rem 1rem;
  }
  
  .side-nav-container {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .results-cards {
    margin-top: 2rem;
  }
  
  .result-card {
    width: 100%;
    height: auto;
    padding: 1.25rem;
  }
  
  .card-icon {
    width: 3.5rem;
    height: 4rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-description {
    font-size: 0.875rem;
  }
  
  .card-number {
    font-size: 1.75rem;
  }
  
  .experience-button {
    width: 10rem;
    height: 2.75rem;
    font-size: 0.9375rem;
  }
}

.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>