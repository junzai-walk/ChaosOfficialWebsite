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
              <el-form-item label="企业名称：">
                <el-input v-model="form.company" />
              </el-form-item>
              <el-form-item label="合作意向：" >
                <el-input v-model="form.wish" />
              </el-form-item>
              <el-button type="primary" @click="handleSubmit" :loading="loading">提交</el-button>
            </el-form>
          </div>
        </div>
        <span style="font-size: 1rem;">联系电话：025-83132381</span>
      </div>
    </div>
    <!-- 添加底部填充区域 -->
    <div class="background-footer"></div>

      <!-- 使用新的Footer组件 -->
    <div class='footer-wrapper'>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { submitCooperationForm } from '@/api/consult'
import { ElMessage } from 'element-plus'
import Footer from '@/components/common/Footer.vue'

const emit = defineEmits(['recruit']);
const currentPage = ref(0);
const loading = ref(false)

const form = ref({
  name:'',
  phone:'',
  company:'',
  wish:''
})

const handleSubmit = async () => {
  // 验证手机号码格式
  const phoneRegex = /^(1[3-9]\d{9}|0\d{2,3}-\d{7,8})$/
  if (!form.value.company) {
    ElMessage.warning('请输入企业名称')
    return
  }
  if (!form.value.name) {
    ElMessage.warning('请输入姓名')
    return
  }
  if (!form.value.phone) {
    ElMessage.warning('请输入手机号')
    return
  }
  if (!phoneRegex.test(form.value.phone)) {
    ElMessage.warning('请输入正确的手机号码格式')
    return
  }

  loading.value = true

  try {
    // 提交表单数据到服务器
    const response = await submitCooperationForm(form.value)
    if (response.success) {
      ElMessage.success(response.message)
    } else {
      ElMessage.error(response.message)
    }

    loading.value = false
    form.value = {
      name: '',
      phone: '',
      company: '',
      wish: ''
    }

  } catch (error) {
    console.error('表单提交失败:', error)
    ElMessage.error('提交失败，请稍后重试')
  }
}
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

  .footer-wrapper {
    position: absolute;
    bottom: 0rem;
    width: 100%;

    :deep(.footer){
      padding: 2.5rem 0 1rem 0 !important;
    }
  }
}

/* 上方背景图 */
.background-header {
  box-sizing: border-box;
  padding-top: 4rem;
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
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

  :deep(.el-button) {
    width: 30%;
    height: 2rem;
    font-size: 1rem;
    margin-top: 0rem;
    margin-left: 2.5rem;
    border-radius: 6rem;
  }
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
  padding: 2rem 0rem 2rem 3rem;

 :deep(.el-form-item__label) {
    font-size: 1rem !important;
  }

  :deep(.el-input__inner) {
    font-size: 1rem;
    height: 2rem;
  }

  :deep(.el-button) {
    width: 30%;
    height: 2.5rem;
    font-size: 1rem;
    margin-top: -1rem;
    margin-left: 2.5rem;
    border-radius: 6rem;
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