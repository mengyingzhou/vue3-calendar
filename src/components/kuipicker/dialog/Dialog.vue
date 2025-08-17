<template>
    <Transition>
        <div v-if="visible" class="fixed w-full h-full left-0 top-0 z-999 flex flex-row justify-center items-center">
            <slot></slot>
        </div>
    </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    modelValue: Boolean,
})

const visible = ref(props.modelValue)
watch(() => props.modelValue, (val) => visible.value = val)
const emit = defineEmits(['update:modelValue'])

// 显示
const show = () => {
    visible.value = true
    emit('update:modelValue', true)
}

// 隐藏
const hide = () => {
    visible.value = false
    emit('update:modelValue', false)
}

defineExpose({
    show,
    hide,
})
</script>

<style>
.fixed {
    position: fixed;
}

.w-full {
    width: 100%;
}

.h-full {
    height: 100%;
}

.left-0 {
    left: 0;
}

.top-0 {
    top: 0;
}

.z-999 {
    z-index: 999;
}

.flex {
    display: flex;
}

.flex-row {
    flex-direction: row;
}

.justify-center {
    justify-content: center;
}

.items-center {
    align-items: center;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: scale(0.5);
}
</style>