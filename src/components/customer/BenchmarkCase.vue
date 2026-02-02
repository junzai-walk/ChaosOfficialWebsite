<template>
  <div class="benchmark-cases">
    <!-- 上方背景图 -->
    <div class="background-header"></div>

    <div class="cases-container">
      <div class="cases-content">
        <!-- 标题 -->
         <div class="main-title">
          标杆案例
         </div>
        <!-- 图片展示区 -->
        <div class="case-showcase">
          <div class="case-cards" :style="{ transform: `translateX(-${currentPage * 50}%)` }">
            <!-- 第一页的8个图片 -->
            <div class="case-page">
              <div class="case-card" v-for="it in caseList1" :key="it.id" @click="handleSelectCard(it.id)">
                <div class="case-image"  :style="{ backgroundImage: `url(${it.imgUrl})`  }"></div>
                <div class="case-info">
                  <h3>{{it.mainTitle}}</h3>
                  <span>{{it.subTitle}}</span>
                  <p>{{it.industry}}</p>
                </div>
              </div>
            </div>
            <!-- 第二页的4图片 -->
            <div class="case-page">
              <div class="case-card" v-for="it in caseList2" :key="it.id" @click="handleSelectCard(it.id)"> 
                <div class="case-image" :style="{ backgroundImage: `url(${it.imgUrl})`  }"></div>
                <div class="case-info">
                  <h3>{{it.mainTitle}}</h3>
                  <span>{{it.subTitle}}</span>
                  <p>{{it.industry}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 导航按钮 -->
        <div class="navigation-buttons">
          <button @click="prevPage" :disabled="currentPage === 0" class="nav-button">
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </button>
          <button @click="nextPage" :disabled="currentPage === 1" class="nav-button">
            <el-icon>
              <ArrowRight />
            </el-icon>
          </button>
        </div>
      </div>
    </div>
    <!-- 添加底部填充区域 -->
    <div class="background-footer"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BenchmarkCase'
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import Img1 from '@/assets/customer/Rectangle 4136.png'
import Img2 from '@/assets/customer/Rectangle 4136-2.png'
import Img3 from '@/assets/customer/Rectangle 4136-4.png'
import Img4 from '@/assets/customer/Rectangle 4136-6.png'
import Img5 from '@/assets/customer/Rectangle 4136-1.png'
import Img6 from '@/assets/customer/Rectangle 4136-3.png'
import Img7 from '@/assets/customer/Rectangle 4136-5.png'
import Img8 from '@/assets/customer/Rectangle 4136-10.png'
const emit = defineEmits(['selectActiveCard']);
const currentPage = ref(0);
const caseList1 = [
  {
    id:'baogangphm',
    mainTitle:'中国宝武钢铁集团有限公司',
    subTitle:'设备预测性维护与健康管理系统',
    industry:'钢铁',
    imgUrl:Img1
  },
  {
    id:'jingyephm',
    mainTitle:'敬业钢铁有限公司',
    subTitle:'设备预测性维护与健康管理系统',
    industry:'钢铁',
    imgUrl:Img3
  },
  {
    id:'hailuophm',
    mainTitle:'安徽海螺水泥股份有限公司',
    subTitle:'设备预测性维护与健康管理系统',
    industry:'水泥',
    imgUrl:Img2
  },
  {
    id:'jiaomeiphm',
    mainTitle:'山西焦煤集团有限责任公司',
    subTitle:'设备全生命周期管理系统',
    industry:'煤炭',
    imgUrl:Img6
  },
  {
    id:'basifuphm',
    mainTitle:'巴斯夫（中国）有限公司',
    subTitle:'设备预测性维护与健康管理系统',
    industry:'化工',
    imgUrl:Img4
  },
  {
    id:'fengtianphm',
    mainTitle:'广汽丰田汽车有限公司',
    subTitle:'设备预测性维护与健康管理系统',
    industry:'汽车',
    imgUrl:Img5
  },
  {
    id:'jiaomeieam',
    mainTitle:'山西焦煤集团有限责任公司',
    subTitle:'设备全生命周期管理系统',
    industry:'煤炭',
    imgUrl:Img6
  },
  {
    id:'tianchieam',
    mainTitle:'新疆天池能源有限责任公司',
    subTitle:'设备全生命周期管理系统',
    industry:'煤矿',
    imgUrl:Img7
  },

]
const caseList2 = [
  {
    id:'chaohuapc',
    mainTitle:'巢湖海螺水泥有限责任公司',
    subTitle:'先进过程控制系统',
    industry:'水泥',
    imgUrl:Img1
  },
  {
    id:'panjingapc',
    mainTitle:'安徽盘景水泥有限公司',
    subTitle:'设备预测性维护与健康管理系统',
    industry:'钢铁',
    imgUrl:Img2
  },
  {
    id:'jingyeapc',
    mainTitle:'敬业钢铁有限公司',
    subTitle:'先进过程控制系统',
    industry:'钢铁',
    imgUrl:Img3
  },
  {
    id:'baogangapc',
    mainTitle:'宝山钢铁股份有限公司',
    subTitle:'先进过程控制系统',
    industry:'钢铁',
    imgUrl:Img6
  },


]

const handleSelectCard = (id:Number|String|string)=>{
  emit('selectActiveCard',id)
}
// 上一页
const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

// 下一页
const nextPage = () => {
  if (currentPage.value < 1) {
    currentPage.value++;
  }
};
</script>

<style scoped lang="less">
// 根字体大小设置，用于rem计算
html {
  font-size: 16px;
  
  
  
}

.benchmark-cases {
  position: relative;
  width: 100%;
  background-color: #f5f7fa;
  padding: 0 ; /* 移除padding */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 改为flex-start而非center */
  min-height: 100%; /* 确保最小高度填满视口 */
}
/* 上方背景图 */
.background-header {
  position: absolute; 
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 20rem;
  background: url('@/assets/customer/Group453.png') no-repeat center center;
  background-size: 100% 100%;
  margin-bottom: 1.25rem;
  margin-top: 4rem;
}
.cases-container {
  position: relative;
  top: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  max-width: 75rem;
  padding: 0 1rem;
  .main-title {
    width: 100%;
    font-size: 2rem;
    font-weight: 700;
    text-align: start;
    margin-bottom: 3rem;
    color: #333;
  }
}

.side-nav-container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.cases-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}



