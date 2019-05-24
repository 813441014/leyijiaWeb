<template>
    <div class="stage_acceptance">
        <div class="stage_container">
            <div class="container_top">
                <div class="flex_div">
                    <img src="./img/sinker.png" alt="">
                    <p>竣工验收</p>
                    <!--<img src="./img/nextstep.png" alt="">-->
                </div>
                <div class="flex_div">
                    <img src="./img/address.png" alt="">
                    <p>{{location.address}}</p>
                    <img src="./img/nextstep.png" alt="">
                </div>
            </div>
            <div class="stage_content">
                <textarea v-model="content" placeholder="验收内容"  style="resize:none" :disabled="!status.projectStatus"></textarea>
                <div class="imgdiv">
                    <div v-for="(item,index) in imgurl" class="photoimg">
                        <img :src="item" alt="" class="srcImg" @click='toImgDetail(item)'>
                        <img v-if="status.projectStatus" src='./img/delImg.png' alt="" class="delImg"  @click='deleteImg(index)'>
                    </div>
                    <div class="photoimg" @click="addImg" v-if="status.projectStatus&&imgurl.length<9">
                        <img src="./img/jia.png" alt="">
                    </div>
                </div>
                <div class="weui-cell weui-cell_switch">
                    <div class="weui-cell__bd">是否通过</div>
                    <div class="weui-cell__ft">
                        <label for="switchCP" class="weui-switch-cp">
                            <input id="switchCP" class="weui-switch-cp__input" type="checkbox" checked="checked" v-model="switchStatus"  :disabled="!status.projectStatus">
                            <div class="weui-switch-cp__box"></div>
                        </label>
                    </div>
                </div>
            </div>
            <div class="evaluate">
                <p>竣工评价</p>
                <ul>
                    <li v-for="(item,index) in scoreArr">
                        <p class="title">{{item.name}}</p>
                        <div class="imgurl">
                            <div   class="star-item" track-by="index">
                                    <img src="./img/yellowstar.png"  class="yellowstar" v-for="(starItem,starIndex) in item.score" @click="stars(index,starIndex)">
                                    <img src="./img/graystar.png" class="graystar"v-for="(starItem,starIndex) in 5-item.score" @click="stars(index,starIndex+item.score)">
                            </div>
                        </div>
                        <p class="apan"></p>
                    </li>
                </ul>
            </div>
            <div class="submitbtn" @click="submit" v-if="status.projectStatus">
                <p>提交</p>
            </div>
        </div>

    </div>
</template>

