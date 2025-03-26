<template>
  <div class="news-detail">
    <div class="detail-header"> 新闻动态 </div>
    <div class="detail-body">
      <div class="title">标题123</div>
      <div class="date">2025-03-04</div>
      <div class="content">
        <p class="text">112312312</p>
        <div class="img"></div>
        <p class="text">112312312</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,computed,defineProps} from 'vue'


const props = defineProps({
  newsId: {
    type: String,
    required: true
  },
});
const newsDetail = {
  1:{
    title:'标题',
    time:'2025.03.04',
  }
}
</script>

<style scoped lang="less">
.news-detail {
  box-sizing: border-box;
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: scroll;

  .detail-header {
    box-sizing: border-box;
    padding: 0 15rem;
    width: 100%;
    height: 10rem;
    background: url('@/assets/customer/bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    line-height: 7rem;
    display: flex;
    align-items: flex-start;
  }

  .detail-body {
    box-sizing: border-box;
    flex: 1;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 11.5rem;
    padding-top: 2rem;
    gap: 2rem;
    .title{
      font-weight: 700;
    }
    .date{
      font-size: 0.75rem;
      color: #bbb;
    }
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: left;
      .text{
        width: 100%;
        text-align: left;
      }
      .img{
        width: 35vw;
        height: 25vh;
        background: url('@/assets/customer/bg.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>