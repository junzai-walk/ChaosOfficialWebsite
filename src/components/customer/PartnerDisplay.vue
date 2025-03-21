<template>
  <div class="partner">
    <div class="main-title">以数据算法携手全球200+工业领跑者驱动每一次精准决策</div>
    <div class="partner-image"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


</script>

<style scoped lang="less">
// 根字体大小设置，用于rem计算
html {
  font-size: 16px;
  
  @media (min-width: 1920px) {
    font-size: calc(16px * (1920 / 1920));
  }
  
  @media (max-width: 1440px) {
    font-size: calc(16px * (1440 / 1920));
  }
  
  @media (max-width: 1280px) {
    font-size: calc(16px * (1280 / 1920));
  }
}

.partner {
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 改为flex-start而非center */
  min-height: 100vh; /* 确保最小高度填满视口 */
  .main-title{
    box-sizing: border-box;
    width: 100%;
    height: 320px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 120px;
    font-size: 24px;
    font-weight: 700;
  }
  .partner-image{
    width: 100%;
    height: calc(100vh - 320px);
    overflow: hidden;
    position: relative;
 
  }
  .partner-image::before{
    content: "";
    background: url('@/assets/customer/bg.png') no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>