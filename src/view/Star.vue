<template>
    <van-nav-bar
    title="收藏记录"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
star
</template>


<script lang="ts" setup>
import { reactive } from "vue";
const onClickLeft = () => history.back();
</script>


<style lang="less">
</style>
