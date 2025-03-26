<template>
  <div class="news-box">
    <div class="news-header"> 新闻中心 </div>
    <div class="news-body">
      <div class="body-left">
        <div class="title">凯奥思资讯</div>
        <div class="main-news">
          <div class="main-news-left">
            <div class="news-left-content">
              <div class="content-main-title">
                激发数据资产潜力，“数据资产驱动未来 创新实践交流论坛”圆满举办
              </div>
              <div class="content-sub-title">
                “数据资产驱动未来 创新实践交流论坛”在南京云密城双创服务中心隆重举办。
              </div>
              <div class="time">
                2024-09-06 09:30:26
              </div>
            </div>
            <div class="content-main-action" @click="handleNews(99)">
              <div class="text">查看详情</div>
              <div class="icon">→</div>
            </div>
          </div>
          <div class="main-news-right"></div>
        </div>
        <div class="news-list">
          <div class="news-row" v-for="item in visibleNews" :key="item.id" @click="handleNews(item.id)">
            <div class="main-image" :style="{ backgroundImage: `url(${item.imgUrl})` }"></div>
            <div class="news-rows-content">
              <div class="rows-title">
                <div class="row-main-title">{{ item.mainTitle }}</div>
                <div class="row-sub-title">{{ item.subTitle }}</div>
              </div>
              <div class="rows-time">
                <div class="icon">↗</div>
                <div class="date">{{ item.date }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="button">
          <el-button @click="loadMore" v-if="hasMore">加载更多</el-button>
          <el-divider content-position="center" v-else>到底啦</el-divider>
        </div>
      </div>
      <div class="body-right">
        <div class="title">热点推荐</div>
        <div class="hotpot-list">
          <div class="hotpot-row" v-for="item in 9">
            <div class="hotpot-title">激发数据资产潜力，“数据资产驱动未来 创新实践交流论坛”圆满举办</div>
            <div class="hotpot-time">2024-12-31 08:30:59</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,computed,defineEmits} from 'vue'
const emit = defineEmits(['handleNews'])
const newsList = ref([
  { id: 1, imgUrl: '/src/assets/customer/bg.png', mainTitle: '“砥砺十年路，扬帆再起航”江苏华信自驾游活动圆满举行', subTitle: '最是一年春好处，不负韶光，不负青春', date: '2022-12-28' },
  { id: 2, imgUrl: '/src/assets/customer/bg.png', mainTitle: '2022江苏华信新春团拜会顺利召开', subTitle: '江苏华信科技有限公司2023年新春团拜会议今日顺利召开，公司总经理室、各业务公司负责人、及公司全体员工共同参加', date: '2022-12-20' },
  { id: 3, imgUrl: '/src/assets/customer/bg.png', mainTitle: '通信公司再获嘉奖-驻地网通信配套优质工程', subTitle: '“扬州未来之光”、"扬州悦隽花园”驻地网通信配套工程荣获2021年度优质工程奖项。', date: '2022-11-10' },
  { id: 4, imgUrl: '/src/assets/customer/bg.png', mainTitle: '沿海双碳产业园智能化项目顺利竣工', subTitle: '沿海双碳产业发展项目是射阳县整合碳汇资源，实施碳汇、开发监测、交易和其他应用的重要平台。', date: '2022-10-06' },
  { id: 5, imgUrl: '/src/assets/customer/bg.png', mainTitle: '市第九届政协科协、民盟界别委员一行赴我司考察交流', subTitle: '本次政协界别小组活动主题为“助力扬州中小信息技术企业的发展”。', date: '2022-07-13' },
  { id: 6, imgUrl: '/src/assets/customer/bg.png', mainTitle: '遇见最美初夏，集成公司小满出游', subTitle: '单丝不成线，独木不成林！同样的一块铁，可以锯融消损，也可以百炼成钢。', date: '2022-07-13' },
])
// 显示控制
const showCount = ref(5)
const pageSize = ref(5)

// 计算属性
const visibleNews = computed(() => {
  return newsList.value.slice(0, showCount.value)
})

const hasMore = computed(() => {
  return showCount.value < newsList.value.length
})

// 方法
const loadMore = () => {
  showCount.value = Math.min(showCount.value + pageSize.value, newsList.value.length)
}
const handleNews = (id:any)=>{
  emit('handleNews',id)
}
</script>

<style scoped lang="less">
.news-box {
  box-sizing: border-box;
  padding-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: scroll;

  .news-header {
    box-sizing: border-box;
    padding: 0 15rem;
    width: 100%;
    min-height: 10rem;
    background: url('@/assets/customer/bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    line-height: 7rem;
    display: flex;
    align-items: flex-start;
  }

  .news-body {
    box-sizing: border-box;
    flex: 1;
    width: 100vw;
    display: flex;
    padding: 0 11.5rem;
    padding-top: 2rem;
    gap: 2rem;

    .title {
      width: 100%;
      height: 3.5rem;
      background-color: #fff;
      text-align: left;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .body-left {
      flex: 1;
      height: 100%;

      .main-news {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: 12rem;
        margin-bottom: 2rem;

        .main-news-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 70%;
          height: 100%;

          .news-left-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            .content-main-title {
              font-size: 1rem;
              font-weight: 700;
              margin-bottom: 0.75rem;
            }

            .content-sub-title {
              font-size: 0.75rem;
              font-weight: 700;
              margin-bottom: 0.75rem;
              color: #bbb;
            }

            .time {
              font-size: 0.75rem;
              color: #bbb;
            }
          }

          .content-main-action {
            cursor: pointer;
            width: 4rem;
            padding: 0.5rem;
            background-color: #278AFA;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            color: #fff;
            font-size: 0.75rem;
          }
        }

        .main-news-right {
          flex: 1;
          height: 100%;
          background-image: url('/src/assets/customer/bg.png');
          background-size: cover;
          background-position: center;
          background-blend-mode: overlay;
        }
      }

      .news-list {
        min-height: 30vh;

        .news-row {
          display: flex;
          width: 100%;
          height: 7rem;
          margin-bottom: 1rem;
          cursor: pointer;

          .main-image {
            height: 100%;
            width: 12rem;
            margin-right: 2rem;
            background-size: cover;
            background-position: center;
            background-blend-mode: overlay;
          }

          .news-rows-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
            flex: 1;
            height: 100%;

            .rows-title {
              text-align: left;

              .row-main-title {
                font-weight: 700;
                margin-bottom: 0.75rem;
              }

              .row-sub-title {
                font-weight: 700;
                margin-bottom: 0.5rem;
                color: #bbb;
                font-size: 0.75rem;
              }
            }

            .rows-time {
              width: 100%;
              display: flex;
              justify-content: space-between;
              color: #bbb;
              font-size: 0.75rem;
            }
          }
        }
      }

      .button{
        margin-bottom: 1rem;
      }
    }

    .body-right {
      width: 30%;
      .hotpot-list{
        .hotpot-row{
          box-sizing: border-box;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #ccc;
          height: 5rem;
          text-align: left;
          margin-bottom: 0.75rem;
          .hotpot-title{
            font-weight: 700;
            margin-bottom: 0.75rem;
            line-height: 1.3;
          }
          .hotpot-time{
            font-weight: 700;
            font-size: 0.75rem;
            color: #aaa;
          }
        }
      }
    }
  }
}
</style>