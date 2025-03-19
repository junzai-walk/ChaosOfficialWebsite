<template>
  <div class="news-section">
    <h2 class="section-title">新闻资讯</h2>
    
    <!-- 主要内容区 -->
    <div class="content-container">
      <!-- 左侧新闻卡片 -->
      <div class="news-card">
        <img src="@/assets/images/news-banner.jpg" alt="新闻图片" class="news-image">
        <div class="news-content">
          <h3>凯奥思数据荣获2024年度科技创新奖</h3>
          <p>凯奥思数据凭借在工业智能领域的突出贡献，荣获2024年度科技创新奖项，这标志着公司在技术创新方面取得的重大突破...</p>
          <span class="news-date">2024-03-15</span>
        </div>
      </div>
      
      <!-- 右侧新闻列表 -->
      <div class="news-list">
        <div class="news-item" v-for="(item, index) in newsItems" :key="index">
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <span class="news-date">{{ item.date }}</span>
        </div>
      </div>
    </div>
    
    <div>
        <!-- 咨询区域 -->
    <div class="consultation-section">
      <h3>工业智能化升级，凯奥思数据与您同行</h3>
      <el-button type="primary" class="consult-btn" @click="handleConsult">
        马上咨询
      </el-button>
    </div>
    
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-logo">
            <img src="@/assets/logo.png" alt="凯奥思数据">
            <span>让工业更智能</span>
          </div>
          <div class="contact-info">
            <p>
              <el-icon><Phone /></el-icon>
              服务热线：XXX-XXX-XXXX
            </p>
            <p>
              <el-icon><Location /></el-icon>
              地址：南京市南花台区宁路19号云城枫L9层
            </p>
          </div>
        </div>

        <div class="footer-nav">
          <div class="nav-section">
            <h4>热门推荐</h4>
            <ul>
              <li>设备预测性维护与保养管理</li>
              <li>设备生命周期管理</li>
              <li>先进过程控制</li>
            </ul>
          </div>
          <div class="nav-section">
            <h4>解决方案</h4>
            <ul>
              <li>主力行业解决方案</li>
              <li>细分场景解决方案</li>
              <li>先进控制解决方案</li>
            </ul>
          </div>
          <div class="nav-section">
            <h4>关于我们</h4>
            <ul>
              <li>公司概况</li>
              <li>荣誉资质</li>
              <li>公司动态</li>
              <li>加入我们</li>
            </ul>
          </div>
          <div class="nav-section">
            <h4>客户案例</h4>
            <ul>
              <li>合作伙伴</li>
            </ul>
          </div>
        </div>

        <div class="footer-qrcode">
          <img src="@/assets/qrcode.png" alt="二维码">
          <span>凯奥思数据公众号</span>
        </div>
      </div>
    </footer>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newsItems = ref([
  {
    title: '凯奥思数据 工业智能服务商',
    description: '南京凯奥思数据技术有限公司（CHAOS DATA）是国内专业的工业智能服务商...',
    date: '2024-03-15'
  },
  {
    title: '凯奥思数据 工业智能服务商',
    description: '南京凯奥思数据技术有限公司（CHAOS DATA）是国内专业的工业智能服务商...',
    date: '2024-03-14'
  },
  {
    title: '凯奥思数据 工业智能服务商',
    description: '南京凯奥思数据技术有限公司（CHAOS DATA）是国内专业的工业智能服务商...',
    date: '2024-03-13'
  }
])

const handleConsult = () => {
  // 处理咨询按钮点击
  console.log('咨询按钮被点击')
}
</script>

<style lang="less" scoped>
// 定义变量
@primary-color: #2d374b;
@text-primary: rgba(255, 255, 255, 0.9);
@text-secondary: rgba(255, 255, 255, 0.7);
@section-bg: rgba(255, 255, 255, 0.05);
@border-radius: 4px;

.news-section {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  // padding: 40px 0;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.section-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 20px 0;
}

.content-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 左侧新闻卡片样式 */
.news-card {
  flex: 1;
  background-color: #e8f4ff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 20px;
}

.news-content h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.news-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

/* 右侧新闻列表样式 */
.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.news-item h4 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
}

.news-item p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.news-date {
  font-size: 12px;
  color: #999;
}

/* 咨询区域样式 */
.consultation-section {
  margin-top: 20px;
  text-align: center;
  padding: 40px 0;
  background: url('@/assets/06.png') no-repeat center center;
  background-size: cover;
}

.consultation-section h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.consult-btn {
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 4px;
}

/* 页脚样式 */
.footer {
  background-color: @primary-color;
  color: #fff;
  padding: 40px 0 100px 0;
  
  &-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  // 左侧公司信息区域
  &-left {
    flex: 0 0 25%;
    border-radius: @border-radius;
    
    .footer-logo {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      
      img {
        height: 30px;
        margin-right: 10px;
      }
      
      span {
        margin-top: 12px;
        margin-left: 10px;
        font-size: 14px;
        color: @text-primary;
      }
    }
  }
  
  // 中间导航区域
  &-nav {
    flex: 0 0 50%;
    display: flex;
    justify-content: space-between;
    
    .nav-section {
      flex: 1;
      margin-right: 15px;
      
      h4 {
        font-size: 15px;
        margin-bottom: 15px;
        color: #fff;
        font-weight: normal;
      }
      
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        
        li {
          margin-bottom: 10px;
          color: @text-secondary;
          cursor: pointer;
          font-size: 13px;
          
          &:hover {
            color: #1890ff;
            transition: color 0.3s ease;
          }
        }
      }
    }
  }
  
  // 右侧二维码区域
  &-qrcode {
    flex: 0 0 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: @border-radius;
    
    img {
      width: 120px;
      height: 120px;
      background-color: #fff;
      padding: 5px;
      margin-bottom: 10px;
    }
    
    .qrcode-text {
      font-size: 13px;
      color: @text-secondary;
    }
  }
}

// 联系信息样式
.contact-info {
  color: @text-secondary;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  
  .info-item {
    display: flex;
    margin-bottom: 10px;
    align-items: flex-start;
    
    .el-icon {
      margin-right: 8px;
      margin-top: 3px;
      flex-shrink: 0;
    }
    
    .info-content {
      display: flex;
      flex-direction: column;
      
      .info-label {
        margin-bottom: 2px;
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
    
    &-left, &-nav, &-qrcode {
      flex: 0 0 100%;
      margin-bottom: 30px;
    }
    
    &-nav {
      flex-wrap: wrap;
      
      .nav-section {
        flex: 0 0 45%;
        margin-bottom: 20px;
      }
    }
    
    &-qrcode {
      align-self: center;
    }
  }
}

@media (max-width: 576px) {
  .footer-nav .nav-section {
    flex: 0 0 100%;
  }
}
</style> 