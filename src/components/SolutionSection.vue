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
        <el-button class="learn-more-btn" type="primary" @click="navigateToIndustry(activeIndustry)">
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
import { useRouter } from 'vue-router';

const router = useRouter();
const activeIndustry = ref(0);

// 导航到行业详情页面
const navigateToIndustry = (industryIndex: number) => {
  // 根据行业索引映射到industry页面的对应section
  const sectionMap: { [key: number]: number } = {
    0: 0,  // 钢铁行业 - section 0
    1: 5,  // 水泥行业 - section 5
    2: 10, // 煤炭行业 - section 10
    3: 15, // 化工行业 - section 15
    4: 20, // 汽车行业 - section 20
    5: 25  // 新能源行业 - section 25
  };
  
  // 导航到industry页面并传递section参数
  router.push({
    path: '/industry',
    query: { section: sectionMap[industryIndex] }
  });
};

// 示例数据
const industries = ref([
  {
    name: '钢铁行业',
    description: '结合机理模型、数据模型、数字孪生技术、多变量预测控制技术，解决钢铁企业生产工艺、设备控制等一系列工业生产痛点，实现工艺流、生产信息流、设备流"三流合一"，稳定提升成品质量，降低生产线设备故障风险、人力成本和能源消耗',
    image: '/src/assets/industry/steel.png',
    cases: [
      '设备预测性维护与健康管理系统',
      '设备全生命周期管理系统',
      '先进过程控制系统',
      '能源管理与优化系统',
      '煤气官网平衡优化系统',
      '板坯库调度系统'
    ]
  },
  { 
    name: '水泥行业', 
    description: '基于超思工业互联网平台，为水泥行业提供专业的智能化解决方案。覆盖智能运维、智能控制、能效优化等领域，实现设备健康状态实时监控预警、工艺控制优化，降低运维成本、显著提升能效与产能稳定性', 
    image: '/src/assets/industry/cement-bg.png',
    cases: [
      '设备预测性维护与健康管理系统',
      '设备全生命周期管理系统',
      '先进过程控制系统',
      '能源管理与优化系统',
      '库存优化系统',
      '生产计划排程系统'
    ]
  },
  { 
    name: '煤炭行业', 
    description: '聚焦核心设备智能化运维，采用物联网、人工智能、大数据等技术，通过特征提取+机理建模的方式实现设备状态感知、智能预警、故障诊断、健康评估，并以统一算法库与知识库赋能矿井设备全生命周期管理，帮助煤矿企业实现数字化转型升级', 
    image:'/src/assets/industry/coal-bg.jpg',
    cases: [
      '设备预测性维护与健康管理系统',
      '设备全生命周期管理系统',
      '先进过程控制系统',
      '能源管理与优化系统',
      '库存优化系统',
      '智能配料系统'
    ]
  },
  { 
    name: '化工行业', 
    description: '利用物联网、大数据、人工智能等技术手段，对化工产线上设备运行数据进行采集、分析和预测，从而预测设备故障风险，以智能运维驱动设备全生命周期管理，保障化工生产安全、高效、可持续', 
    image:'/src/assets/industry/chemical-bg.jpg',
    cases: [
      '设备预测性维护与健康管理系统',
      '设备全生命周期管理系统',
      '先进过程控制系统',
      '能源管理与优化系统',
      '库存优化系统',
      '生产计划排程系统'
    ]
  },
  { 
    name: '汽车行业', 
    description: '为汽车行业提供设备预测性维护、全生命周期管理及供应链优化等解决方案，覆盖冲压、焊接等核心工艺，通过振动分析、动态排产算法及换电站健康监测技术，降低非计划停机，提升物流效率，助力车企实现设备可靠、生产高效与绿色转型', 
    image: '/src/assets/industry/car-bg.png',
    cases: [
      '设备预测性维护与健康管理系统',
      '设备全生命周期管理系统',
      '先进过程控制系统',
      '能源管理与优化系统',
      '智能装箱优化系统',
      '生产计划排程系统'
    ]
  },
  { 
    name: '新能源行业', 
    description: '以智能运维驱动设备可靠性提升，打破信息壁垒，建立规范和有效的集中管理机制，助力新能源行业高效、安全、可持续发展', 
    image: '/src/assets/industry/wind-bg.png',
    cases: [
      '设备预测性维护与健康管理系统',
      '设备全生命周期管理系统',
      '先进过程控制系统',
      '能源管理与优化系统',
      '库存优化系统',
      '生产计划排程系统'
    ]
  }
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
        // border-bottom: 0.125rem solid #1890ff;
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