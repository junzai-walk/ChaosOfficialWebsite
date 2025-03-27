<template>
  <div class="company-profile">
    <div class="profile-content">
      <h2 class="main-title">凯奥思数据 工业智能服务商</h2>
      
      <!-- 数据统计展示 -->
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number blue">
            {{ animatedNumbers.years }}<span class="plus">年+</span>
          </div>
          <div class="stat-desc">工业智能服务经验</div>
        </div>
        <div class="stat-item">
          <div class="stat-number blue">
            {{ animatedNumbers.algorithms }}<span class="plus">+</span>
          </div>
          <div class="stat-desc">核心算法</div>
        </div>
        <div class="stat-item">
          <div class="stat-number blue">
            {{ animatedNumbers.industries }}<span class="plus">+</span>
          </div>
          <div class="stat-desc">行业覆盖</div>
        </div>
        <div class="stat-item">
          <div class="stat-number blue">
            {{ animatedNumbers.clients }}<span class="plus">+</span>
          </div>
          <div class="stat-desc">合作客户</div>
        </div>
      </div>
      
      <!-- 公司简介文字 -->
      <div class="company-intro">
        <p>南京凯奥思数据技术有限公司（CHAOS DATA）是国内专业的工业智能服务商，专注工业智能，以边缘计算、工业大数据、先进控制和运筹优化等人工智能算法技术为核心驱动，为工业企业提供智慧运维、能源管理、工业控制、供应链优化等服务。</p>
        <p>基于海归技术团队在全球上百个项目应用经验，覆盖钢铁、水泥、化工、煤炭、汽车、新能源等行业，打造更加智能、安全、经济的工业产品和解决方案，助力工业企业智能化升级。</p>
      </div>
      
      <!-- 公司发展历程 -->
      <div class="company-history">
        <h3 class="history-title">公司历程</h3>
        
        <div class="timeline-box" ref="timelineContainer">
          <div class="timeline">
            <!-- 添加连接图标的横线 -->
            <div class="timeline-connector"></div>
            
            <div 
              class="timeline-item" 
              v-for="(year, index) in timeline" 
              :key="index"
              :class="{ 'show': index <= currentStep }"
              :style="{ animationDelay: `${index * (animationDuration / timeline.length)}s` }"
            >
              <div class="marker-container">
                <img src="@/assets/home/mdi_location.png" class="location-icon" alt="位置标记" />
              </div>
              <div class="year">{{ year.year }}</div>
              <div class="events">
                <div 
                  class="event" 
                  v-for="(event, eIndex) in year.events" 
                  :key="eIndex"
                >
                  {{ event }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';

// 定义最终数字
const finalNumbers = {
  years: 15,
  algorithms: 1000,
  industries: 15,
  clients: 200
};

// 定义动画数字对象
const animatedNumbers = reactive({
  years: 0,
  algorithms: 0,
  industries: 0,
  clients: 0
});

// 数字动画函数
const animateNumber = (key: string, finalValue: number, duration: number) => {
  const startTime = Date.now();
  const updateNumber = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    
    if (elapsedTime < duration) {
      // 计算当前应该显示的数字
      const progress = elapsedTime / duration;
      // 使用easeOutQuart缓动函数使动画更自然
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      animatedNumbers[key as keyof typeof animatedNumbers] = Math.floor(easedProgress * finalValue);
      
      requestAnimationFrame(updateNumber);
    } else {
      // 确保最终显示的是精确的目标值
      animatedNumbers[key as keyof typeof animatedNumbers] = finalValue;
    }
  };
  
  requestAnimationFrame(updateNumber);
};

// 动画控制
const animationDuration = 6000; // 6秒完成所有动画
const currentStep = ref(-1);
const timelineContainer = ref<HTMLElement | null>(null);

// 启动时间轴动画
const startTimelineAnimation = () => {
  const totalSteps = timeline.value.length;
  const stepInterval = animationDuration / totalSteps;
  
  // 重置
  currentStep.value = -1;
  
  // 逐个显示时间轴项目
  for (let i = 0; i < totalSteps; i++) {
    setTimeout(() => {
      currentStep.value = i;
    }, i * stepInterval);
  }
};

onMounted(() => {
  // 监测元素可见性
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 元素可见时开始动画
        const duration = 3000; // 3秒
        
        // 启动所有数字的动画
        Object.entries(finalNumbers).forEach(([key, value]) => {
          animateNumber(key, value, duration);
        });
        
        // 取消观察
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  
  // 开始观察公司简介区域
  const element = document.querySelector('.company-profile');
  if (element) {
    observer.observe(element);
  }

  // 监测时间轴可见性
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 开始动画
        startTimelineAnimation();
        timelineObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  
  // 开始观察时间轴区域
  if (timelineContainer.value) {
    timelineObserver.observe(timelineContainer.value);
  }
});

