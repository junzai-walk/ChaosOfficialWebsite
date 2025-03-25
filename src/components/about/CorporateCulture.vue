<template>
  <div class="corporate-culture">
    <div class="main-title">凯奥思数据 工业智能服务商</div>
    <!-- <div class="statistic-row">
      <div class="statistic-card" v-for="(card, index) in statisticCard" :key="index">
        <el-statistic :value="card.value" value-style="color:#2961FA;font-size:2rem;">
          <template #suffix>
            <span style="color:#2961FA;font-size:0.75rem;font-weight: 700;">{{ card.suffix || '+' }} </span>
          </template>
</el-statistic>
<div class="statistic-name">{{ card.name }}</div>
</div>
</div> -->

    <!-- 数据统计展示 -->
    <div class="stats-container">
      <div class="stat-item" v-for="(card, index) in statisticCard" :key="index">
        <div class="stat-number blue">
          {{ card.value }}<span class="plus">{{ card.suffix || '+' }}</span>
        </div>
        <div class="stat-desc">{{ card.name }}</div>
      </div>
    </div>
    <div class="company-desc">
      <p>凯奥思数据（CHAOS DATA）是国内专业的工业智能服务商，专注工业智能，以边缘计算、工业大数据、先进控制和运筹优化等人工智能算法技术为核心驱动，为工业企业提供智慧运维、能源管理、工业控制、供应链优化等服务。</p>
      <p>基于海归技术团队在全球上百个项目应用经验，覆盖钢铁、水泥、化工、煤炭、汽车、新能源等行业，打造更加智能、安全、经济的工业产品和解决方案，助力工业企业智能化升级。</p>
    </div>
    <div class="second-title">企业文化</div>
    <div class="company-culture">
      <div class="culture-card" v-for="(card, index) in cultureCard" :key="index">
        <div class="card-icon">
          <img :src="card.imgUrl" />
        </div>
        <div class="card-title">{{ card.title }}</div>
        <div class="card-desc">
          {{ card.desc }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import energy from '@/assets/industry/icon-energy.png'
const statisticCard = [
  { value: 15, name: '工业智能服务经验', suffix: '年+' },
  { value: 1000, name: '核心算法' },
  { value: 15, name: '行业覆盖' },
  { value: 200, name: '合作客户' },
]
const cultureCard = [
  { imgUrl: energy, title: '愿景', desc: '让工业更智能' },
  { imgUrl: energy, title: '使命', desc: '客户需求驱动，用数据技术为客户创造最大价值，不断提升中国工业智能化水平。' },
  { imgUrl: energy, title: '价值观', desc: '客户价值、结果导向、自我批判、工匠精神、团队合作、诚实守信。' },
]

</script>

<style scoped lang="less">
.corporate-culture {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem 18rem 0 18rem;
  background-image: url('/src/assets/customer/bg.png');
  /* 替换为实际背景图片 */
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;

  .main-title,
  .second-title {
    font-weight: 700;
    font-size: 1.5rem;
  }

  /* 数据统计样式 */
  .stats-container {
    display: flex;
    width: 100%;
    height: 5rem;
    flex-wrap: wrap;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    gap: 10rem;

    .stat-item {
      text-align: center;

      .stat-number {
        font-size: 40px;
        font-weight: bold;
        margin-bottom: 10px;
        line-height: 1;
        position: relative;
        /* 添加字体平滑效果 */
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .stat-number.blue {
        color: #1890ff;
      }

      .plus {
        font-size: 20px;
        position: relative;
        top: -10px;
      }

      .stat-desc {
        font-size: 16px;
        color: #666;
      }
    }
  }
  .statistic-row {
    display: flex;
    align-items: center;
    gap: 10rem;
    width: 100%;
    height: 5rem;
    margin-top: 1.25rem;

    .statistic-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .statistic-name {
        margin-top: 0.5rem;
        font-size: 0.75rem;
        color: #aaa;
      }
    }
  }

  .company-desc {
    color: #aaa;
    text-align: left;
    line-height: 1.3;
    font-size: 0.75rem;
  }

  .second-title {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .company-culture {
    display: flex;
    height: 15rem;
    width: 100%;
    justify-content: space-between;

    .culture-card {
      box-sizing: border-box;
      padding: 0.75rem;
      height: 100%;
      width: 30%;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: space-around;
      background-color: #fff;
      border-radius: 15px;

      .card-icon {
        width: 60px;
        height: 60px;
        background-color: #E2EEFE;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;

        img {
          width: 30px;
          height: 30px;
        }
      }

      .card-title {
        font-weight: 700;
      }

      .card-desc {
        display: flex;
        text-align: left;
        font-size: 0.75rem;
        color: #666;
        line-height: 1.3;
      }
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
  }
}
</style>