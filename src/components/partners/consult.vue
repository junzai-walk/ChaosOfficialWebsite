<template>
  <div class="benchmark-cases">
    <!-- 上方背景图 -->
    <div class="background-header">
      <div class="title">
        <div class="main-title">立即成为凯奥思数据伙伴
        </div>
      </div>
    </div>

    <div class="consult-container">
      <div class="cases-content">
        <!-- 图片展示区 -->
        <div class="consult-showcase">
          <div class="consult-rows" :style="{ transform: `translateX(-${currentPage * 50}%)` }">
            <el-form :model="form" label-position="right" label-width="6.25rem">
              <el-form-item label="姓名：">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="手机号码：" >
                <el-input v-model="form.phone" />
              </el-form-item>
              <el-form-item label="公司：">
                <el-input v-model="form.company" />
              </el-form-item>
              <el-form-item label="合作意向：" >
                <el-input v-model="form.remark" />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span style="font-size: 1rem;">联系电话：18652002566</span>
      </div>
    </div>
    <!-- 添加底部填充区域 -->
    <div class="background-footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['recruit']);
const currentPage = ref(0);

const form = ref({
  name:'',
  phone:'',
  company:'',
  remark:''
})

</script>

<style scoped lang="less">
// 根字体大小设置，用于rem计算
html {
  font-size: 16px;

  // 1920*1080分辨率适配
  @media (min-width: 1920px) {
    font-size: 16px;
  }

  // 1366*768分辨率适配
  @media (max-width: 1366px) {
    font-size: calc(16px * (1366 / 1920));
  }

  // 其他分辨率适配
  @media (max-width: 1440px) and (min-width: 1367px) {
    font-size: calc(16px * (1440 / 1920));
  }

  @media (max-width: 1280px) and (min-width: 993px) {
    font-size: calc(16px * (1280 / 1920));
  }
}

.benchmark-cases {
  position: relative;
  width: 100%;
  background-color: #f5f7fa;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
}

/* 上方背景图 */
.background-header {
  box-sizing: border-box;
  padding-top: 10rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 40vh;
  background: url('@/assets/partners/Group 46.png') no-repeat center center;
  background-size: 100% 100%;
  margin-bottom: 1.25rem;
  margin-top: 4rem;
  display: flex;
  justify-content: center;

  .main-title {
    color: #000;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
}

.consult-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  max-width: 75rem;

  .main-title {
    width: 100%;
    font-size: 2rem;
    font-weight: 700;
    text-align: start;
    margin-bottom: 5rem;
  }
}

.side-nav-container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.cases-content {
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* 图片展示区域 */
.consult-showcase {
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.consult-rows {
  box-sizing: border-box;
  padding: 2rem 1rem;
  width: 30%;
  height: 18rem;
  background-color: #fff;
  transition: transform 0.5s ease;
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: flex-start !important;
}

// 1920*1080分辨率适配
@media (min-width: 1920px) {
  .consult-rows {
    width: 30%;
    height: 18rem;
  }
}

@media (max-width: 1400px) {
  .consult-page {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .consult-card {
    width: calc(25% - 0.9375rem);
  }
}

@media (max-width: 992px) {
  .benchmark-cases {
    padding: 0;
  }

  .consult-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    max-width: 18.75rem;
    margin-bottom: 1.25rem;
  }

  .consult-page {
    flex-wrap: wrap;
  }

  .consult-card {
    width: calc(50% - 0.625rem);
  }

  .consult-rows {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .consult-card {
    width: 100%;
  }

  .consult-rows {
    width: 80%;
    padding: 1.5rem 0.75rem;
  }

  .background-header {
    padding-top: 8rem;
    
    .main-title {
      font-size: 1.5rem;
    }
  }
}

@media (max-width: 1366px) {

.consult-rows {
  width: 40%;
  height: 23rem;

 :deep(.el-form-item__label) {
    font-size: 1rem !important;
  }
}
}

/* 底部背景补充 */
.background-footer {
  background-color: #f5f7fa;
  height: 5rem;
  width: 100%;
}
</style>