<template>
  <div class="admin-dashboard">
    <!-- 顶部导航栏 -->
    <div class="dashboard-header">
      <div class="header-left">
        <h1>凯奥思数据管理后台</h1>
      </div>
      <div class="header-right">
        <!-- 主题切换按钮 -->
        <div class="theme-toggle-container">
          <!-- <el-button
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
          </el-button> -->
        </div>
        <span class="welcome-text">欢迎，{{ adminUsername }}</span>
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-cards">
      <div class="stats-card">
        <div class="stats-icon total">
          <el-icon><Document /></el-icon>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.total }}</div>
          <div class="stats-label">总表单数</div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="stats-icon consult">
          <el-icon><ChatDotRound /></el-icon>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.consult }}</div>
          <div class="stats-label">咨询表单</div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="stats-icon cooperation">
          <el-icon><UserFilled /></el-icon>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.cooperation }}</div>
          <div class="stats-label">合作意向</div>
        </div>
      </div>
      
      <div class="stats-card">
        <div class="stats-icon today">
          <el-icon><Calendar /></el-icon>
        </div>
        <div class="stats-content">
          <div class="stats-number">{{ stats.today }}</div>
          <div class="stats-label">今日新增</div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-input
          v-model="searchQuery"
          placeholder="搜索企业名称、联系人或电话"
          style="width: 300px"
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
        
        <el-select v-model="filterType" placeholder="表单类型" style="width: 120px" @change="handleFilter">
          <el-option label="全部" value="all" />
          <el-option label="咨询表单" value="consult" />
          <el-option label="合作意向" value="cooperation" />
        </el-select>
        
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          popper-class="date-picker-popper"
          @change="handleDateFilter"
        />
      </div>
      
      <div class="toolbar-right">
        <el-button @click="refreshData">
          <el-icon><Refresh /></el-icon>
          刷新
        </el-button>
                <el-button
          type="success"
          @click="goToCharts"
        >
          <el-icon><TrendCharts /></el-icon>
          图表展示
        </el-button>
        <el-button
          v-if="canExport"
          type="primary"
          @click="exportData"
          :loading="exportLoading"
        >
          <el-icon><Download /></el-icon>
          导出数据
        </el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <el-table 
        :data="contactList" 
        v-loading="loading"
        stripe
        border
        style="width: 100%"
        @sort-change="handleSortChange"
      >
        <el-table-column prop="id" label="ID" width="80" sortable="custom" />
        <el-table-column prop="formTypeName" label="表单类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.formType === 'cooperation' ? 'success' : 'info'">
              {{ row.formTypeName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="company" label="企业名称" min-width="180" sortable="custom" />
        <el-table-column prop="name" label="联系人" width="120" sortable="custom" />
        <el-table-column prop="phone" label="联系电话" width="150" />
        <el-table-column prop="wish" label="合作意向" min-width="150">
          <template #default="{ row }">
            <span v-if="row.wish" class="wish-text">{{ row.wish }}</span>
            <span v-else class="no-wish">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="提交时间" width="180" sortable="custom">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150" >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="showDetail(row)"
              :icon="View"
            >
              详情
            </el-button>
            <el-button
              v-if="canDelete"
              type="danger"
              size="small"
              @click="handleDelete(row)"
              :icon="Delete"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"        
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 详情模态框 -->
    <Teleport to="body">
      <Transition name="detail-dialog" appear>
        <el-dialog
          v-model="detailDialogVisible"
          title="联系人详情"
          width="700px"
          :before-close="handleDetailClose"
          custom-class="detail-dialog tech-modal"
          :show-close="false"
        >
          <template #header>
            <div class="tech-modal-header">
              <div class="header-title">
                <div class="title-icon">
                  <el-icon><User /></el-icon>
                </div>
                <div class="title-text">
                  <h3>联系人详情</h3>
                  <div class="title-subtitle">Contact Information</div>
                </div>
              </div>
              <div class="header-actions">
                <button class="tech-close-btn" @click="detailDialogVisible = false">
                  <el-icon><Close /></el-icon>
                </button>
              </div>
            </div>
          </template>

          <div v-if="selectedContact" class="contact-detail tech-content">
            <!-- 基本信息卡片 -->
            <div class="info-card">
              <div class="card-header">
                <div class="card-title">
                  <el-icon><InfoFilled /></el-icon>
                  基本信息
                </div>
                <div class="card-divider"></div>
              </div>
              <div class="card-content">
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><Key /></el-icon>
                    ID
                  </span>
                  <span class="detail-value tech-value">{{ selectedContact.id }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><Document /></el-icon>
                    表单类型
                  </span>
                  <el-tag
                    :type="selectedContact.formType === 'cooperation' ? 'success' : 'info'"
                    class="tech-tag"
                  >
                    {{ selectedContact.formTypeName }}
                  </el-tag>
                </div>
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><OfficeBuilding /></el-icon>
                    企业名称
                  </span>
                  <span class="detail-value tech-value">{{ selectedContact.company || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><User /></el-icon>
                    联系人
                  </span>
                  <span class="detail-value tech-value">{{ selectedContact.name || '-' }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><Phone /></el-icon>
                    联系电话
                  </span>
                  <span class="detail-value tech-value">{{ selectedContact.phone || '-' }}</span>
                </div>
              </div>
            </div>

            <!-- 合作意向卡片 -->
            <div class="info-card">
              <div class="card-header">
                <div class="card-title">
                  <el-icon><ChatDotRound /></el-icon>
                  合作意向
                </div>
                <div class="card-divider"></div>
              </div>
              <div class="card-content">
                <div class="wish-content tech-wish">
                  {{ selectedContact.wish || '无具体意向' }}
                </div>
              </div>
            </div>

            <!-- 时间信息卡片 -->
            <div class="info-card">
              <div class="card-header">
                <div class="card-title">
                  <el-icon><Clock /></el-icon>
                  时间信息
                </div>
                <div class="card-divider"></div>
              </div>
              <div class="card-content">
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><Calendar /></el-icon>
                    提交时间
                  </span>
                  <span class="detail-value tech-value">{{ formatDate(selectedContact.createdAt) }}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">
                    <el-icon><Refresh /></el-icon>
                    更新时间
                  </span>
                  <span class="detail-value tech-value">{{ formatDate(selectedContact.updatedAt) }}</span>
                </div>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="tech-modal-footer">
              <el-button
                class="tech-button tech-button-secondary"
                @click="detailDialogVisible = false"
              >
                <el-icon><Close /></el-icon>
                关闭
              </el-button>
            </div>
          </template>
        </el-dialog>
      </Transition>
    </Teleport>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch, Teleport } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Document,
  ChatDotRound,
  UserFilled,
  Calendar,
  Search,
  Download,
  Refresh,
  View,
  Delete,
  TrendCharts,
  User,
  Close,
  InfoFilled,
  Key,
  OfficeBuilding,
  Phone,
  Clock,
  Sunny,
  Moon
} from '@element-plus/icons-vue'
import {
  getContactList,
  getContactStats,
  adminLogout,
  getAdminUserInfo,
  hasPermission,
  exportContacts,
  deleteContact,
  type ContactData,
  type StatsData,
  type ContactQueryParams
} from '@/api/admin'
import { useThemeStore } from '@/stores/themeStore'

const router = useRouter()

// 主题管理
const themeStore = useThemeStore()

// 响应式数据
const loading = ref(false)
const exportLoading = ref(false)
const contactList = ref<ContactData[]>([])
const stats = ref<StatsData>({
  total: 0,
  consult: 0,
  cooperation: 0,
  today: 0,
  week: 0,
  month: 0
})

// 详情模态框相关
const detailDialogVisible = ref(false)
const selectedContact = ref<ContactData | null>(null)



// 搜索和筛选
const searchQuery = ref('')
const filterType = ref('all')
const dateRange = ref<[string, string] | null>(null)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const totalCount = ref(0)

// 排序
const sortBy = ref('createdAt')
const sortOrder = ref<'ASC' | 'DESC'>('DESC')

// 计算属性
const adminUsername = computed(() => {
  const userInfo = getAdminUserInfo()
  return userInfo ? `${userInfo.roleName} - ${userInfo.username}` : '管理员'
})

const canExport = computed(() => hasPermission('export'))
const canDelete = computed(() => hasPermission('delete'))

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('zh-CN')
}

// 获取联系人列表
const fetchContactList = async () => {
  loading.value = true
  try {
    const params: ContactQueryParams = {
      page: currentPage.value,
      limit: pageSize.value,
      search: searchQuery.value,
      type: filterType.value as any,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    }
    
    if (dateRange.value) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }
    
    const response = await getContactList(params)
    
    if (response.success) {
      contactList.value = response.data.contacts
      totalCount.value = response.data.pagination.totalCount
    } else {
      ElMessage.error(response.message || '获取数据失败')
    }
  } catch (error: any) {
    console.error('获取联系人列表失败:', error)
    ElMessage.error('获取数据失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 获取统计信息
const fetchStats = async () => {
  try {
    const response = await getContactStats()
    if (response.success) {
      stats.value = response.data
    }
  } catch (error) {
    console.error('获取统计信息失败:', error)
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  fetchContactList()
}

// 筛选处理
const handleFilter = () => {
  currentPage.value = 1
  fetchContactList()
}

// 日期筛选处理
const handleDateFilter = () => {
  currentPage.value = 1
  fetchContactList()
}

// 排序处理
const handleSortChange = ({ prop, order }: { prop: string; order: string | null }) => {
  if (order) {
    sortBy.value = prop
    sortOrder.value = order === 'ascending' ? 'ASC' : 'DESC'
    fetchContactList()
  }
}

// 分页大小改变
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchContactList()
}

// 当前页改变
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  fetchContactList()
}

// 刷新数据
const refreshData = () => {
  fetchContactList()
  fetchStats()
}

// 导出数据
const exportData = async () => {
  if (!canExport.value) {
    ElMessage.error('您没有导出权限')
    return
  }

  try {
    exportLoading.value = true

    const params: ContactQueryParams = {
      search: searchQuery.value,
      type: filterType.value as any
    }

    if (dateRange.value) {
      params.startDate = dateRange.value[0]
      params.endDate = dateRange.value[1]
    }

    const response = await exportContacts(params)

    if (response.success) {
      // 创建下载链接
      const data = response.data
      const csvContent = convertToCSV(data.contacts)
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `客户表单数据_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      ElMessage.success(`成功导出 ${data.total} 条记录`)
    } else {
      ElMessage.error(response.message || '导出失败')
    }
  } catch (error: any) {
    console.error('导出失败:', error)
    ElMessage.error('导出失败，请稍后重试')
  } finally {
    exportLoading.value = false
  }
}

// 转换为CSV格式
const convertToCSV = (data: any[]) => {
  const headers = ['ID', '公司名称', '联系人', '联系电话', '表单类型', '合作意向', '提交时间']
  const csvRows = [headers.join(',')]

  // 安全地获取字段值的函数
  const safeValue = (value: any, defaultValue: string = '-'): string => {
    if (value === null || value === undefined || value === '') {
      return defaultValue
    }
    return String(value).trim() || defaultValue
  }

  data.forEach(item => {
    const row = [
      item.ID || item.id || 0,
      `"${safeValue(item.企业名称 || item.company, '未填写')}"`,
      `"${safeValue(item.联系人 || item.name, '未填写')}"`,
      `"${safeValue(item.联系电话 || item.phone, '未填写')}"`,
      `"${safeValue(item.表单类型 || item.formTypeName, '咨询表单')}"`,
      `"${safeValue(item.合作意向 || item.wish, '无')}"`,
      `"${safeValue(item.提交时间 || (item.createdAt ? formatDate(item.createdAt) : ''), '未知时间')}"`
    ]
    csvRows.push(row.join(','))
  })

  return '\uFEFF' + csvRows.join('\n') // 添加BOM以支持中文
}

// 显示详情
const showDetail = (contact: ContactData) => {
  selectedContact.value = contact
  detailDialogVisible.value = true
}

// 关闭详情模态框
const handleDetailClose = () => {
  detailDialogVisible.value = false
  selectedContact.value = null
}

// 删除联系人
const handleDelete = async (contact: ContactData) => {
  if (!canDelete.value) {
    ElMessage.error('您没有删除权限')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除联系人"${contact.name}"的记录吗？此操作不可恢复。`,
      '删除确认',
      {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: false,
        customClass: 'custom-message-box'
      }
    )

    // 执行删除
    const response = await deleteContact(contact.id)
    if (response.success) {
      ElMessage.success('删除成功')
      // 刷新数据
      await fetchContactList()
      await fetchStats()
    } else {
      ElMessage.error(response.message || '删除失败')
    }
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('删除失败:', error)
      ElMessage.error('删除失败，请重试')
    }
  }
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

// 导航到图表页面
const goToCharts = () => {
  router.push('/admin/charts')
}

// 主题切换处理
const handleThemeToggle = () => {
  themeStore.toggleTheme()
  ElMessage.success(`已切换到${themeStore.themeText}`)
}




// 强制应用滚动条样式的函数
const applyScrollbarStyles = () => {
  nextTick(() => {
    // 查找所有弹窗主体元素
    const dialogBodies = document.querySelectorAll('.el-dialog__body')

    dialogBodies.forEach(body => {
      const htmlBody = body as HTMLElement
      // 设置Firefox滚动条样式
      htmlBody.style.scrollbarWidth = 'thin'
      htmlBody.style.scrollbarColor = 'rgba(30, 144, 255, 0.8) rgba(11, 9, 35, 0.9)'

      // 添加自定义类名以确保CSS样式生效
      htmlBody.classList.add('tech-scrollbar')
    })

    // 动态注入滚动条样式
    if (!document.getElementById('tech-scrollbar-styles')) {
      const style = document.createElement('style')
      style.id = 'tech-scrollbar-styles'
      style.textContent = `
        .tech-scrollbar::-webkit-scrollbar {
          width: 8px !important;
          height: 8px !important;
        }
        .tech-scrollbar::-webkit-scrollbar-track {
          background: rgba(11, 9, 35, 0.9) !important;
          border: 1px solid rgba(30, 144, 255, 0.3) !important;
          border-radius: 0 !important;
          box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6) !important;
        }
        .tech-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, rgba(30, 144, 255, 0.9) 0%, rgba(0, 191, 255, 1) 50%, rgba(0, 100, 255, 0.9) 100%) !important;
          border: 1px solid rgba(30, 144, 255, 0.5) !important;
          border-radius: 0 !important;
          box-shadow: 0 0 10px rgba(30, 144, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s ease !important;
        }
        .tech-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, rgba(0, 191, 255, 1) 0%, rgba(30, 144, 255, 1) 50%, rgba(0, 100, 255, 1) 100%) !important;
          border-color: rgba(0, 191, 255, 0.8) !important;
          box-shadow: 0 0 15px rgba(30, 144, 255, 1), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
          transform: scaleX(1.1) !important;
        }
        .tech-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, rgba(0, 100, 255, 1) 0%, rgba(30, 144, 255, 1) 50%, rgba(0, 191, 255, 1) 100%) !important;
          box-shadow: 0 0 20px rgba(30, 144, 255, 1) !important;
        }
        .tech-scrollbar::-webkit-scrollbar-corner {
          background: rgba(11, 9, 35, 0.9) !important;
          border: 1px solid rgba(30, 144, 255, 0.3) !important;
        }
      `
      document.head.appendChild(style)
    }
  })
}

// 监听弹窗状态变化
watch([detailDialogVisible], () => {
  nextTick(() => {
    // 强制应用滚动条样式
    applyScrollbarStyles()
  })
})

// 组件挂载时获取数据
onMounted(() => {
  // 初始化主题
  themeStore.initTheme()

  fetchContactList()
  fetchStats()
  // 初始化时也应用滚动条样式
  applyScrollbarStyles()
})


</script>

<style>
  .el-select-dropdown,
    .el-picker-panel {
      background: var(--theme-bg-modal) !important;
      border: 1px solid var(--theme-border-primary) !important;
      border-radius: 0 !important;
      backdrop-filter: blur(20px);

    .el-picker-panel__content {
      color: var(--theme-text-secondary) !important;
    }

    .el-date-table td.available:hover {
      background: var(--theme-border-secondary) !important;
      color: var(--theme-text-primary) !important;
    }

    .el-date-table td.current {
      background: var(--theme-border-primary) !important;
      color: var(--theme-text-primary) !important;
    }
  }

  .el-select__placeholder{
    color: var(--theme-text-muted);
  }

  /* 白天模式下的组件样式重置 */
  .theme-light {
    /* 重置筛选组件为默认主题 */
    .el-input__wrapper {
      background-color: var(--theme-bg-card) !important;
      border-color: var(--theme-border-primary) !important;
      color: var(--theme-text-primary) !important;
    }

    .el-select .el-input__wrapper {
      background-color: var(--theme-bg-card) !important;
      border-color: var(--theme-border-primary) !important;
      color: var(--theme-text-primary) !important;
    }

    .el-date-editor .el-input__wrapper {
      background-color: var(--theme-bg-card) !important;
      border-color: var(--theme-border-primary) !important;
      color: var(--theme-text-primary) !important;
    }

    /* 重置分页组件为默认主题 */
    .el-pagination {
      .el-pager li {
        background-color: var(--theme-bg-card) !important;
        color: var(--theme-text-primary) !important;
        border-color: var(--theme-border-primary) !important;

        &:hover {
          background-color: var(--theme-bg-tertiary) !important;
          color: var(--theme-accent) !important;
        }

        &.is-active {
          background-color: var(--theme-accent) !important;
          color: var(--theme-bg-card) !important;
          border-color: var(--theme-accent) !important;
        }
      }

      .btn-prev,
      .btn-next {
        background-color: var(--theme-bg-card) !important;
        color: var(--theme-text-primary) !important;
        border-color: var(--theme-border-primary) !important;

        &:hover {
          background-color: var(--theme-bg-tertiary) !important;
          color: var(--theme-accent) !important;
        }

        &:disabled {
          background-color: var(--theme-bg-card) !important;
          color: var(--theme-text-muted) !important;
          border-color: var(--theme-border-secondary) !important;
        }
      }

      .el-select .el-input__wrapper {
        background-color: var(--theme-bg-card) !important;
        border-color: var(--theme-border-primary) !important;
        color: var(--theme-text-primary) !important;
      }
    }
  }
</style>

<style lang="less" scoped>
/* 主题变量应用 */

.admin-dashboard {
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
      radial-gradient(circle at 20% 80%, var(--theme-accent) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, var(--theme-border-primary) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, var(--theme-accent-hover) 0%, transparent 50%),
      radial-gradient(circle at 60% 60%, var(--theme-border-secondary) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
}

.dashboard-header {
  background: var(--theme-bg-header);
  backdrop-filter: blur(20px);
  border: 1px solid var(--theme-border-primary);
  padding: 1rem 2rem;
  box-shadow: var(--theme-shadow-card);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  border-radius: 12px;
  margin: 1rem 2rem 2rem;

  .header-left h1 {
    margin: 0;
    color: var(--theme-text-title);
    font-size: 1.8rem;
    font-weight: 700;
    text-shadow: 0 0 20px var(--theme-accent);
    background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 50%, var(--theme-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
          background: linear-gradient(90deg, transparent, var(--theme-border-secondary), transparent);
          transition: left 0.5s ease;
        }

        &:hover {
          background: var(--theme-border-secondary) !important;
          border-color: var(--theme-accent-hover) !important;
          box-shadow: 0 0 20px var(--theme-accent);
          transform: translateY(-2px);

          &::before {
            left: 100%;
          }

          .theme-icon {
            transform: scale(1.1) rotate(15deg);
          }
        }

        &.theme-light {
          background: var(--theme-bg-card) !important;
          border-color: var(--theme-accent) !important;
          color: var(--theme-text-primary) !important;

          &:hover {
            background: var(--theme-bg-tertiary) !important;
            border-color: var(--theme-accent-hover) !important;
            box-shadow: 0 0 20px var(--theme-accent);
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
      font-size: 0.875rem;
      /* 白天模式下移除阴影效果 */
      text-shadow: var(--theme-welcome-text-shadow, 0 0 10px var(--theme-text-secondary));
    }

    .el-button {
      background: var(--theme-bg-secondary);
      border: 1px solid var(--theme-border-primary);
      color: var(--theme-text-primary);
      backdrop-filter: blur(10px);

      &:hover {
        background: var(--theme-border-secondary);
        border-color: var(--theme-accent-hover);
        box-shadow: 0 0 20px var(--theme-accent);
      }

      /* 白天模式下退出登录按钮样式 */
      &[type="danger"] {
        background: var(--theme-logout-btn-bg, rgba(220, 53, 69, 0.15));
        border-color: var(--theme-logout-btn-border, rgba(220, 53, 69, 0.3));
        color: var(--theme-logout-btn-color, #ffffff);

        &:hover {
          background: var(--theme-logout-btn-hover-bg, rgba(220, 53, 69, 0.25));
          border-color: var(--theme-logout-btn-hover-border, rgba(220, 53, 69, 0.6));
          box-shadow: var(--theme-logout-btn-hover-shadow, 0 0 20px rgba(220, 53, 69, 0.4));
        }
      }
    }
  }
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 0 2rem 2rem;
}

.stats-card {
  background: var(--theme-bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--theme-border-primary);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--theme-shadow-card);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--theme-border-secondary), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 20px 40px var(--theme-shadow),
      0 0 30px var(--theme-accent);
    border-color: var(--theme-accent-hover);

    &::before {
      left: 100%;
    }
  }

  .stats-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    position: relative;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

    &::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 18px;
      padding: 2px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
    }

    &.total {
      background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%);
      box-shadow: 0 8px 20px var(--theme-accent);
    }

    &.consult {
      background: linear-gradient(135deg, var(--theme-accent-hover) 0%, var(--theme-accent) 100%);
      box-shadow: 0 8px 20px var(--theme-accent-hover);
    }

    &.cooperation {
      background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%);
      box-shadow: 0 8px 20px var(--theme-accent);
    }

    &.today {
      background: linear-gradient(135deg, var(--theme-accent-hover) 0%, var(--theme-accent) 100%);
      box-shadow: 0 8px 20px var(--theme-accent-hover);
    }
  }

  .stats-content {
    .stats-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--theme-text-primary);
      line-height: 1;
      /* 白天模式下移除阴影效果 */
      text-shadow: var(--theme-stats-text-shadow, 0 0 20px var(--theme-accent));
      background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 50%, var(--theme-accent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stats-label {
      font-size: 0.9rem;
      color: var(--theme-text-secondary);
      margin-top: 0.5rem;
      font-weight: 500;
      text-shadow: 0 0 10px var(--theme-text-secondary);
    }
  }
}

