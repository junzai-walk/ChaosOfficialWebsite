<template>
  <div class="case-detail">
    <div class="header"></div>
    <div class="content">
      <div class="content-header">
        <div class="header-title">
          <span>{{ showContent.mainTitle }}</span>
          <p>{{ showContent.subTitle }}</p>
        </div>
      </div>
      <div class="content-bottom">
        <div class="sub-title">项目背景</div>
        <p class="sub-content"> {{ showContent.background }}</p>
        <div class="sub-title">建设内容</div>
        <p class="sub-content">
          {{ showContent.content }}
        </p>
        <div class="sub-title">应用成果</div>
        <p class="sub-content">
          {{ showContent.achievement }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
type CaseData = {
  mainTitle: string;
  subTitle: string;
  background: string;
  content: string;
  achievement: string;
};
const customer: Record<string, CaseData> = {
  baogang: {
    mainTitle: 'baogang',
    subTitle: '水泥生产控制全局优化软件',
    background: '近年来，工业企业行情低迷、产能过剩局面依旧严峻。供需失衡的格局下，故步自封已无法支撑企业立足当前复杂的市场形势，节能减碳、降本增效、产业转型升级、优化资产配置、增强核心竞争力才能维持水泥行业健康长远发展。巢湖海螺顺应发展趋势，为减少人工经验依赖，根据能耗、产量、质量数据进行生产精准控制，同时降低经验不足和人工疲劳导致的经济损失与安全损失，提升整体综合实力，研发和应用生产控制全局优化软件对水泥产线进行技术改造项目。',
    content: `系统建设按照“科学规划+产研融合+优化迭代”的思路分步实施，聚焦平台和算法研发，并在水泥产线进行实施验证。\n1.平台集成数据采集、组件管理、控制编排、驾驶舱等核心功能，通过可视化、拖拉拽的方式实现生产控制流程配置，自定义生产控制策略，大大减少了源代码开发人员需求量，降低了系统使用门槛。\n2.算法采用参考借鉴+自主化的模式进行研发，实现 PID、MPC、LMI 等经典控制算法的自主化研发，并在此基础上融合机器学习、深度学习等优化类算法，控制效果显著，实现自主可控。\n3.产线应用针对水泥生产过程中的痛点和难点问题，利用自主研发的平台和算法与海螺工艺知识进行融合应用，对水泥生产过程中的“两磨一烧”进行控制优化，实现生产线的稳定、高效、优质运行，进一步降低能源消耗，提高劳动生产效率。`,
    achievement: '通过多变量模型预测技术，实现煤磨系统、原料磨系统、烧成系统自动控制，降低劳动强度，关键参数控制效果提升明显，经实际考核，仅年煤耗降低可达189万元。实现自动控制回路在线率>98%，煤电耗指标降低＞1%，人员劳动强度下降＞90%，关键参数稳定性提升＞35%，游离钙标准偏差下降＞10%，年二氧化碳排放量下降＞1%。',
  },
  hailuo: {
    mainTitle: 'hailuo',
    subTitle: '水泥生产控制全局优化软件',
    background: '近年来，工业企业行情低迷、产能过剩局面依旧严峻。供需失衡的格局下，故步自封已无法支撑企业立足当前复杂的市场形势，节能减碳、降本增效、产业转型升级、优化资产配置、增强核心竞争力才能维持水泥行业健康长远发展。巢湖海螺顺应发展趋势，为减少人工经验依赖，根据能耗、产量、质量数据进行生产精准控制，同时降低经验不足和人工疲劳导致的经济损失与安全损失，提升整体综合实力，研发和应用生产控制全局优化软件对水泥产线进行技术改造项目。',
    content: '系统建设按照“科学规划+产研融合+优化迭代”的思路分步实施，聚焦平台和算法研发，并在水泥产线进行实施验证。1.平台集成数据采集、组件管理、控制编排、驾驶舱等核心功能，通过可视化、拖拉拽的方式实现生产控制流程配置，自定义生产控制策略，大大减少了源代码开发人员需求量，降低了系统使用门槛。2.算法采用参考借鉴+自主化的模式进行研发，实现 PID、MPC、LMI 等经典控制算法的自主化研发，并在此基础上融合机器学习、深度学习等优化类算法，控制效果显著，实现自主可控。3.产线应用针对水泥生产过程中的痛点和难点问题，利用自主研发的平台和算法与海螺工艺知识进行融合应用，对水泥生产过程中的“两磨一烧”进行控制优化，实现生产线的稳定、高效、优质运行，进一步降低能源消耗，提高劳动生产效率。',
    achievement: '通过多变量模型预测技术，实现煤磨系统、原料磨系统、烧成系统自动控制，降低劳动强度，关键参数控制效果提升明显，经实际考核，仅年煤耗降低可达189万元。实现自动控制回路在线率>98%，煤电耗指标降低＞1%，人员劳动强度下降＞90%，关键参数稳定性提升＞35%，游离钙标准偏差下降＞10%，年二氧化碳排放量下降＞1%。',
  },
}
const props = defineProps({
  caseId: {
    type: [Number, String],
    required: true,
  }
});

const showContent = ref({
  mainTitle: '暂无',
  subTitle: '暂无',
  background: '暂无',
  content: '暂无',
  achievement: '暂无',

})
watch(
  () => props.caseId,
  (newVal, oldVal) => {
    if (customer[newVal]) {
      showContent.value = customer[newVal]
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped lang="less">
// 根字体大小设置，用于rem计算
html {
  font-size: 16px;

  @media (min-width: 1920px) {
    font-size: calc(16px * (1920 / 1920));
  }

  @media (max-width: 1440px) {
    font-size: calc(16px * (1440 / 1920));
  }

  @media (max-width: 1280px) {
    font-size: calc(16px * (1280 / 1920));
  }
}

.case-detail {
  position: relative;
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 改为flex-start而非center */
  min-height: 100vh;

  /* 确保最小高度填满视口 */
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 320px;
    display: flex;
    background: url('@/assets/customer/Group455.png') no-repeat center center;
    background-size: 100% 100%;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 120px;
    font-size: 24px;
    font-weight: 700;
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .content-header {
      box-sizing: border-box;
      padding-top: 80px;
      flex: 1;

      .header-title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 15px;
        padding-bottom: 35px;
        color: #fff;

        p {
          font-size: 32px;
        }
      }
    }

    .content-bottom {
      box-sizing: border-box;
      width: 100%;
      height: 80vh;
      background-color: #fff;
      border-top-left-radius: 15px;
      border-top-right-radius: 25px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: auto;
      padding: 25px;
      padding-top: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .sub-title {
        color: #2760ED;
        margin-top: 25px;
        font-size: 14px;
      }

      .sub-content {
        margin: 15px 0;
        text-align: left;
        font-size: 14px;
        line-height: 1.8;
        white-space: pre-line;
      }
    }
  }

}
</style>