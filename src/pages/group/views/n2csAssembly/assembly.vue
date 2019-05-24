<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="unit">整装</div>
        <div class="unit">整装</div>
        <div class="unit">整装</div>
        <div class="unit">整装</div>
        <div class="unit">整装</div>
        <div class="unit">整装</div>
        <!--<div class="flexbox">-->
        <!--<router-link to="/assembly/describe">描述</router-link>-->
        <!--<router-link to="/assembly/setMeal">套餐</router-link>-->
        <!--<router-link to="/assembly/product">产品</router-link>-->
        <!--<router-link to="/assembly/newRetail">新零售</router-link>-->
        <!--<router-link to="/assembly/myInfo">我的</router-link>-->
        <!--</div>-->
        <!--<div>-->
            <!--<router-view>-->

            <!--</router-view>-->
        <!--</div>-->

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
        .flexbox{
            width: 100%;
            display: flex;
            router-link{
                flex: 1;
            }
        }
    }
</style>