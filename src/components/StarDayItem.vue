<template>
  <div class="star-day-item">
    <div class="star-day-content">
      <div class="image-container">
        <img :src="imageUrl" alt="日期图片" class="day-image">
      </div>
      <div class="day-info">
        <div class="date">{{ formattedSolarDate }}</div>
        <div class="lunar-date">{{ formattedLunarDate }}</div>
        <div class="relation-gender" v-if="props.relation && props.gender">
          <span>{{ props.relation }}</span>
          <span>{{ props.gender }}</span>
        </div>
      </div>
        <van-icon 
          name="src/assets/icon/我的页面/收藏记录/edit-text.png" 
          class="edit-icon" 
          :color="starColor" 
          @click="handleEditPopup"
        />

        <!-- 编辑弹窗 -->
        <van-popup 
          v-model:show="showEditPopup" 
          position="bottom" 
          round
          :style="{ height: 'auto', maxHeight: '70%', backgroundColor: '#f7f8fa', padding: '10px 0' }"
        >
          <div class="popup-header">
            <van-icon name="cross" class="close-icon" @click="showEditPopup = false" />
            <h3>编辑信息</h3>
          </div>
          
          <div class="popup-content">
            <!-- 关系选择卡片 -->
            <div class="card">
              <h4>请选择关系</h4>
              <div class="button-group">
                <van-button 
                  v-for="relation in ['自己', '伴侣', '家人', '朋友', '其他']" 
                  :key="relation"
                  plain
                  :style="{
                    backgroundColor: selectedRelation === relation ? 'var(--van-primary-color)' : '#f5f5f5',
                    color: selectedRelation === relation ? '#fff' : '#333'
                  }"
                  @click="selectRelation(relation)"
                >
                  {{ relation }}
                </van-button>
              </div>
            </div>
            
            <!-- 性别选择卡片 -->
            <div class="card">
              <h4>请选择性别</h4>
              <div class="button-group">
                <van-button 
                  v-for="gender in ['男生', '女生']" 
                  :key="gender"
                  plain
                  :style="{
                    backgroundColor: selectedGender === gender ? 'var(--van-primary-color)' : '#f5f5f5',
                    color: selectedGender === gender ? '#fff' : '#333'
                  }"
                  @click="selectGender(gender)"
                >
                  {{ gender }}
                </van-button>
              </div>
            </div>
          </div>
          
          <div class="popup-footer">
            <van-button 
              type="primary" 
              block
              @click="confirmEdit"
            >
              确认
            </van-button>
          </div>
        </van-popup>
      <van-icon name="arrow" class="arrow-icon" @click="handleArrowClick" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DateService } from '@/utils/date';
import { Toast } from 'vant';
import { computed, ref, onMounted } from 'vue';

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
  },
  relation: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    required: true
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
const emit = defineEmits(['click', 'toggleStar', 'update:relation', 'update:gender']);

// 编辑弹窗状态
const showEditPopup = ref(false);
const selectedRelation = ref('');
const selectedGender = ref('');

// 显示编辑弹窗
const handleEditPopup = (event: Event) => {
  event.stopPropagation();
  showEditPopup.value = true;
};

// 选择关系
const selectRelation = (relation: string) => {
  selectedRelation.value = relation;
};

// 选择性别
const selectGender = (gender: string) => {
  selectedGender.value = gender;
};

// 初始化选中状态
onMounted(() => {
  if (props.relation) selectedRelation.value = props.relation;
  if (props.gender) selectedGender.value = props.gender;
});

// 确认编辑
const confirmEdit = async () => {
  if (!selectedRelation.value || !selectedGender.value) {
    Toast('请选择关系和性别');
    return;
  }
  
  try {
    // 调用API更新数据
    await DateService.updateDate({
      id: props.id,
      relation: selectedRelation.value,
      gender: selectedGender.value
    });
    
    // 触发事件更新父组件数据
    emit('update:relation', selectedRelation.value);
    emit('update:gender', selectedGender.value);
    
    // 由于我们使用了v-model:relation和v-model:gender，
    // 父组件会通过props更新这些值，所以这里不需要额外操作
    
    Toast.success('更新成功');
    showEditPopup.value = false;
  } catch (error) {
    console.error('更新失败:', error);
    Toast.fail('更新失败');
  }
};

// 处理箭头图标点击
const handleArrowClick = (event: Event) => {
  event.stopPropagation();
  const date = new Date(props.solar);
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  // 跳转到首页并传递日期参数，同时设置JBottom的index为0
  emit('click', { 
    solar: props.solar, 
    lunar: props.lunar,
    route: {
      path: '/',
      query: { 
        date: dateString
      }
    }
  });
};
</script>




<style scoped>
/* 弹窗样式 */
.popup-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.popup-header h3 {
  margin: 0 auto;
}

.close-icon {
  font-size: 20px;
  color: #969799;
}

.popup-content {
  padding: 8px 16px;
}

.card {
  margin-bottom: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card h4 {
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #333;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.popup-footer {
  padding: 12px 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f7f8fa;
}
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

.edit-icon {
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

.relation-gender {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.relation-gender span {
  background-color: #f5f5f5;
  color: var(--van-primary-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.arrow-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #999;
  font-size: 16px;
}
</style>