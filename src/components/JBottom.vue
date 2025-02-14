<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="calendar-o" color="#1989fa" to='/'>日历</van-tabbar-item>
        <van-tabbar-item icon="user-o" color="#1989fa" to='/profile'>我的</van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts" setup>
import {reactive, toRefs} from "vue";

const state = reactive({
    active:0
});
const { active } = toRefs(state);
</script>

<style lang="less">
.van-tabbar{
    box-sizing: border-box;
    position: fixed;
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
</style>
