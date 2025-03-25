<template>
  <div class="products-page" @wheel="handleWheel">
    <!-- 第一部分：设备预测性维护与健康管理系统 -->
    <div class="section" :class="{ active: currentSection === 0, 'section-hidden': currentSection !== 0 }">
      <ProductHero 
        :background-image="phmBackgroundImage" 
        title="设备预测性维护与健康管理系统（PHM）" 
      />
    </div>
    
    <!-- 第二部分：产品描述 -->
    <div class="section" :class="{ active: currentSection === 1, 'section-hidden': currentSection !== 1 }">
      <ProductDescription 
        :nav-steps="productSteps" 
        :default-active-step="1"
        :description="productDescription"
        :video-src="officialVideoSrc"
      />
    </div>
  
    <!-- 第三部分：产品功能 -->
    <div class="section" :class="{ active: currentSection === 2, 'section-hidden': currentSection !== 2 }">
      <ProductFeatures
        :nav-steps="productSteps"
        :default-active-step="2"
        :features="productFeatures"
      />
    </div>

    <!-- 第四部分：特色优势 -->
    <div class="section" :class="{ active: currentSection === 3, 'section-hidden': currentSection !== 3 }">
      <ProductAdvantages
        :nav-steps="productSteps"
        :default-active-step="3"
        :advantages="productAdvantages"
      />
    </div>

    <!-- 第五部分：典型案例 -->
    <div class="section" :class="{ active: currentSection === 4, 'section-hidden': currentSection !== 4 }">
      <ProductCases
        :nav-steps="productSteps"
        :default-active-step="4"
        :cases="productCases"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ProductHero from '@/components/products/ProductHero.vue'
import ProductDescription from '@/components/products/ProductDescription.vue'
import ProductFeatures from '@/components/products/ProductFeatures.vue'
import ProductAdvantages from '@/components/products/ProductAdvantages.vue'
import ProductCases from '@/components/products/ProductCases.vue'
// 直接导入图片和视频
import phmBackgroundImage from '@/assets/products/software-bg-1.png'
import officialVideoSrc from '@/assets/video/official_video.mp4'

// 导入图标
import remoteMonitoringIcon from '@/assets/products/phm-1.png'
import intelligentAlarmIcon from '@/assets/products/phm-2.png'
import automatedDiagnosisIcon from '@/assets/products/phm-3.png'
import analysisIcon from '@/assets/products/phm-4.png'
import reportIcon from '@/assets/products/phm-5.png'
import performanceIcon from '@/assets/products/phm-6.png'
import advantageIcon from '@/assets/products/phm-feature-1.jpg'

import case1 from '@/assets/products/phm-case-1.png'
import case2 from '@/assets/products/phm-case-2.png'
import case3 from '@/assets/products/phm-case-3.png'
import case4 from '@/assets/products/phm-case-4.png'

// 当前显示的部分
const currentSection = ref(0)
// 是否正在滚动中（防止连续触发）
const scrolling = ref(false)
const scrollDelay = 1000 // 滚动延迟

// 产品步骤
const productSteps = ['产品概述', '核心功能', '特色优势', '应用案例']

// 产品描述
const productDescription = '设备预测性维护与健康管理系统，应用工业设备运维中的感知、数字和智能，采用先进的数据技术，以预测维护+数据感知+机理建模为技术心，实现从设备监测预警到设备故障预测和健康评估的完善流程，快速准确推进生产线设备智能化运维能力，提高设备故障预测和检修效率。'

