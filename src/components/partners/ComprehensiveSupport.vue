<template>
  <div class="comprehensive-support">
    <div class="header-title">我们为合作伙伴提供全方位支持</div>
    <div class="support-row">
      <div
        v-for="(card, index) in cards"
        :key="index"
        :class="['support-card', { active: activeIndex === index }]"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave"
        :style="{ backgroundImage: `url(${card.background})` }"
      >
        <div class="card-overlay"></div>
        <div class="text">
          <div class="main-title">{{ card.mainTitle }}</div>
          <div class="sub-title">{{ card.subTitle }}</div>
        </div>
      </div>
    </div>
    <!-- 添加底部填充区域 -->
    <div class="background-footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Img1 from '@/assets/partners/Block-12.png'
import Img2 from '@/assets/partners/Block-12-2.png'
import Img3 from '@/assets/partners/Block-12-3.png'
import Img4 from '@/assets/partners/Block-12-1.png'

const emit = defineEmits(['selectActiveCard']);
const currentPage = ref(0);

const cards = ref([
  { background: Img1, mainTitle: '长期技术支持' ,subTitle:'提供工业智能化领域成熟的技术、产品与解决方案，覆盖项目全流程需求。专业团队全程协助解决实际问题，帮助合作伙伴快速掌握技术要点，保障项目顺利落地。'},
  { background: Img2, mainTitle: '专项培训体系',subTitle:'系统的在线培训+现场培训，包括且不限于营销培训、产品培训、售前培训、实施服务培训、项目管理培训等，帮助伙伴提高能力素质。'},
  { background: Img3, mainTitle: '市场营销推广',subTitle:'共享产品介绍、行业趋势报告、成功案例等实用宣传物料，协同开展线上线下活动推广，有效提高品牌影响离及合作成功率。'},
  { background: Img4, mainTitle: '合作保障政策',subTitle:'实行区域专属合作机制，维护市场良性发展。提供灵活的分成模式与销售激励方案，并为新合作伙伴配备专项启动支持，助力市场开拓'},
]);

const activeIndex = ref(0); // 默认第一个卡片是 active

const handleMouseEnter = (index:any) => {
  activeIndex.value = index; // 设置当前卡片为 active
};

const handleMouseLeave = () => {
  activeIndex.value = 0; // 鼠标离开时恢复第一个卡片为 active
};

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

.comprehensive-support {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  background-color: #f5f7fa;
  padding: 0 ; /* 移除padding */
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 改为flex-start而非center */
  min-height: 100vh; /* 确保最小高度填满视口 */
  .header-title{
    width: 100%;
    height:8rem ;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:2rem ;
    font-weight: 700;
  }
  .support-row{
    box-sizing: border-box;
    padding: 10rem;
    padding-top: 0;
    flex: 1;
    display: flex;
    // justify-content: space-between;
    gap: 30px;
    .support-card {
      flex: 1;
      height: 30rem;
      border-radius: 25px;
      background-size: cover;
      background-position: center;
      transition: flex 0.3s ease, box-shadow 0.3s ease;
      position: relative;
      overflow: hidden;
      display: grid; /* 启用 Grid 布局 */
      place-items: center;
      text-align: left;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      // border: 1px solid rgba(255, 255, 255, 0.2);

      .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // background: rgba(255, 255, 255, 0.85);
        z-index: 1;
        transition: background 0.3s ease;
      }

      &:hover {
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      }
    }

    .support-card.active {
      flex: 2;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

      .card-overlay {
        background: rgba(255, 255, 255, 0.3);
      }
    }

    .support-card .text {
      box-sizing: border-box;
      padding: 0 3rem;
      color: #000;
      opacity: 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 2;
      transform: translateY(10px);
      .main-title{
        width: 100%;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.8rem;
        opacity: 1  !important;
      }
      .sub-title{
        line-height: 1.3;
        opacity: 1  !important;
      }
    }

    .support-card.active .text {
      opacity: 1;
      transform: translateY(0);
    }

    .support-card:hover {
      flex: 2;
    }
    .support-card:hover.text {
      opacity: 0.1;
    }
    .support-card:hover .text {
      opacity: 1;
      transform: translateY(0);
    }
  }
}



@media (max-width: 1400px) {
  .partner-page {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .partner-card {
    width: calc(25% - 0.9375rem); // 15px
  }
}

@media (max-width: 992px) {
  .comprehensive-support {
    padding: 0;
  }

  .partner-container {
    flex-direction: column;
    align-items: center;
  }

  .side-nav-container {
    width: 100%;
    max-width: 18.75rem; // 300px
    margin-bottom: 1.25rem; // 20px
  }

  .partner-page {
    flex-wrap: wrap;
  }

  .partner-card {
    width: calc(50% - 0.625rem); // 10px
  }
}

@media (max-width: 1000px) {
  .partner-card {
    width: 100%;
  }
}

/* 底部背景补充 */
.background-footer {
  background-color: #f5f7fa;
  height: 5rem;
  width: 100%;
}
</style>