<template>
  <div class="products-page" @wheel="handleWheel">
    <!-- 产品软件 -->
    <!-- 第一部分：设备预测性维护与健康管理系统 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 0,
        inactive: sectionStore.currentSection !== 0,
        'slide-prev': sectionStore.currentSection > 0,
        'slide-next': sectionStore.currentSection < 0
      }">
      <ProductHero :background-image="phmBackgroundImage" title="设备预测性维护与健康管理系统（PHM）" />
    </div>

    <!-- 第二部分：产品描述 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 1,
        inactive: sectionStore.currentSection !== 1,
        'slide-prev': sectionStore.currentSection > 1,
        'slide-next': sectionStore.currentSection < 1
      }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :section-numbers="[1, 2, 3, 4]" :description="productDescription"
        :media-src="phmVideo" :media-type="'video'" />
    </div>

    <!-- 第三部分：产品功能 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 2,
        inactive: sectionStore.currentSection !== 2,
        'slide-prev': sectionStore.currentSection > 2,
        'slide-next': sectionStore.currentSection < 2
      }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :section-numbers="[1, 2, 3, 4]" :features="productFeatures" />
    </div>

    <!-- 第四部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 3,
        inactive: sectionStore.currentSection !== 3,
        'slide-prev': sectionStore.currentSection > 3,
        'slide-next': sectionStore.currentSection < 3
      }">
      <ProductAdvantages :nav-steps="productSteps" :default-active-step="3" :section-numbers="[1, 2, 3, 4]" :advantages="productAdvantages" />
    </div>

    <!-- 第五部分：典型案例 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 4,
        inactive: sectionStore.currentSection !== 4,
        'slide-prev': sectionStore.currentSection > 4,
        'slide-next': sectionStore.currentSection < 4
      }">
      <ProductCases :nav-steps="productSteps" :default-active-step="4" :section-numbers="[1, 2, 3, 4]" :cases="productCases" />
    </div>

    <!-- 第六部分：设备全生命周期管理系统(EAM) -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 5,
        inactive: sectionStore.currentSection !== 5,
        'slide-prev': sectionStore.currentSection > 5,
        'slide-next': sectionStore.currentSection < 5
      }">
      <ProductHero :background-image="eamBackgroundImage" title="设备全生命周期管理系统（EAM）" />
    </div>

    <!-- 第七部分：产品概述 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 6,
        inactive: sectionStore.currentSection !== 6,
        'slide-prev': sectionStore.currentSection > 6,
        'slide-next': sectionStore.currentSection < 6
      }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :section-numbers="[6, 7, 8, 9]" :description="productDescriptionEam"
        :media-src="eamVideo" :media-type="'video'" />
    </div>

    <!-- 第八部分：核心功能 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 7,
        inactive: sectionStore.currentSection !== 7,
        'slide-prev': sectionStore.currentSection > 7,
        'slide-next': sectionStore.currentSection < 7
      }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :section-numbers="[6, 7, 8, 9]" :features="productFeaturesEam" />
    </div>

    <!-- 第九部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 8,
        inactive: sectionStore.currentSection !== 8,
        'slide-prev': sectionStore.currentSection > 8,
        'slide-next': sectionStore.currentSection < 8
      }">
      <ProductAdvantages :nav-steps="productSteps" :default-active-step="3" :section-numbers="[6, 7, 8, 9]" :advantages="productAdvantagesEam" />
    </div>

    <!-- 第十部分：典型案例 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 9,
        inactive: sectionStore.currentSection !== 9,
        'slide-prev': sectionStore.currentSection > 9,
        'slide-next': sectionStore.currentSection < 9
      }">
      <ProductCases :nav-steps="productSteps" :default-active-step="4" :section-numbers="[6, 7, 8, 9]" :cases="productCasesEam" />
    </div>

    <!-- 第十一部分：先进过程控制系统(APC) -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 10,
        inactive: sectionStore.currentSection !== 10,
        'slide-prev': sectionStore.currentSection > 10,
        'slide-next': sectionStore.currentSection < 10
      }">
      <ProductHero :background-image="apcBackgroundImage" title="先进过程控制系统（APC）" />
    </div>

    <!-- 第十二部分：产品概述 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 11,
        inactive: sectionStore.currentSection !== 11,
        'slide-prev': sectionStore.currentSection > 11,
        'slide-next': sectionStore.currentSection < 11
      }">
      <ProductDescription :nav-steps="productSteps" :default-active-step="1" :section-numbers="[11, 12, 13, 14]" :description="productDescriptionApc"
        :media-src="apcPhoto" :media-type="'image'" />
    </div>

    <!-- 第十三部分：核心功能 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 12,
        inactive: sectionStore.currentSection !== 12,
        'slide-prev': sectionStore.currentSection > 12,
        'slide-next': sectionStore.currentSection < 12
      }">
      <ProductFeatures :nav-steps="productSteps" :default-active-step="2" :section-numbers="[11, 12, 13, 14]" :features="productFeaturesApc" />
    </div>

    <!-- 第十四部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 13,
        inactive: sectionStore.currentSection !== 13,
        'slide-prev': sectionStore.currentSection > 13,
        'slide-next': sectionStore.currentSection < 13
      }">
      <ProductAdvantages :nav-steps="productSteps" :default-active-step="3" :section-numbers="[11, 12, 13, 14]" :advantages="productAdvantagesApc" />
    </div>

    <!-- 第十五部分：典型案例 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 14,
        inactive: sectionStore.currentSection !== 14,
        'slide-prev': sectionStore.currentSection > 14,
        'slide-next': sectionStore.currentSection < 14
      }">
      <ProductCases :nav-steps="productSteps" :default-active-step="4" :section-numbers="[11, 12, 13, 14]" :cases="productCasesApc" />
    </div>

    <!-- 第十六部分：能源管理与优化系统(EMS) -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 15,
        inactive: sectionStore.currentSection !== 15,
        'slide-prev': sectionStore.currentSection > 15,
        'slide-next': sectionStore.currentSection < 15
      }">
      <ProductHero :background-image="emsBackgroundImage" title="能源管理与优化系统（EMS）" />
    </div>

    <!-- 第十七部分：产品概述 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 16,
        inactive: sectionStore.currentSection !== 16,
        'slide-prev': sectionStore.currentSection > 16,
        'slide-next': sectionStore.currentSection < 16
      }">
      <ProductDescription :nav-steps="productStepsEffect" :default-active-step="1" :section-numbers="[16, 17, 18, 19, 20]" :description="productDescriptionEms"
        :media-src="emsPhoto" :media-type="'image'" />
    </div>

    <!-- 第十八部分：核心功能 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 17,
        inactive: sectionStore.currentSection !== 17,
        'slide-prev': sectionStore.currentSection > 17,
        'slide-next': sectionStore.currentSection < 17
      }">
      <ProductFeatures :nav-steps="productStepsEffect" :default-active-step="2" :section-numbers="[16, 17, 18, 19, 20]" :features="productFeaturesEms" />
    </div>

    <!-- 第十八部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 18,
        inactive: sectionStore.currentSection !== 18,
        'slide-prev': sectionStore.currentSection > 18,
        'slide-next': sectionStore.currentSection < 18
      }">
      <ProductEmsFeatures :nav-steps="productStepsEffect" :default-active-step="3" :section-numbers="[16, 17, 18, 19, 20]" main-title="引入核心算法配置模块"
        sub-title="建立能源需求预测与规划" :features="productEmsPredictions" />
    </div>

    <!-- 第十九部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 19,
        inactive: sectionStore.currentSection !== 19,
        'slide-prev': sectionStore.currentSection > 19,
        'slide-next': sectionStore.currentSection < 19
      }">
      <ProductEmsStrategy :nav-steps="productStepsEffect" :default-active-step="3" :section-numbers="[16, 17, 18, 19, 20]" title="用能诊断及节能减排策略优化"
        :strategies="emsStrategies" />
    </div>

    <!-- 第二十部分：应用成效 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 20,
        inactive: sectionStore.currentSection !== 20,
        'slide-prev': sectionStore.currentSection > 20,
        'slide-next': sectionStore.currentSection < 20
      }">
      <ProductEmsResults :nav-steps="productStepsEffect" :default-active-step="4" :section-numbers="[16, 17, 18, 19, 20]" title="应用成效" :results="emsResults" />
    </div>

    <!-- 第二十一部分：库存优化(IOP) -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 21,
        inactive: sectionStore.currentSection !== 21,
        'slide-prev': sectionStore.currentSection > 21,
        'slide-next': sectionStore.currentSection < 21
      }">
      <ProductHero title="库存优化（IOP）" :background-image="inventoryBackgroundImage" />
    </div>

    <!-- 第二十二部分：产品描述 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 22,
        inactive: sectionStore.currentSection !== 22,
        'slide-prev': sectionStore.currentSection > 22,
        'slide-next': sectionStore.currentSection < 22
      }">
      <ProductDescription :nav-steps="productStepsEffect" :default-active-step="1" :section-numbers="[22, 23, 24, 25]" :description="productDescriptionIop"
        :media-src="iopVideo" :media-type="'video'" />
    </div>

    <!-- 第二十三部分：核心功能 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 23,
        inactive: sectionStore.currentSection !== 23,
        'slide-prev': sectionStore.currentSection > 23,
        'slide-next': sectionStore.currentSection < 23
      }">
      <ProductIopFeatures :nav-steps="productStepsEffect" :default-active-step="2" :section-numbers="[22, 23, 24, 25]" />
    </div>

    <!-- 第二十四部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 24,
        inactive: sectionStore.currentSection !== 24,
        'slide-prev': sectionStore.currentSection > 24,
        'slide-next': sectionStore.currentSection < 24
      }">
      <ProductIopAdvantages :nav-steps="productStepsEffect" :default-active-step="3" :section-numbers="[22, 23, 24, 25]" />
    </div>

    <!-- 第二十五部分：应用成效 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 25,
        inactive: sectionStore.currentSection !== 25,
        'slide-prev': sectionStore.currentSection > 25,
        'slide-next': sectionStore.currentSection < 25
      }">
      <ProductIopResults :nav-steps="productStepsEffect" :default-active-step="4" :section-numbers="[22, 23, 24, 25]" title="应用成效" :results="iopResults" />
    </div>

    <!-- 第二十六部分：生产计划排程(APS) -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 26,
        inactive: sectionStore.currentSection !== 26,
        'slide-prev': sectionStore.currentSection > 26,
        'slide-next': sectionStore.currentSection < 26
      }">
      <ProductHero title="生产计划排程（APS）" :background-image="apsBackgroundImage" />
    </div>

    <!-- 第二十七部分：产品概述 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 27,
        inactive: sectionStore.currentSection !== 27,
        'slide-prev': sectionStore.currentSection > 27,
        'slide-next': sectionStore.currentSection < 27
      }">
      <ProductDescription :nav-steps="productStepsAnother" :default-active-step="1" :section-numbers="[27, 28, 29]" :description="productDescriptionAps"
        :media-src="apsPhoto" :media-type="'image'" />
    </div>

    <!-- 第二十八部分：核心功能 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 28,
        inactive: sectionStore.currentSection !== 28,
        'slide-prev': sectionStore.currentSection > 28,
        'slide-next': sectionStore.currentSection < 28
      }">
      <ProductApsFeatures :nav-steps="productStepsAnother" :default-active-step="2" :section-numbers="[27, 28, 29]" />
    </div>

    <!-- 第二十九部分：特色优势 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 29,
        inactive: sectionStore.currentSection !== 29,
        'slide-prev': sectionStore.currentSection > 29,
        'slide-next': sectionStore.currentSection < 29
      }">
      <ProductAdvantages :nav-steps="productStepsAnother" :default-active-step="3" :section-numbers="[27, 28, 29]" :advantages="productAdvantagesAps" />
    </div>

    <!-- 产品硬件 -->
    <!-- 第三十部分：有线传感器 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 30,
        inactive: sectionStore.currentSection !== 30,
        'slide-prev': sectionStore.currentSection > 30,
        'slide-next': sectionStore.currentSection < 30
      }">
      <ProductHardwareSensor :title="wireSensorTitle" :content="wireSensorContent"
        :background-image="hardwareBackground1" :main-image="hardwareScrew" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十一部分：有线传感器 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 31,
        inactive: sectionStore.currentSection !== 31,
        'slide-prev': sectionStore.currentSection > 31,
        'slide-next': sectionStore.currentSection < 31
      }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1" :title="wireSensorTitle" :section-numbers="[31, 32]"
        :content="wireSensorContentLight" :main-image="hardwareScrew" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十二部分：有线传感器 - 规格参数表格 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 32,
        inactive: sectionStore.currentSection !== 32,
        'slide-prev': sectionStore.currentSection > 32,
        'slide-next': sectionStore.currentSection < 32
      }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2" :title="wireSensorTitle" :section-numbers="[31, 32]"
        :main-image="hardwareTable" :secondary-image="hardwareImage2" />
    </div>


    <!-- 第三十三部分：有线传感器 - 无线智能传感器 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 33,
        inactive: sectionStore.currentSection !== 33,
        'slide-prev': sectionStore.currentSection > 33,
        'slide-next': sectionStore.currentSection < 33
      }">
      <ProductHardwareSensor :title="wirelessSensorTitle" :content="[]" :background-image="hardwareBackground1"
        :main-image="hardwareWireless" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十四部分：有线传感器 - 产品亮点 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 34,
        inactive: sectionStore.currentSection !== 34,
        'slide-prev': sectionStore.currentSection > 34,
        'slide-next': sectionStore.currentSection < 34
      }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1" :section-numbers="[34, 35]" :title="wirelessSensorTitle"
        :content="wirelessSensorContentLight" :main-image="hardwareWireless" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十五部分：有线传感器 - 规格参数表格 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 35,
        inactive: sectionStore.currentSection !== 35,
        'slide-prev': sectionStore.currentSection > 35,
        'slide-next': sectionStore.currentSection < 35
      }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2" :section-numbers="[34, 35]" :title="wireSensorModelTitle"
        :main-image="hardwareTable2" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十六部分：边缘智能采集器-->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 36,
        inactive: sectionStore.currentSection !== 36,
        'slide-prev': sectionStore.currentSection > 36,
        'slide-next': sectionStore.currentSection < 36
      }">
      <ProductHardwareSensor :title="edgeSmartCollectorTitle" :content="wirelessSensorContent"
        :background-image="hardwareBackground1" :main-image="hardwareEdge" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十七部分：边缘智能采集器 - 产品亮点 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 37,
        inactive: sectionStore.currentSection !== 37,
        'slide-prev': sectionStore.currentSection > 37,
        'slide-next': sectionStore.currentSection < 37
      }">
      <ProductHardwareSensorLight :nav-steps="['产品亮点']" :default-active-step="1" :section-numbers="[37]"
        :title="edgeSmartCollectorTitle" :content="edgeSmartCollectorContentLight" :main-image="hardwareEdge2"
        :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十八部分：边缘智能采集器 - 规格参数 -->
    <!-- 已隐藏：边缘智能采集器模块的规格参数部分 -->
    <!--
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 38,
        inactive: sectionStore.currentSection !== 38,
        'slide-prev': sectionStore.currentSection > 38,
        'slide-next': sectionStore.currentSection < 38
      }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2" :section-numbers="[37, 38]"
        :title="edgeSmartCollectorTitle" :main-image="hardwareTable3" :secondary-image="hardwareImage2" />
    </div>
    -->

    <!-- 第三十八部分：无线智能网关 -->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 38,
        inactive: sectionStore.currentSection !== 38,
        'slide-prev': sectionStore.currentSection > 38,
        'slide-next': sectionStore.currentSection < 38
      }">
      <ProductHardwareSensor :title="wirelessSmartGatewayTitle" :content="wirelessSmartGatewayContent"
        :background-image="hardwareBackground1" :main-image="hardwareGateway" :secondary-image="hardwareImage2" />
    </div>

    <!-- 第三十九部分：无线智能网关 - 产品亮点-->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 39,
        inactive: sectionStore.currentSection !== 39,
        'slide-prev': sectionStore.currentSection > 39,
        'slide-next': sectionStore.currentSection < 39
      }">
      <ProductHardwareSensorLight :nav-steps="productStepsLight" :default-active-step="1" :section-numbers="[38, 39, 40]"
        :title="wirelessSmartGatewayTitle" :content="wirelessSmartGatewayContentLight" :main-image="hardwareGateway"
        :secondary-image="hardwareImage2" />
    </div>

    <!-- 第四十部分：无线智能网关 - 规格参数-->
    <div class="section"
      :class="{
        active: sectionStore.currentSection === 40,
        inactive: sectionStore.currentSection !== 40,
        'slide-prev': sectionStore.currentSection > 40,
        'slide-next': sectionStore.currentSection < 40
      }">
      <ProductHardwareSensorModel :nav-steps="productStepsLight" :default-active-step="2" :section-numbers="[38, 39, 40]"
        :title="wirelessSmartGatewayTitle" :main-image="hardwareTable4" :secondary-image="hardwareImage2" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import { createWheelHandler } from '@/utils/scrollHandler'
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
import phmBackgroundImage from '@/assets/products/software-bg-1.jpg'
import phmVideo from "@/assets/video/phm_video.mp4"
import eamVideo from "@/assets/video/eam_video.mp4"
import apcPhoto from "@/assets/video/apc_photo.jpg"
import emsPhoto from "@/assets/video/ems_photo.png"
import iopVideo from "@/assets/video/iop_video.mp4"
import apsPhoto from "@/assets/video/aps_photo.png"
import eamBackgroundImage from '@/assets/products/bg_EAM.jpg'