.toolbar {
  background: var(--theme-bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--theme-border-primary);
  padding: 1.5rem 2rem;
  margin: 0 2rem 1rem;
  border-radius: 12px;
  box-shadow: var(--theme-shadow-card);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .toolbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .toolbar-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.data-table {
  background: var(--theme-bg-table);
  backdrop-filter: blur(20px);
  border: 1px solid var(--theme-border-primary);
  margin: 0 2rem;
  //border-radius: 12px;
  box-shadow: var(--theme-shadow-card);
  overflow: hidden;

  // .wish-text {
  //   color: rgba(255, 255, 255, 0.9);
  //   line-height: 1.4;
  //   display: -webkit-box;
  //   -webkit-line-clamp: 2;
  //   line-clamp: 2;
  //   -webkit-box-orient: vertical;
  //   overflow: hidden;
  // }

  .no-wish {
    color: var(--theme-text-muted);
  }
}

.pagination {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: flex-end;
  background: var(--theme-bg-secondary);
  backdrop-filter: blur(20px);
  border: 1px solid var(--theme-border-secondary);
  border-top: none;
  margin: 0 2rem;
  border-radius: 0 0 12px 12px;
  box-shadow: var(--theme-shadow-card);
}

// 响应式设计 - 针对常见屏幕分辨率优化
/* 1920×1080 (Full HD) 屏幕优化 */
@media screen and (min-width: 1900px) and (min-height: 900px) {
  .admin-dashboard {
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
  }

  .data-table {
    max-height: calc(100vh - 320px); /* 减去头部、统计卡片、工具栏和分页的高度 */
    overflow-y: auto;

    :deep(.el-table__body-wrapper) {
      max-height: calc(100vh - 520px);
      overflow-y: auto;
    }
  }

  .stats-cards {
    grid-template-columns: repeat(4, 1fr); // 4列布局
    gap: 1.5rem;
  }

  .dashboard-header {
    padding: 1.5rem 2rem;
  }

  .toolbar {
    padding: 1.5rem 2rem;
  }
}

/* 1366×768 (标准笔记本) 屏幕优化 */
@media screen and (min-width: 1366px) and (max-width: 1919px) and (min-height: 768px) {
  .admin-dashboard {
    min-height: 100vh;
    max-height: 100vh;
    overflow-y: auto;
  }

  .data-table {
    max-height: calc(100vh - 280px); /* 针对较小屏幕调整高度 */
    overflow-y: auto;

    :deep(.el-table__body-wrapper) {
      max-height: calc(100vh - 380px);
      overflow-y: auto;
    }
  }

  .stats-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 0 1.5rem 1.5rem;
  }

  .dashboard-header {
    padding: 1rem 1.5rem;
    margin: 0.5rem 1.5rem 1.5rem;

    .header-left h1 {
      font-size: 1.6rem;
    }
  }

  .toolbar {
    padding: 1rem 1.5rem;
    margin: 0 1.5rem 1rem;
  }

  .data-table {
    margin: 0 1.5rem;
  }

  .pagination {
    padding: 1rem 1.5rem;
    margin: 0 1.5rem;
  }
}

