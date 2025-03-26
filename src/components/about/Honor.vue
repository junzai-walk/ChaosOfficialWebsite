<template>
  <div class="honor">
    <div class="main-title">重要荣誉</div>
    <div class="honor-row">
      <div class="honor-card" v-for="(card, index) in honorCard" :key="index">
        <img class="honor-img" :src="card.imgUrl" alt="">
        <div class="honor-name">{{ card.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const honorCard = [
  { imgUrl: '/src/assets/about/01 国家高新技术企业.png', name: '国家高新技术企业', },
  { imgUrl: '/src/assets/about/02 江苏省专精特新企业.png', name: '江苏省专精特新企业' },
  { imgUrl: '/src/assets/about/03 江苏省最具成长潜力的留学人员创业企业.png', name: '江苏省最具成长潜力的留学人员创业企业' },
  { imgUrl: '/src/assets/about/04 江苏省工业互联网发展示范企业（工业互联网平台类）.png', name: '江苏省工业互联网发展示范企业(工业互联网平台类 )' },
  { imgUrl: '/src/assets/about/05 2023年新一代信息技术与制造业融合示范.jpg', name: '2023年新一代信息技术与制造业融合发展示范' },
  { imgUrl: '/src/assets/about/06 江苏省工业软件优秀产品和应用解决方案.png', name: '江苏省工业软件优秀产品和应用解决方案', },
  { imgUrl: '/src/assets/about/07 第五届“i 创杯”互联网创新创业大赛二等奖.png', name: '第五届“i 创杯”互联网创新创业大赛二等奖' },
  { imgUrl: '/src/assets/about/08 2021第三届中国工业互联网大赛三等奖.png', name: '2021第三届中国工业互联网大赛三等奖' },
]


</script>

<style scoped lang="less">
.honor {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem 18rem 0 18rem;
  background-color: #fff;
  .main-title {
    font-weight: 700;
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .honor-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    width: 100%;
    height: 5rem;
    margin-top: 1.25rem;
    flex-wrap: wrap;
    .honor-card {
      box-sizing: border-box;
      width: 22%;
      height: 12rem;
      display: flex;
      flex-direction: column;
      .honor-img{
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        background-blend-mode: overlay;
        flex: 1;
      }
      .honor-name {
        margin-top: 0.5rem;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 3rem;
        font-size: 0.75rem;
        color: #aaa;
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