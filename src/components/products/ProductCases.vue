<template>
  <div class="product-cases">
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
    
    <!-- 右侧案例展示区域 -->
    <div class="cases-grid">
      <div 
        v-for="(image, index) in cases" 
        :key="index" 
        class="case-card"
        @click="handleCaseClick(index)"
      >
        <img :src="image" :alt="`案例 ${index + 1}`" class="case-image" />
      </div>
    </div>
    
    <!-- 预约体验按钮 -->
    <div class="appointment-btn" @click="handleConsult">
      预约体验
    </div>

        <!-- 使用新的咨询弹窗组件 -->
      <ConsultDialog v-model:visible="consultDialogVisible" @submit="handleConsultSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import ConsultDialog from '@/components/common/ConsultDialog.vue'

interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

const router = useRouter()
const props = defineProps<{
  navSteps: string[];
  defaultActiveStep: number;
  cases: string[];
  sectionNumbers: number[];
}>();

const consultDialogVisible = ref(false)

const handleConsult = () => {
  consultDialogVisible.value = true
}

const handleConsultSubmit = (formData: ConsultFormData) => {
  console.log('提交的咨询表单数据：', formData)
  // 这里可以添加表单提交到服务器的逻辑
}

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 1);

const handleCaseClick = (index: number) => {
  // 点击处理逻辑，可以在这里添加预览功能
  console.log('点击了案例:', index);
};

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
</script>

<style scoped>
.product-cases {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: white;
  padding: 230px 0 0 187px;
  box-sizing: border-box;
  gap: 51px;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.cases-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-left: 100px;
}

.case-card {
  width: 310px;
  height: 260px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
  /* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); */
}

.case-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.appointment-btn {
  position: absolute;
  width: 200px;
  height: 56px;
  left: 860px;
  top: 710px;
  background-color: #2B7FE8;
  color: white;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.appointment-btn:hover {
  background-color: #1e6fd4;
}

@media (max-width: 1920px) {
  .product-cases {
    padding: calc(230px * 100vw / 1920) 0 0 calc(187px * 100vw / 1920);
    gap: calc(51px * 100vw / 1920);
  }
  
  .cases-grid {
    gap: calc(20px * 100vw / 1920);
    padding-right: calc(187px * 100vw / 1920);
  }

  .case-card {
    width: calc(310px * 100vw / 1920);
    height: calc(260px * 100vw / 1920);
  }

  .appointment-btn {
    width: calc(200px * 100vw / 1920);
    height: calc(56px * 100vw / 1920);
    left: calc(860px * 100vw / 1920);
    top: calc(710px * 100vw / 1920);
    font-size: calc(16px * 100vw / 1920);
  }
}
</style> 