const timeline = ref([
  {
    year: '2017年',
    events: ['凯奥思数据成立；']
  },
  {
    year: '2018年',
    events: [
      '与宝武集团战略合作；',
      '创始人杨世飞博士入选江苏省双创博士培养计划；'
    ]
  },
  {
    year: '2019年',
    events: [
      '完成千万级天使轮融资；',
      '获评江苏省大数据优秀产品、江苏省民营科技企业、国家高新技术企业；'
    ]
  },
  {
    year: '2020年',
    events: [
      '江苏省最具成长潜力瞪羚企业认证；',
      '南京市高新技术企业认证；'
    ]
  },
  {
    year: '2021年',
    events: [
      '完成数千万元Pre-A轮融资；',
      '创始人杨世飞博士获江苏省双创人才；',
      '与海螺水泥战略合作；'
    ]
  },
  {
    year: '2022年',
    events: [
      '联合创始人徐徐博士入选国家级人才；',
      '与山西煤炭战略合作；'
    ]
  },
  {
    year: '2023年',
    events: [
      '完成亿元A+轮融资；',
      '江苏省专精特新中小企业认证、国家级特色专业型工业互联网平台认证；',
      '联合创始人孙徐博士入选国家级人才；'
    ]
  },
  {
    year: '2024年',
    events: [
      '入选江苏省互联网成长型企业TOP10榜单；',
      '获评南京市瞪羚企业；',
      '南京市首家民营科技企业数据资产入报表；',
      '南京市工程技术研究中心认定；'
    ]
  }
]);
</script>

<style scoped lang="less">
@blue-color: #1890ff;
@dark-text: #333;
@medium-text: #444;
@light-text: #666;

.company-profile {
  width: 100%;
  height: 100vh;
  background-image: url('@/assets/home/bg_sub.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow-y: auto;
  padding: 3.125rem 0;
}

.profile-content {
  max-width: 87.5rem;
  margin: 0 auto;
  padding: 0 1.25rem;
}

.main-title {
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.5rem;
  color: @dark-text;
  text-align: left;
}

/* 数据统计样式 */
.stats-container {
  display: flex;
  justify-content: flex-start;
  gap: 8.125rem;
  flex-wrap: wrap;
  margin-bottom: 3.125rem;
}

.stat-item {
  text-align: left;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
  line-height: 1;
  position: relative;
  /* 添加字体平滑效果 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  &.blue {
    color: @blue-color;
  }
}

.plus {
  font-size: 1.25rem;
  position: relative;
}

.stat-desc {
  font-size: 1rem;
  color: @light-text;
}

/* 公司简介文字样式 */
.company-intro {
  margin-bottom: 3.125rem;
  line-height: 1.8;
  
  p {
    margin-bottom: 0.9375rem;
    text-align: justify;
    color: @medium-text;
    font-size: 1rem;
  }
}

/* 发展历程样式 - 更新 */
.history-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.875rem;
  color: @dark-text;
  text-align: left;
}

.timeline-box {
  width: 85.9375rem;
  height: 17.6875rem;
  background-color: #fff;
  border-radius: 0.625rem;
  box-shadow: 0 0 0.9375rem rgba(0, 0, 0, 0.05);
  padding: 1.875rem;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.timeline {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;
}

/* 添加连接图标的横线 */
.timeline-connector {
  position: absolute;
  height: 0.0625rem;
  background-color: #eee;
  width: calc(100% - 10rem);
  top: 1.5625rem;
  left: 4.0625rem;
  z-index: 1;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  z-index: 2;
  opacity: 0;
  transform: translateY(1.25rem);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
  
  &.show {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    animation: fadeInUp 0.8s ease forwards;
    
    .marker-container {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    .year {
      animation: fadeInUp 0.6s ease 0.2s forwards;
    }
    
    .events {
      animation: fadeInUp 0.6s ease 0.4s forwards;
    }
  }
  
  .marker-container,
  .year,
  .events {
    opacity: 0;
    transform: translateY(0.9375rem);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.marker-container {
  height: 3.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: @blue-color;
  background-color: #fff;
}

.year {
  font-size: 1rem;
  font-weight: bold;
  color: @blue-color;
  margin: 0.625rem 0;
}

.events {
  text-align: center;
  font-size: 0.875rem;
  color: @light-text;
  line-height: 1.5;
}

.event {
  margin-bottom: 0.375rem;
  max-width: 9.375rem;
  text-align: left;
  font-size: 0.75rem;
}

/* 删除不再需要的动画和旧的时间轴样式 */
.timeline-line,
.dot,
.pulse,
.glow {
  display: none;
}

/* 响应式调整 */
@media (max-width: 87.5rem) {
  .timeline-box {
    width: 100%;
  }
  
  .event {
    font-size: 0.6875rem;
    max-width: 8.125rem;
  }
}
</style> 