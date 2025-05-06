<template>
  <div class="news-section">
    <h2 class="section-title">新闻资讯</h2>

    <!-- 主要内容区 -->
    <div class="content-container">
      <!-- 左侧新闻卡片 -->
      <div class="news-card" @click="handleNewsItemClick({id: 'news1', title: '全面国产化：凯奥思PHM系统深度融合DeepSeek，让设备运维更智能'})">
        <img src="@/assets/news/image4.png" alt="新闻图片" class="news-image">
        <div class="news-content">
          <h3>全面国产化：凯奥思PHM系统深度融合DeepSeek，让设备运维更智能</h3>
          <div class="news-content-p">
            <span>凯奥思PHM系统深度融合DeepSeek，全面实现国产化</span>
            <span>2025.02.25</span>
          </div>
        </div>
      </div>

      <!-- 右侧新闻列表 -->
      <div class="news-list">
        <div class="news-item" v-for="(item, index) in newsItems" :key="index" @click="handleNewsItemClick(item)">
          <div class="news-item-left">
            <!-- 左侧图片区域 -->
            <div class="news-item-image">
              <img :src="item.image" alt="新闻图片" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          </div>
          <div class="news-item-content">
            <h4>{{ item.title }}</h4>
            <p class="item-date">{{ item.date }}</p>
            <p v-for="(line, i) in item.description.split('...')" :key="i" class="news-item-content-p">
              {{ line }}{{ i < item.description.split('...').length - 1 ? '...' : '' }} </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <!-- 咨询区域 -->
      <div class="consultation-section">
        <h3 style="font-weight: bolder;">工业智能化升级，凯奥思数据与您同行</h3>
        <el-button type="primary" class="consult-btn" @click="handleConsult">
          马上咨询
        </el-button>
      </div>

      <!-- 使用新的Footer组件 -->
      <Footer />
    </div>

    <!-- 使用新的咨询弹窗组件 -->
    <ConsultDialog
      v-model:visible="consultDialogVisible"
      @submit="handleConsultSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import cover1 from '@/assets/home/cover1.jpg'
import cover2 from '@/assets/home/cover2.jpeg'
import { useRouter } from 'vue-router'
import ConsultDialog from '@/components/common/ConsultDialog.vue'
import Footer from '@/components/common/Footer.vue'

const router = useRouter()

// 定义咨询表单数据类型
interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

const newsItems = ref([
  {
    id: 'news2',
    title: 'AA级！ 凯奥思数据获智能制造系统解决方案供应商分类分级评定',
    description: '近日，工信部直属中国电子技术标准化研究院与智能制造系统解决方案供应商联盟，联合公布了智能制造系统解决方案供应商分类分级评定（第三批）结果。南京凯奥思数据技术有限公司获评集成实施类认定（AA级）以及运行维护类认定（A级）。',
    date: '2025.02.25',
    image: cover1
  },
  {
    id: 'news3',
    title: '喜报！凯奥思数据荣登南京企业技术中心培育库',
    description: '近日，南京凯奥思数据技术有限公司正式入选南京市工业和信息化局公布的《南京企业技术中心培育库（2024年度）》名单，标志着我司在技术创新和研发能力方面获得了政府部门的高度认可，为公司的未来发展注入了新的动力。',
    date: '2025.01.02',
    image: cover1
  },
  {
    id: 'news4',
    title: '实力见证！凯奥思数据"设备预测性维护与健康管理系统2.0"又获两项重量级认证',
    description: '12月20日，第六届江苏软件产业发展大会近日在南京隆重召开。大会以"创新驱动，智创未来"为主题，聚焦软件产业的创新发展和应用实践，吸引了众多行业专家、企业代表及政府领导参会。会议期间，与会者围绕软件产业的创新发展、国产化替代等议题进行了深入交流和探讨。',
    date: '2024.12.23',
    image: cover2
  }
])

const consultDialogVisible = ref(false)

const handleConsult = () => {
  consultDialogVisible.value = true
}

const handleConsultSubmit = (formData:ConsultFormData) => {
  console.log('提交的咨询表单数据：', formData)
  // 这里可以添加表单提交到服务器的逻辑
}

const handleNewsItemClick = (item: any) => {
  console.log('新闻卡片被点击', item)
  // 跳转到新闻详情页并传递新闻ID
  router.push({
    path: '/news',
    query: {
      newsId: item.id
    }
  })
}
</script>

<style lang="less" scoped>
// 保留原有样式，但移除footer相关样式
// 定义变量
@primary-color: #2d374b;
@text-primary: rgba(255, 255, 255, 0.9);
@text-secondary: rgba(255, 255, 255, 0.7);
@section-bg: rgba(255, 255, 255, 0.05);
@border-radius: 0.25rem;
@base-font-size: 16px; // 添加基本字体大小参考

// rem计算函数
.px2rem(@px) {
  return: unit(@px / @base-font-size, rem);
}

