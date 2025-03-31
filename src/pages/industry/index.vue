<template>
  <div class="industry-page" @wheel="handleWheel">
    <!-- 第一部分：钢铁行业 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 0, 'section-hidden': sectionStore.currentSection !== 0 }"
      ref="steelSection">
      <IndustryHero :background-image="steelBackgroundImage" title="钢铁行业"
        description="结合机理模型、数据模型、数字孪生技术、多变量预测控制技术，解决钢铁企业生产工艺、设备控制等一系列工业生产痛点，实现工艺流、生产信息流、设备流'三流合一'，稳定提升成品质量，降低生产线设备故障风险、人力成本和能源消耗。" />
    </div>

    <!-- 第二部分：钢铁行业挑战 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 1, 'section-hidden': sectionStore.currentSection !== 1 }"
      ref="challengesSection">
      <ChallengesSection :cards="steelChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[1, 2, 3, 4]" />
      <!-- <SteelChallenges /> -->
    </div>

    <!-- 第三部分：钢铁行业解决方案 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 2, 'section-hidden': sectionStore.currentSection !== 2 }"
      ref="solutionsSection">
      <!-- <SteelSolutions /> -->
      <!-- <SolutionsSection 
         :nav-steps="industrySteps" 
         :default-active-step="2" 
         :description="cementSolutionsData.description"
         :special-scenes="steelSolutionsData.specialScenes" 
         :applications="steelSolutionsData.applications"
         :platform-data="steelSolutionsData.platformData"
         :data-collection-methods="steelSolutionsData.dataCollectionMethods" 
      /> -->

      <SolutionsSection :nav-steps="industrySteps" :default-active-step="2" :section-numbers="[1, 2, 3, 4]"
        :description="steelSolutionsData.description" :show-image="steelSolutionsData.showImage"
        :image-src="steelSolutionsData.imageSrc" />
    </div>

    <!-- 第四部分：钢铁行业方案优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 3, 'section-hidden': sectionStore.currentSection !== 3 }"
      ref="advantageSection">
      <!-- <SteelAdvantages /> -->
      <AdvantagesSection :cards="steelAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[1, 2, 3, 4]"/>
    </div>

    <!-- 第五部分：典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 4, 'section-hidden': sectionStore.currentSection !== 4 }"
      ref="caseSection">
      <!-- <SteelCases /> -->
      <CasesSection :cases="steelCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[1, 2, 3, 4]"/>
    </div>

    <!-- 第六部分：水泥行业 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 5, 'section-hidden': sectionStore.currentSection !== 5 }"
      ref="caseSection">
      <IndustryHero :background-image="cementBackgroundImage" title="水泥行业" description="智控水泥生产，赋能绿色高效" />
    </div>

    <!-- 第七部分：水泥行业挑战 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 6, 'section-hidden': sectionStore.currentSection !== 6 }"
      ref="challengesSection">
      <ChallengesSection :cards="cementChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[6, 7, 8, 9]" />
    </div>

    <!-- 第八部分：水泥行业解决方案 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 7, 'section-hidden': sectionStore.currentSection !== 7 }"
      ref="solutionsSection">
      <!-- 封装的新组件应用于水泥行业 -->
      <!-- <SolutionsSection :nav-steps="industrySteps" :description="cementSolutionsData.description"
        :special-scenes="cementSolutionsData.specialScenes" :applications="cementSolutionsData.applications"
        :platform-data="cementSolutionsData.platformData"
        :data-collection-methods="cementSolutionsData.dataCollectionMethods" :default-active-step="2" /> -->
      <SolutionsSection :nav-steps="industrySteps" :default-active-step="2" :section-numbers="[6, 7, 8, 9]"
        :description="cementSolutionsData.description" :show-image="cementSolutionsData.showImage"
        :image-src="cementSolutionsData.imageSrc" />
    </div>

    <!-- 第九部分：水泥行业方案优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 8, 'section-hidden': sectionStore.currentSection !== 8 }"
      ref="advantageSection">
      <!-- 封装的新组件应用于水泥行业 -->
        <AdvantagesSection :cards="cementAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[6, 7, 8, 9]"/>
    </div>

    <!-- 第十部分：水泥行业典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 9, 'section-hidden': sectionStore.currentSection !== 9 }"
      ref="caseSection">
      <!-- 封装的新组件应用于水泥行业 -->
      <CasesSection :cases="cementCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[6, 7, 8, 9]"/>
    </div>

    <!-- 第十一部分：煤炭行业 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 10, 'section-hidden': sectionStore.currentSection !== 10 }"
      ref="caseSection">
      <IndustryHero :background-image="coalBackgroundImage" title="煤炭行业"
        description="以数据智能驱动煤矿生产全流程优化，实现煤机设备全寿期、全业务链的集中管控，提升煤矿企业数字化管控能力" />
    </div>

    <!-- 第十二部分：煤炭行业挑战 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 11, 'section-hidden': sectionStore.currentSection !== 11 }"
      ref="caseSection">
      <ChallengesSection :cards="coalChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[11, 12, 13, 14]" />
    </div>

    <!-- 第十三部分：煤炭行业解决方案 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 12, 'section-hidden': sectionStore.currentSection !== 12 }"
      ref="solutionsSection">
      <SolutionsSection :nav-steps="industrySteps" :description="coalSolutionsData.description" :default-active-step="2" :section-numbers="[11, 12, 13, 14]"
        :show-image="coalSolutionsData.showImage" :image-src="coalSolutionsData.imageSrc" />
    </div>

    <!-- 第十四部分：煤炭行业方案优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 13, 'section-hidden': sectionStore.currentSection !== 13 }"
      ref="advantageSection">
      <AdvantagesSection :cards="coalAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[11, 12, 13, 14]"/>
    </div>

    <!-- 第十五部分：煤炭行业典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 14, 'section-hidden': sectionStore.currentSection !== 14 }"
      ref="coalCaseSection">
      <CasesSection :cases="coalCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[11, 12, 13, 14]"/>
    </div>

    <!-- 第十六部分：化工行业 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 15, 'section-hidden': sectionStore.currentSection !== 15 }"
      ref="chemicalSection">
      <IndustryHero :background-image="chemicalBackgroundImage" title="化工行业"
        description="以智能运维驱动设备全生命周期管理，保障化工生产安全、高效、可持续" />
    </div>

    <!-- 第十七部分：化工行业挑战 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 16, 'section-hidden': sectionStore.currentSection !== 16 }"
      ref="chemicalChallengeSection">
      <ChallengesSection :cards="chemicalChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[16, 17, 18, 19]" />
    </div>

    <!-- 第十八部分：化工行业解决方案 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 17, 'section-hidden': sectionStore.currentSection !== 17 }"
      ref="chemicalSolutionSection">
      <SolutionsSection :nav-steps="industrySteps" :description="chemicalSolutionsData.description"
        :default-active-step="2" :section-numbers="[16, 17, 18, 19]" :show-image="chemicalSolutionsData.showImage"
        :image-src="chemicalSolutionsData.imageSrc" />
    </div>

    <!-- 第十九部分：化工行业方案优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 18, 'section-hidden': sectionStore.currentSection !== 18 }"
      ref="chemicalAdvantageSection">
      <AdvantagesSection :cards="chemicalAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[16, 17, 18, 19]"/>
    </div>

    <!-- 第二十部分：化工行业典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 19, 'section-hidden': sectionStore.currentSection !== 19 }"
      ref="chemicalCaseSection">
      <CasesSection :cases="chemicalCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[16, 17, 18, 19]"/>
    </div>

    <!-- 第二十一部分： 汽车行业 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 20, 'section-hidden': sectionStore.currentSection !== 20 }"
      ref="carSection">
      <IndustryHero :background-image="carBackgroundImage" title="汽车行业"
        description="以数据智能驱动汽车生产全流程优化，实现汽车设备全寿期、全业务链的集中管控，提升汽车企业数字化管控能力" />
    </div>

    <!-- 第二十二部分： 汽车行业挑战 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 21, 'section-hidden': sectionStore.currentSection !== 21 }"
      ref="carChallengeSection">
      <ChallengesSection :cards="carChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[21, 22, 23, 24]" />
    </div>

    <!-- 第二十三部分： 汽车行业解决方案 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 22, 'section-hidden': sectionStore.currentSection !== 22 }"
      ref="carSolutionSection">
      <!-- <SolutionsSection :nav-steps="industrySteps" :description="carSolutionsData.description"
        :special-scenes="carSolutionsData.specialScenes" :applications="carSolutionsData.applications"
        :platform-data="carSolutionsData.platformData" :data-collection-methods="carSolutionsData.dataCollectionMethods"
        :default-active-step="2" /> -->
      <SolutionsSection :nav-steps="industrySteps" :default-active-step="2" :section-numbers="[21, 22, 23, 24]" :description="carSolutionsData.description"
        :show-image="carSolutionsData.showImage" :image-src="carSolutionsData.imageSrc" />
    </div>

    <!-- 第二十四部分： 汽车行业方案优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 23, 'section-hidden': sectionStore.currentSection !== 23 }"
      ref="carAdvantageSection">
      <AdvantagesSection :cards="carAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[21, 22, 23, 24]"/>
    </div>

    <!-- 第二十五部分： 汽车行业典型案例 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 24, 'section-hidden': sectionStore.currentSection !== 24 }"
      ref="carCaseSection">
      <CasesSection :cases="carCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[21, 22, 23, 24]"/>
    </div>

    <!-- 第二十六部分： 新能源行业 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 25, 'section-hidden': sectionStore.currentSection !== 25 }"
      ref="newEnergySection">
      <IndustryHero :background-image="newEnergyBackgroundImage" title="新能源行业"
        description="以数据智能驱动新能源生产全流程优化，实现新能源设备全寿期、全业务链的集中管控，提升新能源企业数字化管控能力" />
    </div>

    <!-- 第二十七部分： 新能源行业挑战 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 26, 'section-hidden': sectionStore.currentSection !== 26 }"
      ref="newEnergyChallengeSection">
      <ChallengesSection :cards="newEnergyChallenges" :nav-steps="industryThreeSteps" :default-active-step="1"
        :section-numbers="[26, 27, 28]" />
    </div>

    <!-- 第二十八部分： 新能源行业解决方案 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 27, 'section-hidden': sectionStore.currentSection !== 27 }"
      ref="newEnergySolutionSection">
      <SolutionsSection :nav-steps="industryThreeSteps" :description="newEnergySolutionsData.description"
        :default-active-step="2" :section-numbers="[26, 27, 28]" :show-image="newEnergySolutionsData.showImage"
        :image-src="newEnergySolutionsData.imageSrc" />
    </div>

    <!-- 第二十九部分： 新能源行业方案优势 -->
    <div class="section"
      :class="{ active: sectionStore.currentSection === 28, 'section-hidden': sectionStore.currentSection !== 28 }"
      ref="newEnergyAdvantageSection">
      <AdvantagesSection :cards="newEnergyAdvantages" :nav-steps="industryThreeSteps" :default-active-step="3" :section-numbers="[26, 27, 28]"/>
    </div>

    <!-- 第三十部分： 新能源行业典型案例 -->
    <!-- <div class="section"
      :class="{ active: sectionStore.currentSection === 29, 'section-hidden': sectionStore.currentSection !== 29 }"
      ref="newEnergyCaseSection">
      <CasesSection :cases="newEnergyCases" :nav-steps="industrySteps" :default-active-step="4" />
    </div> -->

  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import SteelChallenges from '@/components/industry/SteelChallenges.vue'
