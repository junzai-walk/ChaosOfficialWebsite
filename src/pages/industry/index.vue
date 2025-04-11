<template>
  <div class="industry-page" @wheel="handleWheel">
    <!-- 第一部分：钢铁行业 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 0, 
        inactive: sectionStore.currentSection !== 0,
        'slide-next': sectionStore.currentSection < 0,
        'slide-prev': sectionStore.currentSection > 0
      }"
      ref="steelSection">
      <IndustryHero :background-image="steelBackgroundImage" title="钢铁行业"
        description="结合机理模型、数据模型、数字孪生技术、多变量预测控制技术，解决钢铁企业生产工艺、设备控制等一系列工业生产痛点，实现工艺流、生产信息流、设备流“三流合一”，稳定提升成品质量，降低生产线设备故障风险、人力成本和能源消耗。" />
    </div>

    <!-- 第二部分：钢铁行业挑战 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 1, 
        inactive: sectionStore.currentSection !== 1,
        'slide-next': sectionStore.currentSection < 1,
        'slide-prev': sectionStore.currentSection > 1
      }"
      ref="challengesSection">
      <ChallengesSection :cards="steelChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[1, 2, 3, 4]" />
      <!-- <SteelChallenges /> -->
    </div>

    <!-- 第三部分：钢铁行业解决方案 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 2, 
        inactive: sectionStore.currentSection !== 2,
        'slide-next': sectionStore.currentSection < 2,
        'slide-prev': sectionStore.currentSection > 2
      }"
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
      :class="{ 
        active: sectionStore.currentSection === 3, 
        inactive: sectionStore.currentSection !== 3,
        'slide-next': sectionStore.currentSection < 3,
        'slide-prev': sectionStore.currentSection > 3
      }"
      ref="advantageSection">
      <!-- <SteelAdvantages /> -->
      <AdvantagesSection :cards="steelAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[1, 2, 3, 4]"/>
    </div>

    <!-- 第五部分：典型案例 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 4, 
        inactive: sectionStore.currentSection !== 4,
        'slide-next': sectionStore.currentSection < 4,
        'slide-prev': sectionStore.currentSection > 4
      }"
      ref="caseSection">
      <!-- <SteelCases /> -->
      <CasesSection :cases="steelCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[1, 2, 3, 4]"/>
    </div>

    <!-- 第六部分：水泥行业 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 5, 
        inactive: sectionStore.currentSection !== 5,
        'slide-next': sectionStore.currentSection < 5,
        'slide-prev': sectionStore.currentSection > 5
      }"
      ref="caseSection">
      <IndustryHero :background-image="cementBackgroundImage" title="水泥行业" description="智控水泥生产，赋能绿色高效" />
    </div>

    <!-- 第七部分：水泥行业挑战 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 6, 
        inactive: sectionStore.currentSection !== 6,
        'slide-next': sectionStore.currentSection < 6,
        'slide-prev': sectionStore.currentSection > 6
      }"
      ref="challengesSection">
      <ChallengesSection :cards="cementChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[6, 7, 8, 9]" />
    </div>

    <!-- 第八部分：水泥行业解决方案 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 7, 
        inactive: sectionStore.currentSection !== 7,
        'slide-next': sectionStore.currentSection < 7,
        'slide-prev': sectionStore.currentSection > 7
      }"
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
      :class="{ 
        active: sectionStore.currentSection === 8, 
        inactive: sectionStore.currentSection !== 8,
        'slide-next': sectionStore.currentSection < 8,
        'slide-prev': sectionStore.currentSection > 8
      }"
      ref="advantageSection">
      <!-- 封装的新组件应用于水泥行业 -->
        <AdvantagesSection :cards="cementAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[6, 7, 8, 9]"/>
    </div>

    <!-- 第十部分：水泥行业典型案例 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 9, 
        inactive: sectionStore.currentSection !== 9,
        'slide-next': sectionStore.currentSection < 9,
        'slide-prev': sectionStore.currentSection > 9
      }"
      ref="caseSection">
      <!-- 封装的新组件应用于水泥行业 -->
      <CasesSection :cases="cementCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[6, 7, 8, 9]"/>
    </div>

    <!-- 第十一部分：煤炭行业 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 10, 
        inactive: sectionStore.currentSection !== 10,
        'slide-next': sectionStore.currentSection < 10,
        'slide-prev': sectionStore.currentSection > 10
      }"
      ref="caseSection">
      <IndustryHero :background-image="coalBackgroundImage" title="煤炭行业"
        description="以数据智能驱动煤矿生产全流程优化，实现煤机设备全寿期、全业务链的集中管控，提升煤矿企业数字化管控能力。" />
    </div>

    <!-- 第十二部分：煤炭行业挑战 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 11, 
        inactive: sectionStore.currentSection !== 11,
        'slide-next': sectionStore.currentSection < 11,
        'slide-prev': sectionStore.currentSection > 11
      }"
      ref="caseSection">
      <ChallengesSection :cards="coalChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[11, 12, 13, 14]" />
    </div>

    <!-- 第十三部分：煤炭行业解决方案 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 12, 
        inactive: sectionStore.currentSection !== 12,
        'slide-next': sectionStore.currentSection < 12,
        'slide-prev': sectionStore.currentSection > 12
      }"
      ref="solutionsSection">
      <SolutionsSection :nav-steps="industrySteps" :description="coalSolutionsData.description" :default-active-step="2" :section-numbers="[11, 12, 13, 14]"
        :show-image="coalSolutionsData.showImage" :image-src="coalSolutionsData.imageSrc" />
    </div>

    <!-- 第十四部分：煤炭行业方案优势 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 13, 
        inactive: sectionStore.currentSection !== 13,
        'slide-next': sectionStore.currentSection < 13,
        'slide-prev': sectionStore.currentSection > 13
      }"
      ref="advantageSection">
      <AdvantagesSection :cards="coalAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[11, 12, 13, 14]"/>
    </div>

    <!-- 第十五部分：煤炭行业典型案例 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 14, 
        inactive: sectionStore.currentSection !== 14,
        'slide-next': sectionStore.currentSection < 14,
        'slide-prev': sectionStore.currentSection > 14
      }"
      ref="coalCaseSection">
      <CasesSection :cases="coalCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[11, 12, 13, 14]"/>
    </div>

    <!-- 第十六部分：化工行业 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 15, 
        inactive: sectionStore.currentSection !== 15,
        'slide-next': sectionStore.currentSection < 15,
        'slide-prev': sectionStore.currentSection > 15
      }"
      ref="chemicalSection">
      <IndustryHero :background-image="chemicalBackgroundImage" title="化工行业"
        description="以智能运维驱动设备全生命周期管理，保障化工生产安全、高效、可持续。" />
    </div>

    <!-- 第十七部分：化工行业挑战 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 16, 
        inactive: sectionStore.currentSection !== 16,
        'slide-next': sectionStore.currentSection < 16,
        'slide-prev': sectionStore.currentSection > 16
      }"
      ref="chemicalChallengeSection">
      <ChallengesSection :cards="chemicalChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[16, 17, 18, 19]" />
    </div>

    <!-- 第十八部分：化工行业解决方案 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 17, 
        inactive: sectionStore.currentSection !== 17,
        'slide-next': sectionStore.currentSection < 17,
        'slide-prev': sectionStore.currentSection > 17
      }"
      ref="chemicalSolutionSection">
      <SolutionsSection :nav-steps="industrySteps" :description="chemicalSolutionsData.description"
        :default-active-step="2" :section-numbers="[16, 17, 18, 19]" :show-image="chemicalSolutionsData.showImage"
        :image-src="chemicalSolutionsData.imageSrc" />
    </div>

    <!-- 第十九部分：化工行业方案优势 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 18, 
        inactive: sectionStore.currentSection !== 18,
        'slide-next': sectionStore.currentSection < 18,
        'slide-prev': sectionStore.currentSection > 18
      }"
      ref="chemicalAdvantageSection">
      <AdvantagesSection :cards="chemicalAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[16, 17, 18, 19]"/>
    </div>

    <!-- 第二十部分：化工行业典型案例 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 19, 
        inactive: sectionStore.currentSection !== 19,
        'slide-next': sectionStore.currentSection < 19,
        'slide-prev': sectionStore.currentSection > 19
      }"
      ref="chemicalCaseSection">
      <CasesSection :cases="chemicalCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[16, 17, 18, 19]"/>
    </div>

    <!-- 第二十一部分： 汽车行业 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 20, 
        inactive: sectionStore.currentSection !== 20,
        'slide-next': sectionStore.currentSection < 20,
        'slide-prev': sectionStore.currentSection > 20
      }"
      ref="carSection">
      <IndustryHero :background-image="carBackgroundImage" title="汽车行业"
        description="以设备为核心驱动汽车行业全流程升级，构建高效、可靠、可持续的智慧工厂 。" />
    </div>

    <!-- 第二十二部分： 汽车行业挑战 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 21, 
        inactive: sectionStore.currentSection !== 21,
        'slide-next': sectionStore.currentSection < 21,
        'slide-prev': sectionStore.currentSection > 21
      }"
      ref="carChallengeSection">
      <ChallengesSection :cards="carChallenges" :nav-steps="industrySteps" :default-active-step="1"
        :section-numbers="[21, 22, 23, 24]" />
    </div>

    <!-- 第二十三部分： 汽车行业解决方案 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 22, 
        inactive: sectionStore.currentSection !== 22,
        'slide-next': sectionStore.currentSection < 22,
        'slide-prev': sectionStore.currentSection > 22
      }"
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
      :class="{ 
        active: sectionStore.currentSection === 23, 
        inactive: sectionStore.currentSection !== 23,
        'slide-next': sectionStore.currentSection < 23,
        'slide-prev': sectionStore.currentSection > 23
      }"
      ref="carAdvantageSection">
      <AdvantagesSection :cards="carAdvantages" :nav-steps="industrySteps" :default-active-step="3" :section-numbers="[21, 22, 23, 24]"/>
    </div>

    <!-- 第二十五部分： 汽车行业典型案例 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 24, 
        inactive: sectionStore.currentSection !== 24,
        'slide-next': sectionStore.currentSection < 24,
        'slide-prev': sectionStore.currentSection > 24
      }"
      ref="carCaseSection">
      <CasesSection :cases="carCases" :nav-steps="industrySteps" :default-active-step="4" :section-numbers="[21, 22, 23, 24]"/>
    </div>

    <!-- 第二十六部分： 新能源行业 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 25, 
        inactive: sectionStore.currentSection !== 25,
        'slide-next': sectionStore.currentSection < 25,
        'slide-prev': sectionStore.currentSection > 25
      }"
      ref="newEnergySection">
      <IndustryHero :background-image="newEnergyBackgroundImage" title="新能源行业"
        description="以智能运维驱动设备可靠性提升，打破信息壁垒，建立规范和有效的集中管理机制，助力新能源行业高效、安全、可持续发展" />
    </div>

    <!-- 第二十七部分： 新能源行业挑战 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 26, 
        inactive: sectionStore.currentSection !== 26,
        'slide-next': sectionStore.currentSection < 26,
        'slide-prev': sectionStore.currentSection > 26
      }"
      ref="newEnergyChallengeSection">
      <ChallengesSection :cards="newEnergyChallenges" :nav-steps="industryThreeSteps" :default-active-step="1"
        :section-numbers="[26, 27, 28]" />
    </div>

    <!-- 第二十八部分： 新能源行业解决方案 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 27, 
        inactive: sectionStore.currentSection !== 27,
        'slide-next': sectionStore.currentSection < 27,
        'slide-prev': sectionStore.currentSection > 27
      }"
      ref="newEnergySolutionSection">
      <SolutionsSection :nav-steps="industryThreeSteps" :description="newEnergySolutionsData.description"
        :default-active-step="2" :section-numbers="[26, 27, 28]" :show-image="newEnergySolutionsData.showImage"
        :image-src="newEnergySolutionsData.imageSrc" />
    </div>

    <!-- 第二十九部分： 新能源行业方案优势 -->
    <div class="section"
      :class="{ 
        active: sectionStore.currentSection === 28, 
        inactive: sectionStore.currentSection !== 28,
        'slide-next': sectionStore.currentSection < 28,
        'slide-prev': sectionStore.currentSection > 28
      }"
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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSectionStore } from '@/stores/sectionStore'
import IndustryHero from '@/components/industry/components/IndustryHero.vue'
import ChallengesSection from '@/components/industry/components/ChallengesSection.vue'
import SolutionsSection from '@/components/industry/components/SolutionsSection.vue'
import AdvantagesSection from '@/components/industry/components/AdvantagesSection.vue'
import CasesSection from '@/components/industry/components/CasesSection.vue'

