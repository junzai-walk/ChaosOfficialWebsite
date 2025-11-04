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

//这样引入，打包后服务器可识别
import honor1 from '@/assets/about/01.jpg'
import honor2 from '@/assets/about/02.jpg'
import honor3 from '@/assets/about/03.jpg'
import honor4 from '@/assets/about/04.jpg'
import honor5 from '@/assets/about/05.jpg'
import honor6 from '@/assets/about/06.jpg'
import honor7 from '@/assets/about/07.jpg'
import honor8 from '@/assets/about/08.jpg'

const honorCard = [
  { imgUrl: honor1, name: '国家高新技术企业', },
  { imgUrl: honor2, name: '江苏省专精特新企业' },
  { imgUrl: honor3, name: '江苏省最具成长潜力的留学人员创业企业' },
  { imgUrl: honor4, name: '江苏省工业互联网发展示范企业 \n (工业互联网平台类 )' },
  { imgUrl: honor5, name: '2023年新一代信息技术与制造业融合发展示范' },
  { imgUrl: honor6, name: '江苏省工业软件优秀产品和应用解决方案', },
  { imgUrl: honor7, name: '第五届"i 创杯"互联网创新创业大赛二等奖' },
  { imgUrl: honor8, name: '2021第三届中国工业互联网大赛三等奖' },
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
    font-size: 2.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .honor-row {
    display: flex;
    align-items: flex-start; /* Change from center to flex-start to align at the top */
    gap: 2rem;
    width: 100%;
    height: auto; /* Change from fixed height to auto */
    margin-top: 1.25rem;
    flex-wrap: wrap;
    .honor-card {
      box-sizing: border-box;
      width: 22%;
      height: auto; /* Change from fixed height to auto */
      min-height: 12rem; /* Add min-height to maintain minimum size */
      display: flex;
      flex-direction: column;
      align-self: stretch; /* Ensure all cards in a row have the same height */
      .honor-img{
        width: 100%;
        height: 12rem; /* Set a fixed height for all images */
        object-fit: contain;
        background-position: center;
        background-blend-mode: overlay;
        flex: 0 0 auto; /* Don't allow flex to change the size */
      }
      .honor-name {
        margin-top: 1rem;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 3rem; /* Change from fixed height to min-height */
        font-size: 0.875rem;
        color: #aaa;
        line-height: 1.3;
        white-space: pre-line;
        text-align: center; /* Ensure text is centered */
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