import SteelSolutions from '@/components/industry/SteelSolutions.vue'
import SteelAdvantages from '@/components/industry/SteelAdvantages.vue'
import SteelCases from '@/components/industry/SteelCases.vue'
import IndustryHero from '@/components/industry/components/IndustryHero.vue'
import ChallengesSection from '@/components/industry/components/ChallengesSection.vue'
import SolutionsSection from '@/components/industry/components/SolutionsSection.vue'
import AdvantagesSection from '@/components/industry/components/AdvantagesSection.vue'
import CasesSection from '@/components/industry/components/CasesSection.vue'

import iconEnergy from "@/assets/industry/icon-energy.png"
import iconEquipment from "@/assets/industry/icon-equipment.png"
import iconProcess from "@/assets/industry/icon-process.png"
import iconSupply from "@/assets/industry/icon-supply.png"

import steelAdvantage1 from '@/assets/industry/steel-advantage-1.png'
import steelAdvantage2 from '@/assets/industry/steel-advantage-2.png'
import steelAdvantage3 from '@/assets/industry/steel-advantage-3.png'
import steelAdvantage4 from '@/assets/industry/steel-advantage-4.png'

import steelBackgroundImage from '@/assets/industry/steel.png'
import cementBackgroundImage from '@/assets/industry/cement-bg.png'
import chemicalBackgroundImage from '@/assets/industry/chemical-bg.jpg'
import carBackgroundImage from '@/assets/industry/car-bg.png'
import newEnergyBackgroundImage from '@/assets/industry/wind-bg.png'

