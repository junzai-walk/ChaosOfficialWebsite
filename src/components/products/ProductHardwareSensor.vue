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

      <div class="sensor-list" v-else="content.length > 0">
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
import ProductRightImages  from '@/components/products/ProductRightImages.vue';


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
.product-hardware-sensor {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 左侧背景图案
  .background-pattern {
    position: absolute;
    width: 657.22px;
    height: 679.84px;
    top: 95px;
    left: -154.59px;
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
    width: 603px;
    height: 420px;
    top: 239px;
    left: 314px;
    z-index: 2;

    .title {
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-weight: 600;
      font-size: 36px;
      color: #333;
      margin-bottom: 32px;
      text-align: left;
    }

    .sensor-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-bottom: 40px;

      .sensor-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        .check-icon {
          width: 14px;
          height: 12px;
          flex-shrink: 0;
          margin-right: 12px;
          transform: translateY(3px);
        }

        &.sensor-item-no-model {
          justify-content: flex-start;
          align-items: flex-start;
        }

        .item-title {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 18px;
          color: #333;
          flex: 0.8;
          text-align: left;
          white-space: nowrap;
        }

        .item-line {
          flex: 1;
          height: 1px;
          background-color: #E5E5E5;
          margin: 0 15px;
        }

        .item-model {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 18px;
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
      gap: 24px;
      margin-bottom: 40px;

      .sensor-info-item {
        display: flex;
        align-items: center;
        position: relative;

        .check-icon {
          width: 14px;
          height: 12px;
          flex-shrink: 0;
          margin-right: 12px;
          transform: translateY(3px);
        }

        .info-title {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 18px;
          color: #333;
          margin-right: 8px;
        }

        .info-value {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 48px;
          font-weight: bold;
          color: #0072FF;
          margin-right: 4px;
          transform: translateY(-10px);
        }

        .info-unit {
          font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
          font-size: 18px;
          color: #333;
        }
      }
    }

    .action-button {
      width: 200px;
      height: 56px;
      background-color: #0072FF;
      border-radius: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-family: 'Alibaba PuHuiTi 3.0', sans-serif;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0058cc;
      }
    }
  }

  @media (max-width: 1920px) {
    .background-pattern {
      width: calc(657.22px * 100vw / 1920);
      height: calc(679.84px * 100vw / 1920);
      top: calc(95px * 100vw / 1920);
      left: calc(285.41px * 100vw / 1920);
    }

    .content-container {
      width: calc(603px * 100vw / 1920);
      height: calc(420px * 100vw / 1920);
      top: calc(239px * 100vw / 1920);
      left: calc(314px * 100vw / 1920);

      .title {
        font-size: calc(36px * 100vw / 1920);
        margin-bottom: calc(32px * 100vw / 1920);
      }

      .sensor-list,
      .sensor-info-list {
        gap: calc(24px * 100vw / 1920);
        margin-bottom: calc(40px * 100vw / 1920);
      }

      .sensor-list .sensor-item {
        .check-icon {
          width: calc(14px * 100vw / 1920);
          height: calc(12px * 100vw / 1920);
          margin-right: calc(12px * 100vw / 1920);
        }

        .item-title,
        .item-model {
          font-size: calc(18px * 100vw / 1920);
        }

        .item-line {
          margin: 0 calc(15px * 100vw / 1920);
        }
      }

      .sensor-info-list .sensor-info-item {
        .check-icon {
          width: calc(14px * 100vw / 1920);
          height: calc(12px * 100vw / 1920);
          margin-right: calc(12px * 100vw / 1920);
        }

        .info-title {
          font-size: calc(18px * 100vw / 1920);
          margin-right: calc(8px * 100vw / 1920);
        }

        .info-value {
          font-size: calc(26px * 100vw / 1920);
          margin-right: calc(4px * 100vw / 1920);
        }

        .info-unit {
          font-size: calc(18px * 100vw / 1920);
        }
      }

      .action-button {
        width: calc(200px * 100vw / 1920);
        height: calc(56px * 100vw / 1920);
        border-radius: calc(28px * 100vw / 1920);
        font-size: calc(18px * 100vw / 1920);
      }
    }
  }

  :deep(.right-images .main-image-container) {
    width: 840px !important;
    height: 690px !important;
    top: 120px !important;
    right: 40px !important;
  }
}
</style>