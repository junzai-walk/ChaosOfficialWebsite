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

<style scoped>
.product-hero {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  background-color: #f0f8ff; /* 浅蓝色背景，如果背景图加载失败 */
  position: relative;
}

.product-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.233); /* 淡白色蒙版 */
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
  top: 309px;
  left: 50%;
  transform: translateX(-50%);
  height: 84px;
  font-size: 60px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
}

.experience-btn {
  position: absolute;
  top: 494px;
  left: 860px;
  width: 200px;
  height: 56px;
  background-color: rgba(0, 114, 255, 1);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.experience-btn:hover {
  background-color: #0066cc;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    position: relative;
    top: 30%;
    left: 10%;
  }
  
  .experience-btn {
    position: relative;
    top: 40%;
    left: 10%;
  }
}
</style> 