// 引入方案优势图标
import iconFullStack from '@/assets/industry/full-stack-technology-capabilities.png'
import iconVertical from '@/assets/industry/vertical-scene-depth-adaptation.png'
import iconAutonomous from '@/assets/industry/autonomous-controllable-technology-base.png'
import iconHeadEnterprise from '@/assets/industry/head-enterprise-verification.png'
import coalBackgroundImage from '@/assets/industry/coal-bg.jpg'
import coalExclamation from '@/assets/industry/coal-challenge-1.png'
import coalDevice from '@/assets/industry/coal-challenge-2.png'
import coalWeak from '@/assets/industry/coal-challenge-3.png'
import coalSolutionImage from '@/assets/industry/coal-solution-Photoroom.png'
import chemicalExclamation from '@/assets/industry/chemical-challenge-1.png'
import chemicalEquipment from '@/assets/industry/chemical-challenge-2.png'
import chemicalProcess from '@/assets/industry/chemical-challenge-3.png'
import chemicalSupply from '@/assets/industry/chemical-challenge-4.png'

// 导入化工优势图标
import chemicalAdvantageIcon from '@/assets/industry/chemical-advantage.png'

// 导入化工行业背景图和案例图片
import chemicalBgImage from '@/assets/industry/chemical-bg.jpg'

