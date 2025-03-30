<template>
  <div class="products-page" @wheel="handleWheel">
    <!-- 产品软件 -->
    <!-- 第一部分：设备预测性维护与健康管理系统 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 0, 'section-hidden': sectionStore.currentSection !== 0 }">
      <ProductHero :background-image="phmBackgroundImage" title="设备预测性维护与健康管理系统（PHM）" />
    </div>

    <!-- 第二部分：产品描述 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 1, 'section-hidden': sectionStore.currentSection !== 1 }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :description="productDescription"
        :video-src="officialVideoSrc" />
    </div>

    <!-- 第三部分：产品功能 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 2, 'section-hidden': sectionStore.currentSection !== 2 }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :features="productFeatures" />
    </div>

    <!-- 第四部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 3, 'section-hidden': sectionStore.currentSection !== 3 }">
      <ProductAdvantages :nav-steps="productSteps" :default-active-step="3" :advantages="productAdvantages" />
    </div>

    <!-- 第五部分：典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 4, 'section-hidden': sectionStore.currentSection !== 4 }">
      <ProductCases :nav-steps="productSteps" :default-active-step="4" :cases="productCases" />
    </div>

    <!-- 第六部分：设备全生命周期管理系统(EAM) -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 5, 'section-hidden': sectionStore.currentSection !== 5 }">
      <ProductHero :background-image="eamBackgroundImage" title="设备全生命周期管理系统(EAM)" />
    </div>

    <!-- 第七部分：产品概述 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 6, 'section-hidden': sectionStore.currentSection !== 6 }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :description="productDescriptionEam"
        :video-src="officialVideoSrc" />
    </div>

    <!-- 第八部分：核心功能 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 7, 'section-hidden': sectionStore.currentSection !== 7 }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :features="productFeaturesEam" />
    </div>

    <!-- 第九部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 8, 'section-hidden': sectionStore.currentSection !== 8 }">
      <ProductAdvantages :nav-steps="productSteps" :default-active-step="3" :advantages="productAdvantagesEam" />
    </div>

    <!-- 第十部分：典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 9, 'section-hidden': sectionStore.currentSection !== 9 }">
      <ProductCases :nav-steps="productSteps" :default-active-step="4" :cases="productCasesEam" />
    </div>

    <!-- 第十一部分：先进过程控制系统(APC) -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 10, 'section-hidden': sectionStore.currentSection !== 10 }">
      <ProductHero :background-image="apcBackgroundImage" title="先进过程控制系统(APC)" />
    </div>

    <!-- 第十二部分：产品概述 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 11, 'section-hidden': sectionStore.currentSection !== 11 }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :description="productDescriptionApc"
        :video-src="officialVideoSrc" />
    </div>

    <!-- 第十三部分：核心功能 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 12, 'section-hidden': sectionStore.currentSection !== 12 }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :features="productFeaturesApc" />
    </div>

    <!-- 第十四部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 13, 'section-hidden': sectionStore.currentSection !== 13 }">
      <ProductAdvantages :nav-steps="productSteps" :default-active-step="3" :advantages="productAdvantagesApc" />
    </div>

    <!-- 第十五部分：典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 14, 'section-hidden': sectionStore.currentSection !== 14 }">
      <ProductCases :nav-steps="productSteps" :default-active-step="4" :cases="productCasesApc" />
    </div>

    <!-- 第十六部分：能源管理与优化系统(EMS) -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 15, 'section-hidden': sectionStore.currentSection !== 15 }">
      <ProductHero :background-image="emsBackgroundImage" title="能源管理与优化系统(EMS)" />
    </div>

    <!-- 第十七部分：产品概述 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 16, 'section-hidden': sectionStore.currentSection !== 16 }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :description="productDescriptionEms"
        :video-src="officialVideoSrc" />
    </div>

    <!-- 第十八部分：核心功能 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 17, 'section-hidden': sectionStore.currentSection !== 17 }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :features="productFeaturesEms" />
    </div>

    <!-- 第十八部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 18, 'section-hidden': sectionStore.currentSection !== 18 }">
      <ProductEmsFeatures :nav-steps="productSteps" :default-active-step="3" main-title="引入核心算法配置模块"
        sub-title="建立能源需求预测与规划" :features="productEmsPredictions" />
    </div>

    <!-- 第十九部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 19, 'section-hidden': sectionStore.currentSection !== 19 }">
      <ProductEmsStrategy :nav-steps="productSteps" :default-active-step="3" title="用能诊断及节能减排策略优化"
        :strategies="emsStrategies" />
    </div>

    <!-- 第二十部分：应用成效 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 20, 'section-hidden': sectionStore.currentSection !== 20 }">
      <ProductEmsResults :nav-steps="productSteps" :default-active-step="4" title="应用成效" :results="emsResults" />
    </div>

    <!-- 第二十一部分：库存优化(IOP) -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 21, 'section-hidden': sectionStore.currentSection !== 21 }">
      <ProductHero title="库存优化(IOP)" :background-image="inventoryBackgroundImage" />
    </div>

    <!-- 第二十二部分：产品描述 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 22, 'section-hidden': sectionStore.currentSection !== 22 }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :description="productDescriptionIop"
        :video-src="officialVideoSrc" />
    </div>

    <!-- 第二十三部分：核心功能 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 23, 'section-hidden': sectionStore.currentSection !== 23 }">
      <ProductIopFeatures :nav-steps="productSteps" :default-active-step="2" />
    </div>

    <!-- 第二十四部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 24, 'section-hidden': sectionStore.currentSection !== 24 }">
      <ProductIopAdvantages :nav-steps="productSteps" :default-active-step="3" />
    </div>

    <!-- 第二十五部分：应用成效 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 25, 'section-hidden': sectionStore.currentSection !== 25 }">
      <ProductIopResults :nav-steps="productSteps" :default-active-step="4" title="应用成效" :results="iopResults" />
    </div>

    <!-- 第二十六部分：生产计划排程(APS) -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 26, 'section-hidden': sectionStore.currentSection !== 26 }">
      <ProductHero title="生产计划排程(APS)" :background-image="apsBackgroundImage" />
    </div>

    <!-- 第二十七部分：产品概述 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 27, 'section-hidden': sectionStore.currentSection !== 27 }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :description="productDescriptionAps"
        :video-src="officialVideoSrc" />
    </div>

    <!-- 第二十八部分：核心功能 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 28, 'section-hidden': sectionStore.currentSection !== 28 }">
      <ProductApsFeatures :nav-steps="productStepsAnother" :default-active-step="2" />
    </div>

    <!-- 第二十九部分：特色优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 29, 'section-hidden': sectionStore.currentSection !== 29 }">
      <ProductAdvantages :nav-steps="productStepsAnother" :default-active-step="3" :advantages="productAdvantagesAps" />
    </div>

    <!-- 产品硬件 -->
    <!-- 第三十部分：有线传感器 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 30, 'section-hidden': sectionStore.currentSection !== 30 }">
      <ProductHardwareSensor :title="wireSensorTitle" :content="wireSensorContent"
        :background-image="hardwareBackground1" :main-image="hardwareScrew" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十一部分：有线传感器 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 31, 'section-hidden': sectionStore.currentSection !== 31 }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1" :title="wireSensorTitle"
        :content="wireSensorContentLight" :main-image="hardwareScrew" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十二部分：有线传感器 - 规格参数表格 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 32, 'section-hidden': sectionStore.currentSection !== 32 }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2" :title="wireSensorTitle"
        :main-image="hardwareTable" :secondary-image="hardwareImage2" />
    </div>


    <!-- 第三十三部分：有线传感器 - 无线智能传感器 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 33, 'section-hidden': sectionStore.currentSection !== 33 }">
      <ProductHardwareSensor :title="wirelessSensorTitle" :content="[]" :background-image="hardwareBackground1"
        :main-image="hardwareWireless" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十四部分：有线传感器 - 产品亮点 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 34, 'section-hidden': sectionStore.currentSection !== 34 }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1" :title="wirelessSensorTitle"
        :content="wirelessSensorContentLight" :main-image="hardwareWireless" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十五部分：有线传感器 - 规格参数表格 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 35, 'section-hidden': sectionStore.currentSection !== 35 }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2" :title="wireSensorModelTitle"
        :main-image="hardwareTable2" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十六部分：边缘智能采集器-->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 36, 'section-hidden': sectionStore.currentSection !== 36 }">
      <ProductHardwareSensor :title="edgeSmartCollectorTitle" :content="wirelessSensorContent"
        :background-image="hardwareBackground1" :main-image="hardwareEdge" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十七部分：边缘智能采集器 - 产品亮点 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 37, 'section-hidden': sectionStore.currentSection !== 37 }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1"
        :title="edgeSmartCollectorTitle" :content="edgeSmartCollectorContentLight" :main-image="hardwareEdge2"
        :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十八部分：边缘智能采集器 - 规格参数 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 38, 'section-hidden': sectionStore.currentSection !== 38 }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2"
        :title="edgeSmartCollectorTitle" :main-image="hardwareTable3" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十九部分：无线智能网关 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 39, 'section-hidden': sectionStore.currentSection !== 39 }">
      <ProductHardwareSensor :title="wirelessSmartGatewayTitle" :content="wirelessSmartGatewayContent"
        :background-image="hardwareBackground1" :main-image="hardwareGateway" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第四十部分：无线智能网关 - 产品亮点-->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 40, 'section-hidden': sectionStore.currentSection !== 40 }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1"
        :title="wirelessSmartGatewayTitle" :content="wirelessSmartGatewayContentLight" :main-image="hardwareGateway"
        :secondary-image="hardwareImage2" />
    </div>

    <!-- 第四十一部分：无线智能网关 - 规格参数-->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 41, 'section-hidden': sectionStore.currentSection !== 41 }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2"
        :title="wirelessSmartGatewayTitle" :main-image="hardwareTable4" :secondary-image="hardwareImage2" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import ProductHero from '@/components/products/ProductHero.vue'
