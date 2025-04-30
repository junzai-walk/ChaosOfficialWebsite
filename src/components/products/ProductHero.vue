<template>
  <div class="product-hero" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <button class="experience-btn" @click="handleConsult">预约体验</button>
    </div>

    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog v-model:visible="consultDialogVisible" @submit="handleConsultSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ConsultDialog from '@/components/common/ConsultDialog.vue'
import { ref } from 'vue';
const router = useRouter()

defineProps({
  backgroundImage: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

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
  
  @media (max-width: 1470px) {
    font-size: 14px;
  }
}

.product-hero {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  background-color: #f0f8ff;
  position: relative;
}

.product-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.content {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.title {
  position: absolute;
  top: 19.3125rem;
  left: 50%;
  transform: translateX(-50%);
  height: 5.25rem;
  font-size: 3.75rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.experience-btn {
  position: absolute;
  top: 30.875rem;
  left: 53.75rem;
  width: 12.5rem;
  height: 3.5rem;
  background-color: rgba(0, 114, 255, 1);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-size: 1.25rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.experience-btn:hover {
  background-color: #0066cc;
}

/* 媒体查询 - 适配不同分辨率 */
@media (min-width: 1920px) {
  .title {
    top: 19.3125rem;
    font-size: 3.75rem;
  }
  
  .experience-btn {
    top: 30.875rem;
    left: 53.75rem;
    width: 12.5rem;
    height: 3.5rem;
    font-size: 1.25rem;
  }
}

@media (max-width: 1470px) {
  .title {
    top: 16rem;
    font-size: 3rem;
    height: 4.5rem;
  }
  
  .experience-btn {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10rem;
    height: 3rem;
    font-size: 1.125rem;
    padding: 0.6rem 1.75rem;
  }
}

@media (max-width: 992px) {
  .title {
    top: 12rem;
    font-size: 2.5rem;
  }
  
  .experience-btn {
    top: 20rem;
    left: 50%;
    transform: translateX(-50%);
    width: 10rem;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    position: relative;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 90%;
    white-space: normal;
  }
  
  .experience-btn {
    position: relative;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 15rem;
  }
}

@media (max-width: 576px) {
  .title {
    font-size: 1.75rem;
    top: 25%;
  }
  
  .experience-btn {
    top: 35%;
    height: 2.75rem;
    font-size: 1rem;
  }
}
</style> 