import steelBackgroundImage from '@/assets/industry/steel.png'
import cementBackgroundImage from '@/assets/industry/cement-bg.png'
import chemicalBackgroundImage from '@/assets/industry/chemical-bg.jpg'
import carBackgroundImage from '@/assets/industry/car-bg.png'
import newEnergyBackgroundImage from '@/assets/industry/wind-bg.png'

import iconEnergy from "@/assets/industry/icon-energy.png"
import iconEquipment from "@/assets/industry/icon-equipment.png"
import iconProcess from "@/assets/industry/icon-process.png"
import iconSupply from "@/assets/industry/icon-supply.png"

import steelAdvantage1 from '@/assets/industry/steel-advantage-1.png'
import steelAdvantage2 from '@/assets/industry/steel-advantage-2.png'
import steelAdvantage3 from '@/assets/industry/steel-advantage-3.png'
import steelAdvantage4 from '@/assets/industry/steel-advantage-4.png'

import cementChallenge1 from '@/assets/industry/cement-challenge-1.png'
import cementChallenge2 from '@/assets/industry/cement-challenge-2.png'
import cementChallenge3 from '@/assets/industry/cement-challenge-3.png'
import cementChallenge4 from '@/assets/industry/cement-challenge-4.png'

import cementAdvantage1 from '@/assets/industry/cement-advantage-1.png'
import cementAdvantage2 from '@/assets/industry/cement-advantage-2.png'
import cementAdvantage3 from '@/assets/industry/cement-advantage-3.png'
import cementAdvantage4 from '@/assets/industry/cement-advantage-4.png'

