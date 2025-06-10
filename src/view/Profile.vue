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

    <!-- 小蚊子独家课程 -->
    <van-cell-group inset title="小蚊子独家课程" class="content-group">
      <van-cell 
        v-for="(item, index) in courseRecommendations" 
        :key="index" 
        is-link
        @click="openLink(item.link)"
      >
        <template #icon>
          <van-image
            width="5rem"
            height="3rem"
            :src="item.image"
            class="cell-image rectangle-image"
          />
        </template>
        <template #title>
          <span class="cell-title">{{ item.text }}</span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 热门文章推荐 -->
    <van-cell-group inset title="热门文章推荐" class="content-group">
      <van-cell 
        v-for="(item, index) in articleRecommendations" 
        :key="index" 
        :title="item.text" 
        is-link 
        :title-class="'article-title'"
        @click="openLink(item.link)"
      />
    </van-cell-group>

    <!-- 好运物品推荐 -->
    <van-cell-group inset title="好运物品推荐" class="content-group">
      <van-cell 
        v-for="(item, index) in luckyItemRecommendations" 
        :key="index" 
        is-link
        @click="openLink(item.link)"
      >
        <template #icon>
          <van-image
            width="5rem"
            height="3rem"
            :src="item.image"
            class="cell-image rectangle-image"
          />
        </template>
        <template #title>
          <span class="cell-title">{{ item.text }}</span>
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
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoggedIn = ref(true); // 默认为已登录状态，实际应用中应从状态管理或本地存储获取
const userId = ref("123456"); // 模拟用户ID，实际应用中应从API获取

// 数据区块
const articleRecommendations = ref([]);
const courseRecommendations = ref([]);
const luckyItemRecommendations = ref([]);

// 根据区块索引和项目索引生成图片路径
const getImagePath = (blockIndex: number, itemIndex: number) => {
  return `/console/images/image${blockIndex}-${itemIndex + 1}.jpg`;
};

// 获取data.json中的数据
const fetchData = async () => {
  try {
    const response = await fetch('/console/data.json');
    const data = await response.json();
    
    // 获取热门文章推荐区块的数据
    const articleBlock = data.blocks.find(block => block.title === "热门文章推荐");
    if (articleBlock && articleBlock.components) {
      articleRecommendations.value = articleBlock.components;
    }
    
    // 获取小蚊子独家课程区块的数据
    const courseBlock = data.blocks.find(block => block.title === "小蚊子独家课程");
    if (courseBlock && courseBlock.components) {
      // 为每个课程添加对应的图片路径（第1个区块）
      courseRecommendations.value = courseBlock.components.map((item, index) => ({
        ...item,
        image: getImagePath(1, index) // 使用第1个区块的图片
      }));
    }
    
    // 获取好运物品推荐区块的数据
    const luckyItemBlock = data.blocks.find(block => block.title === "好运物品推荐");
    if (luckyItemBlock && luckyItemBlock.components) {
      // 为每个好运物品添加对应的图片路径（第3个区块）
      luckyItemRecommendations.value = luckyItemBlock.components.map((item, index) => ({
        ...item,
        image: getImagePath(3, index) // 使用第3个区块的图片
      }));
    }
  } catch (error) {
    console.error('获取数据失败:', error);
  }
};

// 处理链接点击
const openLink = (link) => {
  if (link) {
    window.open(link, '_blank');
  } else {
    console.log('链接不可用');
  }
};

// 在组件挂载时获取数据
onMounted(() => {
  fetchData();
});

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
    margin-right: 5px;
    border-radius: 6px;
  }

  .rectangle-image {
    :deep(.van-image__img) {
      object-fit: contain;
      background-color: #f5f5f5;
    }
  }

  .cell-title {
    font-size: 14px;
    color: #333;
    max-width: 100%;
    display: inline-block;
    word-wrap: break-word;
    word-break: break-word;
    line-height: 1.4;
    padding: 4px 0;
    white-space: pre-line;
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

:deep(.article-title) {
  padding-left: 5px;
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