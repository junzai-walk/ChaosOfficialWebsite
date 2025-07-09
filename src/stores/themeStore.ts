import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // 默认为夜间模式（符合用户偏好的科技风格）
    currentTheme: 'dark' as ThemeMode,
    // 主题是否已初始化
    isInitialized: false
  }),
  
  getters: {
    isDarkMode: (state) => state.currentTheme === 'dark',
    isLightMode: (state) => state.currentTheme === 'light',
    
    // 获取当前主题的CSS类名
    themeClass: (state) => `theme-${state.currentTheme}`,
    
    // 获取主题切换按钮的图标
    themeIcon: (state) => state.currentTheme === 'dark' ? 'Sunny' : 'Moon',
    
    // 获取主题切换按钮的文本
    themeText: (state) => state.currentTheme === 'dark' ? '白天模式' : '夜间模式'
  },
  
  actions: {
    // 切换主题
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark'
      this.saveThemeToStorage()
      this.applyTheme()
    },
    
    // 设置特定主题
    setTheme(theme: ThemeMode) {
      if (this.currentTheme !== theme) {
        this.currentTheme = theme
        this.saveThemeToStorage()
        this.applyTheme()
      }
    },
    
    // 从localStorage加载主题设置
    loadThemeFromStorage() {
      try {
        const savedTheme = localStorage.getItem('chaos-admin-theme')
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          this.currentTheme = savedTheme as ThemeMode
        }
      } catch (error) {
        console.warn('Failed to load theme from localStorage:', error)
      }
      this.isInitialized = true
      this.applyTheme()
    },
    
    // 保存主题设置到localStorage
    saveThemeToStorage() {
      try {
        localStorage.setItem('chaos-admin-theme', this.currentTheme)
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error)
      }
    },
    
    // 应用主题到DOM
    applyTheme() {
      const root = document.documentElement
      
      // 移除之前的主题类
      root.classList.remove('theme-light', 'theme-dark')
      
      // 添加当前主题类
      root.classList.add(this.themeClass)
      
      // 设置CSS变量
      if (this.currentTheme === 'light') {
        this.applyLightTheme(root)
      } else {
        this.applyDarkTheme(root)
      }
    },
    
    // 应用白天模式样式
    applyLightTheme(root: HTMLElement) {
      // 背景色
      root.style.setProperty('--theme-bg-primary', '#ffffff')
      root.style.setProperty('--theme-bg-secondary', '#ffffff')
      root.style.setProperty('--theme-bg-tertiary', '#f8f9fa')
      root.style.setProperty('--theme-bg-card', '#ffffff')
      root.style.setProperty('--theme-bg-table', '#ffffff')
      root.style.setProperty('--theme-bg-modal', '#ffffff')
      root.style.setProperty('--theme-bg-header', 'rgba(255, 255, 255, 0.95)')

      // 文字颜色
      root.style.setProperty('--theme-text-primary', '#000000')
      root.style.setProperty('--theme-text-secondary', '#333333')
      root.style.setProperty('--theme-text-tertiary', '#666666')
      root.style.setProperty('--theme-text-muted', '#999999')
      root.style.setProperty('--theme-text-title', '#000000')

      // 边框和分割线
      root.style.setProperty('--theme-border-primary', '#e0e0e0')
      root.style.setProperty('--theme-border-secondary', '#f0f0f0')
      root.style.setProperty('--theme-divider', '#e0e0e0')

      // 阴影
      root.style.setProperty('--theme-shadow', 'rgba(0, 0, 0, 0.1)')
      root.style.setProperty('--theme-shadow-card', '0 2px 8px rgba(0, 0, 0, 0.1)')

      // 强调色
      root.style.setProperty('--theme-accent', '#007bff')
      root.style.setProperty('--theme-accent-hover', '#0056b3')
      root.style.setProperty('--theme-success', '#28a745')
      root.style.setProperty('--theme-warning', '#ffc107')
      root.style.setProperty('--theme-danger', '#dc3545')

      // 白天模式特定样式变量
      // 移除welcome-text阴影
      root.style.setProperty('--theme-welcome-text-shadow', 'none')
      // 移除卡片数字阴影
      root.style.setProperty('--theme-stats-text-shadow', 'none')
      // 退出登录按钮红色样式
      root.style.setProperty('--theme-logout-btn-bg', '#dc3545')
      root.style.setProperty('--theme-logout-btn-border', '#dc3545')
      root.style.setProperty('--theme-logout-btn-color', '#ffffff')
      root.style.setProperty('--theme-logout-btn-hover-bg', '#c82333')
      root.style.setProperty('--theme-logout-btn-hover-border', '#bd2130')
      root.style.setProperty('--theme-logout-btn-hover-shadow', '0 0 10px rgba(220, 53, 69, 0.3)')
    },
    
    // 应用夜间模式样式（科技风格）
    applyDarkTheme(root: HTMLElement) {
      // 背景色
      root.style.setProperty('--theme-bg-primary', 'linear-gradient(135deg, #000000 0%, #0a0a0a 25%, #1a1a1a 50%, #0a0a0a 75%, #000000 100%)')
      root.style.setProperty('--theme-bg-secondary', 'rgba(0, 0, 0, 0.7)')
      root.style.setProperty('--theme-bg-tertiary', 'rgba(0, 0, 0, 0.6)')
      root.style.setProperty('--theme-bg-card', 'rgba(0, 0, 0, 0.7)')
      root.style.setProperty('--theme-bg-table', 'rgba(0, 0, 0, 0.6)')
      root.style.setProperty('--theme-bg-modal', 'rgba(0, 0, 0, 0.8)')
      root.style.setProperty('--theme-bg-header', 'rgba(0, 0, 0, 0.8)')

      // 文字颜色
      root.style.setProperty('--theme-text-primary', 'rgba(255, 255, 255, 0.9)')
      root.style.setProperty('--theme-text-secondary', 'rgba(255, 255, 255, 0.8)')
      root.style.setProperty('--theme-text-tertiary', 'rgba(255, 255, 255, 0.6)')
      root.style.setProperty('--theme-text-muted', 'rgba(255, 255, 255, 0.4)')
      root.style.setProperty('--theme-text-title', 'rgba(255, 255, 255, 0.9)')

      // 边框和分割线
      root.style.setProperty('--theme-border-primary', 'rgba(30, 144, 255, 0.4)')
      root.style.setProperty('--theme-border-secondary', 'rgba(30, 144, 255, 0.2)')
      root.style.setProperty('--theme-divider', 'rgba(30, 144, 255, 0.3)')

      // 阴影
      root.style.setProperty('--theme-shadow', 'rgba(0, 0, 0, 0.4)')
      root.style.setProperty('--theme-shadow-card', '0 0 20px rgba(30, 144, 255, 0.3)')

      // 强调色
      root.style.setProperty('--theme-accent', '#1E90FF')
      root.style.setProperty('--theme-accent-hover', '#00BFFF')
      root.style.setProperty('--theme-success', '#28a745')
      root.style.setProperty('--theme-warning', '#ffc107')
      root.style.setProperty('--theme-danger', '#dc3545')

      // 夜间模式特定样式变量（保持原有效果）
      // 保持welcome-text阴影
      root.style.setProperty('--theme-welcome-text-shadow', '0 0 10px var(--theme-text-secondary)')
      // 保持卡片数字阴影
      root.style.setProperty('--theme-stats-text-shadow', '0 0 20px var(--theme-accent)')
      // 退出登录按钮科技风格
      root.style.setProperty('--theme-logout-btn-bg', 'rgba(220, 53, 69, 0.15)')
      root.style.setProperty('--theme-logout-btn-border', 'rgba(220, 53, 69, 0.3)')
      root.style.setProperty('--theme-logout-btn-color', '#ffffff')
      root.style.setProperty('--theme-logout-btn-hover-bg', 'rgba(220, 53, 69, 0.25)')
      root.style.setProperty('--theme-logout-btn-hover-border', 'rgba(220, 53, 69, 0.6)')
      root.style.setProperty('--theme-logout-btn-hover-shadow', '0 0 20px rgba(220, 53, 69, 0.4)')
    },
    
    // 初始化主题
    initTheme() {
      if (!this.isInitialized) {
        this.loadThemeFromStorage()
      }
    }
  }
})
