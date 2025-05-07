<template>
  <div class="steel-cases">
    <!-- 上方背景图 -->
    <div class="background-header"></div>

    <div class="cases-container">
      <!-- 左侧导航栏 - 使用自定义组件替换原组件 -->
      <div class="side-nav-container">
        <CustomNavSteps :width="120" :height="192" :steps="caseSteps" v-model:activeStep="activeStep" />
      </div>

      <!-- 右侧内容区 -->
      <div class="cases-content">

        <!-- 图片展示区 -->
        <div class="case-showcase">
          <div class="case-cards" :style="{ transform: `translateX(-${currentPage * 50}%)` }">
            <!-- 第一页的4个图片 -->
            <div class="case-page">
              <div class="case-card" v-for="i in 4" :key="i">
                <div class="case-image"></div>
                <div class="case-info">
                  <h3>安徽海螺水泥股份有限公司</h3>
                  <p>预测性运维管理平台</p>
                </div>
              </div>
            </div>
            <!-- 第二页的4个图片 -->
            <div class="case-page">
              <div class="case-card" v-for="i in 4" :key="i + 4">
                <div class="case-image"></div>
                <div class="case-info">
                  <h3>安徽海螺水泥股份有限公司</h3>
                  <p>预测性运维管理平台</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 导航按钮 -->
        <div class="navigation-buttons">
          <button @click="prevPage" :disabled="currentPage === 0" class="nav-button">
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </button>
          <button @click="nextPage" :disabled="currentPage === 1" class="nav-button">
            <el-icon>
              <ArrowRight />
            </el-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- 申请试用区域 -->
    <div class="apply-trial">
      <h3>立即申请免费试用</h3>
      <div class="apply-form">
        <el-input v-model="contactInfo" placeholder="请输入联系方式"></el-input>
        <el-button type="primary">免费试用</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
// 使用自定义导航组件替换原组件
import CustomNavSteps from './CustomNavSteps.vue';

const activeStep = ref(4); // 默认显示典型案例（第四项）

const caseSteps = [
  '行业挑战',
  '解决方案',
  '方案优势',
  '典型案例'
];

const currentPage = ref(0);
const contactInfo = ref('');

// 上一页
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < 1) {
    currentPage.value++;
  }
};
</script>

<style scoped lang="less">
// 根字体大小设置，用于rem计算
html {
  font-size: 16px;
  
  @media (min-width: 1920px) {
    font-size: calc(16px * (1920 / 1920));
  }
  
  @media (max-width: 1440px) {
    font-size: calc(16px * (1440 / 1920));
  }
  
  @media (max-width: 1280px) {
    font-size: calc(16px * (1280 / 1920));
  }
}

.steel-cases {
  width: 100%;
  background-color: #f5f7fa;
  //padding: 0 2.5rem 0 2.5rem; /* 移除底部padding */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 改为flex-start而非center */
  min-height: calc(100vh - 70px); /* 确保最小高度填满视口 */
  position: relative;
}

.cases-container {
  width: 100%;
  display: flex;
  gap: 1.875rem;
  max-width: 75rem; // 1200px
  margin: 0 auto 2.5rem; /* 增加底部margin控制与申请区域间距 */
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start; // 改为flex-start使文字靠左
  align-items: center; // 确保顶部对齐
}

.cases-content {
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* 上方背景图 */
.background-header {
  width: 100vw;
  height: 12.5rem; // 200px
  background: url('@/assets/industry/bg.jpg') no-repeat center center;
  background-size: cover;
  border-radius: 0.5rem; // 8px
  margin-bottom: 1.25rem; // 20px
}

/* 图片展示区域 */
.case-showcase {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.25rem; // 20px
}

.case-cards {
  display: flex;
  transition: transform 0.5s ease;
  width: 200%;
}

.case-page {
  display: flex;
  width: 50%;
  justify-content: space-between;
  gap: 1.25rem; // 20px
  flex-wrap: nowrap;
}

.case-card {
  width: calc(25% - 0.9375rem); // 15px
  height: 16.25rem; // 260px
  background-color: #fff;
  border-radius: 0.5rem; // 8px
  overflow: hidden;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.case-image {
  flex: 1;
  background: url('@/assets/02/Rectangle_8.png') no-repeat center center;
  background-size: cover;
}

.case-info {
  padding: 0.9375rem; // 15px
  text-align: center;
  background-color: #fff;
}

.case-info h3 {
  font-size: 1rem; // 16px
  margin: 0 0 0.3125rem; // 5px
  color: #333;
}

.case-info p {
  font-size: 0.875rem; // 14px
  margin: 0;
  color: #666;
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1.25rem; // 20px
  margin: 1.25rem 0 1.875rem; // 20px 0 30px
}

.nav-button {
  width: 2.5rem; // 40px
  height: 2.5rem; // 40px
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #f3f9ff;
  border-color: #1890ff;
  color: #1890ff;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 申请试用区域 */
.apply-trial {
  width: 100%;
  height: 8.5rem; // 136px
  background-color: #fff;
  border-radius: 0.5rem; // 8px
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.25rem; // 20px
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.05);
  background: url('@/assets/04/bg.png') no-repeat center center;
  background-size: cover;
}

.apply-trial h3 {
  font-size: 1.25rem; // 20px
  margin-bottom: 1.25rem; // 20px
  color: #333;
}

.apply-form {
  display: flex;
  gap: 0.9375rem; // 15px
  width: 100%;
  max-width: 31.25rem; // 500px
}

@media (max-width: 1400px) {
  .case-page {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .case-card {
    width: calc(25% - 0.9375rem); // 15px
  }
}

@media (max-width: 992px) {
  .steel-cases {
    padding: 0;
  }

  .cases-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    max-width: 18.75rem; // 300px
    margin-bottom: 1.25rem; // 20px
  }
  
  .case-page {
    flex-wrap: wrap;
  }
  
  .case-card {
    width: calc(50% - 0.625rem); // 10px
  }
}

@media (max-width: 768px) {
  .case-card {
    width: 100%;
  }
}
</style>