import coalChallenge1 from '@/assets/industry/coal-challenge-1.png'
import coalChallenge2 from '@/assets/industry/coal-challenge-2.png'
import coalChallenge3 from '@/assets/industry/coal-challenge-3.png'
import coalChallenge4 from '@/assets/industry/coal-challenge-4.png'

import coalAdvantage1 from '@/assets/industry/coal-advantage-1.png'
import coalAdvantage2 from '@/assets/industry/coal-advantage-2.png'
import coalAdvantage3 from '@/assets/industry/coal-advantage-3.png'
import coalAdvantage4 from '@/assets/industry/coal-advantage-4.png'
import coalAdvantage5 from '@/assets/industry/coal-advantage-5.png'
import coalAdvantage6 from '@/assets/industry/coal-advantage-6.png'

import chemicalAdvantage1 from '@/assets/industry/chemical-advantage-1.png'
import chemicalAdvantage2 from '@/assets/industry/chemical-advantage-2.png'
import chemicalAdvantage3 from '@/assets/industry/chemical-advantage-3.png'
import chemicalAdvantage4 from '@/assets/industry/chemical-advantage-4.png'
import chemicalAdvantage5 from '@/assets/industry/chemical-advantage-5.png'
import chemicalAdvantage6 from '@/assets/industry/chemical-advantage-6.png'

