<template>
  <div class="admin-charts">
    <!-- 顶部导航栏 -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1>数据图表展示</h1>
      </div>
      <div class="header-right">
        <!-- 主题切换按钮 -->
        <div class="theme-toggle-container">
          <el-button
            class="theme-toggle-btn"
            :class="{ 'theme-dark': themeStore.isDarkMode, 'theme-light': themeStore.isLightMode }"
            @click="handleThemeToggle"
            :title="themeStore.themeText"
          >
            <div class="theme-toggle-content">
              <el-icon class="theme-icon">
                <Sunny v-if="themeStore.isDarkMode" />
                <Moon v-else />
              </el-icon>
              <span class="theme-text">{{ themeStore.themeText }}</span>
            </div>
          </el-button>
        </div>
        <el-button type="primary" plain @click="goBack">返回管理后台</el-button>
        <span class="welcome-text">欢迎，{{ adminUsername }}</span>
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
      </div>
    </div>

    <!-- 图表控制面板 -->
    <div class="chart-control-panel">
      <div class="control-header">
        <div class="control-title">
          <el-icon><Setting /></el-icon>
          <span>图表控制面板</span>
        </div>
        <div class="control-divider"></div>
      </div>

      <!-- 图表类型选择 -->
      <div class="tech-tabs">
        <div 
          class="tech-tab-btn"
          :class="{ active: currentChartType === 'bar' }"
          @click="switchChartType('bar')"
        >
          <div class="tab-icon">
            <el-icon><Histogram /></el-icon>
          </div>
          <div class="tab-text">
            <div class="tab-title">柱状图</div>
            <div class="tab-subtitle">BAR CHART</div>
          </div>
        </div>

        <div 
          class="tech-tab-btn"
          :class="{ active: currentChartType === 'pie' }"
          @click="switchChartType('pie')"
        >
          <div class="tab-icon">
            <el-icon><PieChart /></el-icon>
          </div>
          <div class="tab-text">
            <div class="tab-title">饼图</div>
            <div class="tab-subtitle">PIE CHART</div>
          </div>
        </div>

        <div 
          class="tech-tab-btn"
          :class="{ active: currentChartType === 'line' }"
          @click="switchChartType('line')"
        >
          <div class="tab-icon">
            <el-icon><TrendCharts /></el-icon>
          </div>
          <div class="tab-text">
            <div class="tab-title">折线图</div>
            <div class="tab-subtitle">LINE CHART</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表显示区域 -->
    <div class="chart-display-area">
      <div class="chart-wrapper tech-chart-wrapper">
        <div class="chart-loading" v-if="!chartOption.series">
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="loading-text">正在加载图表数据...</div>
          </div>
        </div>
        <v-chart
          ref="chartRef"
          :option="chartOption"
          :style="{ width: '100%', height: '500px' }"
          autoresize
          class="tech-chart"
        />
        <!-- 图表装饰边框 -->
        <div class="chart-border-decoration">
          <div class="corner corner-tl"></div>
          <div class="corner corner-tr"></div>
          <div class="corner corner-bl"></div>
          <div class="corner corner-br"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  TrendCharts,
  Histogram,
  PieChart,
  Setting,
  Sunny,
  Moon
} from '@element-plus/icons-vue'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import {
  getContactStats,
  adminLogout,
  getAdminUserInfo,
  type StatsData
} from '@/api/admin'
import { useThemeStore } from '@/stores/themeStore'

const router = useRouter()

// 主题管理
const themeStore = useThemeStore()

// 响应式数据
const stats = ref<StatsData>({
  total: 0,
  consult: 0,
  cooperation: 0,
  today: 0,
  week: 0,
  month: 0
})

// 图表相关
const currentChartType = ref<'bar' | 'pie' | 'line'>('bar')
const chartRef = ref<HTMLElement>()
const chartOption = ref<any>({})

// 计算属性
const adminUsername = computed(() => {
  const userInfo = getAdminUserInfo()
  return userInfo ? `${userInfo.roleName} - ${userInfo.username}` : '管理员'
})

// 获取统计数据
const fetchStats = async () => {
  try {
    const response = await getContactStats()
    if (response.success) {
      stats.value = response.data
      generateChartData()
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    ElMessage.error('获取统计数据失败')
  }
}

// 返回管理后台
const goBack = () => {
  router.push('/admin')
}

// 退出登录
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      customClass: 'custom-message-box'
    })
    
    adminLogout()
    ElMessage.success('已退出登录')
    router.push('/admin/login')
  } catch {
    // 用户取消
  }
}

// 切换图表类型
const switchChartType = (type: 'bar' | 'pie' | 'line') => {
  currentChartType.value = type
  generateChartData()
}

// 主题切换处理
const handleThemeToggle = () => {
  themeStore.toggleTheme()
  ElMessage.success(`已切换到${themeStore.themeText}`)
}