// 导入图标
import remoteMonitoringIcon from '@/assets/products/phm-1.png'
import intelligentAlarmIcon from '@/assets/products/phm-2.png'
import automatedDiagnosisIcon from '@/assets/products/phm-3.png'
import analysisIcon from '@/assets/products/phm-4.png'
import reportIcon from '@/assets/products/phm-5.png'
import performanceIcon from '@/assets/products/phm-6.png'

import advantageIcon1 from '@/assets/products/phm-advantage-1.png'
import advantageIcon2 from '@/assets/products/phm-advantage-2.png'
import advantageIcon3 from '@/assets/products/phm-advantage-3.png'
import advantageIcon4 from '@/assets/products/phm-advantage-4.png'
import advantageIcon5 from '@/assets/products/phm-advantage-5.png'
import advantageIcon6 from '@/assets/products/phm-advantage-6.png'


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
import apcBackgroundImage from '@/assets/products/bg_APC.jpg'

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
import emsBackgroundImage from '@/assets/products/bg_EMS.jpg'

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
import apsBackgroundImage from '@/assets/products/bg_APS.jpg'

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

import hardwareGateway from '@/assets/products/hardware-gateway-1.png'
import hardwareTable4 from '@/assets/products/hardware-table-4.png'

const route = useRoute()
const router = useRouter()
// 使用 Pinia store 代替本地状态
const sectionStore = useSectionStore()
const scrollDirection = ref<'up' | 'down'>('down');
// 使用统一的滚动延迟，提高响应性
const scrollDelay = 300;

