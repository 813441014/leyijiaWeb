<template>
    <div class="choose-project">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="project-container">
            <div class="project-item" v-for="(item,index) in projectList" :key="index" @click="switchProject(item.id)">
                <div class="project-img">
                    <img :src="item.pic?item.pic:require('./img/no-image.png')">
                </div>
                <div class="project-detail">
                    <p>工程地址：{{item.siteName}}</p>
                    <div class="project-info">
                        <div>业主：{{item.name}}</div>
                        <div>负责人：{{item.xsyName||'暂无'}}</div>
                        <!--<div>设计师：周雨彤</div>-->
                        <div>项目经理：{{item.xmjlName}}</div>
                    </div>
                </div>
                <!--<div class="project-icon-friend"></div>-->
                <!--<div class="project-icon-owner"></div>-->
            </div>


        </div>
    </div>

</template>

<script>
    import request from 'static/js/request'
    import result from 'static/js/result'
    export default {
        name: "switch_project",
        data(){
            return{
                projectList:[]
            }
        },
        async created(){
            let loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            let getProjectList = await request('/decorate/constructionSite/Home/constructList','post',{
                userId:this.$store.state.userId
            },'application/x-www-form-urlencoded')
            loading.hide()
            let info = result(getProjectList)
            loading.hide()
            if(!info)return
            console.log(info)
            this.projectList.push(...info)
        },
        methods:{
            switchProject(id){
                if(id == this.$store.state.projectId){

                    weui.alert('当前已选此工地')
                    return false
                }
                this.$store.commit('setProjectId',id)
                localStorage.setItem('projectId',id)
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .choose-project{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #f8f9fa;
        overflow: hidden;
        .project-container{
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .project-item{
                width: 100%;
                display: flex;
                align-items: center;
                padding: 40rem/@rootFontSize 40rem/@rootFontSize 40rem/@rootFontSize 0;
                background-color: #fff;
                box-sizing: border-box;
                position: relative;
                overflow: hidden;
                .project-img{
                    width: 30%;
                    text-align: center;
                    img{
                        width: 180rem/@rootFontSize;
                        height: 140rem/@rootFontSize;
                    }
                }
                .project-detail{
                    width: 70%;
                    p{
                        .font-dpr(14px);
                        font-weight: 350;
                        overflow:hidden;
                        text-overflow:ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:2;
                        color: #222;
                        line-height: 40rem/@rootFontSize;

                    }
                    .project-info{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        /*justify-content: center;*/
                        color: #979899;
                        div{
                            width: 50%;
                            padding: 10rem/@rootFontSize 0;
                        }
                    }
                }
                .project-icon-woner{
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 80rem/@rootFontSize solid #dba860;
                    border-left: 80rem/@rootFontSize solid transparent;
                    /*background-color: #88bd77;*/
                    right: 0;
                    top: 0;
                    &::before{
                        content:'主';
                        position: absolute;
                        right:-47rem/@rootFontSize;
                        top: -60rem/@rootFontSize;
                        width: 80rem/@rootFontSize;
                        height: 80rem/@rootFontSize;
                        .font-dpr(12px);
                        color: #fff;
                    }
                }
                .project-icon-friend{
                    position: absolute;
                    width: 0;
                    height: 0;
                    border-top: 80rem/@rootFontSize solid #88bd77;
                    border-left: 80rem/@rootFontSize solid transparent;
                    /*background-color: #88bd77;*/
                    right: 0;
                    top: 0;
                    &::before{
                        content:'友';
                        position: absolute;
                        right:-47rem/@rootFontSize;
                        top: -60rem/@rootFontSize;
                        width: 80rem/@rootFontSize;
                        height: 80rem/@rootFontSize;
                        .font-dpr(12px);
                        color: #fff;
                    }
                }
            }
            .project-item:not(:last-child){
                position: relative;
                .border-bottom(#e5e6e7);
            }
        }
    }
</style>