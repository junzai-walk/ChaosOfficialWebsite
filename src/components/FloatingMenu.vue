<template>
  <div class="floating-menu">
    <div class="menu-item top" @click="handleScrollToTop">
      <el-icon><Top /></el-icon>
      <span class="label">TOP</span>
    </div>
    <div class="menu-item service" @mouseenter="showServiceTooltip = true" @mouseleave="showServiceTooltip = false">
      <el-icon><Service /></el-icon>
      <div class="tooltip" v-show="showServiceTooltip">在线客服</div>
    </div>
    <div class="menu-item phone" @mouseenter="showPhoneTooltip = true" @mouseleave="showPhoneTooltip = false">
      <el-icon><Phone /></el-icon>
      <div class="tooltip" v-show="showPhoneTooltip">400-8375-7867</div>
    </div>
    <div class="menu-item qrcode" @mouseenter="showQRTooltip = true" @mouseleave="showQRTooltip = false">
      <el-icon><PictureFilled /></el-icon>
      <div class="qr-tooltip" v-show="showQRTooltip">
        <img src="@/assets/qrcode.png" alt="QR Code">
        <span>扫码关注我们</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { Top, Service, Phone, PictureFilled } from '@element-plus/icons-vue'

const showServiceTooltip = ref(false)
const showPhoneTooltip = ref(false)
const showQRTooltip = ref(false)

// 获取父组件的 currentSection
const currentSection = inject('currentSection', ref(0))

const handleScrollToTop = () => {
  // 如果在首页，直接设置 currentSection 为 0
  if (window.location.pathname === '/') {
    currentSection.value = 0
  } else {
    // 如果不在首页，使用路由导航到首页
    window.location.href = '/'
  }
}
</script>

<style scoped>
.floating-menu {
  position: fixed;
  right: 20px;
  bottom: 100px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.menu-item {
  width: 50px;
  height: 50px;
  margin-top: 10px;
  background-color: #fff;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.menu-item:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}

.menu-item.top {
  display: flex;
  flex-direction: column;
  background-color: #1890ff;
  color: #fff;
}

.menu-item.top:hover {
  background-color: #40a9ff;
  color: #fff;
}

.menu-item .label {
  font-size: 12px;
  margin-top: 2px;
}

.menu-item :deep(.el-icon) {
  font-size: 20px;
}

/* 工具提示样式 */
.tooltip {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 8px 15px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
}

/* 二维码工具提示样式 */
.qr-tooltip {
  position: absolute;
  right: 60px;
  bottom: -25px;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.qr-tooltip img {
  width: 120px;
  height: 120px;
  margin-bottom: 8px;
}

.qr-tooltip span {
  font-size: 12px;
  color: #666;
}

.qr-tooltip::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style> 