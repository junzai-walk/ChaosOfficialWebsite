<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-header">
        <h2>管理员登录</h2>
        <p>凯奥思数据官网后台管理系统</p>
      </div>
      
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { adminLogin, saveAdminInfo } from '@/api/admin'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    // 验证表单
    await loginFormRef.value.validate()
    
    loading.value = true
    
    // 调用登录API
    const response = await adminLogin(loginForm)
    
    if (response.success) {
      // 保存登录信息
      saveAdminInfo(response.data)

      ElMessage.success(`登录成功，欢迎 ${response.data.roleName}`)

      // 跳转到管理员首页
      router.push('/admin/dashboard')
    } else {
      ElMessage.error(response.message || '登录失败')
    }
    
  } catch (error: any) {
    console.error('登录失败:', error)
    ElMessage.error(error.response?.data?.message || '登录失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.admin-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%);
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;

  /* 添加科技感背景效果 */
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
      radial-gradient(circle at 40% 40%, rgba(0, 191, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 60% 60%, rgba(0, 102, 255, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
}

.login-container {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 0; /* 移除圆角 */
  border: 1px solid rgba(30, 144, 255, 0.4); /* 统一边框颜色 */
  padding: 3rem;
  width: 100%;
  max-width: 25rem;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.6),
    0 0 20px rgba(30, 144, 255, 0.3);
  position: relative;
  overflow: hidden;

  /* 添加内部光效 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(30, 144, 255, 0.15), transparent);
    transition: left 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  h2 {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-shadow: 0 0 10px rgba(30, 144, 255, 0.5);
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    margin: 0;
  }
}

.login-form {
  position: relative;
  z-index: 1;

  .el-form-item {
    margin-bottom: 1.5rem;
  }

  .login-btn {
    width: 100%;
    height: 3rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0 !important; /* 移除按钮圆角 */
    background: linear-gradient(135deg, #1E90FF 0%, #0066FF 100%) !important;
    border: 1px solid rgba(30, 144, 255, 0.4) !important;
    color: #ffffff !important;
    box-shadow: 0 4px 15px rgba(30, 144, 255, 0.5);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(135deg, #00BFFF 0%, #1E90FF 100%) !important;
      box-shadow: 0 6px 20px rgba(30, 144, 255, 0.6);
      transform: translateY(-1px);
      border-color: rgba(0, 191, 255, 0.6) !important;
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(30, 144, 255, 0.4);
    }
  }
}

/* 表单控件样式统一 */
:deep(.el-input__wrapper) {
  background: #160906 !important; /* 统一深棕黑色背景 */
  border: 1px solid rgba(30, 144, 255, 0.4) !important; /* 统一边框颜色 */
  border-radius: 0 !important; /* 移除圆角 */
  backdrop-filter: blur(10px);
  box-shadow: none !important;

  &:hover {
    border-color: rgba(0, 191, 255, 0.6) !important;
  }

  &.is-focus {
    border-color: rgba(30, 144, 255, 0.8) !important;
    box-shadow: 0 0 15px rgba(30, 144, 255, 0.4) !important;
  }

  .el-input__inner {
    color: rgba(255, 255, 255, 0.9) !important;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5) !important;
    }
  }

  .el-input__prefix,
  .el-input__suffix {
    color: rgba(255, 255, 255, 0.7) !important;
  }
}

/* 表单项样式 */
:deep(.el-form-item) {
  .el-form-item__error {
    color: #ff6b6b;
    font-size: 12px;
    margin-top: 5px;
  }
}

/* 响应式设计 - 1920×1080 屏幕优化 */
@media screen and (min-width: 1900px) and (min-height: 900px) {
  .login-container {
    max-width: 28rem;
    padding: 3.5rem;
  }

  .login-header h2 {
    font-size: 2rem;
  }

  .login-header p {
    font-size: 1rem;
  }

  .login-form .login-btn {
    height: 3.5rem;
    font-size: 1.125rem;
  }

  :deep(.el-input__wrapper) {
    min-height: 2.75rem;
  }
}

/* 响应式设计 - 1366×768 屏幕优化 */
@media screen and (min-width: 1366px) and (max-width: 1919px) and (min-height: 768px) {
  .login-container {
    max-width: 26rem;
    padding: 3.25rem;
  }

  .login-header h2 {
    font-size: 1.875rem;
  }

  .login-form .login-btn {
    height: 3.25rem;
    font-size: 1.0625rem;
  }

  :deep(.el-input__wrapper) {
    min-height: 2.625rem;
  }
}

/* 移动端响应式设计 */
@media (max-width: 480px) {
  .admin-login {
    padding: 1rem;
  }

  .login-container {
    padding: 2rem 1.5rem;
    margin: 0 0.5rem;
    border: 1px solid rgba(30, 144, 255, 0.3);
    max-width: none;
  }

  .login-header h2 {
    font-size: 1.5rem;
  }

  .login-header p {
    font-size: 0.8125rem;
  }

  .login-form .login-btn {
    height: 2.75rem;
    font-size: 0.9375rem;
  }

  :deep(.el-input__wrapper) {
    min-height: 2.5rem;
  }
}

/* 自定义滚动条样式 */
.admin-login::-webkit-scrollbar {
  width: 8px;
}

.admin-login::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0;
}

.admin-login::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.6) 0%, rgba(0, 100, 255, 0.8) 100%);
  border-radius: 0;
  border: 1px solid rgba(30, 144, 255, 0.3);
}

.admin-login::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.8) 0%, rgba(0, 191, 255, 1) 100%);
}
</style>