/* 通用响应式优化 - 确保内容不溢出视口 */
@media screen and (max-height: 900px) {
  .admin-dashboard {
    overflow-y: auto;
  }

  .data-table {
    max-height: calc(100vh - 350px);
    overflow-y: auto;

    :deep(.el-table__body-wrapper) {
      max-height: calc(100vh - 450px);
      overflow-y: auto;
    }
  }
}

/* 移动端响应式设计 */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .stats-cards {
    grid-template-columns: 1fr;
    margin: 0 1rem 2rem;
  }

  .toolbar {
    margin: 0 1rem 1rem;
    flex-direction: column;
    align-items: stretch;

    .toolbar-left,
    .toolbar-right {
      justify-content: center;
    }
  }

  .data-table {
    margin: 0 1rem;
    max-height: calc(100vh - 300px);
    overflow-y: auto;

    :deep(.el-table__body-wrapper) {
      max-height: calc(100vh - 400px);
      overflow-y: auto;
    }
  }
}

:deep(.el-table) {
  background: transparent !important;
  border-radius: 0 !important; /* 移除圆角 */
  border: none !important; /* 移除表格外边框 */

  .el-table__header {
    background: var(--theme-border-secondary) !important;

    th {
      background: transparent !important;
      color: var(--theme-text-primary) !important;
      font-weight: 600;
      border-bottom: 1px solid var(--theme-border-primary) !important;
      border-right: 1px solid var(--theme-border-primary) !important; /* 统一表头分割线 */

      &:last-child {
        border-right: none !important;
      }
    }
  }

  .el-table__body {
    background: transparent !important;

    tr {
      background: transparent !important;

      &:hover {
        background: var(--theme-border-secondary) !important;
        box-shadow: 0 0 15px var(--theme-accent);
      }

      &:nth-child(even) {
        background: var(--theme-border-secondary) !important;
      }
    }

    td {
      background: transparent !important;
      border-bottom: 1px solid var(--theme-border-primary) !important; /* 统一边框颜色 */
      border-right: 1px solid var(--theme-border-primary) !important; /* 统一单元格分割线 */
      color: var(--theme-text-primary) !important;

      &:last-child {
        border-right: none !important;
      }
    }
  }

  .el-table__empty-block {
    background: transparent !important;
    color: rgba(255, 255, 255, 0.7) !important;
  }

  .el-table__inner-wrapper {
    background: transparent !important;
  }

  .el-table__header-wrapper {
    background: transparent !important;
  }

  .el-table__body-wrapper {
    background: transparent !important;
  }
}

