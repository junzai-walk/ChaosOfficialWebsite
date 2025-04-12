<template>
  <div class="contact" @wheel.stop="handleScroll" @touchmove.stop="handleScroll">
    <div class="main-title">联系我们</div>
    <div class="contact-content" >
      <div class="contact-info">
        <div class="contact-info-list">
          <div class="contact-info-item">
            <div class="contact-label">
              <el-icon :style="iconStyle">
                <img :src="locationIcon" alt="" class="icon-img-info">
              </el-icon>
              <span>公司地址:</span>
            </div>
            <div class="contact-value">南京市雨花台区宁双路19号云密城L栋9层</div>
          </div>
          <div class="contact-info-item">
            <div class="contact-label">
              <el-icon :style="iconStyle">
                <img :src="phoneIcon" alt="" class="icon-img-info">
              </el-icon>
              <span>客服专线:</span>
            </div>
            <div class="contact-value">025-83132381</div>
          </div>
          <div class="contact-info-item">
            <div class="contact-label">
              <el-icon :style="iconStyle">
                <img :src="cooperationIcon" alt="" class="icon-img-info">
              </el-icon>
              <span>商务合作:</span>
            </div>
            <div class="contact-value">contact@njchaos.com</div>
          </div>
          <div class="contact-info-item">
            <div class="contact-label">
              <el-icon :style="iconStyle">
                <img :src="degreeIcon" alt="" class="icon-img-info">
              </el-icon>
              <span>招贤纳士:</span>
            </div>
            <div class="contact-value">yao.wei@njchaos.com</div>
          </div>
        </div>
      </div>
      <div class="contact-map">
        <div ref="mapContainer" id="baidu-map" class="map-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Iphone,
  Location,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'
import locationIcon from '@/assets/about/map-localtion.png'
import cooperationIcon from '@/assets/about/map-cooperation.png'
import phoneIcon from '@/assets/about/map-phone.png'
import degreeIcon from '@/assets/about/map-degree.png'


import { ref, onMounted, computed, nextTick, onBeforeUnmount } from 'vue'
import { useSectionStore } from '@/stores/sectionStore'

const sectionStore = useSectionStore()
const mapContainer = ref<HTMLElement | null>(null)

// 处理滚动事件，阻止触发页面切换
const handleScroll = (event: Event) => {
  // 阻止事件冒泡，避免触发页面切换逻辑
  event.stopPropagation()
}

// 百度地图实现
onMounted(() => {
  // 给页面添加特殊标记，表示不应触发页面切换
  document.body.classList.add('no-section-scroll')
  
  // 确保页面固定在当前区域
  nextTick(() => {
    sectionStore.lockSection(true) // 锁定当前部分，防止滚动切换
  })

  // 动态加载百度地图API
  const script = document.createElement('script')
  script.src = `https://api.map.baidu.com/api?v=3.0&ak=zuocDmYKz4t8GElbKotYajl06BVZTlWM&callback=initMap`
  document.body.appendChild(script)

  // 定义全局回调函数
  window.initMap = () => {
    if (mapContainer.value) {
      // 创建地图实例
      const map = new window.BMap.Map(mapContainer.value)
      
      // 创建地址解析器实例
      const myGeo = new window.BMap.Geocoder();
      // 公司名称和地址
      const companyName = "凯奥思数据技术有限公司";
      const address = "南京市雨花台区宁双路19号云密城L栋";
      
      // 将地址解析结果显示在地图上，并调整地图视野
      myGeo.getPoint(address, function(point: any) {
        if (point) {
          map.centerAndZoom(point, 18);
          // 开启鼠标滚轮缩放
          map.enableScrollWheelZoom(true);
          
          // 添加标记点
          const marker = new window.BMap.Marker(point);
          map.addOverlay(marker);
          
          // 自定义信息窗口内容
          const infoContent = `
            <div style="padding: 10px 0; text-align: center;border-radius: 30px;background-color: #fff;">
              <div style="font-size: 16px; font-weight: bold; color: #2961FA; margin-bottom: 8px;">${companyName}</div>
              <div style="font-size: 12px; color: #666; line-height: 1.5;">${address}</div>
            </div>
          `;
          
          // 添加信息窗口
          const infoOpts = {
            width: 280,
            height: 100,
            title: '<div style="font-weight: bold; color: #2961FA; padding: 5px 0; border-bottom: 1px solid #eee;">公司位置</div>',
            enableMessage: false,
            enableCloseOnClick: false
          };
          
          const infoWindow = new window.BMap.InfoWindow(infoContent, infoOpts);
          
          marker.addEventListener("click", function() {
            map.openInfoWindow(infoWindow, point);
          });
          
          // 默认打开信息窗口
          map.openInfoWindow(infoWindow, point);
          
          // 添加控件
          map.addControl(new window.BMap.ScaleControl());
          map.addControl(new window.BMap.NavigationControl());
        } else {
          alert("未找到该地址，使用默认坐标");
          // 使用默认坐标作为备选
          const defaultPoint = new window.BMap.Point(118.758423, 31.975642);
          map.centerAndZoom(defaultPoint, 18);
          // ... 其余代码相同
        }
      }, "南京市");
    }
  }
})

// 组件卸载时移除标记和锁定
onBeforeUnmount(() => {
  document.body.classList.remove('no-section-scroll')
  sectionStore.lockSection(false) // 解除锁定
})

// 为TypeScript声明全局变量
declare global {
  interface Window {
    BMap: any
    BMapGL: any
    initMap: () => void
  }
}

const iconStyle = computed(() => {
  const marginMap:any = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap['default'] || marginMap.default,
    color:'#2961FA',
  }
})
</script>

<style scoped lang="less">
.contact {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 3rem 18rem 0 18rem;
  background-color: #F9F9F9;
  .main-title {
    font-weight: 700;
    font-size: 1.5rem;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }
  .contact-content{
    display: flex;
    margin-top: 2.5rem;
    width: 100%;
    height: 25rem;
    border-radius: 25px;
    overflow: hidden;
    .contact-info{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      width: 52%;
      position: relative;
      
      .contact-info-list {
        width: 100%;
        padding: 1.5rem 0rem 1.5rem 2.5rem;
        box-sizing: border-box;
      }
      .contact-info-item {
        display: flex;
        flex-direction: row;
        margin-bottom: 1.5rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .contact-label {
        display: flex;
        align-items: center;
        font-weight: 700;
        margin-bottom: 0.5rem;
        
        .icon-img-info {
          width: 1rem;
          height: 1rem;
          object-fit: contain;
          margin-right: 0.5rem;
        }
      }
      .contact-value {
        padding-left: 1rem;
        color: #333;
      }
      :deep(.my-label) {
        font-weight: 700 !important;
      }
      .cell-item {
        display: flex;
        align-items: center;
        // font-weight: 500;
        // font-size: 22px;
        // line-height: 44px;
        // letter-spacing: 0px;

        .icon-img-info {
          width: 1rem;
          height: 1rem;
          object-fit: contain;
          margin-right: 0.5rem;
        }
      }
    }
    .contact-map {
      width: 50%;
      height: 100%;
      .map-container {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }

  .subtitle {
    font-size: 18px;
  }
}
</style>