import carAdvantage1 from '@/assets/industry/car-advantage-1.png'
import carAdvantage2 from '@/assets/industry/car-advantage-2.png'
import carAdvantage3 from '@/assets/industry/car-advantage-3.png'
import carAdvantage4 from '@/assets/industry/car-advantage-4.png'

import windChallenge1 from '@/assets/industry/wind-challenge-1.png'
import windChallenge2 from '@/assets/industry/wind-challenge-2.png'
import windChallenge3 from '@/assets/industry/wind-challenge-3.png'
import windChallenge4 from '@/assets/industry/wind-challenge-4.png'

import windAdvantage1 from '@/assets/industry/wind-advantage-1.png'
import windAdvantage2 from '@/assets/industry/wind-advantage-2.png'
import windAdvantage3 from '@/assets/industry/wind-advantage-3.png'
import windAdvantage4 from '@/assets/industry/wind-advantage-4.png'
import windAdvantage5 from '@/assets/industry/wind-advantage-5.png'


// 引入方案优势图标
import coalBackgroundImage from '@/assets/industry/coal-bg.png'
import coalSolutionImage from '@/assets/industry/coal-solution-Photoroom.png'
import chemicalExclamation from '@/assets/industry/chemical-challenge-1.png'
import chemicalEquipment from '@/assets/industry/chemical-challenge-2.png'
import chemicalProcess from '@/assets/industry/chemical-challenge-3.png'
import chemicalSupply from '@/assets/industry/chemical-challenge-4.png'

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

