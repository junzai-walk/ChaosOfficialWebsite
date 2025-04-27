<template>
  <div class="product-hardware-sensor">
    <!-- 左侧背景图案 -->
    <div class="background-pattern">
      <img :src="backgroundImage" alt="背景图案" class="background-image" />
    </div>

    <!-- 中间内容区域 -->
    <div class="content-container">
      <h1 class="title">{{ title }}</h1>

      <!-- 添加值和单位显示 -->
      <div class="sensor-info-list" v-if="content.some(item => item.value)">
        <div v-for="(item, index) in content" :key="index" class="sensor-info-item">
          <img class="check-icon" src="@/assets/products/hardware-yes.png" alt="勾选图标" />
          <span class="info-title">{{ item.title }}</span>
          <span class="info-value" v-if="item.value">{{ item.value }}</span>
          <span class="info-unit" v-if="item.unit">{{ item.unit }}</span>
        </div>
      </div>

      <div class="sensor-list" v-else>
        <div v-for="(item, index) in content" :key="index"
          :class="['sensor-item', { 'sensor-item-no-model': !item.model }]">
          <img class="check-icon" src="@/assets/products/hardware-yes.png" alt="勾选图标" />
          <span class="item-title">{{ item.title }}</span>
          <div class="item-line" v-if="item.model"></div>
          <span class="item-model" v-if="item.model">{{ item.model }}</span>
        </div>
      </div>


      <div class="action-button" @click="handleConsult">
        产品咨询
      </div>
    </div>

    <!-- 右侧图片 -->
    <ProductRightImages :mainImage="mainImage" :secondaryImage="secondaryImage" mainAlt="主图" secondaryAlt="辅助图" />
    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog v-model:visible="consultDialogVisible" @submit="handleConsultSubmit" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import ConsultDialog from '@/components/common/ConsultDialog.vue'
import ProductRightImages from '@/components/products/ProductRightImages.vue';


const router = useRouter()

interface SensorContent {
  title: string;
  model?: string;
  value?: string;
  unit?: string;
  highlight?: boolean;
}

defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Array as PropType<SensorContent[]>,
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  secondaryImage: {
    type: String,
    required: true
  }
});

interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

const consultDialogVisible = ref(false)

const handleConsult = () => {
  consultDialogVisible.value = true
}

const handleConsultSubmit = (formData: ConsultFormData) => {
  console.log('提交的咨询表单数据：', formData)
  // 这里可以添加表单提交到服务器的逻辑
}
</script>

<style lang="less" scoped>
:root {
  /* 基准字体大小，1920px宽度下为16px */
  font-size: 16px;
}

.product-hardware-sensor {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 左侧背景图案
  .background-pattern {
    position: absolute;
    width: 41.076rem;
    height: 42.49rem;
    top: 5.9375rem;
    left: -9.662rem;
    opacity: 0.5;
    transform: rotate(-52.37deg);

    .background-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  // 中间内容区域
  .content-container {
    position: absolute;
    width: 37.6875rem;
    height: 26.25rem;
    top: 14.9375rem;
    left: 19.625rem;
    z-index: 2;

    .title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-weight: 600;
      font-size: 2.25rem;
      color: #333;
      margin-bottom: 2rem;
      text-align: left;
    }

    .sensor-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2.5rem;

      .sensor-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        .check-icon {
          width: 0.875rem;
          height: 0.75rem;
          flex-shrink: 0;
          margin-right: 0.75rem;
          transform: translateY(0.1875rem);
        }

        &.sensor-item-no-model {
          justify-content: flex-start;
          align-items: flex-start;
        }

        .item-title {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 1.125rem;
          color: #333;
          flex: 0.8;
          text-align: left;
          white-space: nowrap;
        }

        .item-line {
          flex: 1;
          height: 0.0625rem;
          background-color: #E5E5E5;
          margin: 0 0.9375rem;
        }

        .item-model {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 1.125rem;
          color: #333;
          text-align: right;
          flex: 0.8;
        }
      }
    }

    /* 新添加的值和单位显示样式 */
    .sensor-info-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2.5rem;

      .sensor-info-item {
        display: flex;
        align-items: center;
        position: relative;

        .check-icon {
          width: 0.875rem;
          height: 0.75rem;
          flex-shrink: 0;
          margin-right: 0.75rem;
          transform: translateY(0.1875rem);
        }

        .info-title {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 1.125rem;
          color: #333;
          margin-right: 0.5rem;
        }

        .info-value {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 3rem;
          font-weight: bold;
          color: #0072FF;
          margin-right: 0.25rem;
          transform: translateY(-0.625rem);
        }

        .info-unit {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 1.125rem;
          color: #333;
        }
      }
    }

    .action-button {
      width: 12.5rem;
      height: 3.5rem;
      background-color: #0072FF;
      border-radius: 1.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 1.125rem;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0058cc;
      }
    }
  }

  :deep(.right-images .main-image-container) {
    width: 52.5rem !important;
    height: 43.125rem !important;
    top: 7.5rem !important;
    right: 2.5rem !important;
  }
}

/* 媒体查询 - 1920*1080分辨率 */
@media (max-width: 1920px) {
  :root {
    font-size: 16px;
  }
}

/* 媒体查询 - 1500*1000分辨率 */
@media (max-width: 1500px) {
  :root {
    font-size: 11.38px; /* 16px * (1500/1920) = ~11.38px */
  }
}
</style>