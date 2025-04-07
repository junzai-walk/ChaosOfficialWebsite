<template>
  <div class="cases-section">
    <!-- 上方背景图 -->
    <div class="background-header"></div>

    <div class="cases-container">
      <!-- 左侧导航栏 - 使用自定义组件 -->
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

      <!-- 右侧内容区 -->
      <div class="cases-content">
        <!-- 图片展示区 -->
        <div class="case-showcase">
          <div class="case-cards" :style="{ width: `${totalPages * 100}%`, transform: `translateX(-${currentPage * (100/totalPages)}%)` }">
            <!-- 动态生成每页内容 -->
            <div v-for="page in totalPages" :key="page" class="case-page" :style="{ width: `${100/totalPages}%` }">
              <div 
                v-for="(card, index) in getPageCases(page-1)" 
                :key="index" 
                class="case-card"
              >
                <div class="case-image" :style="{ backgroundImage: `url(${card.image})` }"></div>
                <div class="case-info">
                  <h3>{{ card.title }}</h3>
                  <p>{{ card.description }}</p>
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
          <button @click="nextPage" :disabled="currentPage >= totalPages - 1" class="nav-button">
            <el-icon>
              <ArrowRight />
            </el-icon>
          </button>
        </div>
        <!-- 页码指示器 -->
        <div class="pagination-indicator" v-if="false">
          <span v-for="page in totalPages" :key="page" 
                :class="['page-dot', { active: currentPage === page - 1 }]"
                @click="goToPage(page - 1)"></span>
        </div>
      </div>
    </div>

    <!-- 申请试用区域 -->
    <div class="apply-trial">
      <h3>立即定制方案</h3>
      <div class="apply-form">
        <el-input v-model="contactInfo" placeholder="请输入手机号"></el-input>
        <el-button type="primary" @click="submitConsultation">咨询定制</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import CustomNavSteps from './CustomNavSteps.vue';
import { ElMessage } from 'element-plus';

// 定义接口
interface CaseCard {
  image: string;
  title: string;
  description: string;
}

// 定义组件属性
const props = defineProps<{
  cases: CaseCard[];
  navSteps: string[];
  cardsPerPage?: number;
  defaultActiveStep?: number;
  sectionNumbers: number[];
}>();

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep || 4); // 默认显示典型案例（第四项）
const currentPage = ref(0);
const contactInfo = ref('');

// 每页显示的卡片数
const cardsPerPage = computed(() => props.cardsPerPage || 4);

// 计算总页数
const totalPages = computed(() => Math.ceil(props.cases.length / cardsPerPage.value));

// 获取指定页的案例数据
const getPageCases = (pageIndex: number) => {
  const start = pageIndex * cardsPerPage.value;
  const end = Math.min(start + cardsPerPage.value, props.cases.length);
  return props.cases.slice(start, end);
};

// 跳转到指定页
const goToPage = (pageIndex: number) => {
  if (pageIndex >= 0 && pageIndex < totalPages.value) {
    currentPage.value = pageIndex;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
};

// 上一页
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

// 提交咨询申请
const submitConsultation = () => {
  if (!contactInfo.value) {
    ElMessage.warning('请输入手机号码');
    return;
  }
  
  // 手机号格式校验
  const phoneRegex = /^1[3-9]\d{9}$/;
  if (!phoneRegex.test(contactInfo.value)) {
    ElMessage.warning('请输入正确的手机号码格式');
    return;
  }
  
  // 提交逻辑
  ElMessage.success('申请成功，工作人员将会尽快联系您');
  contactInfo.value = ''; // 清空输入框
};

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
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

.cases-section {
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 70px);
  position: relative;
}

.cases-container {
  width: 100%;
  display: flex;
  gap: 1.875rem;
  max-width: 75rem; // 1200px
  margin: 0 auto 2.5rem;
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
  background: url('@/assets/industry/case-banner.png') no-repeat center center;
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
}

.case-page {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.25rem; // 20px
  position: relative;
}

.case-card {
  width: calc(25% - 0.9375rem); // 计算每个卡片宽度，考虑间距
  height: 360px;
  border-radius: 0.5rem; // 8px
  overflow: hidden;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #eaeaea;
}

.case-card:hover {
  transform: translateY(-0.3125rem); // 5px
  box-shadow: 0 0.5rem 1rem rgba(24, 144, 255, 0.1);
}

.case-image {
  width: 100%;
  height: 250px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.case-info {
  padding: 2rem 1rem; // 15px
  text-align: left;
}

.case-info h3 {
  font-size: 1rem; // 16px
  margin: 0 0 0.625rem; // 10px
  color: #333;
}

.case-info p {
  font-size: 0.875rem; // 14px
  color: #666;
  margin: 0;
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 3rem; // 20px
  margin: 1.25rem 0; // 20px 0
}

.nav-button {
  width: 2.5rem; // 40px
  height: 2.5rem; // 40px
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #1890ff;
  border-color: none !important;
  color: #fff;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 页码指示器 */
.pagination-indicator {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.page-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-dot.active {
  background-color: #1890ff;
  transform: scale(1.2);
}

/* 申请试用区域 */
.apply-trial {
  width: 100%;
  height: 8.5rem; // 136px
  background-color: #fff;
  border-radius: 0.5rem; // 8px
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.25rem; // 20px
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.05);
  background: url('@/assets/industry/apply-bg.png') no-repeat center center;
  background-size: 100% 100%;
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
  .case-card {
    width: calc(25% - 0.9375rem);
  }
}

@media (max-width: 992px) {
  .cases-section {
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