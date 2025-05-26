<template>
  <div class="product-iop-results">
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

    <!-- 标题区域 -->
    <div class="title-container">
    </div>

    <!-- 成效卡片区域 -->
    <div class="results-cards">
      <div class="result-card" v-for="(result, index) in results" :key="index">
        <div class="card-icon-wrapper">
          <div class="card-icon-bg"></div>
          <img class="card-icon" :src="result.icon" :alt="`成效图标${index + 1}`" />
        </div>
        <h3 class="card-title">{{ result.title }}</h3>
        <p class="card-description">{{ result.description }}</p>
      </div>
    </div>

    <!-- 预约体验按钮 -->
    <div class="experience-button" @click="handleConsult">
      预约体验
    </div>

    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog v-model:visible="consultDialogVisible" @submit="handleConsultSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';
import ConsultDialog from '@/components/common/ConsultDialog.vue'

interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

const router = useRouter()

interface Result {
  icon: string;
  title: string;
  description: string;
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

const consultDialogVisible = ref(false)

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

@media (max-width: 1366px) {
  :root {
    font-size: 14px;
  }
}

.product-iop-results {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: white;
  padding-top: 9.375rem;
  box-sizing: border-box;

  .title-container {
    text-align: center;
    margin-bottom: 3.75rem;

    .results-title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 2rem;
      font-weight: 600;
      color: #333;
    }
  }

  .results-cards {
    display: grid;
    grid-template-columns: repeat(3, 26rem);
    grid-template-rows: repeat(2, 13.75rem);
    gap: 1.25rem;
    justify-content: center;
    margin: 0 auto;
    max-width: 80.5rem;
    padding-left: 3.125rem;
  }

  .result-card {
    background-color: white;
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;

    &:hover {
      transform: translateY(-0.3125rem);
      box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.12);
    }

    .card-icon-wrapper {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      margin: 1rem auto;
      position: relative;

      .card-icon-bg {
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: rgba(0, 187, 152, 0.2);
        z-index: 1;
      }

      .card-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 1.5rem;
        height: 1.5rem;
        object-fit: contain;
        z-index: 2;
      }
    }

    .card-title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      color: #333;
      margin: 0 0 0.75rem 0;
      text-align: center;
    }

    .card-description {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      color: #666;
      margin: 0;
      flex-grow: 1;
    }
  }

  .experience-button {
    margin: 5rem auto 3rem;
    width: 12.5rem;
    height: 3.5rem;
    background-color: #0072FF;
    color: white;
    border-radius: 1.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 1.125rem;
    font-weight: 500;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0058cc;
    }
  }

  /* 媒体查询 - 针对1920*1080分辨率 */
  @media (min-width: 1920px) {
    padding-top: 9.375rem;

    .title-container {
      margin-bottom: 3.75rem;
    }

    .results-cards {
      grid-template-columns: repeat(3, 26rem);
      grid-template-rows: repeat(2, 13.75rem);
      gap: 1.25rem;
      max-width: 80.5rem;
    }

    .result-card {
      padding: 1.5rem;

      .card-icon-wrapper {
        width: 2.5rem;
        height: 2.5rem;

        .card-icon-bg {
          width: 2.5rem;
          height: 2.5rem;
        }

        .card-icon {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      .card-title {
        font-size: 1.25rem;
      }

      .card-description {
        font-size: 1rem;
        line-height: 1.5;
      }
    }

    .experience-button {
      width: 12.5rem;
      height: 3.5rem;
      font-size: 1.125rem;
    }
  }

  /* 媒体查询 - 针对1366*768分辨率 */
  @media (max-width: 1366px) {
    padding-top: 6.25rem;

    .side-nav-container {
      top: 12.5rem;
      left: 7.5rem;
    }

    .title-container {
      margin-bottom: 3rem;
    }

    .results-cards {
      grid-template-columns: repeat(3, 21rem);
      grid-template-rows: repeat(2, 12rem);
      gap: 1rem;
      max-width: 65rem;
      padding-left: 5rem;
    }

    .result-card {
      padding: 1.25rem;

      .card-icon-wrapper {
        width: 2.25rem;
        height: 2.25rem;
        margin: 0.75rem auto;

        .card-icon-bg {
          width: 2.25rem;
          height: 2.25rem;
        }

        .card-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
      }

      .card-title {
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
      }

      .card-description {
        font-size: 0.9rem;
        line-height: 1.4;
      }
    }

    .experience-button {
      margin: 4rem auto 2.5rem;
      width: 11rem;
      height: 3rem;
      font-size: 1rem;
    }
  }

  /* 媒体查询 - 针对小屏幕 */
  @media (max-width: 1200px) {
    .results-cards {
      grid-template-columns: repeat(2, 22rem);
      grid-template-rows: repeat(3, 12rem);
      padding-left: 0;
    }
  }

  /* 媒体查询 - 针对平板设备 */
  @media (max-width: 992px) {
    .side-nav-container {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 3rem;
    }

    .results-cards {
      grid-template-columns: repeat(2, 1fr);
      padding: 0 2rem;
    }

    .experience-button {
      position: relative;
      left: auto;
      top: auto;
    }
  }

  /* 媒体查询 - 移动设备 */
  @media (max-width: 768px) {
    padding-top: 4rem;

    .results-cards {
      grid-template-columns: 1fr;
      padding: 0 1.5rem;
    }

    .result-card {
      min-height: 10rem;
    }

    .card-title {
      font-size: 1rem;
    }

    .card-description {
      font-size: 0.875rem;
    }

    .experience-button {
      width: 10rem;
      height: 2.75rem;
      font-size: 0.9375rem;
      margin: 3rem auto 2rem;
    }
  }
}
</style>