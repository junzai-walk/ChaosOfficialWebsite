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
                全面国产化：凯奥思PHM系统深度融合DeepSeek，让设备运维更智能
              </div>
              <div class="content-sub-title">
                凯奥思PHM系统深度融合DeepSeek，全面实现国产化
              </div>
              <div class="time">
                2025.2.25
              </div>
            </div>
            <div class="content-main-action" @click="handleNews('news1')">
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
          <div class="hotpot-row" v-for="item in hotpotList" @click="handleNews(item.id)">
            <div class="hotpot-title">{{ item.mainTitle }}</div>
            <div class="hotpot-time">{{item.date}}</div>
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
  // { id: 'news1', imgUrl: '/src/assets/news/01 封面图.jpeg', mainTitle: '全面国产化：凯奥思PHM系统深度融合DeepSeek，让设备运维更智能', subTitle: '凯奥思PHM系统深度融合DeepSeek，全面实现国产化', date: '2025.2.25' },
  { id: 'news2', imgUrl: '/src/assets/news/cover1.jpg', mainTitle: 'AA级！ 凯奥思数据获智能制造系统解决方案供应商分类分级评定', subTitle: '南京凯奥思数据技术有限公司获评集成实施类认定（AA级）以及运行维护类认定（A级）', date: '2025.01.08' },
  { id: 'news3', imgUrl: '/src/assets/news/cover1.jpg', mainTitle: '喜报！凯奥思数据荣登南京企业技术中心培育库', subTitle: '南京凯奥思数据技术有限公司正式入选南京市工业和信息化局公布的《南京企业技术中心培育库（2024年度）》名单', date: '2025.1.2' },
  { id: 'news4', imgUrl: '/src/assets/news/image1.png', mainTitle: '实力见证！凯奥思数据“设备预  测性维护与健康管理系统2.0”又获两项重量级认证', subTitle: '“设备预测性维护与健康管理系统2.0”获全国首批应用软件国产化等级认证及2024苏商数实融合先锋企业案例认证', date: '2024.12.23' },
  { id: 'news5', imgUrl: '/src/assets/news/image11.png', mainTitle: '凯奥思数据荣膺“首批数据要素价值创新示范基地” ，加速释放数据资产价值', subTitle: '南京凯奥思数据技术有限公司荣获“首批数据要素价值创新示范基地”称号', date: '2024.12.5' },
  { id: 'news6', imgUrl: '/src/assets/news/image14.png', mainTitle: '凯奥思数据精彩亮相2024中国（西安）国际采矿展 助力煤矿智能化发展', subTitle: '凯奥思数据携煤矿智能化产品及解决方案亮相2024中国（西安）国际采矿展', date: '2024.10.30' },
  { id: 'news7', imgUrl: '/src/assets/news/cover2.jpeg', mainTitle: '激发数据资产潜力，“数据资产驱动未来 创新实践交流论坛”圆满举办', subTitle: '凯奥思数据承办“数据资产驱动未来 创新实践交流论坛”,促进释放数据要素价值和市场潜力。', date: '2024.9.2' },
  { id: 'news8', imgUrl: '/src/assets/news/image22.png', mainTitle: '授信1000万！南京市民营科技企业首笔数据资产融资突破', subTitle: '凯奥思数据通过数据资产成功获得1000万元的融资授信', date: '2024.8.14' },
  { id: 'news9', imgUrl: '/src/assets/news/image1.png', mainTitle: '夯实数据要素：凯奥思数据引领南京市民营科技企业数据资产入表先河', subTitle: '凯奥思数据成为首家南京市民营科技企业数据资产入表的企业', date: '2024.7.1' },
])
const hotpotList =[
  { id: 'news1', mainTitle: '全面国产化：凯奥思PHM系统深度融合DeepSeek，让设备运维更智能', date: '2025.2.25' },
  { id: 'news4', mainTitle: '实力见证！凯奥思数据“设备预测性维护与健康管理系统2.0”又获两项重量级认证', date: '2024.12.23' },
  { id: 'news8', mainTitle: '授信1000万！南京市民营科技企业首笔数据资产融资突破', date: '2024.8.14' },
  { id: 'news9', mainTitle: '夯实数据要素：凯奥思数据引领南京市民营科技企业数据资产入表先河', date: '2024.7.1' },

]
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
    background: url('@/assets/news/Block-12.png') no-repeat center center;
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
          background-image: url('/src/assets/news/image4.png');
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