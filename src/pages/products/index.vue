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

    <!-- 第六部分：设备全生命周期管理系统(EAM) -->
    <div class="section" :class="{ active: currentSection === 5, 'section-hidden': currentSection !== 5 }">
      <ProductHero 
        :background-image="eamBackgroundImage" 
        title="设备全生命周期管理系统(EAM)" 
      />
    </div>

    <!-- 第七部分：产品概述 -->
    <div class="section" :class="{ active: currentSection === 6, 'section-hidden': currentSection !== 6 }">
      <ProductDescription 
        :nav-steps="productSteps" 
        :default-active-step="1"
        :description="productDescriptionEam"
        :video-src="officialVideoSrc"
      />
    </div>
    
    <!-- 第八部分：核心功能 -->
    <div class="section" :class="{ active: currentSection === 7, 'section-hidden': currentSection !== 7 }">
      <ProductFeatures
        :nav-steps="productSteps"
        :default-active-step="2"
        :features="productFeaturesEam"
      />
    </div>

    <!-- 第九部分：特色优势 -->
    <div class="section" :class="{ active: currentSection === 8, 'section-hidden': currentSection !== 8 }">
      <ProductAdvantages
        :nav-steps="productSteps"
        :default-active-step="3"
        :advantages="productAdvantagesEam"
      />
    </div>

    <!-- 第十部分：典型案例 -->
    <div class="section" :class="{ active: currentSection === 9, 'section-hidden': currentSection !== 9 }">
      <ProductCases
        :nav-steps="productSteps"
        :default-active-step="4"
        :cases="productCasesEam"
      />
    </div>

    <!-- 第十一部分：先进过程控制系统(APC) -->
    <div class="section" :class="{ active: currentSection === 10, 'section-hidden': currentSection !== 10 }">
      <ProductHero 
        :background-image="apcBackgroundImage" 
        title="先进过程控制系统(APC)" 
      />
    </div>

    <!-- 第十二部分：产品概述 -->
    <div class="section" :class="{ active: currentSection === 11, 'section-hidden': currentSection !== 11 }">
      <ProductDescription 
        :nav-steps="productSteps" 
        :default-active-step="1"
        :description="productDescriptionApc"
        :video-src="officialVideoSrc"
      />
    </div>

    <!-- 第十三部分：核心功能 -->
    <div class="section" :class="{ active: currentSection === 12, 'section-hidden': currentSection !== 12 }">
      <ProductFeatures
        :nav-steps="productSteps"
        :default-active-step="2"
        :features="productFeaturesApc"
      />
    </div>

    <!-- 第十四部分：特色优势 -->
    <div class="section" :class="{ active: currentSection === 13, 'section-hidden': currentSection !== 13 }">
      <ProductAdvantages
        :nav-steps="productSteps"
        :default-active-step="3"
        :advantages="productAdvantagesApc"
      />
    </div>

    <!-- 第十五部分：典型案例 -->
    <div class="section" :class="{ active: currentSection === 14, 'section-hidden': currentSection !== 14 }">
      <ProductCases
        :nav-steps="productSteps"
        :default-active-step="4"
        :cases="productCasesApc"
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
import eamBackgroundImage from '@/assets/products/eam-bg.jpg'

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

// 导入EAM图标
import eamIcon1 from '@/assets/products/eam-1.png'
import eamIcon2 from '@/assets/products/eam-2.png'
import eamIcon3 from '@/assets/products/eam-3.png'
import eamIcon4 from '@/assets/products/eam-4.png'
import eamIcon5 from '@/assets/products/eam-5.png'
import eamIcon6 from '@/assets/products/eam-6.png'

// 导入EAM特色优势图标
import eamFeatureIcon1 from '@/assets/products/eam-feature-1.png'
import eamFeatureIcon2 from '@/assets/products/eam-feature-2.png'
import eamFeatureIcon3 from '@/assets/products/eam-feature-3.png'
import eamFeatureIcon4 from '@/assets/products/eam-feature-4.png'
import eamFeatureIcon5 from '@/assets/products/eam-feature-5.png'
import eamFeatureIcon6 from '@/assets/products/eam-feature-6.png'

// 导入EAM典型案例图标
import case1Eam from '@/assets/products/eam-case-1.png'
import case2Eam from '@/assets/products/eam-case-2.png'

// 导入APC背景图片
import apcBackgroundImage from '@/assets/products/apc-bg.jpg'

