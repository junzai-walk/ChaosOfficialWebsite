<template>
  <div class="product-hero" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <button class="experience-btn" @click="handleConsult">预约体验</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
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

const handleConsult = () => {
  console.log("点击跳转表单")
  router.push({
    path: '/partners',
    query: { section: '3' }  // 跳转到合作伙伴页面的咨询部分
  })
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
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.experience-btn {
  position: absolute;
  top: 494px;
  left: 860px;
  width: 200px;
  height: 56px;
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-size: 1rem;
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