:deep(.el-pagination) {
  .el-pagination__total,
  .el-pagination__jump {
    color: var(--theme-text-secondary);
  }

  .el-pager li {
    background: var(--theme-bg-card) !important;
    color: var(--theme-text-secondary);
    border: 1px solid var(--theme-border-primary) !important;
    border-radius: 0 !important;
    margin: 0 2px;

    &:hover {
      background: var(--theme-border-secondary);
      border-color: var(--theme-accent-hover);
      color: var(--theme-text-primary);
    }

    &.is-active {
      background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%);
      border-color: transparent;
      color: var(--theme-text-primary);
      box-shadow: 0 0 15px var(--theme-accent);
    }
  }

  .btn-prev,
  .btn-next {
    background: var(--theme-bg-card) !important;
    color: var(--theme-text-secondary);
    border: 1px solid var(--theme-border-primary) !important;
    border-radius: 0 !important;

    &:hover {
      background: var(--theme-border-secondary);
      border-color: var(--theme-accent-hover);
      color: var(--theme-text-primary);
    }

    &:disabled {
      background: var(--theme-bg-card) !important;
      color: var(--theme-text-muted);
      border-color: var(--theme-border-secondary);
    }
  }

  .el-select .el-input__wrapper {
    background: var(--theme-bg-card) !important;
    border: 1px solid var(--theme-border-primary) !important;
    border-radius: 0 !important;
    color: var(--theme-text-secondary);

    &:hover {
      border-color: var(--theme-accent);
    }
  }
}

//边框样式设置
:deep(.el-input){
  --el-input-border-color: var(--theme-border-primary) !important;
}

/* ==================== 科技感弹窗样式 ==================== */

/* 弹窗过渡动画 */
.detail-dialog-enter-active,
.detail-dialog-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.detail-dialog-enter-from,
.detail-dialog-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* 科技感模态框基础样式 */
:deep(.tech-modal) {
  background: var(--theme-bg-modal) !important;
  backdrop-filter: blur(25px) !important;
  border: 2px solid transparent !important;
  border-radius: 0 !important;
  box-shadow: var(--theme-shadow-card) !important;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      var(--theme-border-primary) 0%,
      transparent 25%,
      transparent 75%,
      var(--theme-accent-hover) 100%
    );
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(
      45deg,
      var(--theme-accent) 0%,
      var(--theme-accent-hover) 25%,
      var(--theme-accent) 50%,
      var(--theme-accent-hover) 75%,
      var(--theme-accent) 100%
    );
    background-size: 400% 400%;
    animation: tech-border-glow 3s ease-in-out infinite;
    z-index: -1;
  }

  .el-dialog__header {
    background: transparent !important;
    border-bottom: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  .el-dialog__body {
    background: transparent !important;
    color: var(--theme-text-primary) !important;
    padding: 0 !important;
    position: relative;
    z-index: 1;
  }

  .el-dialog__footer {
    background: transparent !important;
    border-top: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}

@keyframes tech-border-glow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 科技感模态框头部 */
.tech-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(
    135deg,
    var(--theme-border-primary) 0%,
    var(--theme-border-secondary) 100%
  );
  border-bottom: 2px solid var(--theme-border-primary);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--theme-accent) 50%,
      transparent 100%
    );
    animation: tech-line-scan 2s ease-in-out infinite;
  }

  .header-title {
    display: flex;
    align-items: center;
    gap: 1rem;

    .title-icon {
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--theme-text-primary);
      box-shadow: var(--theme-shadow-card);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset: -2px;
        background: linear-gradient(45deg, var(--theme-accent), var(--theme-accent-hover));
        border-radius: 10px;
        z-index: -1;
        animation: tech-icon-pulse 2s ease-in-out infinite;
      }
    }

    .title-text {
      h3 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--theme-text-primary);
        text-shadow: 0 0 15px var(--theme-accent);
        background: linear-gradient(135deg, var(--theme-accent-hover) 0%, var(--theme-accent) 50%, var(--theme-accent-hover) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .title-subtitle {
        font-size: 0.75rem;
        color: var(--theme-text-tertiary);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-top: 0.25rem;
        font-family: 'Courier New', monospace;
      }
    }
  }

  .header-actions {
    .tech-close-btn {
      width: 2.5rem;
      height: 2.5rem;
      background: var(--theme-danger);
      border: 1px solid var(--theme-danger);
      border-radius: 6px;
      color: var(--theme-text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &:hover {
        background: var(--theme-danger);
        border-color: var(--theme-danger);
        color: var(--theme-text-primary);
        box-shadow: 0 0 15px var(--theme-danger);
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}

@keyframes tech-line-scan {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes tech-icon-pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

/* 科技感内容区域 */
.tech-content {
  padding: 2rem;
  position: relative;
  z-index: 1;
}

/* 信息卡片样式 */
.info-card {
  background: var(--theme-bg-tertiary);
  backdrop-filter: blur(15px);
  border: 1px solid var(--theme-border-primary);
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--theme-accent-hover);
    box-shadow: var(--theme-shadow-card);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--theme-accent), transparent);
    animation: card-scan 3s ease-in-out infinite;
  }

  .card-header {
    padding: 1rem 1.5rem;
    background: linear-gradient(
      135deg,
      var(--theme-border-primary) 0%,
      var(--theme-border-secondary) 100%
    );
    border-bottom: 1px solid var(--theme-border-secondary);
    position: relative;

    .card-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      color: var(--theme-text-primary);
      text-shadow: 0 0 10px var(--theme-accent);

      .el-icon {
        font-size: 1.2rem;
        color: var(--theme-accent);
      }
    }

    .card-divider {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--theme-accent) 50%,
        transparent 100%
      );
    }
  }

  .card-content {
    padding: 1.5rem;
  }
}