// 生成图表数据
const generateChartData = () => {
  const formTypeData = [
    { name: '咨询表单', value: stats.value.consult },
    { name: '合作意向', value: stats.value.cooperation }
  ]

  switch (currentChartType.value) {
    case 'bar':
      chartOption.value = {
        backgroundColor: 'transparent',
        title: {
          text: '表单类型统计',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(30, 144, 255, 0.4)',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        },
        xAxis: {
          type: 'category',
          data: formTypeData.map(item => item.name),
          axisLine: {
            lineStyle: {
              color: 'rgba(30, 144, 255, 0.4)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(30, 144, 255, 0.4)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(30, 144, 255, 0.2)'
            }
          }
        },
        series: [{
          name: '数量',
          type: 'bar',
          barWidth: '30%',
          data: formTypeData.map(item => item.value),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(30, 144, 255, 0.8)' },
              { offset: 1, color: 'rgba(30, 144, 255, 0.3)' }
            ])
          }
        }]
      }
      break

    case 'pie':
      chartOption.value = {
        backgroundColor: 'transparent',
        title: {
          text: '表单类型分布',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(30, 144, 255, 0.4)',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },
        series: [{
          name: '表单类型',
          type: 'pie',
          radius: '50%',
          data: formTypeData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(30, 144, 255, 0.5)'
            }
          },
          itemStyle: {
            color: (params: any) => {
              const colors = [
                'rgba(30, 144, 255, 0.8)',
                'rgba(0, 191, 255, 0.8)'
              ]
              return colors[params.dataIndex % colors.length]
            }
          }
        }]
      }
      break

    case 'line':
      chartOption.value = {
        backgroundColor: 'transparent',
        title: {
          text: '表单趋势分析',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(30, 144, 255, 0.4)',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)'
          }
        },
        xAxis: {
          type: 'category',
          data: ['今日', '本周', '本月'],
          axisLine: {
            lineStyle: {
              color: 'rgba(30, 144, 255, 0.4)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'rgba(30, 144, 255, 0.4)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(30, 144, 255, 0.2)'
            }
          }
        },
        series: [{
          name: '表单数量',
          type: 'line',
          data: [stats.value.today, stats.value.week, stats.value.month],
          lineStyle: {
            color: 'rgba(30, 144, 255, 0.8)',
            width: 3
          },
          itemStyle: {
            color: 'rgba(30, 144, 255, 1)',
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 2
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(30, 144, 255, 0.3)' },
              { offset: 1, color: 'rgba(30, 144, 255, 0.1)' }
            ])
          }
        }]
      }
      break
  }
}

// 组件挂载时获取数据
onMounted(() => {
  // 初始化主题
  themeStore.initTheme()

  fetchStats()
})

// 注册组件
defineOptions({
  components: {
    VChart
  }
})
</script>

<style lang="less" scoped>
/* 主题变量应用 */

.admin-charts {
  min-height: 100vh;
  background: var(--theme-bg-primary);
  background-attachment: fixed;
  padding: 0;
  padding-top: 1px;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(0, 100, 255, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(30, 144, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(0, 191, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: var(--theme-bg-header);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--theme-border-primary);
  box-shadow: var(--theme-shadow-card);

  .header-left h1 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 600;
    background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 20px var(--theme-accent);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;

    .theme-toggle-container {
      position: relative;

      .theme-toggle-btn {
        background: rgba(0, 100, 255, 0.15) !important;
        border: 1px solid rgba(30, 144, 255, 0.3) !important;
        color: #ffffff !important;
        backdrop-filter: blur(10px);
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(30, 144, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        &:hover {
          background: rgba(30, 144, 255, 0.25) !important;
          border-color: rgba(0, 191, 255, 0.6) !important;
          box-shadow: 0 0 20px rgba(30, 144, 255, 0.4);
          transform: translateY(-2px);

          &::before {
            left: 100%;
          }

          .theme-icon {
            transform: scale(1.1) rotate(15deg);
          }
        }

        &.theme-light {
          background: rgba(255, 255, 255, 0.9) !important;
          border-color: rgba(0, 123, 255, 0.3) !important;
          color: #333333 !important;

          &:hover {
            background: rgba(255, 255, 255, 1) !important;
            border-color: rgba(0, 123, 255, 0.6) !important;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.3);
          }
        }

        .theme-toggle-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          z-index: 1;

          .theme-icon {
            font-size: 1.2rem;
            transition: all 0.3s ease;
          }

          .theme-text {
            font-size: 0.875rem;
            font-weight: 500;
            white-space: nowrap;
          }
        }
      }
    }

    .welcome-text {
      color: var(--theme-text-secondary);
      font-size: 0.9rem;
    }
  }
}

.chart-control-panel {
  margin: 2rem;
  background: var(--theme-bg-card);
  backdrop-filter: blur(15px);
  border: 1px solid var(--theme-border-primary);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--theme-shadow-card);

  .control-header {
    margin-bottom: 2rem;

    .control-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--theme-text-primary);
      margin-bottom: 1rem;

      .el-icon {
        color: #1E90FF;
      }
    }

    .control-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(30, 144, 255, 0.5) 50%, transparent 100%);
    }
  }
}

