<template>
  <div class="product-features">

    <!-- 右侧功能卡片区域 -->
    <div class="features-grid">
      <div class="feature-card" v-for="(feature, index) in features" :key="index">
        <div class="feature-icon">
          <img :src="feature.icon" alt="功能图标" />
        </div>
        <div class="feature-content">
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description" :title="feature.description">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  title: string;
  description: string;
  icon: string;
}

const props = defineProps<{
  features: Feature[];
}>();

// 移除了导航相关的代码，现在使用全局固定导航
</script>

<style scoped lang="less">
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;

}

.product-features {
  width: 100%;
  min-height: 100%;
  display: flex;
  background-color: white;
  padding: 14.375rem 0 0 11.6875rem;
  box-sizing: border-box;
  gap: 3.1875rem;
}

.side-nav-container {
  height: 70%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 26rem);
  grid-template-rows: repeat(2, 13.75rem);
  gap: 1.25rem;
  padding-left: 6.25rem;
}

.feature-card {
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 1rem;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 0.5rem 1.25rem rgba(0, 0, 0, 0.06), 0 0.125rem 0.375rem rgba(0, 0, 0, 0.02);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 0.0625rem solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0.375rem;
  opacity: 0.6;
  border-radius: 1rem 1rem 0 0;
}

.feature-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.625rem;
  right: 0.625rem;
  height: 0.0625rem;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  border-radius: 50%;
}

.feature-card:hover {
  transform: translateY(-0.5rem) scale(1.02);
  box-shadow: 0 1.25rem 1.875rem rgba(0, 0, 0, 0.1), 0 0.3125rem 0.9375rem rgba(0, 0, 0, 0.05);
  border: 0.0625rem solid rgba(255, 255, 255, 1);
}

.feature-card:hover .feature-icon {
  transform: translateY(-0.3125rem);
  box-shadow: 0.75rem 0.75rem 1.25rem rgba(174, 174, 192, 0.2), -0.75rem -0.75rem 1.25rem hsla(0, 0%, 100%, 0.8);
}

.feature-icon {
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  box-shadow: 0.5rem 0.5rem 1rem rgba(174, 174, 192, 0.18), -0.5rem -0.5rem 1rem hsla(0, 0%, 100%, 0.8);
  transition: all .4s cubic-bezier(.4, 0, .2, 1);
  position: relative;
  z-index: 1;
}

.feature-icon::before {
  content: '';
  position: absolute;
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 200, 160, 0.05) 0%, rgba(120, 200, 160, 0) 70%);
  z-index: -1;
}

.feature-icon img {
  width: 1.5rem;
  height: 1.5rem;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.1));
  object-fit: contain;
}

.feature-title {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 100%;
  margin-bottom: 0.75rem;
  color: #333;
  text-shadow: 0 0.0625rem 0.125rem rgba(255, 255, 255, 0.8);
}

.feature-description {
  font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #666;
  text-align: left;
  text-shadow: 0 0.0625rem 0.0625rem rgba(255, 255, 255, 0.5);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 媒体查询 - 适配不同分辨率 */
</style>