@keyframes card-scan {
  0%, 100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

/* 详情行样式 */
.detail-row {
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
  padding: 0.75rem;
  background: var(--theme-bg-secondary);
  border-left: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: var(--theme-border-secondary);
    border-left-color: var(--theme-accent);
    transform: translateX(5px);
  }

  &:last-child {
    margin-bottom: 0;
  }

  .detail-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 120px;
    font-weight: 600;
    color: var(--theme-text-secondary);
    flex-shrink: 0;
    font-size: 0.9rem;

    .el-icon {
      font-size: 1rem;
      color: var(--theme-accent);
    }
  }

  .detail-value {
    flex: 1;
    color: var(--theme-text-primary);
    word-break: break-all;
    font-family: 'Courier New', monospace;

    &.tech-value {
      background: var(--theme-border-primary);
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--theme-border-primary);
      font-family: inherit;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(
          180deg,
          var(--theme-accent) 0%,
          var(--theme-accent-hover) 100%
        );
      }
    }
  }
}

/* 科技感标签 */
.tech-tag {
  border: none !important;
  background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%) !important;
  color: var(--theme-text-primary) !important;
  font-weight: 600;
  padding: 0.5rem 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--theme-text-primary), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
}

/* 合作意向特殊样式 */
.tech-wish {
  background: linear-gradient(
    135deg,
    var(--theme-warning) 0%,
    var(--theme-border-secondary) 100%
  ) !important;
  border: 1px solid var(--theme-warning);
  padding: 1.5rem;
  color: var(--theme-text-primary);
  line-height: 1.8;
  white-space: pre-wrap;
  position: relative;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(
      180deg,
      var(--theme-warning) 0%,
      var(--theme-accent) 100%
    );
  }

  &::after {
    content: '💡';
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.2rem;
    opacity: 0.6;
  }
}

/* ==================== 图表弹窗专用样式 ==================== */

/* 图表控制面板 */
.chart-control-panel {
  background: var(--theme-bg-tertiary);
  backdrop-filter: blur(15px);
  border: 1px solid var(--theme-border-primary);
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;

  .control-header {
    padding: 1rem 1.5rem;
    background: linear-gradient(
      135deg,
      var(--theme-border-primary) 0%,
      var(--theme-border-secondary) 100%
    );
    border-bottom: 1px solid var(--theme-border-secondary);
    position: relative;

    .control-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      color: var(--theme-text-primary);
      text-shadow: 0 0 10px var(--theme-accent);

      .el-icon {
        font-size: 1.2rem;
        color: var(--theme-accent);
      }
    }

    .control-divider {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--theme-accent) 50%,
        transparent 100%
      );
    }
  }
}

/* 科技感标签页 */
.tech-tabs {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  justify-content: center;
}

.tech-tab-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: var(--theme-bg-tertiary);
  border: 1px solid var(--theme-border-primary);
  color: var(--theme-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  min-width: 140px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--theme-border-secondary), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    border-color: var(--theme-accent-hover);
    color: var(--theme-text-primary);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px var(--theme-accent);

    &::before {
      left: 100%;
    }

    .tab-icon {
      transform: scale(1.1);
      color: var(--theme-accent-hover);
    }
  }

  &.active {
    background: linear-gradient(135deg, var(--theme-border-secondary) 0%, var(--theme-border-primary) 100%);
    border-color: var(--theme-accent);
    color: var(--theme-text-primary);
    box-shadow: var(--theme-shadow-card);

    .tab-icon {
      color: var(--theme-accent);
      transform: scale(1.1);
    }

    .tab-title {
      color: var(--theme-accent);
      text-shadow: 0 0 10px var(--theme-accent);
    }
  }

  .tab-icon {
    font-size: 1.5rem;
    transition: all 0.3s ease;
    color: var(--theme-text-tertiary);
  }

  .tab-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .tab-title {
      font-size: 0.9rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .tab-subtitle {
      font-size: 0.7rem;
      color: var(--theme-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      font-family: 'Courier New', monospace;
    }
  }
}



@keyframes tech-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* ==================== 科技感按钮和底部样式 ==================== */

/* 科技感模态框底部 */
.tech-modal-footer {
  padding: 1.5rem 2rem;
  background: linear-gradient(
    135deg,
    var(--theme-border-primary) 0%,
    var(--theme-border-secondary) 100%
  );
  border-top: 2px solid var(--theme-border-primary);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--theme-accent) 50%,
      transparent 100%
    );
    animation: tech-line-scan 2s ease-in-out infinite reverse;
  }
}

/* 科技感按钮 */
.tech-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--theme-text-primary), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px var(--theme-shadow);
  }

  &:active {
    transform: translateY(0);
  }

  .el-icon {
    font-size: 1rem;
  }

  &.tech-button-primary {
    background: linear-gradient(135deg, var(--theme-accent) 0%, var(--theme-accent-hover) 100%);
    border: 1px solid var(--theme-border-primary);
    color: var(--theme-text-primary);
    box-shadow: 0 4px 15px var(--theme-accent);

    &:hover {
      background: linear-gradient(135deg, var(--theme-accent-hover) 0%, var(--theme-accent) 100%);
      border-color: var(--theme-accent-hover);
      box-shadow: 0 8px 25px var(--theme-accent);
    }
  }

  &.tech-button-secondary {
    background: var(--theme-bg-tertiary);
    border: 1px solid var(--theme-border-primary);
    color: var(--theme-text-secondary);
    box-shadow: 0 4px 15px var(--theme-shadow);

    &:hover {
      background: var(--theme-border-secondary);
      border-color: var(--theme-accent-hover);
      color: var(--theme-text-primary);
      box-shadow: 0 8px 25px var(--theme-accent);
    }
  }

  &.tech-button-danger {
    background: linear-gradient(135deg, var(--theme-danger) 0%, var(--theme-danger) 100%);
    border: 1px solid var(--theme-danger);
    color: var(--theme-text-primary);
    box-shadow: 0 4px 15px var(--theme-danger);

    &:hover {
      background: linear-gradient(135deg, var(--theme-danger) 0%, var(--theme-danger) 100%);
      border-color: var(--theme-danger);
      box-shadow: 0 8px 25px var(--theme-danger);
    }
  }
}

/* ==================== 响应式设计优化 ==================== */

