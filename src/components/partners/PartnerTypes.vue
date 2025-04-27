<template>
  <div class="benchmark-cases">
    <!-- 上方背景图 -->
    <div class="background-header">
      <div class="title">
        <div class="main-title">合作伙伴
          <span style="color:#2984ED ;cursor: pointer;" @click="recruit">招募</span>
        </div>
        <div class="sub-title">聚势共生 生态共赢</div>
      </div>
    </div>

    <div class="partner-container">
      <div class="cases-content">
        <!-- 图片展示区 -->
        <div class="partner-showcase">
          <div class="partner-rows" :style="{ transform: `translateX(-${currentPage * 50}%)` }">
            <div class="partner-detail-card">
              <div class="card-icon">
                <img src="@/assets/partners/fluent-emoji_man-in-tuxedo-light.png" alt="销售合作伙伴" />
              </div>
              <div class="card-title">销售合作伙伴</div>
              <div class="card-desc">
                具备一定的营销能力及客户基础的伙伴，以代理经销和市场咨询、系统集成方式与凯奥思数据共同拓展销售渠道。
              </div>
            </div>
          </div>
          <div class="partner-rows" :style="{ transform: `translateX(-${currentPage * 50}%)` }">
            <div class="partner-detail-card">
              <div class="card-icon">
                <img src="@/assets/partners/fluent-emoji_man-pouting-light.png" alt="解决方案伙伴" />
              </div>
              <div class="card-title">解决方案伙伴</div>
              <div class="card-desc">
                深耕工业垂直行业，具备行业深度理解与客户资源，拥有技术或产品，联合开发行业定制化解决方案。
              </div>
            </div>
          </div>
          <div class="partner-rows" :style="{ transform: `translateX(-${currentPage * 50}%)` }">
            <div class="partner-detail-card">
              <div class="card-icon">
                <img src="@/assets/partners/fluent-emoji-flat_man-golfing-light.png" alt="战略合作伙伴" />
              </div>
              <div class="card-title">战略合作伙伴</div>
              <div class="card-desc">
                具有行业垂直影响力的品牌、企业、协会、高校、媒体等，与凯奥思数据强强联合，进行多方位合作。
              </div>
            </div>
          </div>
        
        </div>

      </div>
    </div>
    <!-- 添加底部填充区域 -->
    <div class="background-footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['recruit']);
const currentPage = ref(0);

const recruit = ()=>{
  emit('recruit',true)
}

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

.benchmark-cases {
  position: relative;
  width: 100%;
  background-color: #f5f7fa;
  padding: 0 ; /* 移除padding */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 改为flex-start而非center */
  min-height: 100vh; /* 确保最小高度填满视口 */
  // background: url("@/assets/partners/Group 45.png") no-repeat 100% 100% / cover;
}
/* 上方背景图 */
.background-header {
  box-sizing: border-box;
  padding-top: 5rem;
  position: absolute; 
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
  height: 52vh;
  background: url('@/assets/partners/Group 45.png') no-repeat center center;

  background-size: cover;
  margin-bottom: 1.25rem; // 20px
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  .main-title{
    color: #fff;
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .sub-title{
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
}
.partner-container {
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  max-width: 85rem; // 1200px
  .main-title{
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    text-align: start;
    margin-bottom: 5rem;
  }
}

.side-nav-container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.cases-content {
  flex: 1;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}



/* 图片展示区域 */
.partner-showcase {
  box-sizing: border-box;
  padding: 0.5rem;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem; // 32px
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.partner-rows {
  box-sizing: border-box;
  padding: 1rem;
  padding-top:3rem ;
  padding-bottom:3rem ;
  width: 30%;
  height: 20rem;
  background-color: #fff;
  transition: transform 0.5s ease;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  .partner-detail-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: space-around;
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
        width: 25px;
        height: 25px;
      }
    }
    .card-title{
      font-weight: 700;
      font-size: 24px;
    }
    .card-desc{
      display: flex;
      text-align: left;
      font-size: 15px;
      color: #666;
      line-height: 1.3;
    }
  }

}

.partner-page {
  display: flex;
  width: 50%;
  padding: 0 0.525rem;
  justify-content: space-between;
  gap: 1rem; // 20px
  flex-wrap: wrap;
}

.partner-card {
  width: calc(25% - 1.25rem); // 15px
  height: 12.5rem; // 260px
  background-color: #fff;
  border-radius: 0.5rem; // 8px
  overflow: hidden;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.partner-image {
  flex: 1;
  background: no-repeat center center;
  background-size:cover;
}

.partner-info {
  box-sizing: border-box;
  padding: 0.8rem;
  padding-bottom: 0.4rem;
  height: 43.5%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.partner-info .tag{
  width: 2.5rem;
  height: 1.5rem;
  margin: 0 auto;
  text-align: center;
  color: #3171FA;
  background-color: #E2E9FD;
}
.partner-info h3 {
  font-size: 0.875rem; // 14px
  margin: 0 0 0.3125rem; // 5px
  color: #333;
}

.partner-info span {
  font-size: 0.75rem; // 14px
  margin: 0;
  color: #666;
}
.partner-info p{
  width: 3rem;
  height: 1rem;
  font-size: 12px;
  border-radius: 0.25rem;
  line-height: 1rem;
  color: #3171FA;
  background-color: #E2E9FD;
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1.25rem; // 20px
  margin: 1.25rem 0 1.875rem; // 20px 0 30px
}

.nav-button {
  width: 2.5rem; // 40px
  height: 2.5rem; // 40px
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #f3f9ff;
  border-color: #1890ff;
  color: #1890ff;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .benchmark-cases {
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