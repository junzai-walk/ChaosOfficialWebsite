import { defineStore } from 'pinia'

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    // 默认开启动画
    animationsEnabled: false
  }),
  actions: {
    // 切换动画状态
    toggleAnimations() {
      this.animationsEnabled = !this.animationsEnabled
    },
    // 设置动画状态
    setAnimationsEnabled(enabled: boolean) {
      this.animationsEnabled = enabled
    }
  }
})
