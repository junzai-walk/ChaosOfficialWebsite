<template>
  <el-dialog v-model="dialogVisible" width="30rem" :style="{ minHeight: '38rem', padding: '1rem 2.5rem', borderRadius: '1rem' }" center :teleported="false">
    <div class="dialog-header">
      在线申请
    </div>
    <!-- 步骤条 -->
    <div class="steps-container">
      <div class="step-line">
        <div class="step-circle active">1</div>
        <div class="step-progress" :class="{'completed': currentStep > 1}"></div>
        <div class="step-circle" :class="{'active': currentStep > 1}">2</div>
      </div>
      <div class="step-labels">
        <div class="step-label active">完善资料</div>
        <div class="step-label" :class="{'active': currentStep > 1}">申请成功</div>
      </div>
    </div>

    <!-- 步骤1：填写表单 -->
    <div v-if="currentStep === 1">
      <div class="contact-hotline-title">联系热线：</div>
      <div class="contact-hotline">
        <i class="el-icon-phone-outline"></i>
        18913908978
      </div>

      <div class="form-container">
        <div class="form-item">
          <i class="el-icon-office-building"></i>
          <span>单位：</span>
          <el-input v-model="form.company" placeholder="请输入企业名称"></el-input>
        </div>

        <div class="form-item">
          <i class="el-icon-user"></i>
          <span>姓名：</span>
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </div>

        <div class="form-item">
          <i class="el-icon-mobile-phone"></i>
          <span>电话：</span>
          <el-input v-model="form.phone" placeholder="请输入号码"></el-input>
        </div>
      </div>

      <div class="submit-container">
        <el-button type="primary" class="submit-btn" @click="submitForm" :loading="isSubmitting" :disabled="isSubmitting">点击提交</el-button>
      </div>
    </div>

    <!-- 步骤2：申请成功 -->
    <div v-else class="success-container">
      <div class="success-icon">
      </div>
      <div class="success-title">
        申请成功
      </div>
      <div class="success-content">
        请您耐心等待，我们的工作人员将在3个工作日内尽快联系您
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { submitConsultForm } from '@/api/consult'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'submit'])

const dialogVisible = ref(props.visible)
const currentStep = ref(1)
const isSubmitting = ref(false) // 添加提交状态变量，用于防止重复提交
const form = ref({
  company: '',
  name: '',
  phone: ''
})

// 监听visible属性变化
watch(() => props.visible, (newValue) => {
  dialogVisible.value = newValue
  if (newValue) {
    // 弹窗打开时重置表单
    resetForm()
  }
})

// 监听dialogVisible变化，更新父组件的visible属性
watch(() => dialogVisible.value, (newValue) => {
  emit('update:visible', newValue)
})

const resetForm = () => {
  currentStep.value = 1
  isSubmitting.value = false // 重置提交状态
  form.value = {
    company: '',
    name: '',
    phone: ''
  }
}

const submitForm = async () => {
  // 如果已经在提交中，则不重复提交
  if (isSubmitting.value) {
    return
  }

  // 验证手机号码格式
  const phoneRegex = /^(1[3-9]\d{9}|0\d{2,3}-\d{7,8})$/
  if (!form.value.company) {
    ElMessage.warning('请输入企业名称')
    return
  }
  if (!form.value.name) {
    ElMessage.warning('请输入姓名')
    return
  }
  if (!form.value.phone) {
    ElMessage.warning('请输入手机号')
    return
  }
  if (!phoneRegex.test(form.value.phone)) {
    ElMessage.warning('请输入正确的手机号码格式')
    return
  }

  // 设置提交状态为true，防止重复提交
  isSubmitting.value = true

  try {
    // 提交表单数据到服务器
    const response = await submitConsultForm(form.value)

    // 提交表单数据给父组件
    emit('submit', { ...form.value })

    // 提交成功，显示成功状态
    currentStep.value = 2

    console.log('表单提交成功:', response)
  } catch (error) {
    console.error('表单提交失败:', error)
    ElMessage.error('提交失败，请稍后重试')
  } finally {
    // 无论成功还是失败，都将提交状态设置为false
    isSubmitting.value = false
  }
}