// Import solution images
import steelSolutionImage from '@/assets/industry/solution-steel-Photoroom.png'
import cementSolutionImage from '@/assets/industry/solution-cement-Photoroom.png'
import chemicalSolutionImage from '@/assets/industry/chemical-solution.png'
import carSolutionImage from '@/assets/industry/solution-car-Photoroom.png'
import windSolutionImage from '@/assets/industry/wind-solution.png'


const route = useRoute()
const router = useRouter()
const scrolling = ref(false)
const scrollDelay = 1000 // 滚动延迟，防止连续滚动

// 使用 Pinia store 代替本地状态
const sectionStore = useSectionStore()

// 页面跳转函数
const goToSection = (sectionIndex: number) => {
  if (sectionIndex >= 0 && sectionIndex <= 28) {
    sectionStore.currentSection = sectionIndex;
  }
};

// 处理鼠标滚轮事件
const handleWheel = (e: WheelEvent) => {
  if (scrolling.value) return;

  scrolling.value = true;

  // 向下滚动
  if (e.deltaY > 0 && sectionStore.currentSection < 28) {
    sectionStore.nextSection(28);
  }
  // 向上滚动
  else if (e.deltaY < 0 && sectionStore.currentSection > 0) {
    sectionStore.prevSection();
  }

  // 设置滚动延迟，调整为稍短时间提高响应度
  setTimeout(() => {
    scrolling.value = false;
  }, 700);
};

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
    title: '高能耗与低碳转型压力',
    description: '煤气放散率居高不下，能源综合利用率低；碳排放强度高，面临“双碳”目标下减排压力。'
  },
  {
    icon: iconEquipment,
    title: '设备停机损失与运维挑战',
    description: '核心设备价值高、非计划停机损失巨大；传统维护依赖人工经验，缺乏实时健康状态监测，故障预警准确率低。'
  },
  {
    icon: iconProcess,
    title: '工艺优化与质量控制瓶颈',
    description: '黄金工艺参数挖掘难，高端钢材质量一致性受工艺波动影响； 多工序数据孤岛导致质量追溯耗时，异常根因定位效率低。'
  },
  {
    icon: iconSupply,
    title: '生产协同与供应链韧性',
    description: '板坯库调度依赖人工决策，倒垛效率低，物流成本高； 订单排产与物料供应协同不足，库存周转率与交付准时率存在优化空间。'
  }
];
// 定义水泥行业挑战数据
const cementChallenges = [
  {
    icon: cementChallenge1,
    title: '碳中和与深度减排压力升级',
    description: '熟料烧成能耗占比超60%，煤耗高，需智能优化降低碳排放，应对“双碳”目标与环保法规。'
  },
  {
    icon: cementChallenge2,
    title: '设备智能化运维协同瓶颈',
    description: '设备复杂度提升与多系统集成需求激增，传统运维模式难以满足高精度预测性维护与跨产线协同管理。'
  },
  {
    icon: cementChallenge3,
    title: '工艺柔性化与质量一致性挑战',
    description: '生料配比波动、窑温控制误差大，人工控制已不满足产线提升精度，质量一致性需求。'
  },
  {
    icon: cementChallenge4,
    title: '环保与成本双重挑战',
    description: '粉尘、氮氧化物治理成本攀升，需平衡环保合规与降本增效，智能化技术驱动绿色转型。'
  }
];

