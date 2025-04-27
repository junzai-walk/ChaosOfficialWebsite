<template>
  <div class="industry-hero">
    <div class="background-image" :style="{ backgroundImage: `url(${backgroundImage})` }"></div>
    <div class="content-wrapper">
      <div class="content">
        <div class="title-container">
          <div class="title-line"></div>
          <h1 class="industry-title">{{ title }}</h1>
        </div>
        <p class="industry-desc">{{ description }}</p>
        <div class="button-container">
          <el-button type="primary" size="large" round class="consult-button" @click="handleConsult">立即咨询</el-button>
        </div>
      </div>
    </div>

    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog v-model:visible="consultDialogVisible" @submit="handleConsultSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ConsultDialog from '@/components/common/ConsultDialog.vue'

const router = useRouter()

// 定义咨询表单数据类型
interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

defineProps({
  backgroundImage: {
    type: null,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const consultDialogVisible = ref(false)

const handleConsult = () => {
  consultDialogVisible.value = true
}

const handleConsultSubmit = (formData: ConsultFormData) => {
  console.log('提交的咨询表单数据：', formData)
  // 这里可以添加表单提交到服务器的逻辑
}
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;
  
  @media (max-width: 1500px) {
    font-size: 14px;
  }
}

.industry-hero {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  z-index: 1;
  filter: drop-shadow(0 0 0.625rem rgba(0, 0, 0, 1));
}

.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  max-width: 56.875rem;
  color: #ffffff;
  position: absolute;
  width: 59.4375rem;
  height: 19.25rem;
  top: 14.6875rem;
  left: 29.5rem;
  border-radius: 2.125rem;
}

.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5625rem;
}

.title-line {
  width: 0.5rem;
  height: 3.125rem;
  background-color: #ffffff;
  margin-right: 0.9375rem;
}

.industry-title {
  font-size: 3.75rem;
  font-weight: bold;
  line-height: 1.2;
  position: relative;
  white-space: nowrap;
}

.industry-desc {
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 2.1875rem;
  opacity: 0.9;
  letter-spacing: 0.03125rem;
  text-align: justify;
}

.button-container {
  text-align: left;
  margin-top: 6.25rem;
}

.consult-button {
  font-size: 1rem;
  padding: 0.3rem 1rem;
  background-color: #1890ff;
  border: none;
  transition: all 0.3s ease;
  border-radius: 3.125rem;
}

.consult-button:hover {
  background-color: #40a9ff;
  transform: translateY(-0.1875rem);
  box-shadow: 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.2);
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .content {
    top: 14.6875rem;
    left: 29.5rem;
    width: 59.4375rem;
    height: 19.25rem;
  }
  
  .industry-title {
    font-size: 3.75rem;
  }
  
  .button-container {
    margin-top: 6.25rem;
  }
  
  .consult-button {
    padding: 0.75rem 2.1875rem;
  }
}

@media (max-width: 1500px) {
  .content {
    top: 10rem;
    left: 20rem;
    width: 42rem;
    height: 16rem;
  }
  
  .title-container {
    margin-bottom: 1.25rem;
  }
  
  .title-line {
    height: 2.5rem;
  }
  
  .industry-title {
    font-size: 2.8rem;
  }
  
  .industry-desc {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
  
  .button-container {
    margin-top: 4rem;
  }
  
  .consult-button {
    width: 10rem;
    font-size: 1rem;
    padding: 0.6rem 1.8rem;
  }
}

@media (max-width: 1000px) {
  .content {
    padding-left: 5%;
    padding-right: 5%;
    position: relative;
    width: 90%;
    height: auto;
    top: 0;
    left: 0;
    margin: 0 auto;
  }

  .industry-title {
    font-size: 2.25rem;
  }

  .industry-desc {
    font-size: 0.875rem;
  }
  
  .button-container {
    margin-top: 3rem;
  }
}
</style>