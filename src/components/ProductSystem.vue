<template>
  <div class="product-system">
    <h2 class="title">产品体系</h2>
    <p class="subtitle">以人工智能算法技术为核心驱动</p>
    <div class="system-content"></div>
  </div>
</template>

<script setup lang="ts">
// 无需特殊逻辑
</script>

<style scoped>
.product-system {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.system-content {
  width: 1295px;
  height: 575px;
  text-align: center;
  background: url('@/assets/03/Group_416.png') no-repeat center center;
  background-size: 100% 100%;
}

.title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 60px;
}

.product-diagram {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-icons {
  width: 100%;
  margin-bottom: 40px;
}

.icon-group {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1890ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.2);
}

.icon-text {
  font-size: 14px;
  color: #333;
}

.platform-diagram {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.platform-text {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 20px;
}

.platform-circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #1890ff 0%, #40a9ff 100%);
  position: relative;
  margin-bottom: 40px;
  box-shadow: 0 8px 24px rgba(24, 144, 255, 0.3);
}

.hardware-icons {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
}

.hardware-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.hardware-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
}

.hardware-item span {
  font-size: 14px;
  color: #666;
}

/* 添加动画效果 */
.icon-circle {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.icon-circle:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(24, 144, 255, 0.3);
}

.platform-circle {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(24, 144, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
  }
}
</style> 