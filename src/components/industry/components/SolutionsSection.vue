<template>
  <div class="solutions-section">
    <div class="solutions-container">
      <!-- 左侧导航栏 - 已隐藏，使用全局导航 -->
      <!-- <div class="side-nav-container">
        <CustomNavSteps
          :width="120"
          :height="192"
          :steps="navSteps"
          :active-step="activeStep"
          :section-numbers="sectionNumbers"
          @update:active-step="updateActiveStep"
        />
      </div> -->

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

<script lang="ts">
export default {
  name: 'SolutionsSection'
}
</script>

<script setup lang="ts">
// import { ref } from 'vue';
// import CustomNavSteps from './CustomNavSteps.vue';

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

// 当前活动步骤 - 已注释，使用全局导航
// const activeStep = ref(props.defaultActiveStep);

// const updateActiveStep = (newStep: number) => {
//   activeStep.value = newStep;
// };
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;

}

.solutions-section {
  width: 100%;
  min-height: 100%;
  background-color: #f5f7fa;
  padding: 2.5rem;
  display: flex;
  justify-content: center;
}

.solutions-container {
  max-width: 83rem;
  width: 100%;
  display: flex;
  gap: 1.875rem;
  margin: 6.25rem auto;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.solution-content {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 图片容器样式 */
.solution-image-container {
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
  gap: 1.25rem;
}

.solution-description {
  font-size: 1.125rem;
  line-height: 1.8;
  font-weight: 400;
  color: #333;
  text-align: justify;
}

.solution-sections {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.solution-section {
  display: flex;
  background-color: #e8f4ff;
  border-radius: 0.625rem;
  padding: 1.25rem;
}

.section-title {
  width: 6.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
  font-size: 1rem;
  font-weight: 500;

  &.section-title-big {
    align-items: center;
  }
}

.section-content {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-item {
  background-color: #fff;
  color: #333;
  padding: 0.5rem 0.9375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: #1890ff;
    box-shadow: 0 0.125rem 0.375rem rgba(24, 144, 255, 0.15);
  }
}

/* 平台架构相关样式 */
.platform-section {
  .section-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}

.platform-row {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.platform-box {
  flex: 1;
  background-color: #4b84c4;
  color: #fff;
  border-radius: 0.25rem;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0.25rem 0.625rem rgba(75, 132, 196, 0.2);
  }
}

.platform-box-title {
  background-color: #4b84c4;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-bottom: 0.0625rem solid rgba(255, 255, 255, 0.2);
}

.platform-box-content {
  padding: 0.75rem;
  font-size: 0.8125rem;
  background-color: #fff;
  color: #666;

  .platform-box & {
    background-color: #4b84c4;
    color: #fff;
    opacity: 0.9;
  }
}

.database-row {
  margin-top: 0.3125rem;
}

.database-box {
  background-color: #fff;
  border: 0.0625rem solid #e0e0e0;

  .platform-box-content {
    background-color: #fff;
    color: #333;
    text-align: center;
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
  gap: 0.9375rem;
  width: 100%;
}

.scene-tag-item {
  background-color: #fff;
  color: #1890ff;
  padding: 0.75rem 0.9375rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  cursor: pointer;
  flex: 1;
  min-width: 7.5rem;
  text-align: center;
  border: 0.0625rem solid #1890ff;
  box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f8f8ff;
    box-shadow: 0 0.125rem 0.375rem rgba(24, 144, 255, 0.2);
  }
}

/* 智能应用样式 */
.application-bar {
  display: flex;
  width: 100%;
  background-color: #e6f0ff;
  border-radius: 0.25rem;
  overflow: hidden;
}

.app-item {
  flex: 1;
  padding: 0.75rem 0.9375rem;
  text-align: center;
  color: #1864ab;
  font-size: 0.875rem;
  background-color: #e6f0ff;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 0.0625rem solid rgba(255, 255, 255, 0.5);
}

.app-item:last-child {
  border-right: none;
}

.app-item:hover {
  background-color: #d0e1f9;
}

/* 媒体查询 - 适配不同分辨率 */
/* 响应式设计 - 平板和移动设备 */
</style>