.news-section {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  padding-bottom: 2.5rem; // 40px -> 2.5rem
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.section-title {
  font-size: 2.25rem; // 36px -> 2.25rem
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 2rem 0 1rem 0; // 20px -> 1.25rem
}

.content-container {
  display: flex;
  justify-content: space-between;
  gap: 1.25rem; // 20px -> 1.25rem
  max-width: 75rem; // 1200px -> 75rem
  margin: 0 auto;
  padding: 0 1.25rem; // 20px -> 1.25rem
}

/* 左侧新闻卡片样式 */
.news-card {
  width: 38.5rem; // 616px -> 38.5rem
  height: 19.25rem; // 308px -> 19.25rem
  flex: 2;
  border-radius: 0.25rem; // 4px -> 0.25rem
  transition: transform 0.3s ease;
  cursor: pointer;
}

.news-image {
  width: 38.5rem; // 616px -> 38.5rem
  height: 17.875rem; // 318px -> 19.875rem
  object-fit: cover;
}

.news-content {
  padding: 0.5rem; // 15px -> 0.9375rem
  padding-left: 0;
  text-align: left;

  .news-content-p {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem; // 14px -> 0.875rem
    color: #666;
    line-height: 1.5;
    margin-bottom: 0.625rem; // 10px -> 0.625rem
    overflow: hidden;
  }
}

.news-content h3 {
  font-size: 1.125rem; // 18px -> 1.125rem
  margin-bottom: 0.625rem; // 10px -> 0.625rem
  color: #333;
  font-weight: 600;
}

.news-content p {
  font-size: 0.875rem; // 14px -> 0.875rem
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.625rem; // 10px -> 0.625rem
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

/* 右侧新闻列表样式 */
.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.9375rem; // 15px -> 0.9375rem
}

.news-item {
  width: 41.0625rem; // 657px -> 41.0625rem
  height: 5.625rem; // 90px -> 5.625rem
  padding: 0.9375rem; // 15px -> 0.9375rem
  padding-top: 0;
  border-radius: 0.25rem; // 4px -> 0.25rem
  display: flex;
  cursor: pointer;
}

.news-item-left {
  flex: 0 0 7.5rem; // 120px -> 7.5rem
  margin-right: 0.9375rem; // 15px -> 0.9375rem
}

.news-item-image {
  width: 100%;
  height: 5.7rem; // 80px -> 5rem
  background-color: #f5f5f5;
  border-radius: 0.1875rem; // 3px -> 0.1875rem
}

.news-item-content {
  flex: 1;
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-evenly;

  .item-date{
    width: 100%;
    text-align: right;
  }

  .news-item-content-p {
    font-size: 0.875rem; // 14px -> 0.875rem
    color: #666;
    line-height: 1.5;
    margin-bottom: 0.625rem; // 10px -> 0.625rem
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.news-item h4 {
  font-size: 1rem; // 16px -> 1rem
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem; // 8px -> 0.5rem
  line-height: 1.3;
  text-align: left;
}

.news-item p {
  font-size: 0.8125rem; // 13px -> 0.8125rem
  color: #666;
  line-height: 1.5;
  margin-bottom: 0.25rem; // 4px -> 0.25rem
  text-align: left;
}

.news-item p:last-child {
  margin-bottom: 0;
}

/* 咨询区域样式 */
.consultation-section {
  margin-top: 1.25rem; // 20px -> 1.25rem
  text-align: center;
  padding: 2.5rem 0; // 40px -> 2.5rem
  background: url('@/assets/06.png') no-repeat center center;
  background-size: cover;
}

.consultation-section h3 {
  font-size: 1.5rem; // 24px -> 1.5rem
  margin-bottom: 1.25rem; // 20px -> 1.25rem
  color: #333;
}

.consult-btn {
  height: 2.5rem;
  line-height: 2.5rem;
  padding: 1rem 1.875rem; // 12px 30px -> 0.75rem 1.875rem
  font-size: 1rem; // 16px -> 1rem
  border-radius: 1rem; // 4px -> 0.25rem
  background-color: #0072FF;
  color: #fff;
}

// 响应式样式
@media (max-width: 768px) {
  .content-container {
    flex-direction: column;
  }

  .news-card,
  .news-image {
    width: 100%;
    height: auto;
  }

  .news-item {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.75rem; // 更小的标题字体
  }
}

// 添加一个用于小屏幕手机的媒体查询
@media (max-width: 375px) {
  html {
    font-size: 14px; // 在小屏幕上减小基础字体大小
  }
}

@media (max-width: 1920px) {
  .news-section {
    .content-container {
      max-width: 1200px;
    }

    .news-card {
      width: 37.5rem;
      height: 18.75rem;
    }

    .news-image {
      width: 37.5rem;
      height: 18.75rem;
    }

    .news-item {
      width: 37.5rem;
    }
  }
}

@media (max-width: 1232px) {
  .news-section {
    height: auto;
    min-height: 100vh;
    padding-bottom: 1.5rem;

    .content-container {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .news-card {
      width: 100%;
      height: auto;
    }

    .news-image {
      width: 100%;
      height: 200px;
    }

    .news-item {
      width: 100%;
      height: auto;
      flex-direction: column;
    }

    .news-item-left {
      flex: 0 0 100%;
      margin-right: 0;
      margin-bottom: 0.5rem;
    }

    .news-item-image {
      height: 150px;
    }

    .consultation-section {
      padding: 1.5rem 0;
    }

    .consultation-section h3 {
      font-size: 1.25rem;
    }
  }
}

@media (max-width: 768px) {
  .news-section {
    .section-title {
      font-size: 1.75rem;
    }

    .news-item-image {
      height: 120px;
    }
  }
}
</style>