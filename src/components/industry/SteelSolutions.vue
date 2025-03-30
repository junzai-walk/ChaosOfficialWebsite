<template>
  <div class="steel-solutions">
    <div class="solutions-container">
      <!-- 左侧导航栏 - 使用自定义组件 -->
      <div class="side-nav-container">
        <CustomNavSteps :width="120" :height="192" :steps="solutionSteps" v-model:activeStep="activeStep" />
      </div>

      <!-- 右侧内容区 -->
      <div class="solution-content">
        <!-- 顶部描述文本 -->
        <div class="solution-description">
          以超恩工业互联网平台为基座，融合数据驱法及AI实现全流程智能化化。通过智能硬件及智能应用赋能煤气管网、冷轧生产等核心场景，实现设备预测性维护、能效优化、工艺智能控制，助力钢铁企业降本增效、绿色转型。
        </div>

        <!-- 内容部分 -->
        <div class="solution-sections">
          <!-- 专项场景 -->
          <div class="solution-section scene-section">
            <div class="section-title">专项场景</div>
            <div class="scene-content">
              <div class="scene-tag-item">三废一体化设备管理</div>
              <div class="scene-tag-item">两废一体工艺优化</div>
              <div class="scene-tag-item">分解炉温度控制</div>
              <div class="scene-tag-item">垃圾发电</div>
            </div>
          </div>

          <!-- 智能应用 -->
          <div class="solution-section">
            <div class="section-title">智能应用</div>
            <div class="application-bar">
              <div class="app-item">设备预测性维护（PHM）</div>
              <div class="app-item">先进过程控制（APC）</div>
              <div class="app-item">能源管理（EMS）</div>
              <div class="app-item">......</div>
            </div>
          </div>

          <!-- 智能平台 -->
          <div class="solution-section platform-section">
            <div class="section-title section-title-big">智能平台</div>
            <div class="section-content platform-content">
              <div class="platform-row">
                <div class="platform-box">
                  <div class="platform-box-title">统一建模平台</div>
                  <div class="platform-box-content">
                    数据建模 | 机理建模 | 价值建模
                  </div>
                </div>
                <div class="platform-box">
                  <div class="platform-box-title">模型管理服务</div>
                  <div class="platform-box-content">
                    模型部署 | 模型验证
                  </div>
                </div>
                <div class="platform-box">
                  <div class="platform-box-title">统一建模平台</div>
                  <div class="platform-box-content">
                    数据对接 | 模型实时运算
                  </div>
                </div>
                <div class="platform-box">
                  <div class="platform-box-title">其它技术组件</div>
                  <div class="platform-box-content">
                    组态工具 | 资源工具 | ······
                  </div>
                </div>
              </div>

              <div class="platform-row database-row">
                <div class="platform-box database-box">
                  <div class="platform-box-content">
                    关系数据库
                  </div>
                </div>
                <div class="platform-box database-box">
                  <div class="platform-box-content">
                    时序数据库
                  </div>
                </div>
                <div class="platform-box database-box">
                  <div class="platform-box-content">
                    文件存储
                  </div>
                </div>
                <div class="platform-box database-box">
                  <div class="platform-box-content">
                    ······
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 数据采集 -->
          <div class="solution-section">
            <div class="section-title section-title-big">数据采集</div>
            <div class="section-content tags">
              <div class="tag-item">有线传感器</div>
              <div class="tag-item">边缘智能采集器</div>
              <div class="tag-item">无线智能网关</div>
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

const activeStep = ref(2); // 默认显示解决方案

const solutionSteps = [
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

.steel-solutions {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem; // 40px
  display: flex;
  justify-content: center;
}

.solutions-container {
  max-width: 75rem; // 1200px
  width: 100%;
  display: flex;
  gap: 1.875rem; // 30px
  margin: 100px auto; // 添加水平居中
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start; // 改为flex-start使文字靠左
  align-items: center; // 确保顶部对齐
}

.solution-content {
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start; // 修改为顶部对齐
  align-items: flex-start; // 确保左对齐
}

.solution-description {
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  margin-bottom: 20px;
}

.solution-sections {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.solution-section {
  display: flex;
  background-color: #e8f4ff;
  border-radius: 10px;
  padding: 20px;
}

.section-title {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #466cb7;
  font-size: 16px;
  font-weight: bolder;

  &.section-title-big {
    align-items: center;
  }
}

.section-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  background-color: #fff;
  color: #333;
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: #1890ff;
    box-shadow: 0 2px 6px rgba(24, 144, 255, 0.15);
  }
}

/* 平台架构相关样式 */
.platform-section {
  .section-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}

.platform-row {
  display: flex;
  gap: 12px;
  width: 100%;
}

.platform-box {
  flex: 1;
  background-color: #4b84c4;
  color: #fff;
  border-radius: 4px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 10px rgba(75, 132, 196, 0.2);
  }
}

.platform-box-title {
  background-color: #4b84c4;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.platform-box-content {
  padding: 12px;
  font-size: 13px;
  background-color: #fff;
  color: #666;

  .platform-box & {
    background-color: #4b84c4;
    color: #fff;
    opacity: 0.9;
  }
}

.database-row {
  margin-top: 5px;
}

.database-box {
  background-color: #fff;
  border: 1px solid #e0e0e0;

  .platform-box-content {
    background-color: #fff;
    color: #333;
    text-align: center;
  }
}

/* 响应式设计 */
@media (max-width: 992px) {
  .steel-solutions {
    padding: 20px;
  }

  .solutions-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    flex-shrink: 0;
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
  }
}

/* 专项场景特殊样式 */
.scene-section {
  display: flex;
  background-color: #eaf4ff !important;
}

.scene-content {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}

.scene-tag-item {
  background-color: #fff;
  color: #1890ff;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
  flex: 1;
  min-width: 120px;
  text-align: center;
  border: 1px solid #1890ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f8f8ff;
    box-shadow: 0 2px 6px rgba(24, 144, 255, 0.2);
  }
}

/* 智能应用样式 */
.application-bar {
  display: flex;
  width: 100%;
  background-color: #e6f0ff;
  border-radius: 4px;
  overflow: hidden;
}

.app-item {
  flex: 1;
  padding: 12px 15px;
  text-align: center;
  color: #1864ab;
  font-size: 14px;
  background-color: #e6f0ff;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
}

.app-item:last-child {
  border-right: none;
}

.app-item:hover {
  background-color: #d0e1f9;
}
</style>