<template>
    <van-nav-bar
    title="专属客服"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
contact
</template>


<script lang="ts" setup>
import { reactive } from "vue";
const onClickLeft = () => history.back();
</script>


<style lang="less">
</style>