/* 移动端优化 */
@media (max-width: 768px) {
  .tech-modal {
    width: 95% !important;
    margin: 0 auto !important;
  }

  .tech-modal-header {
    padding: 1rem 1.5rem;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    .header-title {
      flex-direction: column;
      gap: 0.5rem;

      .title-icon {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.2rem;
      }

      .title-text h3 {
        font-size: 1.2rem;
      }
    }
  }

  .tech-content {
    padding: 1rem;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .detail-label {
      width: auto;
    }

    .detail-value.tech-value {
      width: 100%;
    }
  }

  .tech-tabs {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;

    .tech-tab-btn {
      min-width: auto;
      justify-content: center;
    }
  }

  .tech-modal-footer {
    padding: 1rem 1.5rem;
    justify-content: center;
  }
}

/* 平板端优化 */
@media (min-width: 769px) and (max-width: 1024px) {
  .tech-modal {
    width: 85% !important;
  }

  .tech-tabs {
    flex-wrap: wrap;
    justify-content: center;
  }

  .tech-tab-btn {
    min-width: 120px;
  }
}

/* 确保弹窗在所有设备上都能正确显示 */
@media (max-height: 600px) {
  .tech-modal {
    max-height: 90vh !important;
    overflow-y: auto !important;
  }

  .tech-content {
    max-height: calc(90vh - 200px);
    overflow-y: auto;
  }
}

/* 操作按钮样式 */
:deep(.el-table) {
  .el-button + .el-button {
    margin-left: 0.5rem;
  }
}

/* 工具栏按钮和表单控件样式 */
:deep(.el-button) {
  border-radius: 0 !important; /* 移除所有按钮圆角 */

  &.el-button--primary {
    background: linear-gradient(135deg, #1E90FF 0%, #0066FF 100%);
    border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框 */
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(30, 144, 255, 0.5);

    &:hover {
      background: linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%);
      box-shadow: 0 6px 20px rgba(30, 144, 255, 0.6);
      transform: translateY(-1px);
    }
  }

  &.el-button--danger {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    border: none;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);

    &:hover {
      background: linear-gradient(135deg, #ff7979 0%, #f66a60 100%);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
      transform: translateY(-1px);
    }
  }

  &.el-button--default {
    background: #160906 !important; /* 统一深棕黑色背景 */
    border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框颜色 */
    color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(30, 144, 255, 0.2);
      border-color: rgba(0, 191, 255, 0.6);
      color: #ffffff;
      box-shadow: 0 0 15px rgba(30, 144, 255, 0.5);
    }
  }
}

/* 下拉框样式 */
:deep(.el-select__wrapper){
  background-color: #160906;
  box-shadow: none;
  border:1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框颜色 */
  border-radius: 0 !important; /* 移除圆角 */
}


:deep(.el-input__wrapper) {
  --el-input-border-color: rgba(30, 144, 255, 0.4) !important;
  background: #160906 !important; /* 统一深棕黑色背景 */
  border-radius: 0 !important; /* 移除圆角 */
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(0, 191, 255, 0.6);
  }

  &.is-focus {
    border-color: rgba(30, 144, 255, 0.8);
    box-shadow: 0 0 15px rgba(30, 144, 255, 0.4);
  }

  .el-input__inner {
    color: rgba(255, 255, 255, 0.9);

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}

:deep(.el-select) {
  .el-input__wrapper {
    background: #160906 !important; /* 统一深棕黑色背景 */
    border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框颜色 */
    border-radius: 0 !important; /* 移除圆角 */

    &:hover {
      border-color: rgba(0, 191, 255, 0.6);
    }
  }
}

:deep(.el-date-editor) {
  .el-input__wrapper {
    background: #160906 !important; /* 统一深棕黑色背景 */
    border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框颜色 */
    border-radius: 0 !important; /* 移除圆角 */

    &:hover {
      border-color: rgba(0, 191, 255, 0.6);
    }
  }
}

/* 表格内标签和按钮样式 */
:deep(.el-table) {
    --el-table-border-color: rgba(30, 144, 255, 0.4);

  .el-tag {
    border-radius: 0 !important; /* 移除标签圆角 */

    &.el-tag--success {
      background: linear-gradient(135deg, #1E90FF 0%, #0066FF 100%) !important;
      border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框 */
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(30, 144, 255, 0.5);
    }

    &.el-tag--warning {
      background: linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%) !important;
      border: 1px solid rgba(0, 191, 255, 0.4) !important; /* 统一边框 */
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(0, 191, 255, 0.5);
    }

    &.el-tag--info {
      background: linear-gradient(135deg, #4169E1 0%, #0000CD 100%) !important;
      border: 1px solid rgba(65, 105, 225, 0.4) !important; /* 统一边框 */
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(65, 105, 225, 0.5);
    }
  }

  .el-button {
    border-radius: 0 !important; /* 移除表格内按钮圆角 */

    &.el-button--primary {
      background: linear-gradient(135deg, #1E90FF 0%, #0066FF 100%) !important;
      border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框 */
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(30, 144, 255, 0.5);

      &:hover {
        background: linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%) !important;
        box-shadow: 0 4px 12px rgba(30, 144, 255, 0.7);
        transform: translateY(-1px);
      }
    }

    &.el-button--danger {
      background: linear-gradient(135deg, #ff4757 0%, #c44569 100%) !important;
      border: 1px solid rgba(255, 71, 87, 0.4) !important; /* 统一危险按钮边框 */
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);

      &:hover {
        background: linear-gradient(135deg, #ff6b7a 0%, #d63384 100%) !important;
        box-shadow: 0 4px 12px rgba(255, 71, 87, 0.6);
        transform: translateY(-1px);
      }
    }

    &.el-button--small {
      font-size: 12px;
      padding: 5px 12px;
    }
  }
}

/* 强制表格透明样式 - 最高优先级 */
:deep(.el-table),
:deep(.el-table__inner-wrapper),
:deep(.el-table__header-wrapper),
:deep(.el-table__body-wrapper),
:deep(.el-table__footer-wrapper) {
  background: transparent !important;
  background-color: transparent !important;
}

:deep(.el-table__header),
:deep(.el-table__body),
:deep(.el-table__footer) {
  background: transparent !important;
  background-color: transparent !important;
}

:deep(.el-table tr),
:deep(.el-table th),
:deep(.el-table td) {
  background: transparent !important;
  background-color: transparent !important;
}

/* 确保分页选择器下拉框也使用深黑蓝色主题 */
:deep(.el-select-dropdown) {
  background: rgba(0, 0, 0, 0.95) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  border-radius: 0 !important; /* 移除下拉框圆角 */
  backdrop-filter: blur(20px);

  .el-select-dropdown__item {
    color: rgba(255, 255, 255, 0.8) !important;

    &:hover {
      background: rgba(30, 144, 255, 0.2) !important;
      color: #ffffff !important;
    }

    &.is-selected {
      background: rgba(30, 144, 255, 0.3) !important;
      color: #ffffff !important;
    }
  }
}

/* 确保日期选择器下拉框也使用深黑蓝色主题 */
:deep(.el-picker-panel) {
  background: rgba(0, 0, 0, 0.95) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  border-radius: 0 !important; /* 移除日期选择器圆角 */
  backdrop-filter: blur(20px);

  .el-picker-panel__content {
    color: rgba(255, 255, 255, 0.8) !important;
  }

  .el-date-table td.available:hover {
    background: rgba(30, 144, 255, 0.2) !important;
    color: #ffffff !important;
  }

  .el-date-table td.current {
    background: rgba(30, 144, 255, 0.3) !important;
    color: #ffffff !important;
  }
}

/* 表格加载状态样式修改 */
:deep(.el-loading-mask) {
  background: rgba(30, 144, 255, 0.2) !important; /* 替换原有的白色背景 */
  backdrop-filter: blur(10px) !important;
  border-radius: 0 !important;
}

:deep(.el-loading-spinner) {
  .el-loading-text {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 500;
    text-shadow: 0 0 10px rgba(30, 144, 255, 0.6);
  }

  .circular {
    stroke: rgba(30, 144, 255, 0.8) !important;
    filter: drop-shadow(0 0 8px rgba(30, 144, 255, 0.5));
  }
}

/* 确保加载状态与深黑蓝色主题一致 */
:deep(.el-table) {
  .el-loading-mask {
    background: rgba(30, 144, 255, 0.2) !important;
    backdrop-filter: blur(15px) !important;
  }
}

/* 自定义滚动条样式 - 深黑蓝色科技主题 */
/* Webkit 浏览器滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0;
  box-shadow: inset 0 0 3px rgba(30, 144, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.6) 0%, rgba(0, 100, 255, 0.8) 100%);
  border-radius: 0;
  border: 1px solid rgba(30, 144, 255, 0.3);
  box-shadow:
    0 0 5px rgba(30, 144, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.8) 0%, rgba(0, 191, 255, 0.9) 100%);
  box-shadow:
    0 0 8px rgba(30, 144, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 191, 255, 0.5);
}

::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, rgba(0, 191, 255, 0.9) 0%, rgba(30, 144, 255, 1) 100%);
  box-shadow:
    0 0 10px rgba(30, 144, 255, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

::-webkit-scrollbar-corner {
  background: rgba(0, 0, 0, 0.3);
}

/* 表格专用滚动条样式 */
.data-table ::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.data-table ::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0;
}

.data-table ::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.5) 0%, rgba(0, 100, 255, 0.7) 100%);
  border-radius: 0;
  border: 1px solid rgba(30, 144, 255, 0.2);
  transition: all 0.2s ease;
}