// 煤炭行业挑战数据
const coalChallenges = [
  {
    icon: coalChallenge1,
    title: '设备可靠性不足',
    description: '核心设备（如提升机、通风机、皮带机）故障率高，依赖人工巡检，非计划停机影响生产连续性。'
  },
  {
    icon: coalChallenge2,
    title: '安全管控难度大',
    description: '井下环境复杂，设备、环境等安全隐患实时监测与预警能力不足，事故风险难以有效预防。'
  },
  {
    icon: coalChallenge3,
    title: '数据协同能力弱',
    description: '设备、工艺、安全等多系统数据孤岛严重，缺乏统一平台支撑智能化决策。'
  },
  {
    icon: coalChallenge4,
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
  imageSrc: steelSolutionImage
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
  imageSrc: cementSolutionImage
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
  description: '聚焦核心设备智能化运维，采用物联网、人工智能、大数据等技术，通过特征提取+机理建模的方式实现设备状态感知、智能预警、故障诊断、健康评估，并以统一算法库与知识库赋能矿井设备全生命周期管理，帮助煤矿企业实现数字化转型升级，从而建立起从生产技术到决策管理的智能化的煤矿工业新生态。',
  showImage: true,
  imageSrc: coalSolutionImage
};

// 钢铁行业方案优势数据
const steelAdvantages = [
  {
    icon: steelAdvantage1,
    title: '全栈技术能力',
    description: '覆盖智能硬件至智能系统，实现“端-边-云”一体化闭环。'
  },
  {
    icon: steelAdvantage2,
    title: '垂直场景深度适配',
    description: '基于钢铁工艺机理模型开发，覆盖煤气平衡、冷轧控制等核心场景。'
  },
  {
    icon: steelAdvantage3,
    title: '自主可控技术底座',
    description: '1000+核心算法专利，30+授权专利，工信部“工业互联网平台示范项目”认证'
  },
  {
    icon: steelAdvantage4,
    title: '头部企业验证',
    description: '宝武集团、敬业钢铁等标杆案例落地，单项目年综合效益超千万元 。'
  }
];

// 水泥行业方案优势数据
const cementAdvantages = [
  {
    icon: cementAdvantage1,
    title: '低碳环保',
    description: '提升能源利用效率； 减少污染的排放。'
  },
  {
    icon: cementAdvantage2,
    title: '智能运维',
    description: '及时发现设备异常，提前做好维护工作，避免设备故障导致的生产停滞和生产成本增加。'
  },
  {
    icon: cementAdvantage3,
    title: '品质提升',
    description: '稳定控制参数波动，实现稳定加热和冷却；搅拌过程控制，保证成品的质量。'
  },
  {
    icon: cementAdvantage4,
    title: '稳定生产',
    description: '减少温差波动，充分燃烧； 及时响应各个变量之间的关联性。'
  }
];

// 钢铁行业案例数据
const steelCases = [
  {
    image: steelCase1,
    title: '中国宝武钢铁集团有限公司',
    description: '设备预测性维护与健康管理系统'
  },
  {
    image: steelCase2,
    title: '敬业钢铁有限公司',
    description: '设备预测性维护与健康管理系统'
  },
  {
    image: steelCase3,
    title: '宝山钢铁股份有限公司',
    description: '先进过程控制系统'
  }
];

// 水泥行业案例数据
const cementCases = [
  {
    image: cementCase1,
    title: '安徽海螺水泥股份有限公司',
    description: '设备预测性维护与健康管理系统'
  },
  {
    image: cementCase1,
    title: '巢湖海螺水泥有限责任公司',
    description: '先进过程控制系统'
  },
  {
    image: cementCase2,
    title: '安徽盘锦水泥有限公司',
    description: '先进过程控制系统'
  }
];

// 煤炭行业方案优势数据
const coalAdvantages = [
  {
    icon: coalAdvantage1,
    title: '设备全流程标准化管理',
    description: '覆盖档案、维修、点检全生命周期，实现规范化管控。'
  },
  {
    icon: coalAdvantage2,
    title: '减少停机时间，提升生产效率',
    description: '优化设备利用率，降低突发故障对生产的中断影响。'
  },
  {
    icon: coalAdvantage3,
    title: '智能预警实现状态检修',
    description: '基于振动与大数据技术，精准预测故障，推动计划检修转型。'
  },
  {
    icon: coalAdvantage4,
    title: '远程监控支持少人化作业',
    description: '智能化运维减少人工依赖，提升井下作业安全性。'
  },
  {
    icon: coalAdvantage5,
    title: '知识共享提升人才能力',
    description: '构建诊断知识库，促进经验沉淀与专业化人才培养。'
  },
  {
    icon: coalAdvantage6,
    title: '数据驱动降低运维成本',
    description: '实时监测设备健康状态，优化维护策略，延长设备寿命。'
  }
];

// 煤炭行业典型案例数据
const coalCases = [
  {
    image: coalCase1,
    title: '山西焦煤集团有限责任公司',
    description: '设备预测性维护与健康管理系统'
  },
  {
    image: coalCase1,
    title: '山西焦煤集团有限责任公司',
    description: '设备全生命周期管理系统'
  },
  {
    image: coalCase2,
    title: '新疆天池能源有限责任公司',
    description: '设备全生命周期管理系统'
  }
];

// 化工行业挑战数据
const chemicalChallenges = [
  {
    icon: chemicalExclamation,
    title: '设备可靠性风险高',
    description: '核心设备（反应釜、压缩机等）长期处于高温高压环境，腐蚀与疲劳导致故障频发，非计划停机损失占比超15%。'
  },
  {
    icon: chemicalEquipment,
    title: '传统运维效率较低',
    description: '依赖人工经验巡检与计划检修，缺乏实时健康监测，故障预警滞后，备件库存冗余与短缺并存。'
  },
  {
    icon: chemicalProcess,
    title: '工艺耦合性引发质量波动',
    description: '多工序参数（温度、压力）耦合性强，人工调节精度不足，设备异常直接影响产品质量稳定性。'
  },
  {
    icon: chemicalSupply,
    title: '安全环保合规压力升级',
    description: '设备泄漏、VOCs排放等隐患实时监测能力弱，环保治理成本高，需兼顾生产连续性与合规性。'
  }
];

// 化工行业解决方案数据
const chemicalSolutionsData = {
  description: '利用物联网、人工智能、专家规则推理等技术手段，对化工产线上设备运行数据进行采集、分析和预测，实现对设备状态的实时监控和预警，从而预测设备故障风险，提前进行维修保养，确保设备正常运行，避免因设备故障而造成的生产中断、业务损失和人员安全事故的发生。',
  showImage: true,
  imageSrc: chemicalSolutionImage
};

// 化工行业方案优势数据
const chemicalAdvantages = [
  {
    icon: chemicalAdvantage1,
    title: '智能运维全流程支撑',
    description: '实现设备远程监控与维护闭环管理，满足跨系统设备统一管控需求。'
  },
  {
    icon: chemicalAdvantage2,
    title: '非计划停机风险控制',
    description: '基于振动分析+机理建模技术，故障预警准确率>95%，停机率降低50%+。'
  },
  {
    icon: chemicalAdvantage3,
    title: '生产效率与设备利用率提升',
    description: '动态优化设备运行参数，开动率提升，年综合能效成本节约显著。'
  },
  {
    icon: chemicalAdvantage4,
    title: '检修成本与人力优化',
    description: '智能化工单调度+备件库存预测，维护成本下降，工单效率提升。'
  },
  {
    icon: chemicalAdvantage5,
    title: '数据溯源与知识沉淀',
    description: '全生命周期数据可视化存储分析，支持故障根因追溯与经验规则库构建。'
  },
  {
    icon: chemicalAdvantage6,
    title: '标准化管理能力升级',
    description: '推动设备管理从经验驱动转向数据驱动，实现运维流程线上透明化化管控。'
  }
];

// 化工行业典型案例数据
const chemicalCases = [
  {
    image: chemicalCase1, // 化工厂设备图片
    title: '巴斯夫（中国）有限公司',
    description: '设备预测性维护与健康管理系统'
  }
];

// 汽车行业挑战数据
const carChallenges = [
  {
    icon: carChallenge1,
    title: '设备复杂性高与数据孤岛',
    description: '动力设备种类繁多，点检数据分散，多源信息难以统一管理，导致运维效率低下。'
  },
  {
    icon: carChallenge2,
    title: '非计划停机与安全风险',
    description: '关键设备（如冲压机、焊接机器人）故障易引发产线停滞，传统维护缺乏实时预警与精准诊断能力。'
  },
  {
    icon: carChallenge3,
    title: '人工依赖与诊断效率瓶颈',
    description: '传统振动监测依赖人工经验分析，多设备监控易导致信息过载，故障定位耗时超24小时。'
  },
  {
    icon: carChallenge4,
    title: '备件冗余与成本压力',
    description: '定期检修模式导致备件库存积压，过度维护增加时间与人力成本，综合运维成本占比高。'
  }
];

// 汽车行业解决方案数据
const carSolutionsData = {
  description: '为汽车行业提供设备预测性维护、全生命周期管理及供应链优化等解决方案，覆盖冲压、焊接等核心工艺，通过振动分析、动态排产算法及换电站健康监测技术，降低非计划停机，提升物流效率，助力车企实现设备可靠、生产高效与绿色转型。',
  showImage: true,
  imageSrc: carSolutionImage
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
    icon: carAdvantage1,
    title: '设备状态实时监测',
    description: '多源传感器（振动/应力波）精准采集数据，支持毫秒级边缘计算与云端同步，覆盖核心设备全工况运行状态。'
  },
  {
    icon: carAdvantage2,
    title: '异常预警与健康评估',
    description: '基于机理模型与AI算法，实现故障早期预警及健康度动态评估，指导科学维护计划制定。'
  },
  {
    icon: carAdvantage3,
    title: '专家诊断与远程运维',
    description: '内置100+设备故障规则库，提供振动图谱、轴心轨迹等专家分析工具，支持远程24小时诊断与检修建议生成。'
  },
  {
    icon: carAdvantage4,
    title: '智能备件库存优化',
    description: 'AI驱动的备件需求预测与工单调度算法，库存周转率提升，减少冗余库存与缺货风险。'
  }
];

