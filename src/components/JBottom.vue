<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="calendar-o" color="#1989fa" to='/'>日历</van-tabbar-item>
        <van-tabbar-item icon="user-o" color="#1989fa" to='/profile'>我的</van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const state = reactive({
    active: Number(localStorage.getItem('tabbarActive')) || 0
});

// 监听路由变化
watch(() => route.path, (newPath) => {
    if (newPath === '/profile') {
        state.active = 1;
        localStorage.setItem('tabbarActive', '1');
    } else if (newPath === '/') {
        state.active = 0;
        localStorage.setItem('tabbarActive', '0');
    }
});

// 组件挂载时初始化
onMounted(() => {
    if (route.path === '/profile') {
        state.active = 1;
        localStorage.setItem('tabbarActive', '1');
    }
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
    max-width:380px;
}
</style>