import ProductDescription from '@/components/products/ProductDescription.vue'
import ProductFeatures from '@/components/products/ProductFeatures.vue'
import ProductAdvantages from '@/components/products/ProductAdvantages.vue'
import ProductCases from '@/components/products/ProductCases.vue'
import ProductEmsFeatures from '@/components/products/ProductEmsFeatures.vue'
import ProductEmsStrategy from '@/components/products/ProductEmsStrategy.vue'
import ProductEmsResults from '@/components/products/ProductEmsResults.vue'
import ProductIopFeatures from '@/components/products/ProductIopFeatures.vue'
import ProductIopAdvantages from '@/components/products/ProductIopAdvantages.vue'
import ProductIopResults from '@/components/products/ProductIopResults.vue'
import ProductApsFeatures from '@/components/products/ProductApsFeatures.vue'
import ProductHardwareSensor from '@/components/products/ProductHardwareSensor.vue'
import ProductHardwareSensorLight from '@/components/products/ProductHardwareSensorLight.vue'
import ProductHardwareSensorModel from '@/components/products/ProductHardwareSensorModel.vue'

// 直接导入图片和视频
import phmBackgroundImage from '@/assets/products/software-bg-1.png'
import officialVideoSrc from '@/assets/video/official_video.mp4'
import eamBackgroundImage from '@/assets/products/bg_EAM.png'

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
import apcBackgroundImage from '@/assets/products/bg_APC.png'

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

