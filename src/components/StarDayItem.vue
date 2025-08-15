<template>
  <div class="star-day-item">
    <div class="star-day-content" @click="handleClick">
      <div class="image-container">
        <img :src="imageUrl" alt="日期图片" class="day-image">
      </div>
      <div class="day-info">
        <div class="date">{{ formattedSolarDate }}</div>
        <div class="lunar-date">{{ formattedLunarDate }}</div>
      </div>
        <van-icon 
          name="star" 
          class="star-icon" 
          :color="starColor" 
          @click="handleStarClick"
        />
      <van-icon name="arrow" class="arrow-icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// 定义组件接收的属性
const props = defineProps({
  solar: {
    type: [String, Date],
    required: true
  },
  lunar: {
    type: Object,
    required: true,
    default: () => ({
      date: '',
      year: '',
      month: '',
      day: '',
      hour: '' // 添加hour属性，用于存储时辰信息
    })
  },
  imageUrl: {
    type: String,
    default: () => {
      // 生成随机图片URL作为默认值
      const randomId = Math.floor(Math.random() * 1000);
      return `https://picsum.photos/200/200?random=${randomId}`;
    }
  },
  isStarred: {
    type: Boolean,
    default: true
  }
});

// 格式化公历日期
const formattedSolarDate = computed(() => {
  const date = new Date(props.solar);
  
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // 使用padStart确保数字格式一致
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  
  return `${year}年${formattedMonth}月${formattedDay}日 ${formattedHours}:${formattedMinutes}`;
});

// 格式化农历日期
const formattedLunarDate = computed(() => {
  if (typeof props.lunar === 'string') {
    return props.lunar;
  }
  
  // 如果只有date属性，则直接返回
  if (!props.lunar.year && !props.lunar.month && !props.lunar.day) {
    return props.lunar.date || '';
  }
  
  // 构建完整的农历日期字符串，包含年月日时
  const parts = [];
  
  if (props.lunar.year) {
    parts.push(`${props.lunar.year}年`);
  }
  
  if (props.lunar.month) {
    parts.push(`${props.lunar.month}月`);
  }
  
  if (props.lunar.day) {
    parts.push(`${props.lunar.day}日`);
  }
  
  if (props.lunar.hour) {
    parts.push(`${props.lunar.hour}时`);
  }
  
  // 用空格连接所有部分
  return parts.join(' ');
});

// 根据是否收藏来设置星星颜色
const starColor = computed(() => props.isStarred ? '#ff9900' : '#ddd');

// 定义点击事件
const emit = defineEmits(['click', 'toggleStar']);

// 处理点击事件
const handleClick = () => {
  emit('click', { solar: props.solar, lunar: props.lunar });
};

// 处理收藏图标点击
const handleStarClick = (event: Event) => {
  event.stopPropagation(); // 阻止事件冒泡
  emit('toggleStar', { solar: props.solar, lunar: props.lunar });
};
</script>




<style scoped>
.star-day-item {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.star-day-content {
  display: flex;
  align-items: center;
  padding: 12px;
  position: relative;
}

.image-container {
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 16px;
  flex-shrink: 0;
}

.day-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.star-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 18px;
}

.day-info {
  flex-grow: 1;
}

.date {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.lunar-date {
  font-size: 14px;
  color: #666;
}

.arrow-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #999;
  font-size: 16px;
}
</style>