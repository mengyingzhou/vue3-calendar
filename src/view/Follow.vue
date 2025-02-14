<template>
    <van-nav-bar
    title="关注公众号"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
follow
</template>


<script lang="ts" setup>
import { reactive } from "vue";
const onClickLeft = () => history.back();
</script>


<style lang="less">
</style>