// 产品步骤
const productSteps = ['产品概述', '核心功能', '特色优势', '典型案例']
// 产品步骤 - 应用成效
const productStepsEffect = ['产品概述', '核心功能', '特色优势', '应用成效']
//产品步骤 - 简略
const productStepsAnother = ['产品概述', '核心功能', '特色优势']
//产品步骤 - 有线传感器
const productStepsLight = ['产品亮点', '规格参数']

// 产品描述
const productDescription = '设备预测性维护与健康管理系统，深挖工业设备运维中的痛点，基于物联网、大数据、人工智能等相关技术，以特征提取+数据建模+机理建模为技术核心，实现从设备数据采集到设备智能预警和故障诊断的完善运维体系，快速地帮助企业提升设备智能化运维能力，提高设备故障诊断与检修效率。'
const productDescriptionEam = '对设备全生命周期进行管控，记录设备完备的基础信息档案，对日常管理、运行监测、设备点巡检、润滑保养、预防检修、故障维修、备品备件、知识库等进行管理，帮助企业精确掌握设备运行情况，提高设备可用性，降低运行维护成本，提升企业竞争力。'
const productDescriptionApc = '系统包含数据中心、组件管理、控制编排、系统管理等模块。系统集成了高效率控制算法以及完备的软件安全体系架构，提供强大的建模、优化、控制基础能力，实现数据流、生产流与控制流的协同，提高生产效率，降低生产成本，实现自主可控的智能制造。'
const productDescriptionEms = '能源管理与优化系统采用自动化、信息化技术和集中管理模式，对用能设备的生产、输配和消耗环节实行集中扁平化的动态监控和数据化管理，通过数据监测、趋势分析与诊断优化，帮助企业针对各种能源需求及用能情况、能源质量、产品能源单耗、各工序能耗、重大能耗设备的能源利用情况等进行能耗监测统计、能源成本分析、用能预测，为企业优化能源管理，提高能源利用效率、挖掘节能潜力、节能评估提供基础数据和支持。'
const productDescriptionIop = '以人工智能驱动的需求预测技术和针对不同成品、原料、备件品类的补货策略为基础，提供补货点、补货量及特殊情景下的备货方案，帮助仓库和工厂做出更明智的采购和补货决策，解决企业面临的预测和库存计划问题。通过为企业定制智能补货方案，真正实现需求驱动的供应链管理与生产智能化，提升供应链柔性，降本增效。'
const productDescriptionAps = '生产计划排程软件使用先进算法平衡需求和产能，生成生产计划，协调物料、人员和设备有效利用，缩短交货时间以满足客户需求，并快速响应生产意外变化。APS系统涵盖数月甚至数年的长期战略规划、数周的中期战术规划以及短期的详细排程。'

