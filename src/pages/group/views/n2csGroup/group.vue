<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="unit">集团</div>
        <div class="unit">集团</div>
        <div class="unit">集团</div>
        <div class="unit">集团</div>
        <div class="unit">集团</div>
        <div class="unit">集团</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    @import "~static/css/minxin.less";
    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #FFFFFF;
        overflow: scroll;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
        .unit {
            width: 100%;
            height: 300rem / @rootFontSize;
            background: pink;
            margin-bottom: 20rem / @rootFontSize;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>