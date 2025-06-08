<template>
  <div class="profile-wrapper">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="我的" />

    <!-- 用户信息区块 -->
    <div class="user-info-wrapper">
      <van-cell center :border="false" class="user-info">
        <template #icon>
          <van-image
            round
            width="4rem"
            height="4rem"
            src="@/assets/images/avatar.svg"
            class="avatar"
          />
        </template>
        <template #title>
          <div class="user-name">未登录</div>
          <div v-if="isLoggedIn" class="user-id">ID: {{ userId }}</div>
        </template>
        <template #right-icon>
          <div class="action-icons">
            <van-icon name="service-o" size="24" class="action-icon" @click="goToCustomerService" />
            <van-icon name="setting-o" size="24" class="action-icon" @click="goToSettings" />
          </div>
        </template>
      </van-cell>
    </div>

    <!-- 统计网格 -->
    <van-cell-group inset class="stats-grid">
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <template #icon>
            <van-icon name="star" color="#ff9900" size="28" />
          </template>
          <template #text>
            <span>已收藏日</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <van-icon name="bookmark" color="#3f45ff" size="28" />
          </template>
          <template #text>
            <span>独家课程</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <van-icon name="gift" color="#ff4444" size="28" />
          </template>
          <template #text>
            <span>好运物品</span>
          </template>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <!-- 第一个图片列表区块 -->
    <van-cell-group inset title="精选推荐" class="content-group">
      <van-cell v-for="i in 3" :key="i" is-link>
        <template #icon>
          <van-image
            width="3rem"
            height="3rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="cell-image"
          />
        </template>
        <template #title>
          <span class="cell-title">精选内容 {{ i }}</span>
        </template>
        <template #label>
          <span class="cell-desc">精选内容描述 {{ i }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 图标列表区块 -->
    <van-cell-group inset title="快捷功能" class="content-group">
      <van-cell v-for="(item, index) in icons" :key="index" :icon="item.icon" :title="item.title" is-link />
    </van-cell-group>

    <!-- 第二个图片列表区块 -->
    <van-cell-group inset title="热门推荐" class="content-group">
      <van-cell v-for="i in 3" :key="i" is-link>
        <template #icon>
          <van-image
            width="3rem"
            height="3rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="cell-image"
          />
        </template>
        <template #title>
          <span class="cell-title">热门内容 {{ i }}</span>
        </template>
        <template #label>
          <span class="cell-desc">热门内容描述 {{ i }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 备案信息 -->
    <footer class="footer">
      <a 
        href="https://beian.miit.gov.cn/" 
        target="_blank"
        class="beian-link"
      >
        黔ICP备2025044569号-2
      </a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(true); // 默认为已登录状态，实际应用中应从状态管理或本地存储获取
const userId = ref("123456"); // 模拟用户ID，实际应用中应从API获取

const icons = reactive([
  { icon: 'star-o', title: '我的收藏' },
  { icon: 'friends-o', title: '我的关注' },
  { icon: 'clock-o', title: '浏览历史' }
]);

// 导航函数
const goToCustomerService = () => {
  router.push('/customer-service');
};

const goToSettings = () => {
  router.push('/settings');
};
</script>

<style lang="less" scoped>
.profile-wrapper {
  background: #f5f5f5;
  min-height: 100vh;
  padding: 16px;
  padding-bottom: calc(16px + 50px); // 增加底部 padding，防止内容被 tabbar 遮挡
  box-sizing: border-box;
}

.user-info-wrapper {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.user-info {
  padding: 16px;

  .avatar {
    margin-right: 16px;
  }
  
  .user-name {
    font-size: 18px;
    font-weight: bold;
  }

  .user-id {
    font-size: 14px;
    color: #999;
    margin-top: 4px;
  }

  .action-icons {
    display: flex;
    gap: 16px;
  }

  .action-icon {
    color: #666;
  }
}

.stats-grid {
  margin-bottom: 16px;
}

.content-group {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;

  .cell-image {
    margin-right: 12px;
    border-radius: 6px;
  }

  .cell-title {
    font-size: 16px;
    color: #333;
  }

  .cell-desc {
    font-size: 14px;
    color: #999;
  }
}

:deep(.van-cell-group__title) {
  padding: 16px 16px 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

:deep(.van-grid-item__content) {
  padding: 16px 8px;
}

:deep(.van-cell) {
  align-items: center;
  padding: 12px 16px;
}

:deep(.van-cell-group--inset) {
  margin: 0;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

:deep(.van-nav-bar) {
  background-color: transparent;
  
  .van-nav-bar__title {
    color: #333;
    font-weight: bold;
  }
}

.footer {
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
}

.beian-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
}
</style>