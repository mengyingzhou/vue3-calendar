<template>
  <div class="settings">
    <van-nav-bar
      title="系统设置"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    
    <div class="content">
      <!-- 账号设置 -->
      <van-cell-group inset class="setting-group">
        <van-cell title="账号设置" is-link />
      </van-cell-group>
      
      <!-- 关于和协议 -->
      <van-cell-group inset class="setting-group">
        <van-cell title="关于我们" is-link @click="goToAbout" />
        <van-cell title="用户协议" is-link @click="goToUserAgreement" />
        <van-cell title="隐私权益" is-link @click="goToPrivacy" />
      </van-cell-group>
      
      <!-- 退出登录 -->
      <van-cell-group inset class="setting-group" v-if="isLoggedIn">
        <van-cell 
          title="退出登录" 
          class="logout-cell"
          @click="showLogoutConfirm"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, Toast } from 'vant';

const router = useRouter();
const isLoggedIn = ref(true);

const onClickLeft = () => {
  router.back();
};

const goToAbout = () => {
  router.push('/about');
};

const goToUserAgreement = () => {
  router.push('/user-agreement');
};

const goToPrivacy = () => {
  router.push('/privacy');
};

const showLogoutConfirm = () => {
  Dialog.confirm({
    title: '退出登录',
    message: '确定要退出登录吗？',
    showCancelButton: true,
  }).then(() => {
    logout();
  }).catch(() => {
    // 取消操作
  });
};

const logout = () => {
  // 实际退出登录的逻辑
  isLoggedIn.value = false;
  Toast('已退出登录');
  router.push('/home');
};
</script>

<style lang="less" scoped>
.settings {
  background-color: #f5f5f5;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px; // 为底部导航栏预留空间
}

.setting-group {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
  
  .logout-cell {
    color: #ee0a24;
    text-align: center;
    
    :deep(.van-cell__title) {
      text-align: center;
    }
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

:deep(.van-cell) {
  align-items: center;
  padding: 14px 16px;
}

:deep(.van-cell-group--inset) {
  // margin:0;
  margin-top: 10px;
}

</style>