import carChallenge1 from '@/assets/industry/car-challenge-1.png'
import carChallenge2 from '@/assets/industry/car-challenge-2.png'
import carChallenge3 from '@/assets/industry/car-challenge-3.png'
import carChallenge4 from '@/assets/industry/car-challenge-4.png'

// 导入钢铁行业案例图片
import steelCase1 from '@/assets/industry/steel-case-1.png'
import steelCase2 from '@/assets/industry/steel-case-2.png'
import steelCase3 from '@/assets/industry/steel-case-3.png'

// 导入水泥行业案例图片
import cementCase1 from '@/assets/industry/cement-case-1.png'
import cementCase2 from '@/assets/industry/cement-case-2.png'

// 导入煤炭行业案例图片
import coalCase1 from '@/assets/industry/coal-case-1.png'
import coalCase2 from '@/assets/industry/coal-case-2.png'

// 导入化工行业案例图片
import chemicalCase1 from '@/assets/industry/chemical-case-1.png'

// 导入汽车行业案例图片
import carCase1 from '@/assets/industry/car-case-1.png'


const route = useRoute()
const router = useRouter()
const scrolling = ref(false)
const scrollDelay = 1000 // 滚动延迟，防止连续滚动
const caseId = ref()

// 使用 Pinia store 代替本地状态
const sectionStore = useSectionStore()

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return

  scrolling.value = true

  // 向下滚动
  if (e.deltaY > 0 && sectionStore.currentSection < 28) {
    sectionStore.nextSection(28)
  }
  // 向上滚动
  else if (e.deltaY < 0 && sectionStore.currentSection > 0) {
    sectionStore.prevSection()
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
  if ((e.key === 'ArrowDown' || e.key === 'PageDown') && sectionStore.currentSection < 28) {
    sectionStore.nextSection(28)
  }
  // 向上箭头或Page Up
  else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && sectionStore.currentSection > 0) {
    sectionStore.prevSection()
  }

  setTimeout(() => {
    scrolling.value = false
  }, scrollDelay)
}

// 钢铁行业挑战数据
const steelChallenges = [
  {
    icon: iconEnergy,
    title: '碳中和与深度减排压力升级',
    description: '焦料热成焦耗占比超60%，煤焦气，电智能优化降碳减排，面对"双碳"目标与环保法规。'
  },
  {
    icon: iconEquipment,
    title: '设备智能化运维协同瓶颈',
    description: '设备备高价值升与多系统集成需求求高，传统运维模式难以满足高精度预测性维护与跨产线协同。'
  },
  {
    icon: iconProcess,
    title: '工艺柔性化与质量一致性挑战',
    description: '生料配比过弃，设备控制误差大，人工经验已不满足产线提升，质量一致性要求。'
  },
  {
    icon: iconSupply,
    title: '环保与成本双重挑战',
    description: '粉尘、氮氧化物治理水平提升，需平衡环保合规与降本增效，智能化技术驱动绿色转型。'
  }
];
// 定义水泥行业挑战数据
const cementChallenges = [
  {
    icon: coalExclamation,
    title: '碳中和与深度减排压力升级',
    description: '焦料热成焦耗占比超60%，煤焦气，电智能优化降碳减排，面对"双碳"目标与环保法规。'
  },
  {
    icon: coalDevice,
    title: '设备智能化运维协同瓶颈',
    description: '设备备高价值升与多系统集成需求求高，传统运维模式难以满足高精度预测性维护与跨产线协同。'
  },
  {
    icon: coalWeak,
    title: '工艺柔性化与质量一致性挑战',
    description: '生料配比过弃，设备控制误差大，人工经验已不满足产线提升，质量一致性要求。'
  },
  {
    icon: coalWeak,
    title: '环保与成本双重挑战',
    description: '粉尘、氮氧化物治理水平提升，需平衡环保合规与降本增效，智能化技术驱动绿色转型。'
  }
];

// 煤炭行业挑战数据
const coalChallenges = [
  {
    icon: coalExclamation,
    title: '设备可靠性不足',
    description: '核心设备(如提升机、通风机、皮带机)故障率高，依赖人工巡检，非计划停机影响生产连续性。'
  },
  {
    icon: coalDevice,
    title: '安全管控难度大',
    description: '井下环境复杂，设备、环境等安全隐患实时监测与预警能力不足，事故风险难以有效预防。'
  },
  {
    icon: coalWeak,
    title: '数据协同能力弱',
    description: '设备、工艺、安全等多系统数据孤岛严重，缺乏统一平台支撑智能化决策。'
  },
  {
    icon: coalWeak,
    title: '能效与环保压力',
    description: '高能耗设备占比大，碳排放与粉尘治理成本攀升，需平衡生产效益与环保合规。'
  }
];

