<template>
  <div class="contact">
    <div class="main-title">联系我们</div>
    <div class="contact-content" >
      <div class="contact-info">
        <el-descriptions  :column="1" label-width="90"> 
          <el-descriptions-item label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                公司地址:
              </div>
            </template>
            南京市雨花台区宁双路19号云密城L栋9层
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle"  >
                  <location />
                </el-icon>
                客服专线:
              </div>
            </template>
            025-83132381
          </el-descriptions-item>
          <el-descriptions-item label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                商务合作:
              </div>
            </template>
            contact@njchaos.com
          </el-descriptions-item>
          <el-descriptions-item label="招贤纳士:" label-class-name="my-label">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                商务合作:
              </div>
            </template>
            yao.wei@njchaos.com
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <img :src="Img1" alt="" class="contact-image">
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
import { ref, onMounted ,computed} from 'vue'
import Img1 from '@/assets/about/Block-location.png'

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
      :deep(.my-label) {
        font-weight: 700 !important;
      }
      .cell-item {
        display: flex;
        align-items: center;
      }
    }
    .contact-image{
      width: 50%;
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