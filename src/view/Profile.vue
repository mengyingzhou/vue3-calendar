<template>
    <van-nav-bar title="我的"/>

    <van-grid :border="false" :column-num="2">
        <van-grid-item text="文字">
            <van-image round width="2rem" height="2rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" text="文字" >
                "content"
            </van-image>
        </van-grid-item>

        <van-grid-item text="昵称" />
    </van-grid>

    <van-cell size="large" icon="star-o" title="收藏记录" to="/star"/>
    <van-cell icon="eye-o" title="关注公众号" to="/follow"/>
    <van-cell icon="orders-o" title="精选文章" to='/selected'/>
    <van-cell icon="smile-comment-o" title="专属客服" to='/contact'/>

</template>



<script lang="ts" setup>
import { reactive } from "vue";

</script>

<style lang="less" src="./Profile.less"></style>

