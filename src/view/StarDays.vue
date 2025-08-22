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
          v-model:relation="day.relation"
          v-model:gender="day.gender"
          :id="day.id"
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
import { DateService } from '@/utils/date';
import { Solar, Lunar } from "lunar-typescript";
import { Toast } from 'vant';
import { wuxingFirstCharMap } from '../config/wuxing';

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
  relation: string;
  gender: string;
  id?: string; // 添加id字段，用于删除收藏
}

// 初始化空数组，将在onMounted中加载数据
const starDays = ref<StarDay[]>([]);

// 处理返回按钮点击
const onClickLeft = () => {
  router.back();
};

// 处理日期项点击
const onDayClick = (day: StarDay) => {
  // 将日期对象转换为字符串格式
  const date = new Date(day.solar);
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
  // 跳转到首页并传递日期参数
  router.push({ 
    path: '/',
    query: { date: dateString }
  });
};

// 处理收藏状态切换
const onToggleStar = async (day: StarDay) => {
  try {
    if (!day.id) {
      console.error('收藏ID不存在');
      return;
    }
    
    // 显示加载提示
    Toast.loading({
      message: '处理中...',
      forbidClick: true,
    });
    
    // 调用API删除收藏
    await DateService.deleteDate(day.id);
    
    // 从列表中移除该日期
    starDays.value = starDays.value.filter(item => item.id !== day.id);
    
    Toast.success('已取消收藏');
  } catch (error) {
    console.error('取消收藏错误:', error);
    Toast.fail('操作失败，请重试');
  }
};

// 将日期字符串转换为Solar对象和Lunar对象
const convertDateStringToSolarLunar = (dateString: string) => {
  try {
    // 解析日期字符串，格式如："2024-7-24 17:55:00"
    const dateMatch = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})/)
    
    if (dateMatch) {
      const year = parseInt(dateMatch[1]);
      const month = parseInt(dateMatch[2]);
      const day = parseInt(dateMatch[3]);
      const hour = parseInt(dateMatch[4]);
      const minute = parseInt(dateMatch[5]);
      const second = parseInt(dateMatch[6]);
      
      // 创建Solar对象
      const solar = Solar.fromYmdHms(year, month, day, hour, minute, second);
      
      // 获取对应的Lunar对象
      const lunar = solar.getLunar();
      console.log('转换后的日期:', lunar);
      
      return {
        solar: solar.toYmdHms(),
        lunar: {
          date: `${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}`,
          year: lunar.getYearInGanZhi(),
          month: lunar.getMonthInGanZhi(),
          day: lunar.getDayInGanZhi(),
          hour: lunar.getTimeInGanZhi()
        },
        imageUrl: wuxingFirstCharMap[lunar.getDayInGanZhi().charAt(0)]?.imageUrlStar
      };
    }
    throw new Error('日期格式不正确');
  } catch (error) {
    console.error('日期转换错误:', error);
    return null;
  }
};

// 加载收藏日期数据
const loadStarDays = async () => {
  try {
    // 显示加载提示
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    
    // 获取当前用户ID
    const user = localStorage.getItem('user');
    if (!user) {
      Toast.fail('请先登录');
      router.push('/login');
      return;
    }

    const userId = JSON.parse(user).id;    
    const collections = await DateService.getDateCollections(userId);
    
    // 清空当前数组
    starDays.value = [];
    
    // 转换收藏日期数据
    collections.forEach(collection => {
      const solarLunar = convertDateStringToSolarLunar(collection.dateString);
      if (solarLunar) {
        starDays.value.push({
          solar: solarLunar.solar,
          lunar: solarLunar.lunar,
          imageUrl: solarLunar.imageUrl,
          relation: collection.relation,
          gender: collection.gender,
          id: collection._id, // 保存收藏ID，用于后续删除操作
        });
      }
    });

    // 关闭加载提示
    Toast.clear();
  } catch (error) {
    console.error('加载收藏日期错误:', error);
    Toast.fail('加载失败，请重试');
  }
};

// 生命周期钩子
onMounted(() => {
  loadStarDays();
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