/* 图片展示区域 */
.case-showcase {
  width: 100%;
  // height: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem; // 32px
}

.case-cards {
  display: flex;
  transition: transform 0.5s ease;
  width: 200%;
}

.case-page {
  display: flex;
  width: 50%;
  padding: 0 0.525rem;
  justify-content: space-between;
  gap: 1rem; // 20px
  flex-wrap: wrap;
}

.case-card {
  min-width: calc(25% - 1.25rem); // 15px
  height: 16rem; // 固定高度为320px
  background-color: #fff;
  border-radius: 0.5rem; // 8px
  overflow: hidden;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.case-image {
  height: 60%; // 固定图片区域高度为卡片的60%
  background: no-repeat center center;
  background-size: cover;
}

.case-info {
  box-sizing: border-box;
  padding: 0.8rem;
  padding-bottom: 0.4rem;
  height: 40%; // 固定信息区域高度为卡片的40%
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
}
.case-info .tag{
  width: 2.5rem;
  height: 1.5rem;
  margin: 0 auto;
  text-align: center;
  color: #3171FA;
  background-color: #E2E9FD;
}
.case-info h3 {
  font-size: 0.875rem; // 14px
  margin: 0 0 0.3125rem; // 5px
  color: #333;
}

.case-info span {
  font-size: 0.75rem; // 14px
  margin: 0;
  color: #666;
}
.case-info p{
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

/* 底部背景补充 */
.background-footer {
  background-color: #f5f7fa;
  height: 5rem; 
  width: 100%;
}
</style>