// 导入APC图标
import apcIcon1 from '@/assets/products/apc-1.png'
import apcIcon2 from '@/assets/products/apc-2.png'
import apcIcon3 from '@/assets/products/apc-3.png'
import apcIcon4 from '@/assets/products/apc-4.png'
import apcIcon5 from '@/assets/products/apc-5.png'

// 导入APC优势图标
import apcFeature1 from '@/assets/products/apc-feature-1.png'
import apcFeature2 from '@/assets/products/apc-feature-2.png'
import apcFeature3 from '@/assets/products/apc-feature-3.png'
import apcFeature4 from '@/assets/products/apc-feature-4.png'
import apcFeature5 from '@/assets/products/apc-feature-5.png'
import apcFeature6 from '@/assets/products/apc-feature-6.png'

// 导入APC典型案例图标
import case1Apc from '@/assets/products/apc-case-1.png'
import case2Apc from '@/assets/products/apc-case-2.png'
import case3Apc from '@/assets/products/apc-case-3.png'
import case4Apc from '@/assets/products/apc-case-4.png'

// 当前显示的部分
const currentSection = ref(0)
// 是否正在滚动中（防止连续触发）
const scrolling = ref(false)
const scrollDelay = 1000 // 滚动延迟

// 产品步骤
const productSteps = ['产品概述', '核心功能', '特色优势', '应用案例']

// 产品描述
const productDescription = '设备预测性维护与健康管理系统，应用工业设备运维中的感知、数字和智能，采用先进的数据技术，以预测维护+数据感知+机理建模为技术心，实现从设备监测预警到设备故障预测和健康评估的完善流程，快速准确推进生产线设备智能化运维能力，提高设备故障预测和检修效率。'
const productDescriptionEam = '对设备全生命周期进行管控，记录设备完备的基础信息档率，对日常管理、运行监测、设备点巡检、润滑保养、预防检修、故障维修、备品备件、知识库等进行管理，帮助企业精确掌握设备运行情况。提高设备可用性，降低运行维护成本，提升企业竞争力。'
const productDescriptionApc = '系统包含数据中心、组件管理、控制编排、系统管理等模块。系统集成了高效率控制算法以及完备的软件安全体系架构，提供强大的建模、优化、控制基础能力，实现数据流、生产流与控制流的协同，提高生产效率，降低生产成本，实现自主可控的智能制造.'

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

const productCasesEam = [case1Eam, case2Eam];

const productCasesApc = [case1Apc, case2Apc, case3Apc, case4Apc];

// EAM产品功能数据
const productFeaturesEam = [
  {
    title: '设备编码',
    description: '建立完整的设备编码体系，循环一物一码一对应关系，可用上下级结构完整定义各级设备的动静参数要素。',
    icon: eamIcon1
  },
  {
    title: '全生命周期管理',
    description: '覆盖设备购置、中修、安装、从设备需求、采购、入库、领用、报废、移交、调拨、租赁、寄存、合作、资质、报废、更换配备等过程全过程管理。',
    icon: eamIcon2
  },
  {
    title: '运维管理',
    description: '以工单为主线，围绕设备维修/保养的流程管理、实现保养、巡检、检修、设备检验、检测管理，为设备提供完善的监控、服务、科学的设备选型服务，实现运维知识的积累。',
    icon: eamIcon3
  },
  {
    title: '预测性维护',
    description: '集成设备运行监测设备，基于设备健康模型，对重点设备进行预测预警，评估设备健康度，以及关键零件的使用和网络，并提供设备和设备功能，以确保设备的稳定、高效运行。',
    icon: eamIcon4
  },
  {
    title: '运行监测',
    description: '提供设备运行数据采集、运行数据统计分析、性能管理、设备运行各种预测能力、分析预警等功能。',
    icon: eamIcon5
  },
  {
    title: '备件管理',
    description: '零部件设备备件消耗变化的跟踪，实现备件安全库存管理能力，让零配件供应高效率。',
    icon: eamIcon6
  }
]

