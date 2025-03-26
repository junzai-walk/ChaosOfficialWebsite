<template>
  <div class="news-detail">
    <div class="detail-header"> 新闻动态 </div>
    <div class="detail-body">
      <div class="title">标题123</div>
      <div class="date">2025-03-04</div>
      <div class="content">
        <p class="text">在青峰叠嶂的峡谷间，银龙般的江河奔涌不息，梯级水电站犹如镶嵌在山河经脉上的能量枢纽，它们不仅是能源的重要来源，更是区域经济发展的命脉。</p>
        <div class="img"></div>
        <p class="text">“你看，实时水位、发电负荷、水情预报等一目了然!”在某大型梯级流域集控中心内，工作人员轻点鼠标，远在几千米外的10余座小水电站宛若比邻，实现了“弹钢琴”式的智慧运维。这里，是水电站的心脏地带，也是水位管理的主战场。过去，这里的工作却充满了困难和挑战“我们以前主要依靠人工经验开展水位控制和负荷调节，但这种方式存在着明显的局限性，容易造成弃水风险。此外，梯级电站群之间的协同调度也是一大难题，由于信息沟通不畅，难以形成有效联动，导致资源浪费。更令人担忧的是，洪涝预警与泄洪决策往往依赖于经验判断，给水电站的安全运行带来重重风险。</p>
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
        line-height: 1.5;
      }
      .img{
        margin: 1.5rem 0;
        width: 35vw;
        height: 25vh;
        background: url('@/assets/customer/bg.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>