.data-table ::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.7) 0%, rgba(0, 191, 255, 0.8) 100%);
  border-color: rgba(0, 191, 255, 0.4);
}

/* Element Plus 表格内部滚动条 */
:deep(.el-table__body-wrapper)::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

:deep(.el-table__body-wrapper)::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

:deep(.el-table__body-wrapper)::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.4) 0%, rgba(0, 100, 255, 0.6) 100%);
  border-radius: 0;
  border: 1px solid rgba(30, 144, 255, 0.2);
  transition: all 0.2s ease;
}

:deep(.el-table__body-wrapper)::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.6) 0%, rgba(0, 191, 255, 0.7) 100%);
  border-color: rgba(0, 191, 255, 0.3);
  box-shadow: 0 0 3px rgba(30, 144, 255, 0.5);
}

/* Firefox 滚动条样式 */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(30, 144, 255, 0.6) rgba(0, 0, 0, 0.3);
}

.data-table {
  scrollbar-width: thin;
  scrollbar-color: rgba(30, 144, 255, 0.5) rgba(0, 0, 0, 0.2);
}

/* 管理后台整体滚动条优化 */
.admin-dashboard {
  scrollbar-width: thin;
  scrollbar-color: rgba(30, 144, 255, 0.6) rgba(0, 0, 0, 0.3);
}

.admin-dashboard::-webkit-scrollbar {
  width: 10px;
}

.admin-dashboard::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0;
}

.admin-dashboard::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.7) 0%, rgba(0, 100, 255, 0.9) 100%);
  border-radius: 0;
  border: 1px solid rgba(30, 144, 255, 0.4);
  box-shadow:
    0 0 5px rgba(30, 144, 255, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.admin-dashboard::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.9) 0%, rgba(0, 191, 255, 1) 100%);
  box-shadow:
    0 0 8px rgba(30, 144, 255, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* ==================== 弹窗滚动条科技感样式 ==================== */

/* 弹窗主体滚动条样式 - 使用更高优先级选择器 */
.el-overlay .el-dialog .el-dialog__body,
.el-dialog .el-dialog__body,
.el-dialog__body {
  /* Firefox 滚动条样式 */
  scrollbar-width: thin !important;
  scrollbar-color: rgba(30, 144, 255, 0.8) rgba(11, 9, 35, 0.9) !important;
}

/* 使用多重选择器确保样式生效 */
.el-overlay .el-dialog .el-dialog__body::-webkit-scrollbar,
.el-dialog .el-dialog__body::-webkit-scrollbar,
.el-dialog__body::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
}

.el-overlay .el-dialog .el-dialog__body::-webkit-scrollbar-track,
.el-dialog .el-dialog__body::-webkit-scrollbar-track,
.el-dialog__body::-webkit-scrollbar-track {
  background: rgba(11, 9, 35, 0.9) !important;
  border: 1px solid rgba(30, 144, 255, 0.3) !important;
  border-radius: 0 !important;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.6) !important;
}

.el-overlay .el-dialog .el-dialog__body::-webkit-scrollbar-thumb,
.el-dialog .el-dialog__body::-webkit-scrollbar-thumb,
.el-dialog__body::-webkit-scrollbar-thumb {
  background: linear-gradient(
    135deg,
    rgba(30, 144, 255, 0.9) 0%,
    rgba(0, 191, 255, 1) 50%,
    rgba(0, 100, 255, 0.9) 100%
  ) !important;
  border: 1px solid rgba(30, 144, 255, 0.5) !important;
  border-radius: 0 !important;
  box-shadow:
    0 0 10px rgba(30, 144, 255, 0.8),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease !important;
}

.el-overlay .el-dialog .el-dialog__body::-webkit-scrollbar-thumb:hover,
.el-dialog .el-dialog__body::-webkit-scrollbar-thumb:hover,
.el-dialog__body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    135deg,
    rgba(0, 191, 255, 1) 0%,
    rgba(30, 144, 255, 1) 50%,
    rgba(0, 100, 255, 1) 100%
  ) !important;
  border-color: rgba(0, 191, 255, 0.8) !important;
  box-shadow:
    0 0 15px rgba(30, 144, 255, 1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(0, 0, 0, 0.4) !important;
  transform: scaleX(1.1) !important;
}

.el-overlay .el-dialog .el-dialog__body::-webkit-scrollbar-thumb:active,
.el-dialog .el-dialog__body::-webkit-scrollbar-thumb:active,
.el-dialog__body::-webkit-scrollbar-thumb:active {
  background: linear-gradient(
    135deg,
    rgba(0, 100, 255, 1) 0%,
    rgba(30, 144, 255, 1) 50%,
    rgba(0, 191, 255, 1) 100%
  ) !important;
  box-shadow:
    0 0 20px rgba(30, 144, 255, 1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.5) !important;
}

.el-overlay .el-dialog .el-dialog__body::-webkit-scrollbar-corner,
.el-dialog .el-dialog__body::-webkit-scrollbar-corner,
.el-dialog__body::-webkit-scrollbar-corner {
  background: rgba(11, 9, 35, 0.9) !important;
  border: 1px solid rgba(30, 144, 255, 0.3) !important;
}

/* 科技感内容区域滚动条 */
.tech-content::-webkit-scrollbar {
  width: 6px !important;
  height: 6px !important;
}

.tech-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.5) !important;
  border: 1px solid rgba(30, 144, 255, 0.2) !important;
  border-radius: 0 !important;
}

.tech-content::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(30, 144, 255, 0.7) 0%,
    rgba(0, 191, 255, 0.9) 50%,
    rgba(30, 144, 255, 0.7) 100%
  ) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  border-radius: 0 !important;
  box-shadow:
    0 0 8px rgba(30, 144, 255, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  transition: all 0.3s ease !important;
}

.tech-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    rgba(0, 191, 255, 0.9) 0%,
    rgba(30, 144, 255, 1) 50%,
    rgba(0, 191, 255, 0.9) 100%
  ) !important;
  border-color: rgba(0, 191, 255, 0.6) !important;
  box-shadow:
    0 0 12px rgba(30, 144, 255, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
  transform: scaleY(1.05) !important;
}

/* 信息卡片内滚动条 */
.info-card .card-content::-webkit-scrollbar {
  width: 4px !important;
  height: 4px !important;
}

.info-card .card-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.4) !important;
  border-radius: 0 !important;
}

.info-card .card-content::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(30, 144, 255, 0.6) 0%,
    rgba(0, 191, 255, 0.8) 100%
  ) !important;
  border: 1px solid rgba(30, 144, 255, 0.3) !important;
  border-radius: 0 !important;
  transition: all 0.2s ease !important;
}

.info-card .card-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    rgba(0, 191, 255, 0.8) 0%,
    rgba(30, 144, 255, 1) 100%
  ) !important;
  border-color: rgba(0, 191, 255, 0.5) !important;
  box-shadow: 0 0 8px rgba(30, 144, 255, 0.6) !important;
}

