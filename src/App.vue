<script setup lang="ts">
import ScreenAdapter from '@/components/common/ScreenAdapter.vue'
</script>

<template>
  <div class="app-wrapper">
    <ScreenAdapter>
      <router-view />
    </ScreenAdapter>
  </div>
</template>

<style>
/* 全局样式，确保 body 没有边距并铺满全屏 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #fff; /* 设置为白色以匹配项目主题 */
}

#app {
  width: 100%;
  height: 100%;
}

.app-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