// EAM产品特色优势数据
const productAdvantagesEam = [
  {
    title: '基于关键词的设备全文搜索',
    description: '通过使用分词技术，建立和优化设备全文搜索引擎，可搜索关键词进行多页面信息定位，提高搜索设备信息的匹配和效率。',
    icon: eamFeatureIcon1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '基于语音模块的智能人机交互',
    description: '集成语音、特大电气等生活语音设备与各种接头，无需装配，通过有用户本好的语音驱入与人机交互功能。',
    icon: eamFeatureIcon2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '基于二维码的设备标识技术',
    description: '利用二维码的标识能力和设备识别能力，在设备上贴上易读安装等方式标识二维码，通过扫描二维码进行设备的相配识和定位的应用。',
    icon: eamFeatureIcon3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '智能工单调度算法技术',
    description: '通过综合算术语言处理技术，和派单类和数据分析技术，专家系统和逻辑计划化及实行规范分派拥堵的技术实现智能化工单派工和调度。',
    icon: eamFeatureIcon4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '备件库存分析',
    description: '通过算法分析备零部设备备件消耗变化的预警和设备的化提功，低出合理设备备件块流门管理，并对备部安全存储缺少预算在和为不备或大下预模可名符节保障，过越的成格数据预。',
    icon: eamFeatureIcon5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '便捷化设备管理的移动技术',
    description: '用设备现场，配额维修，点检移执行，保养巡检执行，检设执行多功能移动终端功能，减低企业移动化办公成本，提高设备管理的效率和灵活性。',
    icon: eamFeatureIcon6,
    position: { top: 519, left: 1033 },
    iconPosition: 'right' as const
  }
] as Array<{
  title: string;
  description: string;
  icon: string;
  position: { top: number; left: number };
  iconPosition: 'left' | 'right';
}>;

// APC产品功能数据
const productFeaturesApc = [
  {
    title: '数据采集',
    description: '通过连接的 DCS、PLC等相关系统进行数据采集平台和设备之间的连通，主要是提供传感和执行，设备参数数据的采集、处理、聚集、管理等。',
    icon: apcIcon1
  },
  {
    title: '控制编排',
    description: '为工业控制软件设计了一个并行任务调度计算框架，支持多进程和并行计算，通过可视化加快控制方式的流控制面板，实现流程控制、数据计算。',
    icon: apcIcon2
  },
  {
    title: '组件管理',
    description: '基于UDF实现不同信息间的函数流转，促进多层级组件库和可复用性，在大规模下不同组件的接入与管理。',
    icon: apcIcon3
  },
  {
    title: '驾驶舱',
    description: '提供面向生产过程的数据展示和分析，简洁丰富可视化中的各种数据，方便进行单个一个窗、多视、可视化的监控面板。',
    icon: apcIcon4
  },
  {
    title: '先进控制算法',
    description: '本系统基于先进控制算法如PID、LQR、模糊控制、模型预测控制算法（MPC）等，结合多变量优化（RTO）方法和神经网络连接模型，自动控制最佳方案的数据模型，所涉及的算法应用等能力开发，完全自主可控。',
    icon: apcIcon5
  }
]

// APC产品优势数据
const productAdvantagesApc = [
  {
    title: '大平台化架构',
    description: '低代码平台，平面化算法展示，可实现算法快速更新迭代，框架和模型多领域标准集成并入更多实际算法组件，减少二次开发，门槛低，复用高。',
    icon: apcFeature1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '模块式设计',
    description: '本系统所有场景均是模块化，应用实例，与普通等常规操作可以独立部署，针对模型维编写团队可自定义编辑生产版本，计算分析等功能。',
    icon: apcFeature2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '工业级系统性能',
    description: '系统架构性：前置网络分离\n系统双冗余：满足运行阶段的高效稳健性\n全场景开发量：数据并发量支持大于1000条/秒',
    icon: apcFeature3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '解决高耦合大时滞',
    description: '相对非个控制回路间的多联系多重相互作用，支撑多变量的平行化，通过分析模拟等回避未来出现，操作的制度都设计，根本上解决时延问题。',
    icon: apcFeature4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '稳定控制优化',
    description: '集成理论(多变量提取等)，反馈线状化为一体，通过建立大模型工艺参数的流动，温度机工艺芳香模性，实现可控制。',
    icon: apcFeature5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '更高级控制模式',
    description: '常规生活的实时响应基平常室的反馈控制，用以增强制控功力的APC可在运用传统的控制上留住控制思维方向和稳固的刚柔度，提高了控制器的适应有用表现控制的品质。',
    icon: apcFeature6,
    position: { top: 519, left: 1033 },
    iconPosition: 'right' as const
  }
] as Array<{
  title: string;
  description: string;
  icon: string;
  position: { top: number; left: number };
  iconPosition: 'left' | 'right';
}>;

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