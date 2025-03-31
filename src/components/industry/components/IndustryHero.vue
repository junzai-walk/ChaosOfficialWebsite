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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

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

const handleConsult = () => {
  router.push({
    path: '/partners',
    query: { section: '3' }  // 跳转到合作伙伴页面的咨询部分
  })
}
</script>

<style scoped lang="less">
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
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 1));
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
  // padding-left: 10%;
  max-width: 610px;
  color: #ffffff;
  position: absolute;
  width: 951px;
  height: 308px;
  top: 315px;
  left: 472px;
  border-radius: 34px;
}

.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.title-line {
  width: 8px;
  height: 50px;
  background-color: #ffffff;
  margin-right: 15px;
}

.industry-title {
  font-size: 48px;
  font-weight: bold;
  line-height: 1.2;
  position: relative;
  white-space: nowrap;
}

.industry-desc {
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 35px;
  opacity: 0.9;
  letter-spacing: 0.5px;
  text-align: justify;
}

.button-container {
  text-align: left;
  margin-top: 100px;
}

.consult-button {
  font-size: 16px;
  padding: 12px 35px;
  background-color: #1890ff;
  border: none;
  transition: all 0.3s ease;
  border-radius: 50px;
}

.consult-button:hover {
  background-color: #40a9ff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .content {
    padding-left: 5%;
    padding-right: 5%;
  }

  .industry-title {
    font-size: 36px;
  }

  .industry-desc {
    font-size: 14px;
  }
}
</style>