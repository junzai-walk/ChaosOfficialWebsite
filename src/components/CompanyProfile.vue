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
        
        <div class="timeline-container" ref="timelineContainer">
          <div class="timeline-line" :class="{ 'animate-line': animationStarted }"></div>
          <div class="timeline">
            <div 
              class="timeline-item" 
              v-for="(year, index) in timeline" 
              :key="index"
              :class="{ 'show': animationStep > index }"
              :style="{ 'animation-delay': `${0.2 + index * 0.5}s` }"
            >
              <div class="year-marker">
                <div class="dot" :class="{ 'pulse': animationStep > index }"></div>
                <div class="year" :class="{ 'show': animationStep > index }">{{ year.year }}</div>
              </div>
              <div class="events">
                <div 
                  class="event" 
                  v-for="(event, eIndex) in year.events" 
                  :key="eIndex"
                  :class="{ 'show': animationStep > index }"
                  :style="{ 'animation-delay': `${0.4 + index * 0.5 + eIndex * 0.15}s` }"
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
const animationStarted = ref(false);
const animationStep = ref(-1);
const timelineContainer = ref<HTMLElement | null>(null);

// 启动时间轴动画
const startTimelineAnimation = () => {
  animationStarted.value = true;
  
  // 控制时间节点依次显示
  let step = 0;
  const totalSteps = timeline.value.length;
  const intervalTime = 5000 / totalSteps; // 5秒内完成所有步骤
  
  const interval = setInterval(() => {
    animationStep.value = step;
    step++;
    
    if (step > totalSteps) {
      clearInterval(interval);
    }
  }, intervalTime);
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
      if (entry.isIntersecting && !animationStarted.value) {
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
    events: ['凯奥思数据成立']
  },
  {
    year: '2018年',
    events: [
      '与宝武集团战略合作',
      '创始人团队专场入选江苏省双创计划',
    ]
  },
  {
    year: '2019年',
    events: [
      '完成千万级天使轮融资',
      '获评江苏省高新技术产品',
      '江苏省科技成果转化项目',
      '国家高新技术企业'
    ]
  },
  {
    year: '2020年',
    events: [
      '江苏省最具成长力瞪羚企业认证',
      '南京市高新技术企业认证'
    ]
  },
  {
    year: '2021年',
    events: [
      '完成数千万元Pre-A轮融资',
      '创始人获评"猎豹工匠"称号',
      '取得20项软著与发明专利',
      '与清华大学战略合作'
    ]
  },
  {
    year: '2022年',
    events: [
      '联合创始人入选博士人才A类',
      '国家级人才',
      '与山西煤碳集团合作'
    ]
  },
  {
    year: '2023年',
    events: [
      '完成亿元A+轮融资',
      '江苏省专精特新中小企业认证',
      '国家级专精特新企业',
      '工业互联网平台认证',
      '联合创始人入选博士人才A类国家级人才'
    ]
  },
  {
    year: '2024年',
    events: [
      '入选江苏省互联网成长型企业TOP100榜单',
      '获南京市重点引进的领军型科创企业',
      '南京市重大科技成果转化中心认证'
    ]
  }
]);
</script>

<style scoped>
.company-profile {
  width: 100%;
  height: 100vh;
  background-color: #f7f9fc;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%);
  overflow-y: auto;
  padding: 50px 0;
}

.profile-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

/* 数据统计样式 */
.stats-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.stat-item {
  text-align: center;
  padding: 0 15px;
}

.stat-number {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1;
  position: relative;
  /* 添加字体平滑效果 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.stat-number.blue {
  color: #1890ff;
}

.plus {
  font-size: 20px;
  position: relative;
  top: -10px;
}

.stat-desc {
  font-size: 16px;
  color: #666;
}

/* 公司简介文字样式 */
.company-intro {
  margin-bottom: 50px;
  line-height: 1.8;
}

.company-intro p {
  margin-bottom: 15px;
  text-align: justify;
  color: #444;
  font-size: 16px;
}

/* 发展历程样式 */
.history-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.timeline-container {
  position: relative;
  padding: 20px 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%); /* 使容器居中并占据整个视口宽度 */
  overflow: visible; /* 修改为visible，确保内容不被裁剪 */
}

.timeline-line {
  position: absolute;
  top: 30px;
  left: 5vw; /* 左边留出5%的视口宽度 */
  right: 5vw; /* 右边留出5%的视口宽度 */
  height: 2px;
  background-color: #e0e0e0;
  z-index: 1;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 3s cubic-bezier(0.23, 1, 0.32, 1);
}

.timeline-line.animate-line {
  transform: scaleX(1);
}

.timeline {
  display: flex;
  justify-content: space-between; /* 恢复为均匀分布 */
  position: relative;
  padding: 0 5vw; /* 左右各留出5%的视口宽度 */
  overflow: visible; /* 确保内容不被裁剪 */
}

/* 移除滚动相关样式 */
.timeline::-webkit-scrollbar {
  display: none;
}

.timeline-item {
  width: 10%; /* 基础宽度设置为10%，允许自适应 */
  min-width: auto; /* 移除最小宽度限制 */
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 5px;
  flex: 1 1 0; /* 平均分配空间 */
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item.show {
  opacity: 1;
  transform: translateY(0);
}

.year-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #1890ff;
  margin-bottom: 15px;
  transform: scale(0);
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.7);
}

.dot.pulse {
  transform: scale(1);
  animation: pulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(24, 144, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
  }
}

.year {
  font-weight: bold;
  color: #1890ff;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.year.show {
  opacity: 1;
  transform: translateY(0);
}

.events {
  text-align: left;
  transform: rotate(-15deg); /* 稍微倾斜，节省水平空间 */
  transform-origin: top left;
  padding-top: 15px;
}

.event {
  margin-bottom: 6px;
  font-size: 12px; /* 减小字体大小 */
  line-height: 1.3;
  color: #555;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: normal; /* 允许文本换行 */
  overflow-wrap: break-word; /* 允许长单词断行 */
  hyphens: auto; /* 自动添加连字符 */
  max-width: 120px; /* 最大宽度限制 */
}

.event.show {
  opacity: 1;
  transform: translateX(0);
}

/* 添加一些闪光效果 */
.timeline-item:nth-child(even) .dot::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: linear-gradient(45deg, #1890ff, transparent);
  z-index: -1;
  opacity: 0;
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .events {
    transform: rotate(-25deg); /* 更大的倾斜角度以节省空间 */
    transform-origin: top left;
    font-size: 11px;
  }
  
  .event {
    font-size: 11px;
    max-width: 100px;
  }
}

@media (max-width: 768px) {
  .timeline-container {
    padding: 20px 0 60px; /* 增加底部padding，为倾斜的文本留出空间 */
  }
  
  .timeline {
    padding: 0 2vw; /* 减少左右padding */
  }
  
  .events {
    transform: rotate(-35deg) translateY(10px); /* 更大的倾斜和下移 */
  }
  
  .event {
    font-size: 10px;
    max-width: 80px;
  }
}
</style> 