<script>
    import request from 'static/js/request'
    import result from 'static/js/result'
    export default {
        name: "complete-acceptance",
        data(){
            return {
                status:{
                    projectStatus:false
                },
                flag:true,

                switchStatus:true,
                scoreArr:[
                    {name:'销售服务',score:0},
                    {name:'设计服务',score:0},
                    {name:'施工服务',score:0},
                    {name:'产品服务',score:0}
                ],
                location:{
                    address:""
                },
                content:'',
                imgurl:[],
                title:'',
                id:'',
                chooseLocalIds:[],//选择的图片数组
                chooseLength:"",//单次选择图片的长度 实现依次上传
                processSelect:{},//选择的工序
                processPicker:[],//工序列表
                chooseTogol:0 //总上传图片的长度
            }

        },
        async created(){
            this.$set(this.location,'address',this.$route.params.address)
            let loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            const getInfo = await request('/decorate/constructionSite/Check/judge','post',{
                userId:this.$store.state.userId||'608629776467427',
                site_id:this.$store.state.projectId||'608796606219745'
            },'application/x-www-form-urlencoded')
            loading.hide()
            console.log(getInfo);
            console.log(getInfo.code);
            if(getInfo.code == 0){
            	console.log(1);
                //未通过竣工验收
                this.$set(this.status,'projectStatus',true)
                this.getLocation()
            }else if(getInfo.code == 1){
            	console.log(2);
                //通过竣工验收
                this.content = getInfo.data.content;
                this.location.address = getInfo.data.address;
                this.switchStatus= getInfo.data.is_check==="1"?true:false;
                var imgUrl = getInfo.data.url;
                var imgArr = []
                if(imgUrl.length > 0){
                    for(var i=0;i<imgUrl.length;i++){
                        imgArr[i] = imgUrl[i].pic
                    }
                    this.imgurl.push(...imgArr);
                }
                this.$set(this.scoreArr[0],'score',parseInt(getInfo.data.sale))
                this.$set(this.scoreArr[1],'score',parseInt(getInfo.data.design))
                this.$set(this.scoreArr[2],'score',parseInt(getInfo.data.construction))
                this.$set(this.scoreArr[3],'score',parseInt(getInfo.data.product))

            }else{
            	console.log("3");
            	weui.alert("当前不允许验收");
            	this.$router.go(-1)
            }
        },
        methods:{
            stars:function(index,starIndex){
                if(!this.status.projectStatus)return
                if(this.scoreArr[index].score===1&&starIndex===0){
                    this.$set(this.scoreArr[index],'score',0)
                    return false
                }
                this.$set(this.scoreArr[index],'score',starIndex+1)
            },
            //添加图片
            addImg(){
                var _this = this;
                var count = 9 - (this.imgurl.length);
                //选择图片
                wx.chooseImage({
                    count: count, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function(res) {
                        _this.chooseLocalIds = res.localIds;
                        _this.chooseLength = res.localIds.length;
                        _this.chooseTogol = _this.chooseTogol + res.localIds.length;
                        _this.getLocalImgData(0)
                    }
                });
            },
            //上传图片到base64
            getLocalImgData(num) {
                var _this = this;
                var number = num +1;
                wx.getLocalImgData({
                    localId: this.chooseLocalIds[num], // 图片的localID
                    success: function(res) {
                        var localData = res.localData; // localData是图片的base64数据
                        var prefix = 'base64,';
                        var index = localData.indexOf(prefix);
                        var actData = localData;
                        if (index > -1) {
                            actData = localData.substring(index + 7);
                        }
                        _this.uploadImage(actData,number);
                    }
                });
            },
            //上传图片到服务器
            async uploadImage(basedata,num){
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                var _len = this.chooseLength;
                var _this =this;
                //lyjlogin/UploadImg/uploadImage
                var params ={
                    base64:encodeURIComponent(basedata)
                };
                let getProjectList = await request('/lyjlogin/UploadImg/uploadImage',
                    'post',
                    params,
                    'application/x-www-form-urlencoded')
                let planarray = result(getProjectList);
                loading.hide();
                if(!planarray)return;
                this.$set(this.imgurl,this.imgurl.length,planarray.imageSrc);
                if(num < _len) {
                        _this.getLocalImgData(num)

                }else {
                    if(_this.chooseTogol == this.imgurl.length){

                    }else{
                        weui.alert("部分图片上传失败");
                    }
                    return false
                }

            },
            //删除图片
            deleteImg(index){
            	this.chooseTogol = this.chooseTogol - 1;
                this.imgurl.splice(index,1);
                this.flag = !this.flag;

            },
            //预览图片
            toImgDetail(src) {
                wx.previewImage({
                    // 当前显示图片的链接，不填则默认为 urls 的第一张
                    current: src,
                    // 需要预览的图片链接列表
                    urls: this.imgurl
                });
            },
            //获取地理位置
            getLocation(){
                let _self = this
                wx.getLocation({
                	type: 'gcj02',
                    success: function (res) {
                        _self.$jsonp(`https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=FVZBZ-GSOKX-UPP4W-74A65-OSBU2-3WB2U&get_poi=1&output=jsonp`).then(res=>{
                            if(res.status===0){
                                _self.$set(_self.location,'address',res.result.address)
                            }
                        }).catch(err=>{
                            console.log(err)
                        })
                    },
                    cancel: function (res) {
                        // alert('用户拒绝授权获取地理位置');
                    }
                });
            },
            //提交
            async submit(){


                if(this.content == ""){
                    weui.alert("请输入内容");
                    return false
                }
                if(this.scoreArr[0].score == "0"){
                //  销售gggggggggggggggg
                    weui.alert("请评价销售服务");
                    return false
                }
                if(this.scoreArr[1].score == '0'){
                //  设计
                    weui.alert("请评价设计服务");
                    return false
                }
                if(this.scoreArr[2].score == '0'){
                //施工
                    weui.alert("请评价施工服务");
                    return false
                }
                if(this.scoreArr[3].score == '0'){
                //    产品
                    weui.alert("请评价产品服务");
                    return false
                }
                // var params ={
                //     site_id:this.$store.state.projectId,
                //     content:this.content,
                //     is_check:this.switchStatus?1:2,
                //     sale:this.scoreArr[0].score,
                //     design:this.scoreArr[1].score,
                //     construction:this.scoreArr[2].score,
                //     product:this.scoreArr[3].score,
                //     uploadFile:this.imgurl,
                //     userId:this.$store.state.userId,
                //     title:this.processSelect.label,
                //     address:this.location.address,
                //     gongxu:this.processSelect.id
                // };

                // return  false;
                let loading = weui.loading('loading', {
                    className: 'custom-classname'
                });
                var params ={
                    site_id:this.$store.state.projectId,
                    content:this.content,
                    is_check:this.switchStatus?1:2,
                    sale:this.scoreArr[0].score,
                    design:this.scoreArr[1].score,
                    construction:this.scoreArr[2].score,
                    product:this.scoreArr[3].score,
                    uploadFile:this.imgurl,
                    userId:this.$store.state.userId,
                    title:"竣工验收",
                    address:this.location.address,
                    gongxu:""
                };
                let submit = await request('/decorate/constructionSite/Check/finalCheck',
                    'post',
                    params,
                    'application/x-www-form-urlencoded')
                loading.hide()
                let status = result(submit)
                if(!status)return
                weui.alert('提交成功')
                this.$router.go(-1)

            },
            //点击picker
            pickClick(){
                if(this.status.projectStatus){

                }else{
                    return false;
                }
                var _self = this;
                weui.picker(this.processPicker, {
                    className: 'custom-classname',
                    container: 'body',
                    defaultValue: [0],
                    onChange: function (result) {
                        _self.$set(_self.processSelect,'label', result[0].label)
                        _self.$set(_self.processSelect,'id', result[0].value)
                    },
                    onConfirm: function (result) {
                        console.log(result)
                    },
                    id: 'singleLinePicker'
                });
            },
        }
    }
