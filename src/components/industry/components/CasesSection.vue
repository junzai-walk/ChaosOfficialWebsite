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
                @click="handleCardClick(card)"
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
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import CustomNavSteps from './CustomNavSteps.vue';
import { ElMessage } from 'element-plus';

// 定义接口
interface CaseCard {
  image: string;
  title: string;
  description: string;
  section?: string; // 案例ID，用于跳转到详情页
}

// 定义组件属性
const props = defineProps<{
  cases: CaseCard[];
  navSteps: string[];
  cardsPerPage?: number;
  defaultActiveStep?: number;
  sectionNumbers: number[];
}>();

// 获取路由实例
const router = useRouter();

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

// 处理卡片点击事件
const handleCardClick = (card: CaseCard) => {
  console.log("%c card", "color:red;", card)
  if (card.section) {
    // 如果有案例ID，跳转到案例详情页
    router.push({
      path: '/products',
      query: {
        section: card.section  // 案例详情页的section
      }
    });
  } else {
    // 如果没有案例ID，显示提示信息
    ElMessage.info('该案例暂无详细信息');
  }
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

.cases-section {
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 4.375rem);
  position: relative;
}

.cases-container {
  width: 100%;
  display: flex;
  gap: 1.875rem;
  max-width: 75rem;
  margin: 0 auto 2.5rem;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
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
  height: 12.5rem;
  background: url('@/assets/industry/case-banner.png') no-repeat center center;
  background-size: cover;
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
}

/* 图片展示区域 */
.case-showcase {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.25rem;
}

.case-cards {
  display: flex;
  transition: transform 0.5s ease;
}

.case-page {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.25rem;
  position: relative;
}

.case-card {
  width: calc(25% - 0.9375rem);
  height: 22.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 0.0625rem solid #eaeaea;
  cursor: pointer; /* 添加指针样式，表示可点击 */
}

.case-card:hover {
  transform: translateY(-0.3125rem);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1); /* 增强悬停时的阴影效果 */
}

.case-image {
  width: 100%;
  height: 15.625rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.case-info {
  padding: 1.25rem 1rem;
  text-align: left;
}

.case-info h3 {
  font-size: 1rem;
  margin: 0 0 0.625rem;
  color: #333;
}

.case-info p {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 1.25rem 0;
}

.nav-button {
  width: 2.5rem;
  height: 2.5rem;
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
  height: 8.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.25rem;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.05);
  background: url('@/assets/industry/apply-bg.png') no-repeat center center;
  background-size: 100% 100%;
}

.apply-trial h3 {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: #333;
}

.apply-form {
  display: flex;
  gap: 0.9375rem;
  width: 100%;
  max-width: 31.25rem;
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .cases-container {
    max-width: 90rem;
  }

  .case-card {
    height: 25rem;
  }

  .case-image {
    height: 17.5rem;
  }

  .case-info {
    padding: 1.5rem 1.25rem;
  }

  .case-info h3 {
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }

  .case-info p {
    font-size: 1rem;
  }

  .apply-trial {
    height: 9.5rem;
  }

  .apply-trial h3 {
    font-size: 1.5rem;
  }

  .apply-form {
    max-width: 37.5rem;
  }
}

@media (max-width: 1366px) {
  .cases-container {
    max-width: 70rem;
  }

  .case-card {
    height: 20rem;
  }

  .case-image {
    height: 13.75rem;
  }

  .case-info {
    padding: 1rem 0.875rem;
  }

  .case-info h3 {
    font-size: 0.9375rem;
  }

  .case-info p {
    font-size: 0.8125rem;
  }

  .apply-trial {
    height: 7.5rem;
  }

  .apply-trial h3 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 1400px) {
  .case-card {
    width: calc(25% - 0.9375rem);
  }
}

@media (max-width: 992px) {
  .cases-section {
    padding: 0 1.25rem;
  }

  .cases-container {
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.875rem;
  }

  .side-nav-container {
    width: 100%;
    max-width: 18.75rem;
    margin-bottom: 1.25rem;
  }

  .case-card {
    width: calc(50% - 0.625rem);
    height: auto;
    min-height: 18.75rem;
  }

  .case-image {
    height: 12.5rem;
  }

  .navigation-buttons {
    gap: 2rem;
  }

  .nav-button {
    width: 2.25rem;
    height: 2.25rem;
  }
}

@media (max-width: 768px) {
  .cases-section {
    padding: 0 1rem;
  }

  .background-header {
    height: 10rem;
  }

  .case-page {
    gap: 1rem;
  }

  .case-card {
    width: 100%;
    min-height: 16.25rem;
  }

  .case-image {
    height: 10rem;
  }

  .case-info {
    padding: 0.875rem 0.75rem;
  }

  .apply-trial {
    height: auto;
    padding: 1.5rem 1rem;
  }

  .apply-form {
    flex-direction: column;
    gap: 0.75rem;
  }

  .navigation-buttons {
    gap: 1.5rem;
  }

  .nav-button {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 576px) {
  .cases-section {
    padding: 0 0.75rem;
  }

  .background-header {
    height: 8rem;
  }

  .case-image {
    height: 9.375rem;
  }

  .case-info h3 {
    font-size: 0.875rem;
  }

  .case-info p {
    font-size: 0.75rem;
  }
}
</style>