<template>
  <div class="product-cases">
    <!-- 左侧导航栏 - 已隐藏，使用全局导航 -->
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

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;

}

.product-cases {
  width: 100%;
  min-height: 100%;
  display: flex;
  background-color: white;
  padding: 14.375rem 0 0 11.6875rem;
  box-sizing: border-box;
  gap: 3.1875rem;
  position: relative;
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
  gap: 1.25rem;
  padding-left: 6.25rem;
}

.case-card {
  width: 19.375rem;
  height: 16.25rem;
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  transform: translateY(-0.3125rem);
}

.case-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.appointment-btn {
  position: absolute;
  width: 12.5rem;
  height: 3.5rem;
  left: 53.75rem;
  top: 40rem;
  background-color: #2B7FE8;
  color: white;
  border-radius: 1.5625rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.appointment-btn:hover {
  background-color: #1e6fd4;
}

/* 媒体查询 - 适配不同分辨率 */
</style>