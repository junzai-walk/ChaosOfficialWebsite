<template>
  <div
    class="screen-adapter"
    ref="screenAdapterRef"
    :style="style"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 1920
  },
  height: {
    type: Number,
    default: 1080
  }
})

const screenAdapterRef = ref<HTMLElement | null>(null)

const style = reactive({
  width: props.width + 'px',
  height: props.height + 'px',
  transform: 'scale(1)',
  transformOrigin: 'left top',
  position: 'absolute' as const,
  left: '0px',
  top: '0px',
  transition: 'transform 0.3s ease-out, left 0.3s ease-out, top 0.3s ease-out',
  overflow: 'hidden'
})

const setScale = () => {
  const designWidth = props.width
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const scale = windowWidth / designWidth
  
  style.transform = `scale(${scale})`
  style.width = `${designWidth}px`
  // 使用 Math.ceil 向上取整，确保动态高度能完全覆盖视口，消除亚像素级别的留白
  style.height = `${Math.ceil(windowHeight / scale)}px`
  
  style.left = '0px'
  style.top = '0px'
}

// 防抖处理 resize
let timer: number | null = null
const handleResize = () => {
  if (timer) clearTimeout(timer)
  timer = window.setTimeout(() => {
    setScale()
  }, 100)
}

onMounted(() => {
  setScale()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.screen-adapter {
  transition: transform 0.3s ease-out, left 0.3s ease-out, top 0.3s ease-out;
  /* 优化缩放后的文字清晰度 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
</style>
