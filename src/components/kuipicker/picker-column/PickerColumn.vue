<template>
    <div class="wheel-column relative select-none" v-bind="columnAttrs">
        <div ref="columnRef" class="wheel-scroll overflow-hidden" v-bind="scrollAttrs">
            <div class="wheel-inner">
                <div v-for="(vo, i) in opts" :key="i" class="wheel-item text-nowrap px-2 overflow-hidden text-ellipsis"
                    :class="[vo.disabled ? 'wheel-disabled-item' : '', i == indexKey ? 'current' : '']"
                    v-bind="itemAttrs">
                    {{ vo.label }}
                </div>
            </div>
        </div>
        <div
            class="mask-top absolute w-full top-0 border-b-1 border-gray-300/45 bg-gradient-to-b from-white/70 to-white/40 to-90%">
        </div>
        <div
            class="mask-btm absolute w-full bottom-0 border-t-1 border-gray-300/45 bg-gradient-to-t from-white/70 to-white/40 to-90%">
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { columnProps, usePickerColumn } from './usePickerColumn'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
BScroll.use(Wheel)

const props = defineProps({
    // 下标值
    modelValue: [Number, String, Object],
    ...columnProps
})
const columnRef = ref(null)
let scroll = null
// hooks
const { getItemValue } = usePickerColumn(props)

// 标准列表项数据
const opts = computed(() => {
    const { options, optionLabel, optionValue } = props;
    return options.map(vo => {
        let label = vo, value = vo, disabled = false;
        if (typeof vo === "object") {
            label = vo[optionLabel];
            value = vo[optionValue];
            disabled = !!vo.disabled;
        }
        return { label, value, disabled }
    })
})

// 选中值
const innerValue = ref(props.modelValue)
watch(() => props.modelValue, (val) => innerValue.value = val)
// 下标值
const indexKey = ref(initKey())
function initKey() {
    const index = opts.value.findIndex(vo => {
        return vo.value === props.modelValue
    })
    return index >= 0 ? index : 0
}

if (props.modelValue == null) {
    innerValue.value = getItemValue(opts.value[0])
}

watch(() => opts.value, (val) => {
    if (indexKey.value > val.length) {
        innerValue.value = getItemValue(val[val.length - 1])
    }

    if (scroll) {
        nextTick(() => scroll.refresh())
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const offsetRows = computed(() => {
    return Math.floor(props.rowNumber / 2)
})
const columnAttrs = computed(() => {
    const { itemHeight } = props;
    return {
        style: {
            '--offset-rows': (offsetRows.value * itemHeight) + 'px',
        }
    }
})
// 样式
const scrollAttrs = computed(() => {
    const { align, rowNumber, itemHeight } = props;
    return {
        style: {
            textAlign: align,
            height: (itemHeight * rowNumber) + 'px',
            paddingTop: (offsetRows.value * itemHeight) + 'px',
        }
    }
});
// 行样式
const itemAttrs = computed(() => {
    const { itemHeight } = props
    return {
        style: {
            height: itemHeight + 'px',
            lineHeight: itemHeight + 'px',
        }
    }
});

// update
function emitValue(index) {
    const { options } = props;
    // 原始列表item
    const item = options[index];
    indexKey.value = index;
    innerValue.value = getItemValue(options[index]);
    emit('update:modelValue', innerValue.value)
    emit('change', { index, value: innerValue.value, item })
}

// 初始化
function initScroll() {
    const { rowNumber, itemHeight } = props
    const { align } = props
    scroll = new BScroll(columnRef.value, {
        wheel: {
            selectedIndex: indexKey.value,
            align,
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item',
            wheelDisabledItemClass: 'wheel-disabled-item'
        },
        probeType: 3,
    })
    scroll.on('wheelIndexChanged', emitValue)
}
onMounted(initScroll)
</script>

<style>
.wheel-column {
    border-right: 1px solid rgba(229, 231, 235, 0.45);
    position: relative;
    user-select: none;
}

.wheel-column:last-child {
    border-right: none;
}

.wheel-column .mask-top,
.wheel-column .mask-btm {
    z-index: 2;
    pointer-events: none;
    height: var(--offset-rows);
}

.wheel-inner {
    margin-top: var(--offset-rows);
}

.wheel-item {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.current {
    color: #3b82f6;
    font-weight: 500;
}

.wheel-scroll {
    overflow: hidden;
}

.mask-top {
    position: absolute;
    width: 100%;
    top: 0;
    border-bottom-width: 1px;
    border-color: rgba(209, 213, 219, 0.45);
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4) 90%);
}

.mask-btm {
    position: absolute;
    width: 100%;
    bottom: 0;
    border-top-width: 1px;
    border-color: rgba(209, 213, 219, 0.45);
    background-image: linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4) 90%);
}

.wheel-disabled-item {
    opacity: 0.4;
}
</style>