// 产品功能数据
const productFeatures = [
  {
    title: '远程监视',
    description: '基于局域、区域、互联、内联、容器等多种联网方案，实现异地设备远程监测量采集与显示，提供设备实时状态信息。',
    icon: remoteMonitoringIcon
  },
  {
    title: '智能预警',
    description: '建立预警规则，设定预警，AI模型判断设备参数阈值异常，对异常参数预警提醒，提前预知设备异常；根据设备故障预测值，进行补位预警处理。',
    icon: intelligentAlarmIcon
  },
  {
    title: '自动诊断',
    description: '基于自研算法，专业深度设备模型建模分析，结合设备，形成自动化识别设备参数规律，包含参数趋势、规律一人人工多维度处理。',
    icon: automatedDiagnosisIcon
  },
  {
    title: '专家分析',
    description: '基于不同类型设备，提供不同类型分析模型，打造专家分析工具，融入专家经验与知识，专家设备建模诊断模型，为设备健康提供支撑。',
    icon: analysisIcon
  },
  {
    title: '诊断报告',
    description: '打造数据分析报告与健康诊断报告，设备健康评分分析，创建报告预处理功能与设备维修执行的计划建议。结合不同场景的多种报告模板，支持更多设备类型。',
    icon: reportIcon
  },
  {
    title: '效能分析',
    description: '为设备运行参数趋势，与设备设计参数进行对比分析，内含设备运行效能分析结果与设备维护效能分析结果，确保设备运行处于最佳状态区间，提升设备使用性能寿命。',
    icon: performanceIcon
  }
]

// 产品特色优势数据
const productAdvantages = [
  {
    title: '灵活配置特性的边缘采集装置',
    description: '一体化采集和控制组件，兼容性强、扩展性强、稳定性高。可视化组态配置，无编程配置在边缘计算上。',
    icon: advantageIcon,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '全面的专家机理规则库',
    description: '融合工艺经验，覆盖各种特性，设备的预防性维护计算，打通一整合数据集的链接，数学模型，规则故障预识别和评估模型工具。',
    icon: advantageIcon,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '完整的数据处理流程',
    description: '内建"埋点指标-探查指标-建模依据-算法模型"一条龙服务流程，为各种情况提供支撑。',
    icon: advantageIcon,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '多技术融合的专家分析工具',
    description: '融合常见故障原因分析，模型级参数分析，收集数据进行深度分析，打造专家级使用引导，达成完成设备寿命和参数分析工具。',
    icon: advantageIcon,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '强大的大数据AI建模',
    description: '丰富的数学分析建模，对大数据模式进行科学聚类，建立设备健康评估，以提高设备可靠性。',
    icon: advantageIcon,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '可视化配置设备健康度评估',
    description: '高效关键参数指标评估，维纳槽结构话识别，大数据统化非相似设备指标模型。',
    icon: advantageIcon,
    position: { top: 519, left: 1033 },
    iconPosition: 'right' as const
  }
] as Array<{
  title: string;
  description: string;
  icon: string;
  position: { top: number; left: number };
  iconPosition: 'left' | 'right';  // 明确指定字面量类型
}>;

const productCases = [case1, case2, case3, case4];

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return

  scrolling.value = true

  // 向下滚动
  if (e.deltaY > 0 && currentSection.value < 20) { // 更新为最大部分索引
    currentSection.value++
  }
  // 向上滚动
  else if (e.deltaY < 0 && currentSection.value > 0) {
    currentSection.value--
  }

  // 设置滚动延迟
  setTimeout(() => {
    scrolling.value = false
  }, scrollDelay)
}

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  if (scrolling.value) return

  scrolling.value = true

  // 向下箭头或Page Down
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && currentSection.value < 20) { // 更新为最大部分索引
    currentSection.value++
  }
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && currentSection.value > 0) {
    currentSection.value--
  }

  setTimeout(() => {
    scrolling.value = false
  }, scrollDelay)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  // 恢复浏览器默认滚动行为
  document.body.style.overflow = ''
})
</script>

<style scoped>
.products-page {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.section {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
}

.section.active {
  transform: translateY(0);
  opacity: 1;
  z-index: 10;
}

.section-hidden {
  transform: translateY(100%);
  opacity: 0;
  z-index: 5;
}

/* 当滚动到下一部分时，上一部分向上移动 */
.section:first-child.section-hidden {
  transform: translateY(-100%);
}
</style>