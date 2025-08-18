<template>
    <div class="w-full">
        <PickerView emit-value :model-value="dateArr" :options="[yearList, monthList, dayList, hourList, minuteList]"
            @change="onChange" class="w-full" />
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PickerView from '../picker-view/PickerView.vue'
import { useDateRows } from './useDate.js'
import qdate, { Nongli } from './QDate.js'

const props = defineProps({
    // 默认日期
    modelValue: String,
    // 历法
    lifa: {
        type: String,
        default: '公',
        validator: (val) => {
            return ['公', '农'].includes(val)
        },
    },
    // 日期格式
    format: {
        type: String,
        default: 'YYYY-MM-DD HH:mm',
    },
})
const emit = defineEmits(['update:modelValue', 'change'])
// const { buildYears, buildMonths, buildDays, buildHours, buildMinutes } = useDateRows(props);

const dateStr = ref(props.modelValue);
const dateArr = ref([]);
const dateObj = ref();

function initDate(date) {
    date = qdate(date, props.format);

    if (!date.isValid()) {
        date = qdate(new Date)
    }
    const dts = [date.$y, date.$Mo, date.$D, date.$H, date.$m].map(vo => parseInt(vo));
    if (date.$lifa === '农' && date.$leap) {
        dts[1] = -dts[1]
    }

    dateStr.value = date.toString();
    dateArr.value = dts;
    dateObj.value = date;

}
initDate(props.modelValue)
watch(() => props.modelValue, initDate)
watch(() => props.lifa, (lifa) => {
    dateObj.value.set('$lifa', lifa);
    initDate(dateObj.value.toString());
    emitValue();
})

// 年列表
const yearList = computed(() => {
    const start = 1900, end = 2100;
    return new Array(2100 - 1900 + 1).fill(0).map((_, index) => {
        return {
            label: String(start + index) + '年',
            value: start + index
        }
    })
})
// 月列表
const monthList = computed(() => {
    const year = dateArr.value[0];
    const { lifa } = props;
    const yue = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
    const yueArr = new Array(12).fill(0).map((_, index) => {
        const month = index + 1;
        const label = (lifa == '公' ? String(month).padStart(2, "0") : yue[index]) + "月";
        return {
            label,
            value: month,
        };
    });
    // // 农历闰月
    // const leap = Nongli.leapMonth(year)
    // if (lifa === '农' && leap) {
    //     yueArr.splice(leap, 0, {
    //         label: "闰" + yue[leap - 1],
    //         value: -leap,
    //         leap: true,
    //     });
    // }

    return yueArr
})
// 日列表
const dayList = computed(() => {
    const lifa = props.lifa;
    const isNong = lifa === "农";
    let [year, month] = dateArr.value
    if (year === void 0) {
        year = yearList.value[0].value
    }
    if (month === void 0) {
        month = monthList.value[0].value
    }
    // 月天数
    let days = new Date(year, month, 0).getDate();
    if (isNong) {
        days = month > 0 ? Nongli.monthDays(year, month) : Nongli.leapDays(year);
    }

    return new Array(days).fill(0).map((_, index) => {
        const day = index + 1;
        const label = lifa === "农" ? Nongli.toChinaDay(day) : String(day).padStart(2, "0") + "日"

        return {
            label,
            value: day,
        };
    });
})
// 时列表
const hourList = computed(() => {
    const lifa = props.lifa;
    return new Array(24).fill(0).map((_, hour) => {
        return {
            label: String(hour).padStart(2, "0") + "时" + (lifa == '农' ? '(' + getShiZhi(hour) + ')' : ''),
            value: hour,
        };
    });
})
// 分列表
const minuteList = computed(() => {
    return new Array(60).fill(0).map((_, minute) => {
        return {
            label: String(minute).padStart(2, "0") + "分",
            value: minute,
        };
    });
})

// 获取时支
function getShiZhi(hours) {
    const timeCycleNames = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    let index = hours === 0 || hours === 23 ? 0 : Math.floor((hours - 1) / 2) + 1;
    return timeCycleNames[index];
}

function onChange({ value }) {
    const { lifa } = props;
    initDate(`${lifa}历 ${value[0]}-${Math.abs(value[1])}-${value[2]} ${value[3]}:${value[4]}` + (lifa == '农' && value[1] < 0 ? (' (闰月)') : ''))
    emitValue()
}

function emitValue() {
    console.log(dateStr.value);
    
    emit('update:modelValue', dateStr.value);
    emit('change', { 
        date: dateObj.value, 
        value: dateStr.value,
        year: dateObj.value.$y,
        month: dateObj.value.$Mo,
        day: dateObj.value.$D,
        hour: dateObj.value.$H,
        minute: dateObj.value.$m
    });
}
</script>

<style>
.w-full {
    width: 100%;
}
</style>