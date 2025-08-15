<!--
 * @Description: 
 * @Date: 2023-05-15 16:23:13
 * @Author: didi
 * @LastEditTime: 2023-05-17 18:43:08
-->
<template>
  <div class="datepicker">
    <div class="datepicker_header">
      <div class="datepicker_til">
        {{ props.title ? props.title : "选择日期" }}
      </div>
      <!-- <div style="margin-left: auto;">
        <span style="margin-right: 10px; font-size: 16px; color: #606266;">农历模式</span>
        <van-switch
          v-model="calendarType"
          active-value="lunar"
          inactive-value="solar"
          size="24px"
        />
      </div> -->
    </div>
    <div class="datepicker_body">
      <DatetimePicker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @change="getCurrentDate"
        cancel="1"
        :formatter="formatter"
      >
        <div class="datepicker_info">
          {{ selectdate.getLunar().getYearInChinese()}}年 {{ selectdate.getLunar().getMonthInChinese()}}月 {{selectdate.getLunar().getDayInChinese()}}日 
        </div>
      </DatetimePicker>
    </div>
    <div class="datepicker_bottom">
      <div class="dbt_backtotoday" @click="handleBacknow">回到今天</div>
      <div class="dbt_confirm" @click="handleConfirm">确定</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DatetimePicker, Switch } from "vant";
import { ref } from "vue";
import { Solar, Lunar } from "lunar-typescript";

const props = defineProps<{
  title?: string;
  selectDate?: any;
}>();

const selectdate = ref(Solar.fromDate(new Date()));
const currentDate = ref(props.selectDate ? new Date(props.selectDate.getYear(), props.selectDate.getMonth() - 1, props.selectDate.getDay(), props.selectDate.getHour()) : new Date());

const formatter = (type: any, val: any) => {
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${val}月`;
  }
  if (type === "day") {
    return `${val}日`;
  }
  if (type === "hour") {
    return `${val}时`;
  }
  if (type === "minute") {
    return `${val}分`;
  }
  return val;
};
const minDate = new Date(1900, 0, 1);
const maxDate = new Date(2200, 12, 31);
const getCurrentDate = (val: any) => {
  selectdate.value = Solar.fromDate(new Date(val));
};
const emit = defineEmits<{
  (e: 'confirm', selectdate: any): void
  (e: 'close'): void
}>()
const handleConfirm = () => {
  emit('confirm', selectdate.value)
  emit('close') // 确保 now 已定义且类型匹配
}
const handleBacknow = () => {
  currentDate.value = new Date()
}
</script>
<style lang="less">
.datepicker {
  padding: 15px;
  box-sizing: border-box;
  background: #fff;

  .datepicker_header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .calendar_switch {
      margin-right: 10px;
      padding: 5px 10px;
      background: #f0f0f0;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background: #e0e0e0;
      }
    }
  }

  .datepicker_til {
    color: var(--van-primary-color);
    font-size: 18px;
  }
  .datepicker_info {
    padding: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: var(--van-primary-color) !important;
    text-align: center;
    margin: 0 auto;
    color: gray;
  }
  .datepicker_body {
    height: 200px;
    overflow: hidden;
    .van-picker-column__item {
      font-size: 13px;
    }
    .van-picker-column__item--selected {
      color: var(--van-primary-color);
    }
    .van-picker__toolbar {
      position: relative;
      z-index: 100;
      background: #fff;
    }
    .van-picker__columns {
      margin-top: -50px;
    }
  }
  .datepicker_bottom {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid lightgray;
    box-sizing: border-box;
    .dbt_backtotoday {
      border: 1px solid var(--van-primary-color);
      color: #000;
      border-radius: 30px;
      text-align: center;
      width: 120px;
      padding: 8px 0;
    }
    .dbt_confirm {
      background: var(--van-primary-color);
      border-radius: 30px;
      color: #fff;
      text-align: center;
      width: 120px;
      padding: 8px 0;
    }
  }
}
</style>
