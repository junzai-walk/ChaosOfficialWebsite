<template>
  <section class="solution-section" ref="solutionSection">
    <div class="solution-header">
      <h2 class="title">解决方案</h2>
      <p class="description">基于海归技术团队全球上百个项目应用经验，提供更加智能、安全、经济的工业产品和解决方案</p>
    </div>
    
    <div class="industry-tabs">
      <div 
        v-for="(industry, index) in industries" 
        :key="index" 
        class="industry-tab"
        :class="{ active: activeIndustry === index }"
        @click="activeIndustry = index">
        {{ industry.name }}
      </div>
    </div>
    
    <div class="solution-content">
      <div class="solution-info">
        <h3 class="industry-title">{{ industries[activeIndustry].name }}</h3>
        <p class="industry-desc">{{ industries[activeIndustry].description }}</p>
        <el-button class="learn-more-btn" type="primary">
          <el-icon><HomeFilled /></el-icon>
          了解更多
        </el-button>
      </div>
      <div class="solution-image">
        <img :src="industries[activeIndustry].image" :alt="industries[activeIndustry].name">
      </div>
    </div>
    
    <div class="case-section">
      <h3 class="case-title">典型案例&相关产品</h3>
      <div class="case-items">
        <div class="case-item" v-for="(item, index) in caseItems" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { HomeFilled } from '@element-plus/icons-vue';

const activeIndustry = ref(0);

// 示例数据
const industries = ref([
  {
    name: '钢铁行业',
    description: '钢铁行业作为传统制造业的代表，正面临着大的转型升级压力。为了提升生产效率、降低生产成本、提高产品质量并迈进日益增长的市场需求......',
    image: '/src/assets/steel-industry.jpg' // 请确保有这个图片或替换为实际图片路径
  },
  { name: '水泥行业', description: '水泥行业相关描述...', image: '/src/assets/cement-industry.jpg' },
  { name: '煤炭行业', description: '煤炭行业相关描述...', image: '/src/assets/coal-industry.jpg' },
  { name: '化工行业', description: '化工行业相关描述...', image: '/src/assets/chemical-industry.jpg' },
  { name: '汽车行业', description: '汽车行业相关描述...', image: '/src/assets/auto-industry.jpg' },
  { name: '新能源行业', description: '新能源行业相关描述...', image: '/src/assets/new-energy-industry.jpg' }
]);

const caseItems = ref([
  '梅钢设备运维管理系统',
  '梅钢设备运维管理系统',
  '梅钢设备运维管理系统',
  '梅钢设备运维管理系统',
  '梅钢设备运维管理系统',
  '梅钢设备运维管理系统'
]);
</script>

<style scoped>
.solution-section {
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 80px 50px;
  box-sizing: border-box;
  background-image: url('/src/assets/solution-bg.jpg'); /* 替换为实际背景图片 */
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  color: #333;
  position: relative;
  overflow: hidden;
}

.solution-header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
}

.description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.6;
}

.industry-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.industry-tab {
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.industry-tab.active {
  border-bottom: 2px solid #1890ff;
  color: #1890ff;
  font-weight: bold;
}

.solution-content {
  display: flex;
  margin-bottom: 40px;
  height: 300px;
}

.solution-info {
  width: 50%;
  background-color: #1890ff;
  color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.industry-title {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: bold;
}

.industry-desc {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.learn-more-btn {
  background-color: transparent;
  border: 1px solid white;
  color: white;
  width: fit-content;
  border-radius: 20px;
  padding: 8px 20px;
}

.solution-image {
  width: 50%;
  overflow: hidden;
}

.solution-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-section {
  margin-top: 40px;
}

.case-title {
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333;
}

.case-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.case-item {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style> 