// 导入EMS背景图片
import emsBackgroundImage from '@/assets/products/bg_EMS.png'

// 导入EMS图标
import emsIcon1 from '@/assets/products/ems-1.png'
import emsIcon2 from '@/assets/products/ems-2.png'
import emsIcon3 from '@/assets/products/ems-3.png'
import emsIcon4 from '@/assets/products/ems-4.png'
import emsIcon5 from '@/assets/products/ems-5.png'

// 导入EMS应用成效图标
import emsApplication1 from '@/assets/products/ems-application-1.png'
import emsApplication2 from '@/assets/products/ems-application-2.png'
import emsApplication3 from '@/assets/products/ems-application-3.png'

// 导入库存优化(IOP)背景图片
import inventoryBackgroundImage from '@/assets/products/iop-bg.jpg'

// 导入IOP应用成效图标
import iopApplication1 from '@/assets/products/iop-application-1.png'
import iopApplication2 from '@/assets/products/iop-application-2.png'
import iopApplication3 from '@/assets/products/iop-application-3.png'
import iopApplication4 from '@/assets/products/iop-application-4.png'
import iopApplication5 from '@/assets/products/iop-application-5.png'
import iopApplication6 from '@/assets/products/iop-application-6.png'



// 导入APS背景图片
import apsBackgroundImage from '@/assets/products/bg_APS.png'

