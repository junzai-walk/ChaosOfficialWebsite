<template>
  <div class="default-layout">
    <app-header />
    <div class="cushion"></div>
    <div class="page-content">
      <router-view></router-view>
    </div>
    <floating-menu />
    <!-- 全局固定左侧导航 -->
    <global-nav-steps />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
import GlobalNavSteps from '@/components/GlobalNavSteps.vue'
</script>

<style scoped>
.default-layout {
  width: 100%;
  height: 100%;
}

.cushion {
  height: 70px;
}

.page-content {
  width: 100%;
  height: calc(100% - 70px);
}
</style>