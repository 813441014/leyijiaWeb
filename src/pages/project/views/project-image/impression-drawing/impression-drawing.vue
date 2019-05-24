<template>
    <div class="impression-drawing-container">
            <div class="container">
                <div class="designer">
                    <div class="avatar">
                        <img :src="avatar?avatar:require('../../img/avatar.png')">
                        <p class="name">{{charge}}</p>
                    </div>
                    <div class="info">
                        <p><span>户型：{{houseType||'暂无'}}</span><span>面积：{{area||'0'}}㎡</span><span>风格：{{styleStr||'暂无'}}</span></p>
                    </div>
                </div>
                <div class="img-container" >
                    <p v-if="!image.length" class="no-data">暂无效果图</p>
                    <img :src="item" v-for="(item,index) in image" @click="detail(index)">
                </div>
            </div>

    </div>
</template>

<script>
    export default {
        name: "impression-drawing",
        props:{
            avatar:{
              type:String
            },
            charge:{
                type:String
            },
            houseType:{
                type:String
            },
            area:{
                type:String
            },
            styleStr:{
                type:String
            },
            image:{
                type:Array
            }
        },
        methods:{
            detail(index){
                wx.previewImage({
                    current:this.image[index],
                    urls:this.image
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .impression-drawing-container{
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .designer{
            width: 100%;
            height: 350rem/@rootFontSize;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            .avatar{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                img{
                    width: 160rem/@rootFontSize;
                    height: 160rem/@rootFontSize;
                    border-radius: 100%;
                    margin-top: 10rem/@rootFontSize;
                }
                p{
                    width: 100%;
                    padding: 10rem/@rootFontSize;
                    .font-dpr(16px);
                    font-weight: 300;
                    text-align: center;

                }
            }
            .info{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .font-dpr(14px);
                color: #98999a;
                padding-bottom: 20rem/@rootFontSize;
                span:nth-child(2){
                    padding: 0 30rem/@rootFontSize;
                }
            }
        }
        .img-container{
            width: 100%;
            .no-data{
                text-align: center;
                font-size: 16px;
                color: #98999a;
                padding: 10rem/@rootFontSize;
                box-sizing: border-box;
            }
            img{
                width: 100%;
                margin-bottom: 30rem/@rootFontSize;
            }
        }
    }
</style>