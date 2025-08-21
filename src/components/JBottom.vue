<template>
    <div class="bottom-container">
        <van-tabbar class="subscription-tabbar" fixed>
            <van-tabbar-item>
                <template #icon>
                    <div class="subscription-content">
                        <img class="avatar-img" src="@/assets/icon/首页/小蚊子头像.png" alt="头像" />
                        <span class="subscription-text">公众号：玄叨叨的小蚊子</span>
                        <a class="follow-btn" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU2NDgwNzQ1OQ==&subscene=0#wechat_redirect">关注</a>
                    </div>
                </template>
            </van-tabbar-item>
        </van-tabbar>
        
        <van-tabbar v-model="active" class="main-tabbar" fixed>
            <van-tabbar-item icon="calendar-o" color="#1989fa" to='/'>日历</van-tabbar-item>
            <van-tabbar-item icon="user-circle-o" color="#1989fa" to='/profile'>我的</van-tabbar-item>
        </van-tabbar>
    </div>
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
    } else if (route.path === '/') {
        state.active = 0;
        localStorage.setItem('tabbarActive', '0');
    }
});

const { active } = toRefs(state);
</script>

<style lang="less">
.bottom-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
}

.subscription-tabbar {
    background-color: var(--van-primary-color) !important;
    height: auto !important;
    padding: 5px 0;
    font-size: 12px;
    bottom: 50px !important;
}

.subscription-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
}

.avatar-img {
    width: 20px;
    height: 16px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 5px;
    vertical-align: middle;
}

.subscription-text {
    color: #ffffff;
    vertical-align: middle;
    font-size: 12px;
    flex: 1;
    margin: 0 10px;
}

.follow-btn {
    background-color: #FFFFFF !important;
    color: #000000;
    text-decoration: none;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    display: inline-block;
}

.main-tabbar {
    box-sizing: border-box;
    width: 100%;
    max-width: 380px;
    bottom: 0 !important;
}

.subscription-tabbar .van-tabbar-item {
    padding: 0;
    width: 100%;
}

/* 确保所有子元素都继承背景色，但排除 .follow-btn */
.subscription-tabbar *:not(.follow-btn) {
    background-color: inherit;
}
</style>