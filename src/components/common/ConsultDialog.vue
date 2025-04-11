<template>
  <el-dialog v-model="dialogVisible"  width="450px" :style="{height: '67vh', padding: '10px 40px 10px', borderRadius: '14px'}" center>
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
        025-83132381
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
        <el-button type="primary" class="submit-btn" @click="submitForm">点击提交</el-button>
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
import { ref,  watch } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'submit'])

const dialogVisible = ref(props.visible)
const currentStep = ref(1)
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
  form.value = {
    company: '',
    name: '',
    phone: ''
  }
}

const submitForm = () => {
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
  
  // 提交表单数据给父组件
  emit('submit', { ...form.value })
  
  // 模拟提交后的成功状态
  setTimeout(() => {
    currentStep.value = 2
  }, 500)
}

const closeDialog = () => {
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
/* 咨询弹窗样式 */
.steps-container {
  margin-bottom: 30px;
  
  .step-line {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    .step-circle {
      width: 30px;
      height: 30px;
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
      top: 15px;
      left: 30px;
      right: 30px;
      height: 2px;
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
      font-size: 16px;
      font-weight: 400;

      &.active {
        color: #0072ff;
        font-weight: 400;
      }
    }
  }
}

.contact-hotline-title {
  font-size: 16px;
  color: #0072ff;
  font-weight: 100;
  margin-bottom: 10px;
}

.contact-hotline {
  background-color: #0072ff;
  color: white;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  i {
    margin-right: 10px;
  }
}

.form-container {
  margin-bottom: 20px;
  
  .form-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-bottom: 10px;
    // border: 1px solid #e0e0e0;
    border-radius: 4px;
    
    i {
      margin-right: 10px;
      color: #666;
    }
    
    span {
      min-width: 60px;
      margin-bottom: 10px;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
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
  margin-top: 3rem;
  
  .submit-btn {
    width: 200px;
    height: 45px;
    border-radius: 22.5px;
    font-size: 16px;
    background-color:#0072ff;
    border-color:#0072ff;
  }
}

.success-container {
  text-align: center;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .success-icon {
    width: 205px;
    height: 192px;
    object-fit: contain;    
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 40px;
    font-size: 50px;
    background: url('@/assets/industry/apply-success.png') no-repeat center center;
  }

  .success-title{
    font-size: 24px;
    color: rgba(32, 33, 36, 1);
    font-weight: 500;
    margin-bottom: 20px;
  }

  .success-content{
    font-size: 16px;
    color: rgba(97, 101, 106, 1);
    font-weight: 400;
    margin-bottom: 20px;
    line-height: 2;
  }
  .close-btn {
    width: 180px;
    height: 45px;
    border-radius: 22.5px;
    font-size: 16px;
  }
}

:deep(.el-dialog) {
  border-radius: 8px;
  overflow: hidden;
  
  .el-dialog__header {
    background-color: white;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;

    &.show-close {
      padding-right: 0px !important;
    }
    
    .el-dialog__title {
      font-size: 24px;
      color: #333;
      font-weight: normal;
    }
  }
  
  .el-dialog__body {
    padding: 30px;
  }
}

.dialog-header{
    font-size: 24px;
    text-align: center;
    color: #000;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>