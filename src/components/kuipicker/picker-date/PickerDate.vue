<template>
    <Dialog v-model="visible">
        <div class="date-card bg-white shadow-lg border border-gray-200 border-solid rounded-lg">
            <div class="flex p-1">
                <Btn label="取消" class="border border-red-500 text-red-500 hover:bg-red-100 hover:text-red-700"
                    @click="hide" />
                <div class="flex-1 flex justify-center">
                    <div class="flex border border-blue-300 rounded-lg p-1">
                        <button v-for="(vo, i) in lifaArr" :key="i" class="px-2 rounded-md"
                            :class="[vo == lifa ? 'text-white bg-blue-500' : '']" @click="lifa = vo">
                            {{ vo }}历
                        </button>
                    </div>
                </div>
                <Btn label="确定" class="border border-sky-500 text-sky-500 hover:bg-sky-100 hover:text-sky-700"
                    @click="onConfirm" />
            </div>
            <DateView v-model="date" :lifa="lifa" />
        </div>
    </Dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import Dialog from '../dialog/Dialog.vue'
import DateView from './DateView.vue'
import Btn from '../button/Button.vue'

const props = defineProps({
    modelValue: String,
    show: Boolean,
})
const emit = defineEmits(['update:modelValue', 'update:show', 'confirm', 'close'])

const visible = ref(props.show)
const lifaArr = ['公', '农'];
const lifa = ref(getLifaStr(props.modelValue))
const date = ref(props.modelValue)

function getLifaStr(txt) {
    const lf = (txt || '').substr(0, 1);
    return lf && lifaArr.includes(lf) ? lf : '公';
}

watch(() => props.modelValue, (val) => date.value = val)
watch(() => props.show, (val) => {
    visible.value = val;
    date.value = props.modelValue
})
function show(){
    visible.value = true
}
function hide() {
    visible.value = false
    emit('update:show', false)
    emit('close')
}

function onConfirm() {
    emit('update:modelValue', date.value)
    emit('confirm', date.value)
    hide()
}
defineExpose({
    show,
    hide,
})
</script>

<style>
.date-card {
    width: 320px;
}

.flex {
    display: flex;
}

.p-1 {
    padding: 0.25rem;
}

.flex-1 {
    flex: 1 1 0%;
}

.justify-center {
    justify-content: center;
}

.border {
    border-width: 1px;
    border-style: solid;
}

.border-red-500 {
    border-color: rgb(239, 68, 68);
}

.border-blue-300 {
    border-color: rgb(147, 197, 253);
}

.border-sky-500 {
    border-color: rgb(14, 165, 233);
}

.border-gray-200 {
    border-color: rgb(229, 231, 235);
}

.rounded-lg {
    border-radius: 0.5rem;
}

.rounded-md {
    border-radius: 0.375rem;
}

.bg-white {
    background-color: rgb(255, 255, 255);
}

.bg-blue-500 {
    background-color: rgb(59, 130, 246);
}

.text-red-500 {
    color: rgb(239, 68, 68);
}

.text-sky-500 {
    color: rgb(14, 165, 233);
}

.text-white {
    color: rgb(255, 255, 255);
}

.shadow-lg {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.hover\:bg-red-100:hover {
    background-color: rgb(254, 226, 226);
}

.hover\:bg-sky-100:hover {
    background-color: rgb(224, 242, 254);
}

.hover\:text-red-700:hover {
    color: rgb(185, 28, 28);
}

.hover\:text-sky-700:hover {
    color: rgb(3, 105, 161);
}
</style>