/* 滚动条动画效果 */
@keyframes scrollbar-glow {
  0%, 100% {
    box-shadow:
      0 0 8px rgba(30, 144, 255, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
  50% {
    box-shadow:
      0 0 15px rgba(30, 144, 255, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
  }
}

/* 为科技感弹窗添加特殊滚动条样式 */
.tech-modal .el-dialog__body::-webkit-scrollbar-thumb {
  animation: scrollbar-glow 3s ease-in-out infinite !important;
}

/* 响应式滚动条优化 */
@media (max-width: 768px) {
  .el-dialog__body::-webkit-scrollbar {
    width: 6px !important;
  }

  .tech-content::-webkit-scrollbar {
    width: 4px !important;
  }

  .info-card .card-content::-webkit-scrollbar {
    width: 3px !important;
  }
}

/* 高分辨率屏幕优化 */
@media (min-resolution: 2dppx) {
  .el-dialog__body::-webkit-scrollbar {
    width: 10px !important;
  }

  .el-dialog__body::-webkit-scrollbar-thumb {
    border-width: 2px !important;
  }
}
</style>

<style>
/* ==================== 全局弹窗滚动条样式 ==================== */
/* 这个样式块专门用于确保滚动条样式能够正确应用 */

/* 强制应用弹窗滚动条样式 */
.el-dialog__body {
  scrollbar-width: thin !important;
  scrollbar-color: rgba(30, 144, 255, 0.8) rgba(11, 9, 35, 0.9) !important;
}

.el-dialog__body::-webkit-scrollbar {
  width: 8px !important;
  height: 8px !important;
  background: rgba(11, 9, 35, 0.9) !important;
}

.el-dialog__body::-webkit-scrollbar-track {
  background: rgba(11, 9, 35, 0.9) !important;
  border: 1px solid rgba(30, 144, 255, 0.3) !important;
  border-radius: 0 !important;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.6) !important;
}

.el-dialog__body::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.9) 0%, rgba(0, 191, 255, 1) 50%, rgba(0, 100, 255, 0.9) 100%) !important;
  border: 1px solid rgba(30, 144, 255, 0.5) !important;
  border-radius: 0 !important;
  box-shadow: 0 0 10px rgba(30, 144, 255, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
  transition: all 0.3s ease !important;
}

.el-dialog__body::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(0, 191, 255, 1) 0%, rgba(30, 144, 255, 1) 50%, rgba(0, 100, 255, 1) 100%) !important;
  border-color: rgba(0, 191, 255, 0.8) !important;
  box-shadow: 0 0 15px rgba(30, 144, 255, 1), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
  transform: scaleX(1.1) !important;
}

.el-dialog__body::-webkit-scrollbar-thumb:active {
  background: linear-gradient(135deg, rgba(0, 100, 255, 1) 0%, rgba(30, 144, 255, 1) 50%, rgba(0, 191, 255, 1) 100%) !important;
  box-shadow: 0 0 20px rgba(30, 144, 255, 1) !important;
}

.el-dialog__body::-webkit-scrollbar-corner {
  background: rgba(11, 9, 35, 0.9) !important;
  border: 1px solid rgba(30, 144, 255, 0.3) !important;
}

/* 全局确认弹窗样式优化 */
.el-message-box {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  border-radius: 0 !important; /* 移除圆角 */
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(30, 144, 255, 0.3) !important;
}

.el-message-box__wrapper {
  background: rgba(0, 0, 0, 0.7) !important;
  backdrop-filter: blur(5px) !important;
}

.el-message-box__header {
  background: transparent !important;
  border-bottom: 1px solid rgba(30, 144, 255, 0.3) !important;
  padding: 1.5rem 2rem 1rem !important;
}

.el-message-box__title {
  color: rgba(255, 255, 255, 0.95) !important;
  font-weight: 600 !important;
  font-size: 1.125rem !important;
  text-shadow: 0 0 10px rgba(30, 144, 255, 0.5) !important;
}

.el-message-box__content {
  background: transparent !important;
  padding: 1.5rem 2rem !important;
}

.el-message-box__message {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 1rem !important;
  line-height: 1.5 !important;
}

.el-message-box__btns {
  background: transparent !important;
  border-top: 1px solid rgba(30, 144, 255, 0.3) !important;
  padding: 1rem 2rem 1.5rem !important;
  text-align: right !important;
}

.el-message-box__btns .el-button {
  border-radius: 0 !important; /* 移除按钮圆角 */
  margin-left: 0.75rem !important;
  min-width: 80px !important;

  &.el-button--primary {
    background: linear-gradient(135deg, #1E90FF 0%, #0066FF 100%) !important;
    border: 1px solid rgba(30, 144, 255, 0.4) !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(30, 144, 255, 0.5) !important;

    &:hover {
      background: linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%) !important;
      box-shadow: 0 6px 20px rgba(30, 144, 255, 0.6) !important;
      transform: translateY(-1px) !important;
      border-color: rgba(0, 191, 255, 0.6) !important;
    }

    &:active {
      transform: translateY(0) !important;
      box-shadow: 0 2px 10px rgba(30, 144, 255, 0.4) !important;
    }
  }

  &.el-button--default {
    background: #160906 !important;
    border: 1px solid rgba(30, 144, 255, 0.4) !important;
    color: rgba(255, 255, 255, 0.8) !important;
    backdrop-filter: blur(10px) !important;

    &:hover {
      background: rgba(30, 144, 255, 0.2) !important;
      border-color: rgba(0, 191, 255, 0.6) !important;
      color: #ffffff !important;
      transform: translateY(-1px) !important;
    }

    &:active {
      transform: translateY(0) !important;
    }
  }
}

/* 确保弹窗图标也使用主题色 */
.el-message-box__status.el-icon {
  color: rgba(30, 144, 255, 0.8) !important;
  font-size: 1.5rem !important;
}

.el-message-box__status.el-icon-warning {
  color: rgba(255, 193, 7, 0.9) !important;
}

.el-message-box__status.el-icon-error {
  color: rgba(220, 53, 69, 0.9) !important;
}

.el-message-box__status.el-icon-success {
  color: rgba(40, 167, 69, 0.9) !important;
}

/* 确保弹窗在正确的层级显示 */
.el-overlay {
  z-index: 3000 !important;
}

.el-message-box {
  z-index: 3001 !important;
}

/* 模态框层级管理 */
.detail-dialog .el-overlay {
  z-index: 3002 !important;
}

.chart-dialog .el-overlay {
  z-index: 3003 !important;
}

/* 确保所有模态框都能正确居中显示 */
.el-dialog {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  margin: 0 !important;
  max-height: 90vh !important;
  background: #0b0923;
}

/* 确保模态框内容不会溢出 */
.el-dialog__body {
  max-height: calc(90vh - 120px) !important;
  overflow-y: auto !important;
}

/* 响应式设计 - 移动端优化 */
@media (max-width: 768px) {
  .el-message-box {
    width: 90% !important;
    margin: 0 auto !important;
  }

  .el-message-box__header,
  .el-message-box__content,
  .el-message-box__btns {
    padding-left: 1.5rem !important;
    padding-right: 1.5rem !important;
  }

  .el-message-box__title {
    font-size: 1rem !important;
  }

  .el-message-box__message {
    font-size: 0.9375rem !important;
  }

  .el-message-box__btns .el-button {
    min-width: 70px !important;
    font-size: 0.875rem !important;
  }
}

/* 详情弹窗样式 */
.detail-dialog {
  background: rgba(0, 0, 0, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(30, 144, 255, 0.4) !important;
  border-radius: 0 !important;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(30, 144, 255, 0.3) !important;
  z-index: 3002 !important; /* 确保在正确层级 */
}

.detail-dialog .el-dialog__header {
  background: transparent !important;
  border-bottom: 1px solid rgba(30, 144, 255, 0.3) !important;
  padding: 1.5rem 2rem 1rem !important;
}

.detail-dialog .el-dialog__title {
  color: rgba(255, 255, 255, 0.95) !important;
  font-weight: 600 !important;
  font-size: 1.125rem !important;
  text-shadow: 0 0 10px rgba(30, 144, 255, 0.5) !important;
}

.detail-dialog .el-dialog__body {
  background: transparent !important;
  padding: 1.5rem 2rem !important;
}






</style>