const closeDialog = () => {
  dialogVisible.value = false
}

// 添加默认导出
defineExpose({
  dialogVisible,
  submitForm,
  closeDialog
})
</script>

<script lang="ts">
// 添加默认导出
export default {
  name: 'ConsultDialog'
}
</script>

<style lang="less" scoped>
/* 设置基准根元素字体大小 */
:root {
  font-size: 16px;

}

/* 咨询弹窗样式 */
.steps-container {
  margin-bottom: 1.875rem;

  .step-line {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;

    .step-circle {
      width: 1.875rem;
      height: 1.875rem;
      border-radius: 50%;
      background-color: #e0e0e0;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      z-index: 2;

      &.active {
        background-color: #0072ff;
      }
    }

    .step-progress {
      position: absolute;
      top: 0.9375rem;
      left: 1.875rem;
      right: 1.875rem;
      height: 0.125rem;
      background-color: #e0e0e0;
      z-index: 1;

      &.completed {
        background-color: #0072ff;
      }
    }
  }

  .step-labels {
    display: flex;
    justify-content: space-between;

    .step-label {
      color: #666;
      font-size: 1rem;
      font-weight: 400;

      &.active {
        color: #0072ff;
        font-weight: 400;
      }
    }
  }
}

.contact-hotline-title {
  font-size: 1rem;
  color: #0072ff;
  font-weight: 100;
  margin-bottom: 0.625rem;
}

.contact-hotline {
  background-color: #0072ff;
  color: white;
  padding: 0.9375rem;
  border-radius: 0.25rem;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;

  i {
    margin-right: 0.625rem;
  }
}

.form-container {
  margin-bottom: 1.25rem;

  .form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 0.625rem;
    border-radius: 0.25rem;

    i {
      margin-right: 0.625rem;
      color: #666;
    }

    span {
      min-width: 3.75rem;
      margin-bottom: 0.625rem;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.75rem;
      letter-spacing: 0%;
    }

    .el-input {
      flex: 1;

      :deep(.el-input__inner) {
        border: none;
        padding: 0;
      }
    }
  }
}

.submit-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .submit-btn {
    width: 12.5rem;
    height: 2.8125rem;
    border-radius: 1.40625rem;
    font-size: 1rem;
    background-color:#0072ff;
    border-color:#0072ff;
  }
}

.success-container {
  text-align: center;
  padding: 3.125rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .success-icon {
    width: 12.8125rem;
    height: 12rem;
    object-fit: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 2.5rem;
    font-size: 3.125rem;
    background: url('@/assets/industry/apply-success.png') no-repeat center center;
    background-size: contain;
  }

  .success-title{
    font-size: 1.5rem;
    color: rgba(32, 33, 36, 1);
    font-weight: 500;
    margin-bottom: 1.25rem;
  }

  .success-content{
    font-size: 1rem;
    color: rgba(97, 101, 106, 1);
    font-weight: 400;
    margin-bottom: 1.25rem;
    line-height: 2;
  }
  .close-btn {
    width: 11.25rem;
    height: 2.8125rem;
    border-radius: 1.40625rem;
    font-size: 1rem;
  }
}

:deep(.el-dialog) {
  border-radius: 0.5rem;
  overflow: hidden;

  .el-dialog__header {
    background-color: white;
    padding: 1.25rem;
    text-align: center;
    border-bottom: 0.0625rem solid #f0f0f0;

    &.show-close {
      padding-right: 0 !important;
    }

    .el-dialog__title {
      font-size: 1.5rem;
      color: #333;
      font-weight: normal;
    }
  }

  .el-dialog__body {
    padding: 1.875rem;
  }
}

.dialog-header{
  font-size: 1.5rem;
  text-align: center;
  color: #000;
  font-weight: bold;
  margin-bottom: 1.25rem;
}

/* 媒体查询 - 适配不同分辨率 */
</style>