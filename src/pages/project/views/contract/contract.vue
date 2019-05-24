<template>
    <div class="contract-container">
        <div v-wechat-title="$route.meta.title"></div>
        <div class="container">
            <p v-if="!imgUrl.length" class="no-data">工地未签订合同</p>
            <img :src="item" v-for="(item,index) in imgUrl" :ket="key" @click="perView(index)">
        </div>

    </div>
</template>

<script>
    import request from 'static/js/request'
    import result from 'static/js/result'
    export default {
        name: "contract",
        data(){
            return{
                imgUrl:[]
            }
        },
        async created(){
            let loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            const getList = await request('/decorate/contract/Contract/contractList','post',{
                site_id:this.$store.state.projectId
            },'application/x-www-form-urlencoded')
            loading.hide()
            let list = result(getList)
            if(!list)return
            for(let i in list){
                if(i==='contractImg'){
                    this.imgUrl.push(...list[i])
                }
            }
            // console.log(list)
            // if(list.)
            // for(let item of list){
            //     this.imgUrl.push(...item.contractImg)
            // }
        },
        methods:{
            perView(index){
                wx.previewImage({
                    current:this.imgUrl[index],
                    urls:this.imgUrl
                })
            }
        }

    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
    .contract-container{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #f8f9fa;
        .container{
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            font-size: 0;
            .no-data{
                text-align: center;
                font-size: 16px;
                color: #98999a;
                padding: 10rem/@rootFontSize;
                box-sizing: border-box;
            }
            img{
                width: 100%;
                padding-bottom: 10px;
            }
        }

    }
</style>