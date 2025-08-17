<template>
    <div class="flex flex-nowrap w-full">
        <template v-for="(cols, i) in rows" :key="i">
            <PickerColumn :ref="el => columnRefs[i] = el" v-model="innerValue[i]" v-bind="columnAttrs" :options="cols"
                class="flex-1 min-w-0" @change="(e) => onChange(i, e)" />
        </template>
    </div>
</template>

<script setup>
import { ref, computed, toRefs, onMounted, useAttrs } from 'vue';
import PickerColumn from '../picker-column/PickerColumn.vue';
import { columnProps, usePickerColumn } from '../picker-column/usePickerColumn.js';

const props = defineProps({
    // 选中值
    modelValue: Array,
    // 二维数组
    options: Array,
    // 最大列数
    maxColumn: Number,
    // 列属性
    ...columnProps,
});
const { modelValue, ...columnAttrs } = props;

const emit = defineEmits(['update:modelValue', 'change']);

// hooks
const { getItemValue, getItemIndex } = usePickerColumn(props);

// 列元素
const columnRefs = ref([]);
// 当前选中值
const innerValue = ref(modelValue || []);
const indexKey = ref(initKey());

// 初始化KEY
function initKey() {
    const newKey = [];
    innerValue.value.forEach((val, i) => {
        newKey[i] = getItemIndex(val, props.options[i]);
    })
    return newKey;
}

// 列值
const rows = computed(() => {
    const { options, maxColumn } = props;
    let rows = options;
    return maxColumn > 0 ? rows.slice(0, maxColumn) : rows;
})

function onChange(colKey, { value, index, item }) {
    // 刷新下级value
    const newKey = [];
    const newValue = [];
    const itemValue = [];
    rows.value.forEach((col, i) => {
        const curKey = indexKey.value[i] || 0;
        // 选中的下标
        if (colKey === i) {
            newKey[i] = index;
            newValue[i] = value;
            itemValue[i] = item;
        } else {
            newKey[i] = curKey;
            newValue[i] = getItemValue(col[curKey]);
            itemValue[i] = col[curKey];
        }
    })
    indexKey.value = newKey;
    innerValue.value = newValue;
    
    emit('update:modelValue', innerValue.value);
    emit('change', { value: innerValue.value, index: indexKey.value, item: itemValue });
}
</script>

<style>
.flex {
    display: flex;
}

.flex-nowrap {
    flex-wrap: nowrap;
}

.w-full {
    width: 100%;
}

.flex-1 {
    flex: 1 1 0%;
}

.min-w-0 {
    min-width: 0px;
}
</style>