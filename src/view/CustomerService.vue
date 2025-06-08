<template>
  <div class="customer-service">
    <van-nav-bar
      title="客服中心"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="content">
      <div class="service-header">
        <van-image
          round
          width="4rem"
          height="4rem"
          src="@/assets/images/avatar.svg"
          class="service-avatar"
        />
        <div class="service-info">
          <h3>玄叨叨客服</h3>
          <p>工作时间：9:00-18:00（周一至周五）</p>
        </div>
      </div>
      
      <van-cell-group inset class="contact-group">
        <van-cell title="在线客服" icon="service-o" is-link />
        <van-cell title="常见问题" icon="question-o" is-link />
        <van-cell title="意见反馈" icon="comment-o" is-link />
      </van-cell-group>
      
      <div class="contact-info">
        <h4>联系方式</h4>
        <p>客服邮箱：support@xuandaodao.com</p>
        <p>客服电话：400-123-4567</p>
      </div>
      
      <div class="faq-section">
        <h4>常见问题</h4>
        
        <div class="faq-item">
          <h5>1. 如何修改个人信息？</h5>
          <p>您可以在"我的"-"设置"-"账号与安全"中修改您的个人信息。</p>
        </div>
        
        <div class="faq-item">
          <h5>2. 如何查看历史记录？</h5>
          <p>您可以在"我的"-"快捷功能"-"浏览历史"中查看您的历史记录。</p>
        </div>
        
        <div class="faq-item">
          <h5>3. 如何收藏内容？</h5>
          <p>在您浏览的内容页面中，点击右上角的"收藏"按钮即可将内容添加到收藏夹。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const onClickLeft = () => {
  router.back();
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
  padding: 16px;
}

.service-header {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.service-avatar {
  margin-right: 16px;
}

.service-info {
  h3 {
    margin: 0 0 8px;
    font-size: 18px;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
}

.contact-group {
  margin-bottom: 16px;
}

.contact-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  margin-bottom: 16px;
  
  h4 {
    margin: 0 0 12px;
    font-size: 16px;
    color: #333;
  }
  
  p {
    margin: 8px 0;
    font-size: 14px;
    color: #666;
  }
}

.faq-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  margin-bottom: 32px; // 增加底部间距，确保内容不被 tabbar 遮挡
  
  h4 {
    margin: 0 0 16px;
    font-size: 16px;
    color: #333;
  }
}

.faq-item {
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h5 {
    margin: 0 0 8px;
    font-size: 15px;
    color: #333;
  }
  
  p {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
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