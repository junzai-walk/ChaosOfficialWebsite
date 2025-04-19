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
          <p class="news-content-p">凯奥思PHM系统深度融合DeepSeek，全面实现国产化</p>
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

      <!-- 页脚 -->
      <footer class="footer">
        <!-- 页脚内容保持不变 -->
        <div class="footer-content">
          <div class="footer-left">
            <div class="footer-logo">
              <img src="@/assets/logos/chaos_white.png" alt="凯奥思数据">
              <div class="divider-line"></div>
              <span>让工业更智能</span>
            </div>
            <div class="contact-info">
              <p class="info-item">
                <el-icon>
                  <Phone />
                </el-icon>
                服务热线
              </p>
              <p class="contact-info-p">
                025-8313-2381
              </p>
              <p class="info-item">
                <el-icon>
                  <Location />
                </el-icon>
                地址
              </p>
              <p class="contact-info-p">
                南京市雨花台区宁双路19号云密城L栋9层
              </p>
            </div>
          </div>

          <div class="footer-nav">
            <div class="nav-section">
              <h4 class="decoration-line" @click="navigateToProducts(0)">热门推荐</h4>
              <ul>
                <li @click="navigateToProducts(0)">设备预测性维护与健康管理</li>
                <li @click="navigateToProducts(5)">设备全生命周期管理</li>
                <li @click="navigateToProducts(10)">先进过程控制</li>
                <li @click="navigateToProducts(15)">能源管理与优化</li>
                <li @click="navigateToProducts(21)">库存优化</li>
                <li @click="navigateToProducts(26)">生产计划排程</li>
              </ul>
            </div>
            <div class="nav-section">
              <h4 class="decoration-line" @click="navigateToIndustry(0)">解决方案</h4>
              <ul>
                <li @click="navigateToIndustry(0)">钢铁行业</li>
                <li @click="navigateToIndustry(5)">水泥行业</li>
                <li @click="navigateToIndustry(10)">煤炭行业</li>
                <li @click="navigateToIndustry(15)">化工行业</li>
                <li @click="navigateToIndustry(20)">汽车行业</li>
                <li @click="navigateToIndustry(25)">新能源行业</li>
              </ul>
            </div>
            <div class="nav-section">
              <h4 class="decoration-line"  @click="navigateToCustomer(0)">客户案例</h4>
              <ul>
                <li @click="navigateToCustomer(0)">案例中心</li>
                <li @click="navigateToCustomer(1)">标杆案例</li>
                <li @click="navigateToCustomer(2)">客户展示</li>
              </ul>
            </div>
            <div class="nav-section">
              <h4 class="decoration-line"  @click="navigateToPartners(0)">合作伙伴</h4>
              <ul>
                <li @click="navigateToPartners(0)">诚邀合作</li>
                <li @click="navigateToPartners(1)">伙伴招募</li>
                <li @click="navigateToPartners(2)">专业保障</li>
                <li @click="navigateToPartners(3)">成为伙伴</li>
              </ul>
            </div>
            <div class="nav-section">
              <h4 class="decoration-line"  @click="navigateToNews(0)">资讯中心</h4>
              <ul>
                <li @click="navigateToNews(0)">新闻动态</li>
              </ul>
            </div>  
            <div class="nav-section">
              <h4 class="decoration-line" @click="navigateToAbout(1)">关于我们</h4>
              <ul>
                <li @click="navigateToAbout(1)">公司概况</li>
                <li @click="navigateToAbout(2)">重要荣誉</li>
                <li @click="navigateToAbout(3)">加入我们</li>
                <li @click="navigateToAbout(4)">联系我们</li>
              </ul>
            </div>          
          </div>

          <div class="footer-qrcode">
            <img src="@/assets/fixed/wechat_code.jpg" alt="二维码">
            <span>微信公众号</span>
          </div>
        </div>
      </footer>
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
import { Phone, Location } from '@element-plus/icons-vue'
import * as ConsultDialogComponent from '@/components/common/ConsultDialog.vue'
const ConsultDialog = ConsultDialogComponent

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
    date: '2024-03-15',
    image: cover1
  },
  {
    id: 'news3',
    title: '喜报！凯奥思数据荣登南京企业技术中心培育库',
    description: '近日，南京凯奥思数据技术有限公司正式入选南京市工业和信息化局公布的《南京企业技术中心培育库（2024年度）》名单，标志着我司在技术创新和研发能力方面获得了政府部门的高度认可，为公司的未来发展注入了新的动力。',
    date: '2024-03-14',
    image: cover1
  },
  {
    id: 'news4',
    title: '实力见证！凯奥思数据"设备预测性维护与健康管理系统2.0"又获两项重量级认证',
    description: '12月20日，第六届江苏软件产业发展大会近日在南京隆重召开。大会以"创新驱动，智创未来"为主题，聚焦软件产业的创新发展和应用实践，吸引了众多行业专家、企业代表及政府领导参会。会议期间，与会者围绕软件产业的创新发展、国产化替代等议题进行了深入交流和探讨。',
    date: '2024-03-13',
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

const navigateToIndustry = (sectionIndex: number) => {
  router.push({
    path: '/industry',
    query: { section: sectionIndex.toString() }
  })
}

const navigateToAbout = (sectionIndex: number) => {
  router.push({
    path: '/about',
    query: { section: sectionIndex.toString() }
  })
}

const navigateToPartners = (sectionIndex: number) => {
  router.push({
    path: '/partners',
    query: { section: sectionIndex.toString() }
  })
}

const navigateToCustomer = (sectionIndex: number) => {
  router.push({
    path: '/customer',
    query: { section: sectionIndex.toString() }
  })
}

const navigateToProducts = (sectionIndex: number) => {
  router.push({
    path: '/products',
    query: { section: sectionIndex.toString() }
  })
}

const navigateToNews = (sectionIndex: number) => {
  router.push({
    path: '/news',
    query: { section: sectionIndex.toString() }
  })
}
</script>

<style lang="less" scoped>
// 保留原有样式，但移除咨询弹窗相关样式
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
  justify-content: space-between;
}