// 导入APS优势图标
import apsFeature1 from '@/assets/products/aps-feature-1.png'
import apsFeature2 from '@/assets/products/aps-feature-2.png'
import apsFeature3 from '@/assets/products/aps-feature-3.png'
import apsFeature4 from '@/assets/products/aps-feature-4.png'
import apsFeature5 from '@/assets/products/aps-feature-5.png'
import apsFeature6 from '@/assets/products/aps-feature-6.png'

//======================硬件======================
// 导入有线传感器相关资源
import hardwareBackground1 from '@/assets/products/hardware-1.png'
import hardwareScrew from '@/assets/products/hardware-screw.png'
import hardwareImage2 from '@/assets/products/hardware-2.png'
import hardwareTable from '@/assets/products/hardware-table-1.png'
import hardwareTable2 from '@/assets/products/hardware-table-2.png'
import hardwareWireless from '@/assets/products/hardware-wireless-1.png'
import hardwareEdge from '@/assets/products/hardware-edge-1.png'
import hardwareEdge2 from '@/assets/products/hardware-edge-2.png'
import hardwareTable3 from '@/assets/products/hardware-table-3.png'
import hardwareGateway from '@/assets/products/hardware-gateway-1.png'
import hardwareTable4 from '@/assets/products/hardware-table-4.png'

const route = useRoute()
// 使用 Pinia store 代替本地状态
const sectionStore = useSectionStore()
const scrolling = ref(false);
const scrollDelay = 1000; // 滚动延迟，防止连续滚动

// 产品步骤
const productSteps = ['产品概述', '核心功能', '特色优势', '应用案例']
//产品步骤 - 简略
const productStepsAnother = ['产品概述', '核心功能', '特色优势']
//产品步骤 - 有线传感器
const productStepsLight = ['产品亮点', '规格参数']
//产品步骤
// const productStepsAnother = ['产品概述', '核心功能', '特色优势', '应用成效']
// 产品描述
const productDescription = '设备预测性维护与健康管理系统，应用工业设备运维中的感知、数字和智能，采用先进的数据技术，以预测维护+数据感知+机理建模为技术心，实现从设备监测预警到设备故障预测和健康评估的完善流程，快速准确推进生产线设备智能化运维能力，提高设备故障预测和检修效率。'
const productDescriptionEam = '对设备全生命周期进行管控，记录设备完备的基础信息档率，对日常管理、运行监测、设备点巡检、润滑保养、预防检修、故障维修、备品备件、知识库等进行管理，帮助企业精确掌握设备运行情况。提高设备可用性，降低运行维护成本，提升企业竞争力。'
const productDescriptionApc = '系统包含数据中心、组件管理、控制编排、系统管理等模块。系统集成了高效率控制算法以及完备的软件安全体系架构，提供强大的建模、优化、控制基础能力，实现数据流、生产流与控制流的协同，提高生产效率，降低生产成本，实现自主可控的智能制造.'
const productDescriptionEms = '能源管理与优化系统采用自动化、信息化技术和集中管理模式，对用能设备的生产、输配和消耗环节实行集中扁平化的动态监控和数据化管理，通过数据监测、趋势分析与诊断优化，帮助企业针对各种能源需求及用能情况、能源质量、产品能源单耗、各工序能耗、重大能耗设备的能源利用情况等进行能耗监测统计、能源成本分析、用能预测，为企业优化能源管理，提高能源利用效率、挖据节能潜力、节能评估提供基础数据和支持。'
const productDescriptionIop = '以人工智能驱动的需求预测技术和针对不同成品、原料、备件品类的补货策略为基础，提供补货点、补货量及特殊情景下的备货方案，帮助仓库和工厂做出更明智的采购和补货决策，解决企业面临的预测和库存计划问题。通过为企业定制智能补货方案，真正实现需求驱动的供应链管理与生产智能化提升供应链柔性，降本增效。'
const productDescriptionAps = '生产计划排程软件使用先进算法平衡需求和产能，生成生产计划，协调物料、人员和设备有效利用，缩短交货时间以满足客户需求，并快速响应生产意外变化。APS系统涵盖数月甚至数年的长期战略规划、数周的中期战术规划以及短期的详细排程。'

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