.tech-tabs {
  display: flex;
  gap: 1rem;
  justify-content: center;

  .tech-tab-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 2rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(30, 144, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    min-width: 160px;

    &:hover {
      background: rgba(30, 144, 255, 0.1);
      border-color: rgba(30, 144, 255, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(30, 144, 255, 0.3);
    }

    &.active {
      background: linear-gradient(135deg, rgba(30, 144, 255, 0.2) 0%, rgba(0, 191, 255, 0.1) 100%);
      border-color: rgba(30, 144, 255, 0.8);
      box-shadow:
        0 0 20px rgba(30, 144, 255, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);

      .tab-icon .el-icon {
        color: #00BFFF;
        text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
      }

      .tab-title {
        color: #ffffff;
      }

      .tab-subtitle {
        color: rgba(0, 191, 255, 0.8);
      }
    }

    .tab-icon {
      .el-icon {
        font-size: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
        transition: all 0.3s ease;
      }
    }

    .tab-text {
      .tab-title {
        font-size: 1rem;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 0.2rem;
        transition: all 0.3s ease;
      }

      .tab-subtitle {
        font-size: 0.75rem;
        color: rgba(255, 255, 255, 0.5);
        font-weight: 400;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
      }
    }
  }
}

.chart-display-area {
  margin: 2rem;

  .chart-wrapper {
    background: var(--theme-bg-card);
    border: 1px solid var(--theme-border-primary);
    border-radius: 12px;
    padding: 2rem;
    backdrop-filter: blur(15px);
    box-shadow: var(--theme-shadow-card);
    position: relative;
    overflow: hidden;

    .chart-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      z-index: 10;

      .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .spinner-ring {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(30, 144, 255, 0.3);
          border-top: 3px solid #1E90FF;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
        }
      }
    }
  }
}

.chart-border-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;

  .corner {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(30, 144, 255, 0.6);

    &.corner-tl {
      top: 10px;
      left: 10px;
      border-right: none;
      border-bottom: none;
    }

    &.corner-tr {
      top: 10px;
      right: 10px;
      border-left: none;
      border-bottom: none;
    }

    &.corner-bl {
      bottom: 10px;
      left: 10px;
      border-right: none;
      border-top: none;
    }

    &.corner-br {
      bottom: 10px;
      right: 10px;
      border-left: none;
      border-top: none;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .tech-tabs {
    flex-direction: column;
    align-items: center;

    .tech-tab-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    .header-left h1 {
      font-size: 1.5rem;
    }
  }

  .chart-control-panel,
  .chart-display-area {
    margin: 1rem;
  }

  .chart-control-panel {
    padding: 1rem;
  }

  .chart-wrapper {
    padding: 1rem;

    .tech-chart {
      height: 300px !important;
    }
  }

  .tech-tabs {
    gap: 0.5rem;

    .tech-tab-btn {
      padding: 0.8rem 1rem;
      min-width: auto;

      .tab-icon .el-icon {
        font-size: 1.2rem;
      }

      .tab-text .tab-title {
        font-size: 0.9rem;
      }

      .tab-text .tab-subtitle {
        font-size: 0.7rem;
      }
    }
  }
}
</style>

<style>
/* 全局样式覆盖 */
.el-button {
  background: rgba(0, 0, 0, 0.6) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px) !important;
  transition: all 0.3s ease !important;

  &:hover {
    background: rgba(30, 144, 255, 0.2) !important;
    border-color: rgba(30, 144, 255, 0.6) !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(30, 144, 255, 0.3) !important;
    transform: translateY(-1px) !important;
  }

  &.el-button--primary {
    background: linear-gradient(135deg, #1E90FF 0%, #00BFFF 100%) !important;
    border: 1px solid rgba(30, 144, 255, 0.4) !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(30, 144, 255, 0.4) !important;

    &:hover {
      background: linear-gradient(135deg, #00BFFF 0%, #0066FF 100%) !important;
      box-shadow: 0 6px 20px rgba(30, 144, 255, 0.6) !important;
      transform: translateY(-1px) !important;
    }
  }

  &.el-button--danger {
    background: linear-gradient(135deg, #FF4757 0%, #FF3742 100%) !important;
    border: 1px solid rgba(255, 71, 87, 0.4) !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4) !important;

    &:hover {
      background: linear-gradient(135deg, #FF3742 0%, #FF1744 100%) !important;
      box-shadow: 0 6px 20px rgba(255, 71, 87, 0.6) !important;
      transform: translateY(-1px) !important;
    }
  }
}

.custom-message-box {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  border-radius: 8px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6) !important;

  .el-message-box__header {
    background: transparent !important;
    border-bottom: 1px solid rgba(30, 144, 255, 0.3) !important;
    padding: 1.5rem 2rem 1rem !important;
  }

  .el-message-box__title {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .el-message-box__content {
    background: transparent !important;
    color: rgba(255, 255, 255, 0.8) !important;
    padding: 1rem 2rem !important;
  }

  .el-message-box__btns {
    background: transparent !important;
    border-top: 1px solid rgba(30, 144, 255, 0.3) !important;
    padding: 1rem 2rem 1.5rem !important;
  }
}
</style>