// 导航步骤
const industrySteps = [
  '行业挑战',
  '解决方案',
  '方案优势',
  '典型案例'
];

const industryThreeSteps = [
  '行业挑战',
  '解决方案',
  '方案优势',
];

// 钢铁行业解决方案数据
const steelSolutionsData = {
  description: '以超思工业互联网平台为基座，融合数据算法及AI实现全流程智能优化。通过智能硬件及智能应用赋能煤气管网、冷轧生产等核心场景，实现设备预测性维护、能效优化、工艺智能控制，助力钢铁企业降本增效、绿色转型。',
  showImage: true,
  imageSrc: 'src/assets/industry/solution-steel-Photoroom.png'
}

// const steelSolutionsData = {
//   description: '基于超恩工业互联网平台，为钢铁行业提供智能化解决方案。融合数据智能及AI实现全流程智能化。通过智能硬件、智能软件、数字化等手段提供管理、工艺智能优化、精细运维、降本增效和绿色转型。',
//   specialScenes: ['专项场景', '能耗能效管理', '冷轧生产线稳定分析', '大包回转', '皮带机', '空压机', '电气室'],
//   applications: ['智能应用', '设备预测性维护（PHM）', '先进过程控制（APC）', '能源管理（EMS）', '库存优化（IOP）'],
//   platformData: {
//     mainPlatforms: [
//       { title: '统一建模平台', content: '数据建模 | 机理建模 | 价值建模' },
//       { title: '模型管理服务', content: '模型部署 | 模型验证' },
//       { title: '统一建模平台', content: '数据对接 | 模型实时运算' },
//       { title: '其它技术组件', content: '组态工具 | 资源工具 | ······' }
//     ],
//     databases: ['关系数据库', '时序数据库', '文件存储', '······']
//   },
//   dataCollectionMethods: ['有线传感器', '边缘智能采集器', '无线智能网关']
// };


// 水泥行业解决方案数据
const cementSolutionsData = {
  description: '基于超思工业互联网平台，为水泥行业提供专业的智能化解决方案。覆盖智能运维、智能控制、能效优化等领域，实现设备健康状态实时监控预警、工艺控制优化，降低运维成本、显著提升能效与产能稳定性。',
  showImage: true,
  imageSrc: 'src/assets/industry/solution-cement-Photoroom.png'
}
// const cementSolutionsData = {
//   description: '基于超恩工业互联网平台，为水泥行业提供智能化解决方案。融合数据智能及AI实现全流程智能化化。通过智能硬件、智能软件、数字化等手段提供管理、工艺智能优化、精细运维本、绿色转型。',
//   specialScenes: ['专项场景', '两废一体工艺优化', '分解炉温度控制', '垃圾发电'],
//   applications: ['智能应用', '设备预测性维护（PHM）', '先进过程控制（APC）', '能源管理（EMS）', '......'],
//   platformData: {
//     mainPlatforms: [
//       { title: '统一建模平台', content: '数据建模 | 机理建模 | 价值建模' },
//       { title: '模型管理服务', content: '模型部署 | 模型验证' },
//       { title: '统一建模平台', content: '数据对接 | 模型实时运算' },
//       { title: '其它技术组件', content: '组态工具 | 资源工具 | ······' }
//     ],
//     databases: ['关系数据库', '时序数据库', '文件存储', '······']
//   },
//   dataCollectionMethods: ['有线传感器', '边缘智能采集器', '无线智能网关']
// };

// 煤炭行业解决方案数据
const coalSolutionsData = {
  description: '聚焦核心设备智能化远维，采用物联网、人工智能、大数据等技术，通过特征提取+机理建模的方式实现设备状态感知、智能预警、故障诊断、健康评估，并以统一算法库与知识库为核心，实现矿井设备全生命周期管理，帮助煤矿企业实现数字化转型升级，全面建立起从生产技术到决策管理的智能化煤矿工业新生态。',
  showImage: true,
  imageSrc: coalSolutionImage
};

// 钢铁行业方案优势数据
const steelAdvantages = [
  {
    icon: steelAdvantage1,
    title: '全栈技术能力',
    description: '覆盖数据采集到智能算法实现，实现"端-边-云"一体化控制。'
  },
  {
    icon: steelAdvantage2,
    title: '垂直场景深度适配',
    description: '基于领域工艺知识与技术积累，提供针对性解决方案，深化应用场景价值。'
  },
  {
    icon: steelAdvantage3,
    title: '自主可控技术底座',
    description: '1000+核心算法专利，3D+模型专利，工信部"工业互联网标杆示范项目"认证。'
  },
  {
    icon: steelAdvantage4,
    title: '头部企业验证',
    description: '宝武集团、包钢集团等行业龙头企业验证，助力数字化转型生产与方案。'
  }
];

