<template>
  <div class="star-days">
    <van-nav-bar
      title="已收藏日期"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <div class="content">
      <div v-if="starDays.length === 0" class="empty-state">
        <van-empty description="暂无收藏日期" />
      </div>
      <template v-else>
        <StarDayItem
          v-for="day in starDays"
          :key="day.solar"
          :solar="day.solar"
          :lunar="day.lunar"
          :image-url="day.imageUrl"
          :is-starred="true"
          @click="onDayClick(day)"
          @toggle-star="onToggleStar(day)"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StarDayItem from '../components/StarDayItem.vue';

const router = useRouter();

// 定义农历数据类型
interface LunarDate {
  date: string;
  year: string;
  month: string;
  day: string;
  hour: string; // 时辰信息
}

// 定义收藏日期数据类型
interface StarDay {
  solar: string | Date;
  lunar: LunarDate;
  imageUrl: string;
}

// 模拟收藏日期数据
const starDays = ref<StarDay[]>([
  {
    solar: new Date('1988-11-20T00:00:00.000Z'),
    lunar: { 
      date: '一九八八年 十月 十日', 
      year: '戊辰', 
      month: '甲戌', 
      day: '乙酉',
      hour: '辛酉' 
    },
    imageUrl: `https://picsum.photos/200/200?random=1`,
  },
  {
    solar: new Date('2024-01-15T17:55:00.000Z'),
    lunar: { 
      date: '甲辰年 正月 初四', 
      year: '甲辰', 
      month: '辛丑', 
      day: '戊申',
      hour: '癸亥' 
    },
    imageUrl: `https://picsum.photos/200/200?random=2`,
  },
  {
    solar: new Date('2024-07-24T17:55:00.000Z'),
    lunar: { 
      date: '甲辰年 六月 十九', 
      year: '甲辰', 
      month: '辛未', 
      day: '己丑',
      hour: '癸酉' 
    },
    imageUrl: `https://picsum.photos/200/200?random=3`,
  },
]);

// 处理返回按钮点击
const onClickLeft = () => {
  router.back();
};

// 处理日期项点击
const onDayClick = (day: StarDay) => {
  // 这里可以实现跳转到日期详情页的逻辑
  console.log('点击日期项:', day);
  // 示例：router.push({ name: 'DayDetail', params: { date: day.solar.toString() } });
};

// 处理收藏状态切换
const onToggleStar = (day: StarDay) => {
  console.log('切换收藏状态:', day);
  // 这里可以实现切换收藏状态的逻辑
  // 例如调用API更新收藏状态
};

// 生命周期钩子
onMounted(() => {
  // 这里可以添加页面加载时的逻辑
  // 例如从API获取收藏日期数据
  // TODO: 从后端API获取实际的收藏日期列表
  console.log('StarDays页面已加载');
});

</script>

<style lang="less" scoped>
.star-days {
  padding-top: 46px; /* 为固定的导航栏留出空间 */
  padding-bottom: 20px;
  min-height: 100vh;
  background-color: #f7f8fa;
}

.content {
  padding: 16px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
</style>