// 产品功能数据
const productFeatures = [
  {
    title: '远程监视',
    description: '基于集团、区域、基地、产线、设备的数据采集，实现多层级远程实时监视，精准掌握设备健康状态、通讯状态及当前工况。',
    icon: remoteMonitoringIcon
  },
  {
    title: '智能预警',
    description: '建立阈值预警、趋势预警、AI预警相结合的多种预警机制，提前预知潜在问题，实时发现异常情况，精准处理设备症结。',
    icon: intelligentAlarmIcon
  },
  {
    title: '自动诊断',
    description: '基于行业积累、专业沉淀的设备机理诊断模型、知识库、算法库自动给出故障诊断结论，包括故障现象、故障原因和解决建议，辅助一线人员检修维护。',
    icon: automatedDiagnosisIcon
  },
  {
    title: '专家分析',
    description: '基于不同类型设备，提供不同类型分析图谱，打造的专家分析工具，融入丰富的分析图谱，专家快速诊断设备问题，分析故障根源。',
    icon: analysisIcon
  },
  {
    title: '诊断报告',
    description: '打造融合设备基础信息关键特征趋势变化、设备运行工况分析、设备健康度分析以及专家机理模型和振动分析图谱的诊断报告，全面掌握设备状态，辅助设备运维决策。',
    icon: reportIcon
  },
  {
    title: '效能分析',
    description: '实时监控设备参数，与设备设计性能参数进行对比分析，评估设备当前性能、能效和能耗等指标参数的范围分布，确保设备处于最优运行工况，提升设备运行经济性。',
    icon: performanceIcon
  }
]