// 水泥行业方案优势数据
const cementAdvantages = [
  {
    icon: iconFullStack,
    title: '全栈技术能力',
    description: '覆盖数据采集到智能算法实现，实现"端-边-云"一体化控制。'
  },
  {
    icon: iconVertical,
    title: '垂直场景深度适配',
    description: '基于核心工艺模型和技术力量，覆盖现代化工中、特化技术特性和优势。'
  },
  {
    icon: iconAutonomous,
    title: '自主可控技术底座',
    description: '1000+核心算法专利，3D+模型专利，工信部"工业互联网标杆示范项目"认证。'
  },
  {
    icon: iconHeadEnterprise,
    title: '头部企业验证',
    description: '平台部署，覆盖钢铁水泥材料行业等领域，得到头部企业多年数据与方案。'
  }
];

// 钢铁行业案例数据
const steelCases = [
  {
    image: steelCase1,
    title: '中国宝武钢铁集团有限公司',
    description: '跨流程监督管理平台'
  },
  {
    image: steelCase2,
    title: '敬业集团',
    description: '知识生产管理平台'
  },
  {
    image: steelCase3,
    title: '宝山钢铁',
    description: 'APC'
  }
];

// 水泥行业案例数据
const cementCases = [
  {
    image: cementCase1,
    title: '安徽海螺水泥股份有限公司',
    description: '预测性运维管理平台'
  },
  {
    image: cementCase1,
    title: '安徽海螺水泥股份有限公司',
    description: 'APC'
  },
  {
    image: cementCase2,
    title: '安徽盘锦水泥',
    description: 'APC'
  }
];

// 煤炭行业方案优势数据
const coalAdvantages = [
  {
    icon: iconFullStack,
    title: '设备全生命周期管理',
    description: '设备全流程、全要素、全场景的智能化管理，实现设备运维标准化。'
  },
  {
    icon: iconVertical,
    title: '减少停机时间',
    description: '减少停机时间，提升生产效率，降低设备维护成本。'
  },
  {
    icon: iconAutonomous,
    title: '智能预警实现状态检修',
    description: '基于物联网和人工智能技术，实现设备状态实时监测和故障预警。'
  },
  {
    icon: iconHeadEnterprise,
    title: '运维监控支持远程化作业',
    description: '智能化远程运维监控，降低人工成本，提升运维效率。'
  },
  {
    icon: iconFullStack,
    title: '知识共享提升人才能力',
    description: '构建运维知识库系统，促进经验共享，提升专业化人才水平。'
  },
  {
    icon: iconVertical,
    title: '数据驱动维护链路闭环',
    description: '实现设备维护数据的全流程管理，优化维护策略，提高服务质量。'
  }
];

// 煤炭行业典型案例数据
const coalCases = [
  {
    image: coalCase1,
    title: '山西焦煤集团有限责任公司',
    description: '预测性运维管理平台'
  },
  {
    image: coalCase1,
    title: '山西焦煤集团有限责任公司',
    description: 'EAM'
  },
  {
    image: coalCase2,
    title: '特变电工',
    description: 'EAM'
  }
];

// 化工行业挑战数据
const chemicalChallenges = [
  {
    icon: chemicalExclamation,
    title: '设备可靠性风险高',
    description: '热心设备长期运行，检测手段落后且不足，数据采集覆盖率低，长期依赖人工巡检，无法准确预测设备状况。'
  },
  {
    icon: chemicalEquipment,
    title: '传统监控效率较低',
    description: '传统人工智能缺乏设计计划性，缺乏实时监测手段，设备管理效率，责任体系不完善结构化。'
  },
  {
    icon: chemicalProcess,
    title: '工艺整合与发展缓慢动',
    description: '多工艺环节（生产、检测）集成性低，人工管理精度不足，设备资源配置和现产品质量偏差大。'
  },
  {
    icon: chemicalSupply,
    title: '安全环保合规压力升级',
    description: '设备密度、VOC排放等项目面临日益严格的力度，环保压力加大，需要提高生产线稳定性与高效性。'
  }
];

// 化工行业解决方案数据
const chemicalSolutionsData = {
  description: '利用物联网、人工智能、专家规则推理等技术，为化工厂线上设备运行数据进行采集、分析和处理，实现对设备状态的实时监控和预警。从而对危设备底层原因，提前进行维修保养，保障设备正常运行，避免因设备故障而造成的生产中断，让多形态数人员安全事故的发生。',
  showImage: true,
  imageSrc: 'src/assets/industry/chemical-solution.png'
};

