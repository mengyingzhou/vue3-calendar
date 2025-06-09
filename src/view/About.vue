<template>
  <div class="about">
    <van-nav-bar
      title="关于我们"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="content">
      <div class="logo-section">
        <van-image
          width="80"
          height="80"
          src="src/assets/images/avatar.svg"
          class="app-logo"
        />
        <h2>玄叨叨</h2>
        <p class="version">Version 1.0.0</p>
      </div>
      
      <van-cell-group inset class="info-group">
        <div class="intro-text">
          <h3>关于玄叨叨</h3>
          <p>玄叨叨是一款专注于传统文化与现代生活融合的日历应用。我们致力于将中国传统文化中的智慧与当代生活方式相结合，为用户提供独特的时间管理和生活指导体验。</p>
          
          <h3>我们的理念</h3>
          <p>传承与创新：将传统文化的精髓以现代化的方式呈现，让古老的智慧在现代生活中焕发新的生机。</p>
          <p>实用与美学：将实用的日历功能与优雅的设计相结合，打造既实用又赏心悦目的应用体验。</p>
          <p>科技与人文：运用现代科技，传递人文关怀，让传统文化在数字时代得以延续和发展。</p>
          
          <h3>核心功能</h3>
          <p>• 传统节气与现代日历的完美结合</p>
          <p>• 每日运势和吉凶宜忌指导</p>
          <p>• 传统节日文化解读与活动推荐</p>
          <p>• 个性化的生活建议与规划工具</p>
          
          <h3>联系我们</h3>
          <p>官方网站：www.xuandaodao.com</p>
          <p>商务合作：business@xuandaodao.com</p>
          <p>用户反馈：feedback@xuandaodao.com</p>
        </div>
      </van-cell-group>
      
      <div class="social-links">
        <van-cell-group inset>
          <van-cell title="官方微博" is-link />
          <van-cell title="微信公众号" is-link />
          <van-cell title="加入我们" is-link />
        </van-cell-group>
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
.about {
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px; // 为底部导航栏预留空间
}

.content {
  padding: 16px;
}

.logo-section {
  text-align: center;
  padding: 32px 0;
  
  h2 {
    margin: 16px 0 8px;
    font-size: 24px;
    color: #333;
  }
  
  .version {
    margin: 0;
    font-size: 14px;
    color: #999;
  }
  
  .app-logo {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.info-group {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.intro-text {
  padding: 20px;
  
  h3 {
    margin: 0 0 12px;
    font-size: 18px;
    color: #333;
    font-weight: bold;
    
    &:not(:first-child) {
      margin-top: 24px;
    }
  }
  
  p {
    margin: 8px 0;
    font-size: 14px;
    color: #666;
    line-height: 1.6;
  }
}

.social-links {
  margin-top: 16px;
  margin-bottom: 32px; // 增加底部间距，确保内容不被 tabbar 遮挡
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

:deep(.van-cell) {
  align-items: center;
  padding: 14px 16px;
}
</style>