// 产品特色优势数据
const productAdvantages = [
  {
    title: '灵活配置特征的边缘采集终端',
    description: '一键下发常规时域特征、频域特征、电机、轴承、齿轮、泵与风机故障特征，实现设备特征在边缘层计算上传。',
    icon: advantageIcon1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '全面的专家机理规则建模',
    description: '融合工艺参数、常规振动特征、设备结构故障特征打造一套包含振动函数、数学函数、逻辑运算、规则函数的可视化机理建模工具。',
    icon: advantageIcon2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '完整的数据处理流程',
    description: '构建“传感器自检-数据治理-模型创建-数据应用”一整套数据处理流程，充分发挥数据价值。',
    icon: advantageIcon3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '多技术融合的专家分析工具',
    description: '融合滚动轴承故障分析、滑动轴承故障分析、低速重载设备故障分析，打造专家操作便利、快速出具诊断报告的专家分析工具。',
    icon: advantageIcon4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '强大的大数据AI建模',
    description: '无监督学习训练模型，对关键数据进行特征提取，建立设备健康样本，让预警诊断更准确。',
    icon: advantageIcon5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '可视化配置的设备健康度评估',
    description: '融合关键参数阈值模型、趋势模型和机理模型，支持可视化的动态权重加权配置。',
    icon: advantageIcon6,
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
    description: '建立完善的设备编码体系，通过一物一档一码从空间、时间上实现360°设备全生命周期的动静态档案管理。',
    icon: eamIcon1
  },
  {
    title: '全生命周期管理',
    description: '覆盖设备前期、中期、后期，从设备需求、采购、入库、领用、回退、移交、调剂、租赁、停用、封存、启用、报废、更新改造等进行全过程管理。',
    icon: eamIcon2
  },
  {
    title: '运维管理',
    description: '以工单为主线，通过设备缺陷/故障闭环管理、点巡检、保养、润滑、检修、安全检查、检定管理，为企业提供更为稳定、高效、科学的设备运维服务，实现运维知识的延伸。',
    icon: eamIcon3
  },
  {
    title: '预测性维护',
    description: '集成设备运行监测模块，基于各类算法模型，对重点设备进行在线监测，评估设备健康度，及时发现潜在的故障和问题，以确保设备的稳定、高效运行。',
    icon: eamIcon4
  },
  {
    title: '运行监测',
    description: '提供设备运行数据采集、运行数据统计与分析、停机管理、设备运行实时数据监测、异常报警等功能。',
    icon: eamIcon5
  },
  {
    title: '备件管理',
    description: '掌握各设备备件消耗变化的规律，实现备件安全库存智能预警，科学合理地储备备件。',
    icon: eamIcon6
  }
]

