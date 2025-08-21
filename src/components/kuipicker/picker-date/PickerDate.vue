<template>
    <Dialog v-model="visible">
        <div class="date-card bg-white rounded-lg">
            <div class="flex p-1">
                <Btn label="取消" class="border-0 text-red-500 hover:bg-red-100 hover:text-red-700"
                    @click="hide" />
                <div class="flex-1 flex justify-center">
                    <div class="flex rounded-lg p-1">
                        <button v-for="(vo, i) in lifaArr" :key="i" class="px-2 rounded-md border-0"
                            :class="[vo == lifa ? 'text-white bg-blue-500' : '']" @click="lifa = vo">
                            {{ vo }}历
                        </button>
                    </div>
                </div>
                <Btn label="确定" class="border-0"
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none !important;
    overflow: hidden;
}

.flex {
    display: flex;
}

.p-1 {
    padding: 0.5rem;
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
    border-color: var(--van-danger-color);
}

.border-blue-300 {
    border-color: var(--van-primary-color);
}

.border-sky-500 {
    border-color: var(--van-primary-color);
}

.border-gray-200 {
    border-color: rgba(229, 231, 235, 0.5);
}

.rounded-lg {
    border-radius: 0.25rem;
}

.rounded-md {
    border-radius: 0.2rem;
}

.bg-white {
    background-color: rgb(255, 255, 255);
}

.bg-blue-500 {
    background-color: var(--van-primary-color);
}

.text-red-500 {
    color: rgb(239, 68, 68);
}

.text-sky-500 {
    color: var(--van-primary-color);
}

.text-white {
    color: rgb(255, 255, 255);
}


.px-2 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
    transition: all 0.2s ease;
}


/* 新增扁平化样式 */
.border-0 {
    border: none !important;
}

button {
    background-color: #ffffff;
    outline: none;
    user-select: none;
    cursor: pointer;
    font-weight: 500;
}

button:focus {
    outline: none;
}

.date-card button {
    transition: all 0.2s ease;
}
</style>