.section-title {
  font-size: 2.25rem; // 36px -> 2.25rem
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 1.25rem 0; // 20px -> 1.25rem
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
  padding: 0.9375rem; // 15px -> 0.9375rem
  text-align: left;

  .news-content-p {
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
  height: 5rem; // 80px -> 5rem
  background-color: #f5f5f5;
  border-radius: 0.1875rem; // 3px -> 0.1875rem
}

.news-item-content {
  flex: 1;
  display: inline-flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-evenly;

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

/* 页脚样式 */
.footer {
  background-color: @primary-color;
  color: #fff;
  padding: 2.5rem 0 6.25rem 0; // 40px 0 100px 0 -> 2.5rem 0 6.25rem 0

  &-content {
    max-width: 100rem; // 1200px -> 75rem
    margin: 0 auto;
    padding: 0 1.25rem; // 20px -> 1.25rem
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &-left {
    flex: 0 0 25%;
    border-radius: @border-radius;

    .footer-logo {
      display: flex;
      align-items: center;
      margin-bottom: 0.9375rem; // 15px -> 0.9375rem

      img {
        height: 1.875rem; // 30px -> 1.875rem
        margin-right: 0.625rem; // 10px -> 0.625rem
      }

      .divider-line {
        width: 0.0625rem;
        height: 1rem;
        transform: translateY(5px);
        background-color: #fff;
        margin: 0 0.625rem;
      }

      span {
        margin-top: 0.75rem; // 12px -> 0.75rem
        margin-left: 0.625rem; // 10px -> 0.625rem
        font-size: 0.875rem; // 14px -> 0.875rem
        color: @text-primary;
      }
    }
  }

  &-nav {
    flex: 0 0 50%;
    display: flex;
    justify-content: space-between;

    .nav-section {
      flex: 1;
      margin-right: 5rem; // 15px -> 0.9375rem
      white-space: nowrap;
      text-align: left;

      h4 {
        font-size: 0.9375rem; // 15px -> 0.9375rem
        margin-bottom: 0.9375rem; // 15px -> 0.9375rem
        color: #fff;
        font-weight: normal;
      }

      .decoration-line {
        text-decoration: underline;
        text-decoration-color: #fff;
        text-underline-offset: 0.4125rem;
        cursor: pointer;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin: 1rem 0; // 10px -> 0.625rem
          color: @text-secondary;
          cursor: pointer;
          font-size: 0.8125rem; // 13px -> 0.8125rem
          transition: color 0.3s;

          &:hover {
            color: #fff;
          }
        }
      }
    }
  }

  &-qrcode {
    flex: 0 0 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: @border-radius;

    img {
      width: 7.5rem; // 120px -> 7.5rem
      height: 7.5rem; // 120px -> 7.5rem
      background-color: #fff;
      padding: 0.3125rem; // 5px -> 0.3125rem
      margin-bottom: 0.625rem; // 10px -> 0.625rem
    }

    .qrcode-text {
      font-size: 0.8125rem; // 13px -> 0.8125rem
      color: @text-secondary;
    }
  }
}

// 联系信息样式
.contact-info {
  color: @text-secondary;
  font-size: 0.8125rem; // 13px -> 0.8125rem
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem; // 10px -> 0.625rem

  &-p{
    font-size: 16px;
    color: #fff;
  }

  .info-item {
    margin-top: 0.625rem;

    .el-icon {
      // margin-right: 0.5rem; // 8px -> 0.5rem
      margin-top: 0.1875rem; // 3px -> 0.1875rem
      flex-shrink: 0;
    }

    .info-content {
      display: flex;
      flex-direction: column;

      .info-label {
        margin-bottom: 0.125rem; // 2px -> 0.125rem
      }
    }
  }
}

// 响应式样式
@media (max-width: 992px) {
  .footer {
    &-content {
      flex-direction: column;
    }

    &-left,
    &-nav,
    &-qrcode {
      flex: 0 0 100%;
      margin-bottom: 1.875rem; // 30px -> 1.875rem
    }

    &-nav {
      flex-wrap: wrap;

      .nav-section {
        flex: 0 0 45%;
        margin-bottom: 1.25rem; // 20px -> 1.25rem
      }
    }

    &-qrcode {
      align-self: center;
    }
  }
}

// 增强移动端适配
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
  .footer-nav .nav-section {
    flex: 0 0 100%;
  }

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
      width: 600px;
      height: 300px;
    }

    .news-image {
      width: 600px;
      height: 280px;
    }

    .news-item {
      width: 600px;
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

    .footer {
      padding: 1.5rem 0 3rem 0;

      &-content {
        flex-direction: column;
        align-items: center;
      }

      &-left,
      &-nav,
      &-qrcode {
        width: 100%;
        margin-bottom: 1.5rem;
      }

      &-nav {
        flex-wrap: wrap;
        justify-content: center;

        .nav-section {
          flex: 0 0 45%;
          margin-bottom: 1rem;
        }
      }
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

    .footer-nav .nav-section {
      flex: 0 0 100%;
    }
  }
}
</style>