// EAM产品特色优势数据
const productAdvantagesEam = [
  {
    title: '基于关键词的设备全文搜索',
    description: '通过使用分词技术，建立和优化设备全文搜索引擎，将搜索关键词进行更加精准的匹配，提高搜索设备结果的质量和效率。',
    icon: eamFeatureIcon1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '基于语音模块的智能人机交互',
    description: '集成百度、科大讯飞等主流的语音识别与合成技术，实现高效、准确和用户友好的语音输入与人机交互功能。',
    icon: eamFeatureIcon2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '基于二维码的设备标识技术',
    description: '利用二维码的编码能力和设备的识别能力，在设备上通过悬挂或粘贴等方式标识二维码，通过扫描二维码进行设备的标识和功能的应用。',
    icon: eamFeatureIcon3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '智能工单调度算法技术',
    description: '通过结合自然语言处理技术、机器学习和数据分析技术、专家系统和规则引擎以及实时数据处理和通信技术来实现智能化的工单派工和调度。',
    icon: eamFeatureIcon4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '备件库存分析',
    description: '通过算法分析掌握各设备备件消耗变化的规律和设备劣化趋势，给出合理设备备件经济订购量，并利用安全库存建议与算法优化的库存上下限进行库存缺货、过剩的AI智能预警。',
    icon: eamFeatureIcon5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '便捷化设备管理的移动技术',
    description: '将设备档案、故障报修、点巡检执行、保养润滑执行、检定执行等功能延伸到移动终端，满足企业移动化办公的需求，提高设备管理的效率和灵活性。',
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
    description: '通过给定的 DCS、PLC等相关系统通信协议创建平台和设备之间的通讯通道。主要实现异类协议解析，设备测点数据的对接、采集、管理等。',
    icon: apcIcon1
  },
  {
    title: '控制编排',
    description: '为工业控制软件设计了一个并行任务调度计算框架，支持多语言组件并行执行。通过可视化拖拉拽的方式搭建控制画布，实现流程控制、数据计算。',
    icon: apcIcon2
  },
  {
    title: '组件管理',
    description: '基于UDP实现不同进程间简易通信协议，使得多语言组件能同时在调度框架中运行，极大提高了调度的扩展性。',
    icon: apcIcon3
  },
  {
    title: '驾驶舱',
    description: '模块面向生产过程的数据集成和分析，集成生产过程中的各项数据，为管理员提供一个全面、实时、可视化的监控画面。',
    icon: apcIcon4
  },
  {
    title: '先进控制算法',
    description: '本系统基于经典控制算法如PID、LQR、模糊控制、模型预测控制算法（MPC）等，结合实时在线优化（RT0）方法将传统的机理模型、经验模型融合为复杂的数据模型，所涉及控制算法均为底层开发，完全自主可控。',
    icon: apcIcon5
  }
]