// 化工行业方案优势数据
const chemicalAdvantages = [
  {
    icon: chemicalAdvantageIcon,
    title: '智能运维全流程支撑',
    description: '实现设备远程监控与维护预警，兼顾前置检测与设备修一体的监管。'
  },
  {
    icon: chemicalAdvantageIcon,
    title: '非计划停机风险控制',
    description: '基于强化分析代建模算法，将意外停机率降95%，停机减速率20%+。'
  },
  {
    icon: chemicalAdvantageIcon,
    title: '生产效率与设备利用率提升',
    description: '实现优化调度计算，打造能源节约，环境管理能效提升。'
  },
  {
    icon: chemicalAdvantageIcon,
    title: '检修成本与人力优化',
    description: '智能化工业设备检修预判，降低设备故障，工业运营提升。'
  },
  {
    icon: chemicalAdvantageIcon,
    title: '数据测量与知识沉淀',
    description: '全生命周期知识库的构建，实现设备质量追溯与经验的积累。'
  },
  {
    icon: chemicalAdvantageIcon,
    title: '标准化管理能力升级',
    description: '集中化管理规范的全面构建系统，实现流程标准化工作优化管理。'
  }
];

// 化工行业典型案例数据
const chemicalCases = [
  {
    image: chemicalCase1, // 化工厂设备图片
    title: '巴斯夫(中国)',
    description: '预测性运维管理平台'
  }
];

// 汽车行业挑战数据
const carChallenges = [
  {
    icon: carChallenge1,
    title: '设备复杂优化与故障风险',
    description: '设备性能持续变革，无标准对标，导致性能在长时一致性、稳定性维持挑战大。'
  },
  {
    icon: carChallenge2,
    title: '非计划停机与安全风险',
    description: '关键设备（如冲压线、涂装线等）人工预警和计划性检修能力传统依赖处于可控但安全风险影响力。'
  },
  {
    icon: carChallenge3,
    title: '人工依赖与诊断效率瓶颈',
    description: '传统性设备缺陷检验人工干预分析，多保健维修需要依赖人经验，加重班组与班组24小时。'
  },
  {
    icon: carChallenge4,
    title: '备件沉余与成本压力',
    description: '主剖配件性能工艺检测能力存在差异，过度维护带来时间与人力成本，综合备件成本压力。'
  }
];

// 汽车行业解决方案数据
const carSolutionsData = {
  description: '为汽车行业提供设备预测性维护、全生命周期管理及供应链优化等解决方案，覆盖冲压、焊接等核心工艺，通过振动分析、动态排产算法及换电站健康监测技术，降低非计划停机，提升物流效率，助力车企实现设备可靠、生产高效与绿色转型。',
  showImage: true,
  imageSrc: 'src/assets/industry/solution-car-Photoroom.png'
}

// const carSolutionsData = {
//   description: '为汽车行业提供设备智能化预测性维护与全生命周期管理，全生命周期管理理论及供链优化技术方案，覆盖生产、工艺、设备等核心工艺，通过运动分析、动态生产算法及设备故障预测技术，降低并计划停机，提升物流效率，助力企业实现设备可靠、生产高效与精益转型。',
//   showImage: false, // 不使用图片而是使用文本数据
//   specialScenes: ['专项场景', '装箱优化', '换电站运维'],
//   applications: ['智能应用', '设备预测性维护（PHM）', '设备全生命周期管理（EAM）', '库存优化（IOP）'],
//   platformData: {
//     mainPlatforms: [
//       { title: '统一建模平台', content: '数据建模 | 机理建模 | 价值建模' },
//       { title: '模型管理服务', content: '模型部署 | 模型验证' },
//       { title: '统一建模平台', content: '数据对接 | 模型实时运算' },
//       { title: '其它技术组件', content: '组态工具 | 资源工具 | ······' }
//     ],
//     databases: ['关系数据库', '时序数据库', '文件存储', '······']
//   },
//   dataCollectionMethods: ['有线传感器', '边缘智能采集器', '无线智能网关']
// };

// 汽车行业方案优势数据
const carAdvantages = [
  {
    icon: 'src/assets/industry/car-advantage-1.png',
    title: '设备状态实时监测',
    description: '多源传感器【振动/压力/温】的光学数据采集，全程通讯级功能计算并与边缘平台同步，覆盖核心设备全工况运行状态。'
  },
  {
    icon: 'src/assets/industry/car-advantage-2.png',
    title: '异常预警与健康评估',
    description: '基于机理模型与AI算法，实现故障早期预警及设备健康状态评估，指导科学维护计划制定。'
  },
  {
    icon: 'src/assets/industry/car-advantage-3.png',
    title: '专家诊断与远程运维',
    description: '内置100+设备故障规则库，透明振动图谱，输入故障专家分析工具，支持远程24小时设备与故障建议生成。'
  },
  {
    icon: 'src/assets/industry/car-advantage-4.png',
    title: '智能备件库存优化',
    description: 'AI应用备件需求预测服务工业实施算法，结合消耗量监控，优化元件库存方案与提高效能。'
  }
];

