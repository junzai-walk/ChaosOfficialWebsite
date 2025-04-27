<template>
  <div class="product-system">
    <h2 class="title">产品体系</h2>
    <p class="subtitle">以人工智能算法技术为核心驱动，推动数智化升级</p>
    <div class="system-content"></div>
  </div>
</template>

<script setup lang="ts">
// 无需特殊逻辑
</script>

<style scoped lang="less">
.product-system {
  width: 100%;
  height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('@/assets/home/grid.png');
  background-size: cover;
  background-position: center;
  
  .title {
    font-size: 2.25rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
  }
  
  .system-content {
    width: 89.0625rem;
    height: 41.5625rem;
    text-align: center;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url('@/assets/home/Group_416.png') no-repeat center center;
      background-size: contain;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
    }
  }
}

.product-diagram {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-icons {
  width: 100%;
  margin-bottom: 2.5rem;
  
  .icon-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 1.25rem;
  }
  
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
  }
  
  .icon-circle {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #1890ff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    box-shadow: 0 0.25rem 0.75rem rgba(24, 144, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-0.3125rem);
      box-shadow: 0 0.5rem 1.25rem rgba(24, 144, 255, 0.3);
    }
  }
  
  .icon-text {
    font-size: 0.875rem;
    color: #333;
  }
}

.platform-diagram {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .platform-text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1890ff;
    margin-bottom: 1.25rem;
  }
  
  .platform-circle {
    width: 18.75rem;
    height: 18.75rem;
    border-radius: 50%;
    background: radial-gradient(circle at center, #1890ff 0%, #40a9ff 100%);
    position: relative;
    margin-bottom: 2.5rem;
    box-shadow: 0 0.5rem 1.5rem rgba(24, 144, 255, 0.3);
    animation: pulse 2s infinite;
  }
}

.hardware-icons {
  display: flex;
  justify-content: center;
  gap: 3.75rem;
  margin-top: 2.5rem;
  
  .hardware-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.625rem;
    
    img {
      width: 3.75rem;
      height: 3.75rem;
      object-fit: contain;
    }
    
    span {
      font-size: 0.875rem;
      color: #666;
    }
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 1.25rem rgba(24, 144, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(24, 144, 255, 0);
  }
}

@media (max-width: 1920px) {
  .product-system {
    .system-content {
      width: 80rem;
      height: 37.5rem;
    }
  }
}

@media (max-width: 1232px) {
  .product-system {
    height: auto;
    min-height: 100vh;
    padding: 2rem 0;

    .title {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }

    .system-content {
      width: 100%;
      height: 25rem;
      padding: 0 1rem;
    }
  }

  .product-diagram {
    .product-icons {
      .icon-group {
        gap: 0.75rem;
      }

      .icon-circle {
        width: 4rem;
        height: 4rem;
        font-size: 1rem;
      }

      .icon-text {
        font-size: 0.75rem;
      }
    }
  }

  .platform-diagram {
    .platform-circle {
      width: 15rem;
      height: 15rem;
    }
  }

  .hardware-icons {
    gap: 2rem;

    .hardware-item {
      img {
        width: 3rem;
        height: 3rem;
      }

      span {
        font-size: 0.75rem;
      }
    }
  }
}

@media (max-width: 1000px) {
  .product-system {
    .system-content {
      height: 20rem;
    }
  }

  .product-diagram {
    .product-icons {
      .icon-group {
        flex-direction: column;
      }
    }
  }

  .platform-diagram {
    .platform-circle {
      width: 12rem;
      height: 12rem;
    }
  }

  .hardware-icons {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style> 