// APC产品优势数据
const productAdvantagesApc = [
  {
    title: '大平台化架构',
    description: '低代码平台、插件化算法组件，可实现算法快速更新迭代，根据后续业务场景拓展需要快速载入更多类型算法组件，减少二次开发，门槛低，复用强。',
    icon: apcFeature1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '模块式设计',
    description: '本系统所包含的数据中心、控制编排、驾驶舱等模块均可以独立部署，并可根据现场实际提供自定义编排生产报表、计算分析等功能。',
    icon: apcFeature2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '工业级系统性能',
    description: '系统部署快：部署周期2周 系统响应快：画布运行响应时间毫秒级 支持高并发量：数据并发量支持大于768条/秒。',
    icon: apcFeature3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '解决高耦合大时滞',
    description: '能对多个控制回路间的关联变量进行解耦，实现多变量协同优化。通过分析预测各回路未来趋势，操作控制点提前动作，根本上解决时延问题。',
    icon: apcFeature4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '稳定控制优化',
    description: '集前馈(多变量模型预测)、反馈及优化于一体，通过减少关键工艺变量的波动，进而优化工艺装置操作，实现卡边控制。',
    icon: apcFeature5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '更高级控制模式',
    description: '常规单回路控制器是基于偏差的反馈控制，而以模型预测控制为核心的APC则在反馈控制的基础上，将过程模型作为控制器的内部模型，提高了控制器的信息利用率和控制品质。',
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
    description: '在制造运营中实现显著的成本降低。APS微调资源分配，通过最大限度地减少浪费和优化库存水平来削减生产费用。告别生产过剩和库存过剩，追求更精简、更具成本效益的生产周期。',
    icon: apsFeature1,
    position: { top: 163, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '增强决策能力',
    description: '以数据为支持决策。APS深入分析生产过程，提供产能规划、库存管理和劳动力分配的战略规划方案。将数据转化为可操作的信息，增强决策能力。',
    icon: apsFeature2,
    position: { top: 163, left: 1033 },
    iconPosition: 'right' as const
  },
  {
    title: '保证准时交货',
    description: '通过先进的调度能力，实现准时交货。APS可实现精确的生产排程，确保产品在客户需要时准备就绪。建立更牢固的客户关系、巩固声誉。',
    icon: apsFeature3,
    position: { top: 341, left: 340 },
    iconPosition: 'left' as const
  },
  {
    title: '提高产品质量',
    description: '提高产品质量标准。APS确保生产过程顺利运行，降低错误和缺陷的风险。统一调度和资源最佳分配带来更高产品质量，让客户满意，提升品牌力。',
    icon: apsFeature4,
    position: { top: 341, left: 1083 },
    iconPosition: 'right' as const
  },
  {
    title: '提高灵活性和响应能力',
    description: '通灵活应对市场波动。APS提供灵活性，帮助企业迅速适应需求变化和供应链中断。无论情况如何，通过动态调整生产计划，保持运营效率和竞争优势。',
    icon: apsFeature5,
    position: { top: 519, left: 390 },
    iconPosition: 'left' as const
  },
  {
    title: '支持可持续性发展',
    description: '制造实践与可持续发展目标相结合。APS优化资源利用、减少浪费，实现环保目标。采用高效的生产流程提高效益、更保护地球环境。',
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
    description: '通过图形化的方式展示能源管网的布局，并且系统够实时采集管网中各设施的运行数据，如流量、压力、温度等，并在管网图界面上进行展示。用户可以通过观察这些数据，了解管网的实时运行状态，及时发现异常情况。',
    icon: emsIcon1
  },
  {
    title: '能介平衡与能耗分析',
    description: '对企业能源系统的加工转换站所、输配送管网、用能车间进行全流程的能源流关键节点监控，动态调整匹配供能端与用能端的真实需求量。',
    icon: emsIcon2
  },
  {
    title: '能源成本分析',
    description: '运用算法分项技术分析共享电耗成本趋势、峰谷平电能等能源成本趋势。',
    icon: emsIcon3
  },
  {
    title: '能源需求预测与规划',
    description: '能耗预测作为能源管理与优化系统的核心模块。通过引入核心算法配置模块，探究用能设备工作产出与能耗之间的关系，建立能源消耗分析统计，实现企业未来生产过程所需能源的总量的预估。',
    icon: emsIcon4
  },
  {
    title: '用能诊断与优化',
    description: '分析和预测能源需求，结合峰谷平电价、运行效率、成本分析等因素，求解最优资源调度方案，诊断能耗漏洞，给出综合能效诊断报告和生产调度建议、设备资源调度建议和能源调度建议。',
    icon: emsIcon5
  }
]


// EMS预测功能数据
const productEmsPredictions = [
  {
    title: '自回归模型',
    description: '通过建立一个回归模型，将历史数据中的能源消耗与其他影响因素进行关联，然后使用模型来预测未来的能源消耗。系统可以根据输入特征的不同，选择最优策略。'
  },
  {
    title: '时间序列算法',
    description: '对未来的能源消耗与过去的能源消耗进行关联，系统通过分析和建模时间序列数据，预测未来的能源消耗，帮助企业调整生产计划。'
  },
  {
    title: '负荷预测算法',
    description: '针对电力系统和能源管理领域，选择负荷预测算法用于预测未来特定时间段内系统的能耗负荷，包括长期负荷预测、短期负荷预测等，提前做好电力调度和分配工作。'
  }
]

// EMS策略数据
const emsStrategies = [
  {
    description: '助力改善园区的照明系统，并结合自动感应、时控开关、远程控制等手段，帮助园区减少不必要的照明能耗。'
  },
  {
    description: '合理调整用能设备的运行策略，如优化启停时间、降低设备运行负载等，减少不必要的能源消耗 。'
  }
]

// 添加EMS成效数据
const emsResults = [
  {
    icon: emsApplication1,
    title: '降低成本',
    description: '反映企业真实能源耗用成本，协助企业降低能源耗用成本',
    number: '0.83%-1%'
  },
  {
    icon: emsApplication2,
    title: '提升劳动生产率',
    description: '代替人工生成各项日报表，现场抄录、统计等工作，综合劳动生产率提升',
    number: '8%'
  },
  {
    icon: emsApplication3,
    title: '提升合格率',
    description: '系统自动按时定时采集，能源审计准确性与合格率提升',
    number: '10%-34%'
  }
]

// 库存优化(IOP)应用成效
const iopResults = [
  {
    icon: iopApplication1,
    title: '降低库存成本',
    description: '预测未来需求，帮助企业合理规划库存，降低库存持有水平，合理补货，从而降低库存成本。'
  },
  {
    icon: iopApplication2,
    title: '降低库存损耗',
    description: '减少库存积压，避免因库存货物过期或长期保存带来的商品报废、损坏与丢失等成本。'
  },
  {
    icon: iopApplication3,
    title: '降低供应链风险',
    description: '通过实时库存数据分析，帮助企业及时了解库存状态，快速响应供应链中断或需求变化。'
  },
  {
    icon: iopApplication4,
    title: '提高客户满意度',
    description: '保证产品的及时供应，提高库存周转率，减少订单延误和缺货现象，从而提高客户满意度和忠诚度。'
  },
  {
    icon: iopApplication5,
    title: '提高资金利用率',
    description: '减少库存水平将会减少存货资金的使用，提高资金利用率。企业可以利用释放出来的资金去做更有效的投资，提升生产效率、研发技术等。'
  },
  {
    icon: iopApplication6,
    title: '增强企业竞争力',
    description: '加速设备维修周期，降低停工成本提高生产效率，从而增强企业竞争力。'
  }
]

// 有线传感器标题
const wireSensorTitle = '有线传感器'
//无线智能传感器
const wirelessSensorTitle = '无线智能传感器'
// 有线传感器规格参数表格标题
const wireSensorModelTitle = '无线振温传感器DN102'
// 边缘智能采集器
const edgeSmartCollectorTitle = '边缘智能采集器'
// 无线智能网关
const wirelessSmartGatewayTitle = '无线智能网关'
// 有线传感器内容
const wireSensorContent = [
  { title: '加速度传感器（通频）', model: 'CHAOS AC102' },
  { title: '加速度传感器（低频）', model: 'CHAOS AC133' },
  { title: '振温一体传感器（通频）', model: 'CHAOS TA202' },
  { title: '振温一体传感器（低频）', model: 'CHAOS TA233' },
  { title: '防爆振温一体传感器（通频）', model: 'CHAOS TA935' },
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
    title: '支持振温传感器数量',
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
    description: "产品线涵盖从低频到通频的多种型号，包括振温一体和防爆型号传感器，满足各类应用场景的特定需求。"
  },
  {
    title: "低噪设计 精度卓越",
    description: "通过低非线性和噪声水平的设计，确保测量结果的高准确性，为数据分析提供坚实基础。"
  },
  {
    title: "宽频覆盖 全面响应",
    description: "具有较宽的频率响应范围，适合监测多样化的振动频率。"
  },
  {
    title: "高灵敏度 精准监测",
    description: "振动灵敏度高，能够捕捉到微小的振动信号，为精密监测提供保障。"
  }
]

