<template>
    <van-nav-bar
    title="精选文章"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
selected
</template>


<script lang="ts" setup>
import { reactive } from "vue";
const onClickLeft = () => history.back();
</script>


<style lang="less">
</style>
