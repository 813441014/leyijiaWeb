<template>
    <div class="image-container">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="nav">
            <div class="nav-item" @click="changeNav(2)">
                <span :style="{borderBottom:status.navStatus===2?'3px solid #dd7d2f':''}">施工图</span>
            </div>
            <div class="nav-item" @click="changeNav(1)">
                <span :style="{borderBottom:status.navStatus===1?'3px solid #dd7d2f':''}">效果图</span>
            </div>
        </div>
        <div class="detail">
            <workingDrawing v-show="status.navStatus===2" :working="working"></workingDrawing>
            <impressionDrawing v-show="status.navStatus===1" :charge="impression.charge" :avatar="impression.avatar" :houseType="impression.houseType" :area="impression.area" :styleStr="impression.style" :image="impression.image"></impressionDrawing>
        </div>
    </div>
</template>

<script>
    import workingDrawing from './working-drawing/working-drawing'
    import impressionDrawing from './impression-drawing/impression-drawing'

    import request from 'static/js/request'
    import result from 'static/js/result'

    export default {
        components:{
            workingDrawing,impressionDrawing
        },
        name: "project-image",
        data(){
            return{
                status:{
                    navStatus:2
                },
                working:[],
                impression:{
                    charge:'',
                    avatar:'',
                    houseType:'',
                    area:'',
                    style:'',
                    image:[]
                }


            }
        },
        async created(){
            let loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            let getPic = await request('/decorate/constructionSite/ConstructEffect/constructEffectPic','post',{
                id:this.$store.state.projectId,
                userId:this.$store.state.userId,
                sessionId:this.$store.state.sessionId
            },'application/x-www-form-urlencoded')
            console.log(getPic)
            loading.hide()
            let pic = result(getPic)
            if(!pic) return
            this.working.push(...pic.sg)
            this.$set(this.working,'charge',pic.fzrname)
            this.$set(this.impression,'avatar',pic.headImage)
            this.$set(this.impression,'houseType',pic.huxing)
            this.$set(this.impression,'area',pic.acreage)
            this.$set(this.impression,'style',pic.style)
            // this.impression.image.push(...pic.xg)
            for(let i=0,len=pic.xg.length;i<len;i++){
                this.impression.image.push(...pic.xg[i].imgUrl)
            }
        },
        methods:{
             changeNav(index){
                if(index===this.status.navStatus) return
                this.$set(this.status,'navStatus',index)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .image-container{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #fff;
        overflow: hidden;
        .nav{
            display: flex;
            flex-wrap: nowrap;
            justify-content: center;
            align-items: center;
            position: relative;
            .border-bottom(#e5e6e7);
            padding: 20rem/@rootFontSize 0;
            height: 55rem/@rootFontSize;
            .nav-item{
                .font-dpr(18px);
                width: 50%;
                /*font-weight: 300;*/
                text-align: center;
                padding: 10rem/@rootFontSize 0;
                box-sizing: border-box;
                position: relative;
                span{
                    /*display: block;*/
                    /*border-bottom: 3px solid #dd7d2f;*/
                    padding: 5rem/@rootFontSize;
                }
            }
            .nav-item:nth-child(1):after{
                content:'';
                height: 40rem/@rootFontSize;
                width: 2px;
                position: absolute;
                right: 0;
                top:10rem/@rootFontSize ;
                background-color: #e5e6e7;
            }
        }
        .detail{
            height: calc( 100% - 55rem/@rootFontSize);
        }
    }
</style>