// 无线智能传感器内容
const wirelessSensorContentLight = [
  {
    title: "Zigbee技术 部署灵活",
    description: "采用Zigbee无线传输技术，提高部署灵活性，无线通信功耗低。"
  },
  {
    title: "NFC配置 便捷无触",
    description: "NFC用于传感器参数配置，非接触式参数配置，配置更高效。"
  },
  {
    title: "长寿耐用 维护减费",
    description: "提供25℃温度环境下三年以上使用寿命，减少维护成本。"
  },
  {
    title: "IP68防护 环境耐受",
    description: "IP68防护等级，适应各种恶劣的工业环境。"
  },
  {
    title: "防爆认证 安全保障",
    description: "具备防爆认证，适用于潜在爆炸风险的环境，使用更安全。"
  },
  {
    title: "边缘计算 智能预警",
    description: "具备边缘计算功能，能够进行电量预警和跌落警告等智能分析。"
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
    description: "通道配置灵活，支持传感器类型众多。"
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
    description: "支持以太网/WiFi/蓝牙等通信方式，易于系统集成和数据传输。"
  }
]

// 无线智能网关产品亮点
const wirelessSmartGatewayContentLight = [
  {
    title: "通讯多样 数据可靠",
    description: "支持4G、5G、Wifi、以太网、光纤等多种通讯方式，确保数据传输的可靠性和灵活性。"
  },
  {
    title: "网页配置 流程简便",
    description: "支持web网页配置，无需安装软件，简化配置过程。"
  },
  {
    title: "功能丰富 方便易用",
    description: "集成传感器、系统检测与分析工具，提高系统的可靠性和易用性。"
  },
  {
    title: "深入分析 精准诊断",
    description: "支持时域、频域与包络分析，为设备状态监测和故障诊断提供深入的数据分析。"
  }
]

// 自定义滚动处理函数，跳过隐藏的原section 38（边缘智能采集器规格参数）
// 现在section编号已重新调整：37->38(无线智能网关)->39(产品亮点)->40(规格参数)
const getNextSection = (currentSection: number, direction: 'up' | 'down'): number => {
  // 正常的section跳转，因为已经重新编号，不需要特殊处理
  if (direction === 'down') {
    return Math.min(currentSection + 1, 40); // 最大到40
  } else {
    return Math.max(currentSection - 1, 0); // 最小到0
  }
};

// 使用优化的滚轮事件处理器
const handleWheel = createWheelHandler(
  // 向上滚动回调
  () => {
    if (sectionStore.currentSection > 0) {
      scrollDirection.value = 'up';
      const nextSection = getNextSection(sectionStore.currentSection, 'up');
      sectionStore.setCurrentSection(nextSection);
    }
  },
  // 向下滚动回调
  () => {
    if (sectionStore.currentSection < 40) {
      scrollDirection.value = 'down';
      const nextSection = getNextSection(sectionStore.currentSection, 'down');
      if (nextSection <= 40) {
        sectionStore.setCurrentSection(nextSection);
      }
    }
  },
  // 配置选项
  {
    delay: scrollDelay,
    preventDefault: true,
    // 检查是否应该锁定滚动
    checkLock: () => document.body.classList.contains('no-section-scroll')
  }
);

// 添加键盘事件处理函数
const handleKeyDown = (e: KeyboardEvent) => {
  // 如果页面被锁定，不处理键盘事件
  if (document.body.classList.contains('no-section-scroll')) {
    return;
  }

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    if (sectionStore.currentSection < 40) {
      scrollDirection.value = 'down';
      const nextSection = getNextSection(sectionStore.currentSection, 'down');
      if (nextSection <= 40) {
        sectionStore.setCurrentSection(nextSection);
      }
    }
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    if (sectionStore.currentSection > 0) {
      scrollDirection.value = 'up';
      const nextSection = getNextSection(sectionStore.currentSection, 'up');
      sectionStore.setCurrentSection(nextSection);
    }
  }
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

// 监听sectionStore.currentSection变化并更新URL
watch(() => sectionStore.currentSection, (newSection) => {
  // 更新URL而不刷新页面
  router.replace({
    query: {
      ...route.query,
      section: newSection.toString()
    }
  })
})

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
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #fff;
}

.section {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
  will-change: transform, opacity;
}

.section.active {
  transform: translateY(0);
  opacity: 1;
  z-index: 10;
}

.section.inactive {
  opacity: 0;
  z-index: 5;
}

.section.slide-prev {
  transform: translateY(-10%);
}

.section.slide-next {
  transform: translateY(10%);
}

/* 移除页面指示器相关样式 */
/*
.page-indicator {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 10px;
}

.indicator-item {
  padding: 5px;
  cursor: pointer;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.indicator-dot.active {
  width: 12px;
  height: 12px;
  background-color: #000;
}

.indicator-dot:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
*/
</style>