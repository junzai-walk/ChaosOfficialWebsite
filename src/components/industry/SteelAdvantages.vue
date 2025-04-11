<template>
  <div class="steel-advantages">
    <div class="advantages-container">
      <!-- 左侧导航栏 - 使用自定义组件 -->
      <div class="side-nav-container">
        <CustomNavSteps :width="120" :height="192" :steps="advantageSteps" v-model:activeStep="activeStep" />
      </div>

      <!-- 右侧内容区 -->
      <div class="advantage-content">
        <!-- 卡片部分 -->
        <div class="advantage-cards">
          <!-- 第一行 -->
          <div class="card-row">
            <div class="advantage-card">
              <div class="card-icon">
                <img src="@/assets/industry/steel-advantage-1.png" alt="低碳环保" />
              </div>
              <div class="card-title">低碳环保</div>
              <div class="card-desc">
                提升能源利用效率，减少污染的排放。
              </div>
            </div>

            <div class="advantage-card">
              <div class="card-icon">
                <img src="@/assets/industry/steel-advantage-2.png" alt="智能运维" />
              </div>
              <div class="card-title">智能运维</div>
              <div class="card-desc">
                及时发现设备异常情况，提前做好维护工作，避免设备故障致停机和生产成本增加。
              </div>
            </div>
          </div>

          <!-- 第二行 -->
          <div class="card-row">
            <div class="advantage-card">
              <div class="card-icon">
                <img src="@/assets/industry/steel-advantage-3.png" alt="品质提升" />
              </div>
              <div class="card-title">品质提升</div>
              <div class="card-desc">
                稳定控制数据波动，实现稳定加热和冷却，通过过程控制，保证成品的质量。
              </div>
            </div>

            <div class="advantage-card">
              <div class="card-icon">
                <img src="@/assets/industry/steel-advantage-4.png" alt="稳定生产" />
              </div>
              <div class="card-title">稳定生产</div>
              <div class="card-desc">
                减少温差波动，充分燃烧；及时响应各个量之间的相关联性。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 替换导航组件
import CustomNavSteps from './CustomNavSteps.vue';

const activeStep = ref(3); // 默认显示方案优势（第三项）

const advantageSteps = [
  '行业挑战',
  '解决方案',
  '方案优势',
  '典型案例'
];
</script>

<style scoped lang="less">
/* 添加根字体设置用于rem计算 */
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

.steel-advantages {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem; // 40px
  display: flex;
  justify-content: center;
}

.advantages-container {
  margin: 100px auto;
  max-width: 75rem; // 1200px
  width: 100%;
  display: flex;
  gap: 1.875rem; // 30px
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start; // 改为flex-start使文字靠左
  align-items: center; // 确保顶部对齐
}

.advantage-content {
  flex: 1;
  display: inline-flex;
  justify-content: flex-start; // 修改为左对齐
  align-items: flex-start; // 确保顶部对齐
}

.advantage-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.card-row {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.advantage-card {
  width: 545px;
  height: 255px;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 25px;
    height: 25px;
  }
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.card-desc {
  color: #666;
  font-size: 15px;
  text-align: left;
  line-height: 1.6;
}

@media (max-width: 1200px) {
  .advantage-card {
    width: 100%;
    height: auto;
    min-height: 255px;
  }
  
  .card-row {
    flex-direction: column;
  }
}

@media (max-width: 992px) {
  .steel-advantages {
    padding: 20px;
  }

  .advantages-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
  }
}
</style> 