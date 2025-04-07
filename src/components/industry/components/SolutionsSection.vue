<template>
  <div class="solutions-section">
    <div class="solutions-container">
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

      <div class="solution-content-container">
        <!-- 顶部描述文本 -->
        <div class="solution-description">{{ description }}</div>
        <!-- 右侧内容区 -->
        <div class="solution-content">

          <!-- 内容部分 -->
          <div class="solution-sections" v-if="!showImage">
            <!-- 专项场景 -->
            <div class="solution-section scene-section" v-if="specialScenes && specialScenes.length > 0">
              <div class="section-title">{{ specialScenes[0] }}</div>
              <div class="scene-content">
                <div v-for="(scene, index) in specialScenes.slice(1)" :key="index" class="scene-tag-item">
                  {{ scene }}
                </div>
              </div>
            </div>

            <!-- 智能应用 -->
            <div class="solution-section" v-if="applications && applications.length > 0">
              <div class="section-title">{{ applications[0] }}</div>
              <div class="application-bar">
                <div v-for="(app, index) in applications.slice(1)" :key="index" class="app-item">
                  {{ app }}
                </div>
              </div>
            </div>

            <!-- 智能平台 -->
            <div class="solution-section platform-section" v-if="platformData && platformData.mainPlatforms.length > 0">
              <div class="section-title section-title-big">智能平台</div>
              <div class="section-content platform-content">
                <div class="platform-row">
                  <div v-for="(platform, index) in platformData.mainPlatforms" :key="index" class="platform-box">
                    <div class="platform-box-title">{{ platform.title }}</div>
                    <div class="platform-box-content">
                      {{ platform.content }}
                    </div>
                  </div>
                </div>

                <div class="platform-row database-row" v-if="platformData.databases && platformData.databases.length > 0">
                  <div v-for="(db, index) in platformData.databases" :key="index" class="platform-box database-box">
                    <div class="platform-box-content">
                      {{ db }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 数据采集 -->
            <div class="solution-section" v-if="dataCollectionMethods && dataCollectionMethods.length > 0">
              <div class="section-title section-title-big">数据采集</div>
              <div class="section-content tags">
                <div v-for="(method, index) in dataCollectionMethods" :key="index" class="tag-item">
                  {{ method }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 显示图片 -->
        <div class="solution-image-container" v-if="showImage">
          <img :src="imageSrc" alt="解决方案图片" class="solution-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomNavSteps from './CustomNavSteps.vue';

// 定义组件属性
const props = withDefaults(defineProps<{
  navSteps: string[];
  description?: string;
  specialScenes?: string[];
  applications?: string[];
  showImage?: boolean;
  imageSrc?: string;
  platformData?: {
    mainPlatforms: Array<{ title: string; content: string }>;
    databases: string[];
  };
  dataCollectionMethods?: string[];
  defaultActiveStep?: number;
  sectionNumbers?: number[];
}>(), {
  defaultActiveStep: 2,
  showImage: false,
  description: '',
  specialScenes: () => [],
  applications: () => [],
  platformData: () => ({
    mainPlatforms: [],
    databases: []
  }),
  dataCollectionMethods: () => []
});

// 当前活动步骤
const activeStep = ref(props.defaultActiveStep);

const updateActiveStep = (newStep: number) => {
  activeStep.value = newStep;
};
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

.solutions-section {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem; // 40px
  display: flex;
  justify-content: center;
}

.solutions-container {
  max-width: 83rem; // 1200px
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
  // flex: 1;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start; // 修改为顶部对齐
  align-items: flex-start; // 确保左对齐
}

/* 图片容器样式 */
.solution-image-container {
  // flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
}

.solution-image {
  width: 80%;
  max-height: 100%;
  object-fit: contain;
}

.solution-content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.solution-description {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
  text-align: justify;
  // margin-bottom: 20px;
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
  color: #1890ff;
  font-size: 16px;
  font-weight: 500;

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
  .solutions-section {
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
  background-color: #dfeafd !important;
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