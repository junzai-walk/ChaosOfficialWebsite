<template>
  <footer class="footer">
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
            18913908978
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
          <h4 class="decoration-line" @click="navigateToCustomer(0)">客户案例</h4>
          <ul>
            <li @click="navigateToCustomer(0)">案例中心</li>
            <li @click="navigateToCustomer(1)">标杆案例</li>
            <li @click="navigateToCustomer(2)">客户展示</li>
          </ul>
        </div>
        <div class="nav-section">
          <h4 class="decoration-line" @click="navigateToPartners(0)">合作伙伴</h4>
          <ul>
            <li @click="navigateToPartners(0)">诚邀合作</li>
            <li @click="navigateToPartners(1)">伙伴招募</li>
            <li @click="navigateToPartners(2)">专业保障</li>
            <li @click="navigateToPartners(3)">成为伙伴</li>
          </ul>
        </div>
        <div class="nav-section">
          <h4 class="decoration-line" @click="navigateToNews(0)">资讯中心</h4>
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Phone, Location } from '@element-plus/icons-vue'
import { useSectionStore } from '@/stores/sectionStore'

const router = useRouter()

const navigateToIndustry = (sectionIndex: number) => {
  router.push({
    path: '/industry',
    query: { section: sectionIndex.toString() }
  })
}

const navigateToAbout = (sectionIndex: number) => {
  // 先解除页面锁定状态
  document.body.classList.remove('no-section-scroll')

  // 导入并使用sectionStore
  const sectionStore = useSectionStore()
  // 解除section锁定
  sectionStore.lockSection(false)

  // 然后进行路由跳转
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

/* 页脚样式 */
.footer {
  background-color: @primary-color;
  color: #fff;
  padding: 2.5rem 0 2rem 0; 

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
    font-size: 1rem;
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
</style>