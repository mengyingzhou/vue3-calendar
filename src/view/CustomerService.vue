<template>
  <div class="customer-service">
    <van-nav-bar
      title="联系客服"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="content">
      <!-- 二维码图片 -->
      <div class="qr-code-section">
        <img src="@/assets/images/service_qr.png" alt="客服二维码" class="qr-code-image" />
      </div>
      
      <!-- 扫码说明 -->
      <div class="scan-text">
        扫码添加客服微信
      </div>
      
      <!-- 微信号信息 -->
      <div class="wechat-info">
        <div class="wechat-header">
          <div class="wechat-content">
            <van-icon name="wechat" color="#07c160" size="24" />
            <div class="wechat-text" @click="copyWechatId">
              <div class="label">微信号</div>
              <div class="wechat-id">xiaoman7788669</div>
            </div>
          </div>
        </div>
        
        <!-- 操作步骤 -->
        <div class="info-section">
          <div class="section-title">添加步骤</div>
          <div class="section-content">
            <div>1. 复制微信号</div>
            <div>2. 微信里面点击添加好友</div>
            <div>3. 粘贴微信号添加客服微信</div>
          </div>
        </div>
        
        <!-- 工作时间 -->
        <div class="info-section">
          <div class="section-title">工作时间</div>
          <div class="section-content">
            <div>周一至周五：9:00-18:00</div>
            <div>周六至周日：10:00-17:00</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 用于复制的隐藏输入框 -->
    <textarea
      ref="copyInput"
      :value="wechatId"
      class="hidden-input"
      readonly
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Dialog, Toast } from 'vant';
import { ref } from 'vue';

const router = useRouter();
const copyInput = ref<HTMLTextAreaElement | null>(null);
const wechatId = 'xiaoman7788669';

const onClickLeft = () => {
  router.back();
};

const copyWechatId = () => {
  if (!copyInput.value) return;
  
  copyInput.value.style.display = 'block';
  copyInput.value.select();
  
  try {
    document.execCommand('copy');
    Toast({
      message: '微信号已成功',
      position: 'middle',
    });
  } catch (err) {
    Toast({
      message: '复制失败，请手动复制',
      position: 'middle',
    });
  } finally {
    copyInput.value.style.display = 'none';
    window.getSelection()?.removeAllRanges();
  }
};
</script>

<style lang="less" scoped>
.customer-service {
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px; // 为底部导航栏预留空间
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code-section {
  width: 60%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  
  .qr-code-image {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  }
}

.scan-text {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.wechat-info {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  width: calc(100% - 64px);
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  
  .wechat-header {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    
    .wechat-content {
      display: flex;
      align-items: center;
      
      .wechat-text {
        margin-left: 12px;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: background-color 0.3s;
        
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        &:active {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .label {
          font-size: 14px;
          color: #666;
          margin-bottom: 4px;
        }
        
        .wechat-id {
          font-size: 16px;
          color: #333;
          text-align: center;
        }
      }
    }
  }
}

.info-section {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #f5f5f5;
  
  &:first-of-type {
    padding-top: 0;
    border-top: none;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 12px;
  }
  
  .section-content {
    font-size: 14px;
    color: #666;
    
    div {
      line-height: 1.8;
      margin-bottom: 4px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.hidden-input {
  position: fixed;
  top: -9999px;
  left: -9999px;
  opacity: 0;
  display: none;
}

:deep(.van-nav-bar) {
  background-color: #fff;
  
  .van-nav-bar__title {
    color: #333;
    font-weight: bold;
  }
  
  .van-nav-bar__text {
    color: #666;
  }
  
  .van-icon {
    color: #666;
  }
}
</style>