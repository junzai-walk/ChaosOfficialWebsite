<template>
  <div class="partners-page">
    <app-header />
    <div class="content">
      <h1>合作伙伴</h1>
      <p>这里是合作伙伴的内容...</p>
      <!-- 在此添加更多页面内容 -->
    </div>
    <floating-menu />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import FloatingMenu from '@/components/FloatingMenu.vue'
</script>

<style scoped>
.partners-page {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  margin: 0 auto;
  padding: 90px 20px 20px; /* 顶部留出导航高度 */
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}
</style>