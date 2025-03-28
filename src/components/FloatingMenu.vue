<template>
  <div class="floating-menu">
    <div class="menu-item top" @click="handleScrollToTop">
      <img src="@/assets/fixed/Group_5.png" alt="Top" class="menu-icon">
    </div>
    <div class="menu-item service" @mouseenter="showServiceTooltip = true" @mouseleave="showServiceTooltip = false">
      <img src="@/assets/fixed/Group_6.png" alt="Service" class="menu-icon">
      <div class="tooltip" v-show="showServiceTooltip">在线客服</div>
    </div>
    <div class="menu-item phone" @mouseenter="showPhoneTooltip = true" @mouseleave="showPhoneTooltip = false">
      <img src="@/assets/fixed/Group_7.png" alt="Phone" class="menu-icon">
      <div class="tooltip" v-show="showPhoneTooltip">400-8375-7867</div>
    </div>
    <div class="menu-item qrcode" @mouseenter="showQRTooltip = true" @mouseleave="showQRTooltip = false">
      <img src="@/assets/fixed/Group_8.png" alt="QR Code" class="menu-icon">
      <div class="qr-tooltip" v-show="showQRTooltip">
        <img src="@/assets/fixed/wechat_code.jpg" alt="QR Code">
        <span>扫码关注我们</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'

const router = useRouter()
const showServiceTooltip = ref(false)
const showPhoneTooltip = ref(false)
const showQRTooltip = ref(false)

// 使用Pinia store代替inject
const sectionStore = useSectionStore()

const handleScrollToTop = () => {
  console.log('handleScrollToTop')
  //获取当前url的path
  const path = router.currentRoute.value.path

  router.push(path).then(() => {
    sectionStore.resetSection()
  })
}
</script>

<style scoped>
.floating-menu {
  position: fixed;
  right: 1.25rem;
  bottom: 6.25rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.menu-item {
  width: 3.125rem;
  height: 3.125rem;
  margin-top: 0.625rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.1);
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
  font-size: 0.75rem;
  margin-top: 0.125rem;
}

.menu-item .menu-icon {
  width: 3rem;
  height: 3rem;
}

/* 工具提示样式 */
.tooltip {
  position: absolute;
  right: 3.75rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 0.5rem 0.9375rem;
  border-radius: 0.25rem;
  white-space: nowrap;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  color: #333;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  right: -0.375rem;
  top: 50%;
  transform: translateY(-50%);
  border-width: 0.375rem;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
}

/* 二维码工具提示样式 */
.qr-tooltip {
  position: absolute;
  right: 3.75rem;
  bottom: -1.5625rem;
  background-color: #fff;
  padding: 0.625rem;
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.75rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.qr-tooltip img {
  width: 7.5rem;
  height: 7.5rem;
  margin-bottom: 0.5rem;
}

.qr-tooltip span {
  font-size: 0.75rem;
  color: #666;
}

.qr-tooltip::after {
  content: '';
  position: absolute;
  right: -0.375rem;
  top: 50%;
  transform: translateY(-50%);
  border-width: 0.375rem;
  border-style: solid;
  border-color: transparent transparent transparent #fff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-0.625rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style> 