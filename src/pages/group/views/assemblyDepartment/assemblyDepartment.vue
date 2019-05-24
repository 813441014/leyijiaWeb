<template>
    <div class="main">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="bottom">
            <div class="unit" @click="_setMeal">套餐</div>
            <div class="unit" @click="_product">产品</div>
            <div class="unit" @click="_PersonalCenter">个人中心</div>
        </div>
        <div class="bottom-top">
            <div class="setMeal" v-show="status.isShow == 1" style="left: 0">
                <div class="list" @click="_setMealDescription(1)">套餐1</div>
                <div class="list" @click="_setMealDescription(2)">套餐2</div>
                <div class="list" @click="_setMealDescription(3)">套餐3</div>
                <div class="list" @click="_setMealDescription(4)">套餐4</div>
                <div class="list" @click="_setMealDescription(5)">套餐5</div>
            </div>
            <div class="core" v-show="status.isShow == 2" style="left: 66.66%">
                <div class="list" @click="_workSite">我的家</div>
                <div class="list" @click="_personalInformation">个人信息</div>
            </div>
        </div>
        <transition :name="transitionName">
            <router-view class="refresh"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionName: 'slide-left',
                status: {
                    isShow: 0,
                    // 套餐列表是否是展开状态。0：关闭状态。1：展开状态
                    setMealStatus: 0,
                    // 个人中心列表是否是展开状态。0：关闭状态。1：展开状态
                    coreStatus: 0
                }
            }
        },
        methods: {
            // 点击套餐
            _setMeal() {
                if (this.status.setMealStatus == 0){
                    this.$set(this.status, 'setMealStatus', 1);
                    this.$set(this.status, 'isShow', 1);
                } else {
                    this.$set(this.status, 'setMealStatus', 0);
                    this.$set(this.status, 'isShow', 0);
                }

            },
            // 点击个人中心
            _PersonalCenter() {
                if (this.status.coreStatus == 0){
                    this.$set(this.status, 'coreStatus', 1);
                    this.$set(this.status, 'isShow', 2);
                } else {
                    this.$set(this.status, 'coreStatus', 0);
                    this.$set(this.status, 'isShow', 0);
                }
            },
            // 点击套餐列表
            _setMealDescription (index){
                this.$set(this.status, 'isShow', 0);
                this.$set(this.status, 'setMealStatus', 0);
                this.$router.push({name: 'setMeal', params: {sign: index}});
            },
            // 点击产品
            _product() {
                this.$router.push({name: 'product'});
            },
            // 点击我的家
            _workSite() {
                this.$set(this.status, 'isShow', 0);
                this.$set(this.status, 'coreStatus', 0);
                location.href = 'https://n2cs.dingdingxiujia.com/customer/dist/project.html';
            },
            // 点击个人信息
            _personalInformation() {
                this.$set(this.status, 'isShow', 0);
                this.$set(this.status, 'coreStatus', 0);
                location.href = 'https://n2cs.dingdingxiujia.com/customer/dist/info.html';
            }
        },
        watch: {
            '$route' (to, from){
                var toDepth = to.path.length;
                var fromDepth = from.path.length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "~static/css/minxin.less";
    @import "~static/css/transition.less";
    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #FFFFFF;
        .bottom {
            width: 100%;
            height: 100rem / @rootFontSize;
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            .font-dpr(16px);
            position: absolute;
            bottom: 0;
            background-color: #F7F7F7;
            .unit {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                position: relative;
                &:nth-child(1):after {
                    content:'';
                    height: 80%;
                    width: 1px;
                    background-color: #e0e0e0;
                    position: absolute;
                    right: 0;
                    top: 10%;
                }
                &:nth-child(2):after {
                    content:'';
                    height: 80%;
                    width: 1px;
                    background-color: #e0e0e0;
                    position: absolute;
                    right: 0;
                    top: 10%;
                }
            }
        }
        .bottom-top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: absolute;
            bottom: 120rem / @rootFontSize;
            .setMeal {
                width: 33.33%;
                display: flex;
                flex-direction: column;
                position: relative;
                .border(#e5e6e7);
                animation: animate1 0.5s ease;
                @keyframes animate1 {
                    from {
                        height: 0px;
                        top : 400rem / @rootFontSize;
                    }
                    to {
                        height: 400rem / @rootFontSize;
                        top : 0px;
                    }
                }
                .list {
                    width: 100%;
                    height: 80rem / @rootFontSize;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .border-bottom(#e5e6e7);
                }
            }
            .core {
                width: 33.33%;
                display: flex;
                flex-direction: column;
                position: relative;
                .border(#e5e6e7);
                animation: animate2 0.5s ease;
                @keyframes animate2 {
                    from {
                        height: 0px;
                        top : 160rem / @rootFontSize;
                    }
                    to {
                        height: 160rem / @rootFontSize;
                        top : 0px;
                    }
                }
                .list {
                    width: 100%;
                    height: 80rem / @rootFontSize;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    .border-bottom(#e5e6e7);
                }
            }
        }
    }
</style>