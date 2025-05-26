<template>
  <div class="steel-challenges">
    <div class="challenges-container">

      <!-- 右侧内容 -->
      <div class="challenges-content">
        <div class="challenge-cards">
          <!-- 第一行 -->
          <div class="challenge-row">
            <div class="challenge-card">
              <div class="card-icon">
                <img src="@/assets/industry/icon-energy.png" alt="高能耗" />
              </div>
              <div class="card-title">碳中和与深度减排压力升级</div>
              <div class="card-desc">
                焦料热成焦耗占比超60%，煤焦气，电智能优化降碳减排，面对"双碳"目标与环保法规。
              </div>
            </div>

            <div class="challenge-card">
              <div class="card-icon">
                <img src="@/assets/industry/icon-equipment.png" alt="设备停机" />
              </div>
              <div class="card-title">设备智能化运维协同瓶颈</div>
              <div class="card-desc">
                设备备高价值升与多系统集成需求求高，传统运维模式难以满足高精度预测性维护与跨产线协同。
              </div>
            </div>
          </div>

          <!-- 第二行 -->
          <div class="challenge-row">
            <div class="challenge-card">
              <div class="card-icon">
                <img src="@/assets/industry/icon-process.png" alt="工艺优化" />
              </div>
              <div class="card-title">工艺柔性化与质量一致性挑战</div>
              <div class="card-desc">
                生料配比过弃，设备控制误差大，人工经验已不满足产线提升，质量一致性要求。
              </div>
            </div>

            <div class="challenge-card">
              <div class="card-icon">
                <img src="@/assets/industry/icon-supply.png" alt="生产协同" />
              </div>
              <div class="card-title">环保与成本双重挑战</div>
              <div class="card-desc">
                粉尘、氮氧化物治理水平提升，需平衡环保合规与降本增效，智能化技术驱动绿色转型。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 移除了导航相关的代码，现在使用全局固定导航
</script>

<style scoped lang="less">
/* 添加根字体设置用于rem计算 */
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

.steel-challenges {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 2.5rem; // 40px
  display: flex;
  justify-content: center;
}

.challenges-container {
  max-width: 75rem; // 1200px
  width: 100%;
  display: flex;
  justify-content: center; // 居中显示内容
  margin: 100px auto; // 添加水平居中
}

.challenges-content {
  width: 100%;
  display: flex;
  justify-content: center; // 居中显示
  align-items: flex-start; // 确保顶部对齐
}

.challenge-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.challenge-row {
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.challenge-card {
  flex: 1;
  background-color: #fff;
  border-radius: 10px;
  height: 200px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-icon {
  width: 50px;
  height: 50px;
  background-color: #ffe7e7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 25px;
    height: 25px;
  }
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.card-desc {
  text-align: left;
  color: #666;
  font-size: 15px;
  line-height: 1.6;
}

@media (max-width: 992px) {
  .steel-challenges {
    padding: 20px;
  }

  .challenges-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>