// APS产品特色优势数据
const productAdvantagesAps = [
  {
    title: '降低成本',
    description: '在制造业中常见设备的未来集，APS项目使需求合理，避免生产系统中心动态数计的水平生产效率生产用，加强生产编制能力分配，资源更高效，更低成本与货物出产能力。',
    icon: apsFeature1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '增强决策能力',
    description: '以更高为主和重，APS执入为年生产过程，供给产销预测，所有预算与设与方仲优化规划生产掌控，控合整体化力与展的规划，增强决策能力。',
    icon: apsFeature2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '保证准时交货',
    description: '通过高速的准备能力，实施提供安排，APS可完取确同的生产周期，确保产品按客户需要抹保供货，提出客单组织的资源，项目成本。',
    icon: apsFeature3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '提高产品质量',
    description: '提高产品质量和水平，APS确保生产过程保到统行，常规均能促进规则的优质，将一规定应符合规范分级保证生产的满足需，计划方满足，提升能力。',
    icon: apsFeature4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '提高灵活性和响应能力',
    description: '通过生产作能录优，APS项模型为结，利用企业应通供与需求分的约束分析策，实现信规则，提出关高度生产计划，保持业务变和动态调整。',
    icon: apsFeature5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '支持可持续性发展',
    description: '制造业现可持续是跟然材料战略合，APS化化资源利用，减少浪废，现地的最终找，可用能量的生产调整的策划，最外作过程降低。',
    icon: apsFeature6,
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

// EMS产品功能数据
const productFeaturesEms = [
  {
    title: '能耗监测',
    description: '通过部署北向方案采集各能源数据传输，并且系统能够实时参数管理生成可视化精准分析计算，提供看，运力，温度等，并且在信息展示上进行直观，为能源数据提供支撑，了解到明确数据变化。',
    icon: emsIcon1
  },
  {
    title: '能力平衡与能耗分析',
    description: '对生物能能源场的进工程设计场，碳能负荷，用能平衡和标准化指导系统的应用，如实现机筒能把模型和能耗模型的搭建，数据收集和用能分析。',
    icon: emsIcon2
  },
  {
    title: '能源成本分析',
    description: '运用算法北向技术计分析各电站水电站成本分析，归类各电能消耗主要影响因素，功能分析结果。',
    icon: emsIcon3
  },
  {
    title: '能源需求预测与规划',
    description: '应用花果采为加强管理理论化和流程化管理，建立有规模生产历史数据分析计，结合能源预测模型和能源规划技术，达到用能高效规范，降低能源预算预测合理性，过程用量的数据预。',
    icon: emsIcon4
  },
  {
    title: '用能诊断与优化',
    description: '分析和预测能源需求，结合设备运转状态，运行设置，成本分析等因素，并解决能源使用瓶颈，输出综合能源诊断报告及产品建议，设备资源调度建议和能源品质建议。',
    icon: emsIcon5
  }
]


// EMS预测功能数据
const productEmsPredictions = [
  {
    title: '自回归模型',
    description: '基于前一个时间段模型，使用过去能中的能源消耗与特性能源需求进行处理，更好的捕捉能源的短期周期性变化，成因在能源需求预测中的能源消耗特征。'
  },
  {
    title: '时间序列算法',
    description: '对未来的能源消耗与过去的能源消耗规律关联，考虑周期分析和机理模型应用场景的趋势，创造未来的能源预测，帮助企业能源生产计划。'
  },
  {
    title: '负荷预测算法',
    description: '针对负荷预测和能源管理场景，检验负荷用电预测用于评估未来电用电特定时间段的用电负荷量动力能源趋势值，预能力增长功。'
  }
]

// EMS策略数据
const emsStrategies = [
  {
    description: '助力改善园区的照明系统，并结合自动感应、时控开关、远程控制等手段，帮助园区减少不必要的照明能耗。'
  },
  {
    description: '合理调整用能设备的运行策略，如优化启停时间、降低设备运行负载等，减少不必要的能源消耗'
  }
]

// 添加EMS成效数据
const emsResults = [
  {
    icon: emsApplication1,
    title: '降低成本',
    description: '降低企业实际能源集耗消耗，防止企业能源超标，提高同工作产能，提高企业经济效益',
    number: '0.83%-1%'
  },
  {
    icon: emsApplication2,
    title: '提升劳动生产率',
    description: '代替人工工业资源分析采集，做优化调，终止待工作，设备预测生产管理提升',
    number: '8%'
  },
  {
    icon: emsApplication3,
    title: '提升合格率',
    description: '系统自动优化控制应用，用能分析提高生产线能效提升',
    number: '10%-34%'
  }
]

// 库存优化(IOP)应用成效
const iopResults = [
  {
    icon: iopApplication1,
    title: '降低库存成本',
    description: '降低库存成本，利用深度算法和预测分析，帮助客户降低库存水平，合理补货，为用户创造经济效益。'
  },
  {
    icon: iopApplication2,
    title: '降低库存积压',
    description: '提升库存周转率，通过定制化预测流程与柔性化库存算法，确保合适库存水平与天数。'
  },
  {
    icon: iopApplication3,
    title: '降低缺货返单险',
    description: '通过定时库存检验和补充，结合企业实时库存状态，保证供应和用户需求均衡满足能力。'
  },
  {
    icon: iopApplication4,
    title: '提高客户满意度',
    description: '保证产品的持续可用性，提高客户满意度，通过订单快速和保证交货，从而提高客户忠诚度和回购率。'
  },
  {
    icon: iopApplication5,
    title: '提高资金利用率',
    description: '提升资金合理利用率和分配合理性的优化效果，企业可以科学精准地进行并增加金额部署和结构优化，优化生产资金，保证财务运转。'
  },
  {
    icon: iopApplication6,
    title: '增强企业竞争力',
    description: '加强供应链贯通能力，利用科学工具和智能算法增强竞争力，从而增强企业竞争力。'
  }
]

// 有线传感器标题
const wireSensorTitle = '有线传感器'
//无线智能传感器
const wirelessSensorTitle = '无线智能传感器'
// 有线传感器规格参数表格标题
const wireSensorModelTitle = '有无线振温传感器DN102'
// 边缘智能采集器
const edgeSmartCollectorTitle = '边缘智能采集器'
// 无线智能网关
const wirelessSmartGatewayTitle = '无线智能网关'
// 有线传感器内容
const wireSensorContent = [
  { title: '加速度传感器（通频）', model: 'CHAOS AC102' },
  { title: '加速度传感器（低频）', model: 'CHAOS AC133' },
  { title: '振通一体传感器（通频）', model: 'CHAOS TA202' },
  { title: '振通一体传感器（低频）', model: 'CHAOS TA233' },
  { title: '防爆振通一体传感器（通频）', model: 'CHAOS TA935' },
  { title: '应力波传感器', model: 'CHAOS SW301' }
]

// 无线智能传感器内容
const wirelessSensorContent = [
  { title: '边缘智能' },
  { title: '精准测量' },
  { title: '通讯便捷' },
  { title: '自主可控' },
  { title: '国产替代' },
]

// 无线智能网关内容
const wirelessSmartGatewayContent = [
  {
    title: '支持地温传感器数量',
    value: '32',
    unit: '个',
    highlight: true
  },
  {
    title: '特征数据存储天数',
    value: '30',
    unit: '天',
    highlight: true
  },
  {
    title: '防护等级',
    value: 'IP66',
    unit: '',
    highlight: true
  }
]
const wireSensorContentLight = [
  {
    title: "型号齐全 应用广泛",
    description: "产品规格型号丰富的传感器产品线，包括温湿度一体传感器，适应各类应用场景和环境需求。"
  },
  {
    title: "低噪设计 精度卓越",
    description: "通过优化传感器核心电路设计，确保测量结果的稳定性和准确性，为精密分析和控制提供支持。"
  },
  {
    title: "宽频覆盖 全面响应",
    description: "具有宽频率测量范围的设计，满足各种测试和监控应用的需求。"
  },
  {
    title: "高灵敏度 精准监测",
    description: "灵敏度高度优化，能够检测到极小的环境变化，为精密监测提供保障。"
  }
]

// 无线智能传感器内容
const wirelessSensorContentLight = [
  {
    title: "Zigbee技术 部署灵活",
    description: "采用Zigbee无线传输技术，提高部署灵活性，无线通信功能强。"
  },
  {
    title: "NFC配置 便捷无忧",
    description: "NFC用于传感器参数配置，非接触式参数设置，配置更高效。"
  },
  {
    title: "长寿耐用 维护成本低",
    description: "根据SDK适当并采用超三年以上续航，减少维护成本。"
  },
  {
    title: "IP68防护 环境耐受",
    description: "IP68防护等级，适合各种恶劣的工业环境。"
  },
  {
    title: "防爆认证 安全保障",
    description: "具备防爆认证，适用于需要爆炸风险防护，提供更安全。"
  },
  {
    title: "边缘计算 智能预警",
    description: "具备边缘计算能力，将部分计算和数据处理放置到传感器端进行。"
  }
]

// 边缘智能采集器产品亮点
const edgeSmartCollectorContentLight = [
  {
    title: "型号齐全 性能定制",
    description: "提供不同性能和配置的型号，适应不同规模和要求的设备。"
  },
  {
    title: "对标国际 功能卓越",
    description: "与国外高端产品同步的技术路线：ARM + FPGA的SoC架构设计，实现边缘计算。"
  },
  {
    title: "WEB配置 高效灵活",
    description: "通过配置灵活，支持传感器类型众多。"
  },
  {
    title: "ARM双核 性能强劲",
    description: "搭载ARM双核处理器和不同容量的内存与存储，支持复杂的数据处理。"
  },
  {
    title: "通道灵活 采集精准",
    description: "支持高速和低速采集通道的组合，适应不同的数据采集需求。"
  },
  {
    title: "通信多样 集成便捷",
    description: "支持以太网/WIFI/蓝牙等通信方式，易于系统集成和数据传输。"
  }
]

// 无线智能网关产品亮点
const wirelessSmartGatewayContentLight = [
  {
    title: "通讯多样 数据可靠",
    description: "支持5G、4G、WiFi、以太网、光纤等多种通信方式，保障数据传输的完整性与可靠性。"
  },
  {
    title: "网页配置 流程简便",
    description: "支持Web网页配置，无需安装软件，简化配置过程。"
  },
  {
    title: "功能丰富 方便易用",
    description: "集成数据采集、数据转发与分析工具，提高集成部署管理和使用效率。"
  },
  {
    title: "深入分析 精准诊断",
    description: "多种数据分析与物联网接口，为设备状态监测和故障诊断提供深入的数据分析。"
  }
]

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return;

  scrolling.value = true;

  // 向下滚动，最大值为41
  if (e.deltaY > 0 && sectionStore.currentSection < 41) {
    sectionStore.nextSection(41);
  }
  // 向上滚动
  else if (e.deltaY < 0 && sectionStore.currentSection > 0) {
    sectionStore.prevSection();
  }

  // 设置滚动延迟
  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

// 处理键盘事件
const handleKeyDown = (e: KeyboardEvent) => {
  if (scrolling.value) return;

  scrolling.value = true;

  // 向下箭头或Page Down，最大值为41
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && sectionStore.currentSection < 41) {
    sectionStore.nextSection(41);
  }
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && sectionStore.currentSection > 0) {
    sectionStore.prevSection();
  }

  setTimeout(() => {
    scrolling.value = false;
  }, scrollDelay);
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden';

  // 检查URL参数中是否有section，有则跳转到对应section
  if (route.query.section) {
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 41) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
});

// 添加路由监听器，以支持浏览器前进后退按钮和URL参数变化
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 41) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);

  // 恢复浏览器默认滚动行为
  document.body.style.overflow = '';
  // 重置section状态, 否则在返回时会停留在当前section
  sectionStore.setCurrentSection(0)
});
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