<template>
  <section class="solution-section" ref="solutionSection">
    <div class="solution-header">
      <h2 class="title">解决方案</h2>
      <p class="description">基于海归技术团队全球上百个项目应用经验，提供更加智能、安全、经济的工业产品和解决方案</p>
    </div>

    <div class="industry-tabs">
      <div v-for="(industry, index) in industries" :key="index" class="industry-tab"
        :class="{ active: activeIndustry === index }" @click="activeIndustry = index">
        {{ industry.name }}
      </div>
    </div>

    <div class="solution-content">
      <div class="solution-info">
        <h3 class="industry-title">{{ industries[activeIndustry].name }}</h3>
        <p class="industry-desc">{{ industries[activeIndustry].description }}</p>
        <el-button class="learn-more-btn" type="primary">
          了解更多
        </el-button>

        <div class="case-section">
          <h3 class="case-title">典型案例&相关产品</h3>
          <div class="case-items">
            <div class="case-item" v-for="(item, index) in currentCases" :key="index">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="solution-image">
        <img :src="industries[activeIndustry].image" :alt="industries[activeIndustry].name">
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const activeIndustry = ref(0);

// 示例数据
const industries = ref([
  {
    name: '钢铁行业',
    description: '钢铁行业作为传统制造业的代表，正面临着大的转型升级压力。为了提升生产效率、降低生产成本、提高产品质量并迈进日益增长的市场需求......',
    image: '/src/assets/home/Rectangle_8.png',
    cases: [
      '梅钢设备运维管理系统',
      '钢铁厂能源管理系统',
      '钢铁生产质量控制系统',
      '智能冶炼控制平台',
      '钢铁企业ERP系统',
      '钢铁产品追溯系统'
    ]
  },
  { 
    name: '水泥行业', 
    description: '水泥行业相关描述...', 
    image: '/src/assets/home/Rectangle_8.png',
    cases: [
      '水泥生产线监控系统',
      '水泥厂能耗管理平台',
      '水泥质量检测系统',
      '环保排放监测系统',
      '水泥生产调度系统',
      '原料库存管理系统'
    ]
  },
  { name: '煤炭行业', description: '煤炭行业相关描述...', image: '/src/assets/home/Rectangle_8.png' },
  { name: '化工行业', description: '化工行业相关描述...', image: '/src/assets/home/Rectangle_8.png' },
  { name: '汽车行业', description: '汽车行业相关描述...', image: '/src/assets/home/Rectangle_8.png' },
  { name: '新能源行业', description: '新能源行业相关描述...', image: '/src/assets/home/Rectangle_8.png' }
]);

// 移除独立的caseItems，使用计算属性来获取当前行业的案例
const currentCases = computed(() => {
  return industries.value[activeIndustry.value].cases || [];
});
</script>

<style scoped lang="less">
.solution-section {
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0;
  box-sizing: border-box;
  background-image: url('/src/assets/home/bg.png');
  background-size: cover;
  background-position: center;
  color: #333;
  position: relative;

  .solution-header {
    text-align: center;
    margin-bottom: 2.5rem;

    .title {
      font-size: 2.25rem;
      margin-bottom: 1.25rem;
      font-weight: bold;
    }

    .description {
      max-width: 50rem;
      margin: 1rem auto;
      font-size: 1rem;
      line-height: 1.6;
    }
  }

  .industry-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;

    .industry-tab {
      padding: 0.625rem 1.25rem;
      margin: 0 0.625rem;
      cursor: pointer;
      border-bottom: 0.125rem solid transparent;
      transition: all 0.3s;
      font-weight: bolder;

      &.active {
        border-bottom: 0.125rem solid #1890ff;
        color: #1890ff;
        font-weight: bold;
      }
    }
  }

  .solution-content {
    display: flex;
    margin: 0 auto;
    width: 87.5rem;
    height: 28.75rem;

    .solution-info {
      width: 59rem;
      background-color: #0072FF;
      color: white;
      padding: 2.5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      text-align: left;
      box-sizing: border-box;

      .industry-title {
        font-size: 1.75rem;
        margin-bottom: 1.25rem;
        font-weight: bold;
      }

      .industry-desc {
        font-size: 0.875rem;
        line-height: 1.6;
        margin-bottom: 1.875rem;
        text-align: left;
      }

      .learn-more-btn {
        background-color: transparent;
        border: 0.0625rem solid white;
        color: white;
        width: fit-content;
        border-radius: 1.25rem;
        padding: 0.5rem 1.25rem;
      }
    }

    .solution-image {
      width: 37.5rem;
      height: 28.75rem;
      overflow: hidden;
      opacity: 0.88;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .case-section {
    margin-top: 4rem;
    border-radius: 0.25rem;
    box-sizing: border-box;

    .case-title {
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
      font-weight: bold;
      color: white;
      text-align: left;
    }

    .case-items {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      .case-item {
        padding: 0.9375rem;
        padding-left: 0;
        color: white;
        text-align: left;
      }
    }
  }
}
</style>