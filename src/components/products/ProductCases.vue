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

  @media (max-width: 1366px) {
    font-size: 14px;
  }
}

.product-cases {
  width: 100%;
  min-height: 100vh;
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
@media (min-width: 1920px) {
  .product-cases {
    padding: 14.375rem 0 0 11.6875rem;
    gap: 3.1875rem;
  }

  .cases-grid {
    gap: 1.25rem;
    padding-left: 6.25rem;
  }

  .case-card {
    width: 19.375rem;
    height: 16.25rem;
  }

  .appointment-btn {
    width: 12.5rem;
    height: 3.5rem;
    left: 53.75rem;
    top: 40rem;
    font-size: 1rem;
  }
}

@media (max-width: 1366px) {
  .product-cases {
    padding: 10rem 0 0 7rem;
    gap: 2.5rem;
  }

  .cases-grid {
    gap: 1rem;
    padding-left: 13rem;
  }

  .case-card {
    width: 19rem;
    height: 17rem;
  }

  .appointment-btn {
    width: 10rem;
    height: 3rem;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -70%);
    font-size: 0.9375rem;
  }
}

@media (max-width: 1200px) {
  .product-cases {
    padding: 8rem 3rem 4rem;
  }

  .cases-grid {
    padding-left: 5rem;
  }

  .appointment-btn {
    position: relative;
    left: auto;
    top: auto;
    margin: 3rem auto;
  }
}

@media (max-width: 992px) {
  .product-cases {
    flex-direction: column;
    padding: 6rem 2rem 4rem;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .cases-grid {
    padding-left: 0;
    justify-content: center;
  }

  .case-card {
    width: calc(50% - 0.5rem);
    height: 12rem;
  }
}

@media (max-width: 768px) {
  .product-cases {
    padding: 5rem 1.5rem 3rem;
  }

  .cases-grid {
    gap: 1rem;
  }

  .case-card {
    width: 100%;
    height: 12rem;
    max-width: 25rem;
  }

  .appointment-btn {
    width: 80%;
    max-width: 15rem;
  }
}

@media (max-width: 576px) {
  .product-cases {
    padding: 4rem 1rem 2rem;
  }

  .case-card {
    height: 10rem;
  }

  .appointment-btn {
    height: 2.75rem;
    font-size: 0.875rem;
  }
}
</style>