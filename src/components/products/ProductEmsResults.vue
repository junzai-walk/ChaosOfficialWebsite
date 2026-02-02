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
.product-ems-results {
  width: 100%;
  min-height: 100%;
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
/* 媒体查询 - 针对1366*768屏幕 */
/* 媒体查询 - 针对小屏幕 */
/* 媒体查询 - 移动设备 */
.text-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>