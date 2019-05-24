<template>
    <div class="working-drawing-container">
        <div class="drawing-container">
            <p v-if="!working.length" class="no-data">暂无施工图</p>
            <div class="drawing-item" v-for="(workingItem,workingIndex) in working">

                <div class="title">
                    <span>
                        {{workingItem.name}}
                    </span>
                </div>
                <div class="img-detail">
                    <div class="date-container"><div class="date"><span>{{getDay(workingItem.createdAt)}}</span><span>{{getMonth(workingItem.createdAt)}}</span></div></div>
                    <div class="img-container">

                        <img :src="imageItem" v-for="(imageItem,imageIndex) in workingItem.imgUrl" @click="detail(workingIndex,imageIndex)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "working-drawing",
        props:{
            working:{
                type:Array
            }
        },
        methods:{
            detail(pindex,index){
                wx.previewImage({
                    current:this.working[pindex].imgUrl[index],
                    urls:this.working[pindex].imgUrl
                })
            },
            getMonth(str){
                console.log(str)
                let arr = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一','十二']
                console.log(parseInt(str.split('-')[0])-1)
                return arr[parseInt(str.split('-')[0])-1]
            },
            getDay(str){
                return str.split('-')[1]
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .working-drawing-container{
        height: 100%;
        overflow: hidden;
        .drawing-container{
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .no-data{
                text-align: center;
                font-size: 16px;
                color: #98999a;
                padding: 10rem/@rootFontSize;
                box-sizing: border-box;
            }
            .drawing-item{
                display: flex;
                flex-wrap: wrap;
                position: relative;
                .border-bottom(#e5e6e7);
                .title{
                    width: 100%;
                    .font-dpr(16px);
                    font-weight: 300;
                    color: #fff;
                    display: flex;
                    padding: 30rem/@rootFontSize 0;
                    span{
                        background-color: #de7c2e;
                        padding: 10rem/@rootFontSize 35rem/@rootFontSize;
                    }
                }
                .img-detail{
                    width: 100%;
                    display: flex;
                    flex-wrap: nowrap;

                    .date-container{
                        color: #000;
                        width: 18%;
                        display: flex;
                        /*align-items: center;*/
                        justify-content: flex-end;

                        padding-top: 15rem/@rootFontSize;
                        box-sizing: border-box;
                        span:nth-child(1){
                            .font-dpr(20px);
                            vertical-align: middle;
                        }
                        span:nth-child(2){
                            .font-dpr(12px);
                        }
                    }
                    .img-container{
                        display: flex;
                        flex-wrap: wrap;
                        width: 82%;
                        img{
                            margin-left: (100% - 450/@rootFontSize)/14;
                            width: 150rem/@rootFontSize;
                            height: 150rem/@rootFontSize;
                            padding-bottom: 30rem/@rootFontSize;
                            /*margin: auto;*/
                        }
                    }
                }
            }
        }
    }
</style>