</script>


<style scoped  lang="less">
    @import "~static/css/minxin.less";
    .stage_acceptance{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #f8f9fa;
        .stage_container{
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .container_top{
                background: #fff;
                margin-bottom: 20rem/@rootFontSize;
                padding: 0 20rem/@rootFontSize;
                .flex_div{
                    display: flex;
                    align-items: center;
                    line-height: 100rem/@rootFontSize;
                    height: 100rem/@rootFontSize;
                    .font-dpr(12px);
                    &:nth-of-type(2){
                        border: none;
                    }
                    img{
                        width: 40rem/@rootFontSize;
                        height: 40rem/@rootFontSize;
                        margin-right: 20rem/@rootFontSize;
                    }
                    p{
                        flex: 1;
                    }
                }
                .flex_div:not(:last-child){
                    position: relative;
                    .border-bottom(#e5e6e7);
                }
            }
            .stage_content{
                background: #fff;
                textarea{
                    .font-dpr(12px);
                    width: 100%;
                    overflow: hidden;
                    box-sizing:border-box;
                    -moz-box-sizing:border-box; /* Firefox */
                    -webkit-box-sizing:border-box; /* Safari */
                    border: none;
                    padding: 0 20rem/@rootFontSize;
                    line-height: 40rem/@rootFontSize;
                    margin-top: 20rem/@rootFontSize;
                    min-height: 80rem/@rootFontSize;
                    background: #fff;
                }
                .imgdiv{
                    padding: 0 15rem/@rootFontSize;
                    overflow: hidden;
                    position: relative;
                    .border-bottom(#e5e6e7);
                    .photoimg{
                        position: relative;
                        width: 170rem/@rootFontSize;
                        height: 170rem/@rootFontSize;
                        margin: 0 5rem/@rootFontSize;
                        overflow: hidden;
                        text-align: center;
                        float: left;
                        margin-bottom: 20rem/@rootFontSize;
                        img{
                            width: 170rem/@rootFontSize;
                            height: 170rem/@rootFontSize;
                            object-fit: cover;
                        }
                        .srcImg{
                            width: 170rem/@rootFontSize;
                            height: 170rem/@rootFontSize;
                            object-fit: cover;
                        }
                        .delImg{
                            position: absolute;
                            width: 30rem/@rootFontSize;
                            height: 30rem/@rootFontSize;
                            right: 0;
                            top: 0;

                        }
                    }
                }
                .weui-cell_switch{
                    .weui-switch-cp__box{
                        width: 38px;
                        height: 18px;
                        &:after{
                            width: 16px;
                            height: 16px;
                        }
                        &:before{
                            width: 16px;
                            height: 16px;
                        }
                    }
                    &:before{
                        border:none;
                    }
                }
            }
            .evaluate{
                background: #ffffff;
                padding: 0 20rem/@rootFontSize;
                margin-top: 20rem/@rootFontSize;
                p{
                    .font-dpr(16px);
                    line-height: 80rem/@rootFontSize;
                }
                ul{
                    li{
                        list-style: none;

                        display: flex;
                        align-items: center;
                        line-height: 60rem/@rootFontSize;

                        .title{
                            .font-dpr(12px);
                            margin-right: 20rem/@rootFontSize;
                        }
                        .apan{
                            .font-dpr(12px);
                            width: 100rem/@rootFontSize;
                        }
                        .imgurl{
                            flex: 1;
                            text-align: center;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            div{
                                img{
                                    width: 40rem/@rootFontSize;
                                    height: 40rem/@rootFontSize;
                                    margin-right: 10rem/@rootFontSize;
                                }
                                .disblock{
                                    display: none;
                                }
                            }
                        }
                    }
                }

            }

        }
        .submitbtn{
            background: #f8f9fa;
            padding: 20rem/@rootFontSize 0;
            margin-top: 50rem/@rootFontSize ;
            p{
                margin: auto;
                width: 420rem/@rootFontSize;
                height: 80rem/@rootFontSize;
                line-height: 80rem/@rootFontSize;
                text-align: center;
                color: #fff;
                background: #f07e0c;
                -webkit-border-radius: 50rem/@rootFontSize;
                -moz-border-radius: 50rem/@rootFontSize;
                border-radius: 50rem/@rootFontSize;
            }
        }
    }
</style>