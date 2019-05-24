<template>
    <div class="team-container">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="team-container">
            <div class="work-item" v-for="(item,index) in teamWorker" :key="index">
                <div class="member-avatar">
                    <img :src="item.headImg?item.headImg:require('./img/avatar.png')">
                </div>
                <div class="member-info">
                    <div class="member-name">{{item.name}}</div>
                    <div class="member-position">{{item.type}}</div>
                </div>
                <div class="member-mobile">
                    <div><img src="./img/phone.png"><span>{{item.phone}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "work-team",
        data(){
            return{
                teamWorker:[]
            }
        },
        created(){
            this.teamWorker.push(...this.$route.params.team)
        }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .team-container{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
        overflow: hidden;
        .team-container{
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .work-item{
                width: 100%;
                display: flex;
                align-items: center;
                padding: 20rem/@rootFontSize 30rem/@rootFontSize;
                box-sizing: border-box;
                position: relative;
                .border-bottom(#e5e6e7);
                /*justify-content: space-between;*/
                .member-avatar{
                    width: 120rem/@rootFontSize;
                    img{
                        width: 120rem/@rootFontSize;
                        height: 120rem/@rootFontSize;
                        border-radius: 5rem/@rootFontSize;
                    }

                }
                .member-info{
                    padding: 0 10rem/@rootFontSize;
                    .member-name{
                        .font-dpr(16px);
                        line-height: 50rem/@rootFontSize;

                     }
                    .member-position{
                        .font-dpr(14px);
                        line-height: 50rem/@rootFontSize;
                        font-weight: 300;
                    }
                }
                .member-mobile{
                    flex: 1;
                    div{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        img{
                            width: 30rem/@rootFontSize;
                            height: 30rem/@rootFontSize;
                        }
                        span{
                            .font-dpr(14px);
                        }
                    }
                }
            }
        }
    }

</style>