// 汽车行业典型案例数据
const carCases = [
  {
    image: carCase1,
    title: '广汽丰田汽车有限公司',
    description: '设备预测性维护与健康管理系统'
  }
];

// 新能源行业挑战数据
const newEnergyChallenges = [
  {
    icon: windChallenge1,
    title: '设备高故障率与运维成本高',
    description: '风电齿轮箱、光伏逆变器等关键设备长期处于高负荷、极端环境，故障频发，传统人工巡检效率低，非计划停机损失显著。'
  },
  {
    icon: windChallenge2,
    title: '数据孤岛与诊断效率不足',
    description: '设备运行数据分散于多个系统，缺乏统一分析平台，故障根因定位依赖人工经验，异常响应周期长。'
  },
  {
    icon: windChallenge3,
    title: '环境适应性要求严苛',
    description: '设备部署于复杂环境，传感器需满足防盐雾、高低温、抗振动等要求，传统监测手段可靠性不足。'
  },
  {
    icon: windChallenge4,
    title: '能效优化与资产保值压力',
    description: '发电效率波动大，设备性能衰减难量化，需通过健康评估延长资产寿命，降低度电成本。'
  }
];

// 新能源行业解决方案数据
const newEnergySolutionsData = {
  description: '通过振动分析+机理模型实现故障早期预警，边缘计算+云平台构建端边云闭环管理，降低非计划停机，提升能效，以全栈技术适配极端环境，保障设备可靠性与资产保值。',
  showImage: true,
  imageSrc: windSolutionImage
};

// 新能源行业方案优势数据
const newEnergyAdvantages = [
  {
    icon: windAdvantage1,
    title: '设备智能监测与故障预警',
    description: '基于振动与机理模型，实时捕捉设备早期异常信号，提升故障预警精准度。'
  },
  {
    icon: windAdvantage2,
    title: '减少非计划停机风险',
    description: '通过预测性维护优化检修策略，降低关键设备非计划停机频率，保障生产连续性'
  },
  {
    icon: windAdvantage3,
    title: '能效与发电效率优化',
    description: '动态调度算法匹配能源供需，提升设备发电效率，降低综合能耗'
  },
  {
    icon: windAdvantage4,
    title: '恶劣环境高适应性',
    description: '抗防爆、耐腐蚀传感器适配极端场景，确保数据稳定采集。'
  },
  {
    icon: windAdvantage5,
    title: '全栈技术闭环管理',
    description: '“端-边-云”一体化架构实现数据采集、分析、控制闭环，赋能远程少人化运维。'
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
</style>