// 汽车行业典型案例数据
const carCases = [
  {
    image: carCase1,
    title: '丰田集团',
    description: '预测性运维管理平台'
  }
];

// 新能源行业挑战数据
const newEnergyChallenges = [
  {
    icon: 'src/assets/industry/cement-challenge-2.png',
    title: '设备高故障率与运维成本高',
    description: '风电场规模、光伏集装等关键设施面临电子元器件、控制环境、故障处理、传输人工维修等难题，急于优化运维资源。'
  },
  {
    icon: 'src/assets/industry/cement-challenge-2.png',
    title: '数据孤岛与诊断效率不足',
    description: '设备运行数据分散于多个平台，缺乏统一分析平台，数据解读压在极少人工带宽，难解资源限制。'
  },
  {
    icon: 'src/assets/industry/cement-challenge-2.png',
    title: '环境适应性要求严苛',
    description: '设备面临多变环境，恶劣温度湿度应急管理高成本，环境适应要求持续年技术不足。'
  },
  {
    icon: 'src/assets/industry/cement-challenge-2.png',
    title: '能效优化与资产保值压力',
    description: '受电效率波动大，设备自能量改善需求，需通过健康评估延长资产寿命，确保资源压力。'
  }
];

// 新能源行业解决方案数据
const newEnergySolutionsData = {
  description: '通过纯动分析+机理模型实现故障早期预警，边缘计算+云平台构建边云网管理，降低维护成本，提升能效，以全栈技术点配供电环境，保障设备可靠性与资产保值。',
  showImage: true,
  imageSrc: 'src/assets/industry/wind-solution.png'
};

// 新能源行业方案优势数据
const newEnergyAdvantages = [
  {
    icon: 'src/assets/industry/wind-advantage-1.png',
    title: '设备智能监测与故障预警',
    description: '基于端点传感器网络，实时预测设备故障的可能性，提升设备健康管理。'
  },
  {
    icon: 'src/assets/industry/wind-advantage-2.png',
    title: '减少非计划停机风险',
    description: '通过预测性维护优化设备检修，规避意外停机对生产和检修的影响，保障生产连续性。'
  },
  {
    icon: 'src/assets/industry/wind-advantage-3.png',
    title: '能效与资源效率优化',
    description: '设备运行参数实时优化调整，提升设备发电效率，降低运营成本。'
  },
  {
    icon: 'src/assets/industry/wind-advantage-2.png',
    title: '恶劣环境高适应性',
    description: '抗衰、抗震特性保障高地域适应性，满足极端性天气。'
  },
  {
    icon: 'src/assets/industry/wind-advantage-3.png',
    title: '全链技术闭环管理',
    description: '"端+边+云"一体化和可视化故障诊断系统，分析、诊断和排除，减低技术关人才依赖。'
  }
];

// 新能源行业典型案例数据
const newEnergyCases = [
  {
    image: newEnergyBackgroundImage,
    title: '宁德时代',
    description: '预测性故障管理平台'
  },
  {
    image: newEnergyBackgroundImage,
    title: '亿纬锂能',
    description: '预测性故障管理平台'
  },
  {
    image: newEnergyBackgroundImage,
    title: '中广核',
    description: '预测性故障管理平台'
  }
];

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)

  // 禁用浏览器默认滚动行为
  document.body.style.overflow = 'hidden'

  // 检查URL参数中是否有section，有则跳转到对应section
  if (route.query.section) {
    const sectionNumber = parseInt(route.query.section as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 28) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
})

// 监听路由变化，以支持浏览器前进后退按钮
watch(() => route.query.section, (newSection) => {
  if (newSection) {
    const sectionNumber = parseInt(newSection as string)
    if (!isNaN(sectionNumber) && sectionNumber >= 0 && sectionNumber <= 28) {
      sectionStore.setCurrentSection(sectionNumber)
    }
  }
})

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
  window.removeEventListener('keydown', handleKeyDown)

  // 确保在离开页面时恢复浏览器默认滚动行为
  document.body.style.overflow = ''

  // 重置section状态, 否则在返回时会停留在当前section
  sectionStore.setCurrentSection(0)
})
</script>

<style scoped lang="less">
.industry-page {
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

/* 当滚动到第二部分时，第一部分向上移动 */
.section:first-child.section-hidden {
  transform: translateY(-100%);
}
</style>