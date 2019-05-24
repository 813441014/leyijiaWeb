<template>
    <div class="main">
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="bottom">
            <div class="bottom-tab">
                <div class="unit" @click="_group">
                    <div class="icon"><img :src="status.isShow==1 ? require('./img/home.png') : require('./img/no-home.png')" alt=""></div>
                    <div class="title">集团</div>
                </div>
                <div class="unit" @click="_assembly">
                    <div class="icon"><img :src="status.isShow==2 ? require('./img/log.png') : require('./img/no-log.png')" alt=""></div>
                    <div class="title">整装</div>
                </div>
                <div class="unit" @click="_royalstar">
                    <div class="icon"><img :src="status.isShow==3 ? require('./img/custom.png') : require('./img/no-custom.png')" alt=""></div>
                    <div class="title">荣事达</div>
                </div>
                <div class="unit" @click="_mine">
                    <div class="icon"><img :src="status.isShow==4 ? require('./img/mine.png') : require('./img/no-mine.png')" alt=""></div>
                    <div class="title">我的</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: {
                    isShow: 0
                }
            }
        },
        created() {
            this.$set(this.status, 'isShow', 1);
            this.$router.push({name: 'group'});
        },
        methods: {
            // 集团
            _group (){
                this.$set(this.status, 'isShow', 1);
                this.$router.push({name: 'group'});
            },
            // 整装部
            _assembly() {
                this.$set(this.status, 'isShow', 2);
                this.$router.push({name: 'assembly'});
            },
            // 荣事达
            _royalstar() {
                this.$set(this.status, 'isShow', 3);
                this.$router.push({name: 'royalstar'});
            },
            // 我的
            _mine (){
                this.$set(this.status, 'isShow', 4);
                this.$router.push({name: 'mine'});
            }
        }
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
        .content {
            width: 100%;
            height: calc( 100% - 100rem/@rootFontSize);
            overflow: scroll;
            /*适应苹果*/
            -webkit-overflow-scrolling: touch;
            position: relative;
        }
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
            .border-top(relative, #e5e6e7);
            background-color: #FFFFFF;
            .bottom-tab {
                width: 90%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                .unit {
                    width: 100rem / @rootFontSize;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .icon {
                        width: 60rem / @rootFontSize;
                        height: 60rem / @rootFontSize;
                        margin: 8rem/@rootFontSize 20rem/@rootFontSize 0 20rem/@rootFontSize;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .title {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .font-dpr(12px);
                    }
                }
                /*.unit {*/
                /*    flex: 1;*/
                /*    display: flex;*/
                /*    justify-content: center;*/
                /*    align-items: center;*/
                /*    box-sizing: border-box;*/
                /*    position: relative;*/
                /*    &:nth-child(1):after {*/
                /*        content:'';*/
                /*        height: 80%;*/
                /*        width: 1px;*/
                /*        background-color: #e0e0e0;*/
                /*        position: absolute;*/
                /*        right: 0;*/
                /*        top: 10%;*/
                /*    }*/
                /*    &:nth-child(2):after {*/
                /*        content:'';*/
                /*        height: 80%;*/
                /*        width: 1px;*/
                /*        background-color: #e0e0e0;*/
                /*        position: absolute;*/
                /*        right: 0;*/
                /*        top: 10%;*/
                /*    }*/
                /*    &:nth-child(3):after {*/
                /*        content:'';*/
                /*        height: 80%;*/
                /*        width: 1px;*/
                /*        background-color: #e0e0e0;*/
                /*        position: absolute;*/
                /*        right: 0;*/
                /*        top: 10%;*/
                /*    }*/
                /*}*/
            }
        }
    }
</style>