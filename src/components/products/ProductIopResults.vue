<template>
  <div class="product-iop-results">
    <!-- 左侧导航栏 -->
    <div class="side-nav-container">
      <CustomNavSteps :width="120" :height="192" :steps="customSteps" v-model:activeStep="activeStep" />
    </div>

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
    <div class="experience-button">
      预约体验
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CustomNavSteps from '@/components/industry/components/CustomNavSteps.vue';


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
</script>

<style scoped lang="less">
.product-iop-results {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: white;
  padding-top: 150px; 
  box-sizing: border-box;

  .side-nav-container {
    position: absolute;
    top: 336px;
    left: 167px;
    z-index: 10;

    .custom-nav-steps {
      top: 0;
      left: 0;
    }
  }

  .title-container {
    text-align: center;
    margin-bottom: 60px;

    .results-title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 32px;
      font-weight: 600;
      color: #333;
    }
  }

  .results-cards {
    display: grid;
    grid-template-columns: repeat(3, 416px);
    grid-template-rows: repeat(2, 220px);
    gap: 20px;
    justify-content: center;
    margin: 0 auto;
    max-width: 1288px;
  }

  .result-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 24px;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    }

    .card-icon-wrapper {
      position: relative;
      width: 40px;
      height: 40px;
      margin: 16px auto;
      position: relative;

      .card-icon-bg {
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 187, 152, 0.2);
        z-index: 1;
      }

      .card-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        object-fit: contain;
        z-index: 2;
      }
    }

    .card-title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0 0 12px 0;
      text-align: center;
    }

    .card-description {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 14px;
      line-height: 24px;
      color: #666;
      margin: 0;
      flex-grow: 1;
    }
  }

  .experience-button {
    position: absolute;
    width: 200px;
    height: 56px;
    left: 860px;
    top: 710px;
    background-color: #0072FF;
    color: white;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0058cc;
    }
  }

  @media (max-width: 1920px) {
    padding-top: calc(230px * 100vw / 1920);
    
    .side-nav-container {
      top: calc(336px * 100vw / 1920);
      left: calc(187px * 100vw / 1920);
    }
    
    .title-container {
      margin-bottom: calc(60px * 100vw / 1920);
      
      .results-title {
        font-size: calc(32px * 100vw / 1920);
      }
    }
    
    .results-cards {
      grid-template-columns: repeat(3, calc(416px * 100vw / 1920));
      grid-template-rows: repeat(2, calc(220px * 100vw / 1920));
      gap: calc(20px * 100vw / 1920);
      max-width: calc(1288px * 100vw / 1920);
    }
    
    .result-card {
      padding: calc(24px * 100vw / 1920);
      
      .card-icon-wrapper {
        width: calc(40px * 100vw / 1920);
        height: calc(40px * 100vw / 1920);
        margin-bottom: calc(16px * 100vw / 1920);
        
        .card-icon-bg {
          width: calc(40px * 100vw / 1920);
          height: calc(40px * 100vw / 1920);
        }
        
        .card-icon {
          width: calc(40px * 100vw / 1920);
          height: calc(40px * 100vw / 1920);
        }
      }
      
      .card-title {
        font-size: calc(20px * 100vw / 1920);
        margin-bottom: calc(12px * 100vw / 1920);
      }
      
      .card-description {
        font-size: calc(14px * 100vw / 1920);
        line-height: calc(24px * 100vw / 1920);
      }
    }
    
    .experience-button {
      width: calc(200px * 100vw / 1920);
      height: calc(56px * 100vw / 1920);
      left: calc(860px * 100vw / 1920);
      top: calc(710px * 100vw / 1920);
      font-size: calc(18px * 100vw / 1920);
      border-radius: calc(10px * 100vw / 1920);
    }
  }
}
</style> 