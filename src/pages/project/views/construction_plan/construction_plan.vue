<template>
    <div class="construction_plan">
        <div class="plan-container" v-if="planList.length != 0">
        <div class="headernav">
           <div>
               <img src="./img/addressBlack.png">
               <span>{{houseLocation}}</span>
           </div>
            <div>
                <img src="./img/time.png">
                <span>总工期：{{planList.build_days}}天</span>
            </div>
            <div>
                <img src="./img/startData.png">
                <span>合同开工日期：{{planList.contract_start}}</span>
            </div>
            <div>
                <img src="./img/startData.png">
                <span>合同完工日期：{{planList.contract_end}}</span>
            </div>
        </div>
        <div class="plancontent">
            <div class="itemMonthBox" v-for="(item,key) in planoption">
                <div class="mouthIcon">{{item[0].start_time}}</div>
                <div class="itemPlanBox" v-for="(items,key) in item">
                    <div class="spotIcon"></div>
                    <div class="itemTitleBox">
                        <span class="dayText">
                        {{items.daysitems}}</span>
                        <span class="mouthText">{{items.monthitems}}月</span>
                        <div class="procedure">施工工序：{{items.title}}</div>
                    </div>
                    <div class="itemContentBox">
                        <div class="textBox">计划完工：{{items.end_time}}</div>
                        <!--<div class="textBox">实际完工：暂未完工</div>-->
                        <div class="textBox">计划天数：{{items.days}}天</div>
                        <!--<div class="textBox">实际天数：</div>-->
                    </div>
                    <div class="bottomLine"></div>
                </div>
            </div>
        </div>
        </div>
        <div v-else class="nodata">
            <div class="imgDiv">
                <img src="./img/wuneirong.png">
            </div>
            <div class="noText">暂无施工计划</div>
        </div>
        <!--<div class="submitbtn" v-if="planList.length != 0">
            <div v-if="planList.user_sure == 2" class="submitflex">
                <div>已拒绝</div>
            </div>
            <div v-else-if="planList.user_sure == 1" class="submitflex">
                <div>已确定</div>
            </div>
            <div v-else class="submitflex">
                <div @click="submit(1)">确定</div>
                <div @click="submit(2)">拒绝</div>
            </div>

        </div>-->
    </div>
</template>

<script>
    import request from 'static/js/request'
    import result from 'static/js/result'
    import wxReady from 'static/js/wxReady'

    export default {
        name: "construction_plan",
        data(){
            return {
                planList:{},//
                planoption:[],//计划工序列表
                houseLocation:""
            }

        },
        async created(){
            //从上一页面接收工程地址
            this.houseLocation = this.$route.params.houseLocation;
            this.initData()
    },
    methods:{
        async initData(){
            let loading = weui.loading('loading', {
                className: 'custom-classname'
            });
            var params={
                site_id:this.$store.state.projectId
            };
            
            // 请求项目计划 数据接口
            let getProjectList = await request('/decorate/constructionSite/Process/deal',
                'post',
                params,
                'application/x-www-form-urlencoded')
            let planarray = result(getProjectList)
            loading.hide();
            if(!planarray)return
            this.planList=planarray.plan;
            if(this.planList.length == 0){

                return false
            }
            let planArr = planarray.plan.gongxu;
            for (var t = 0; t < planArr.length;t++){
                //获取当前工地年份
                var yearitems = planArr[t].start_time.substring(0,4);
                //获取当前工地月份
                var monthitems =planArr[t].start_time.substring(5, 7);
                //获取当前工地日期
                var daysitems = planArr[t].start_time.substring(8, 10);
                planArr[t].daysitems = daysitems;
                planArr[t].monthitems = monthitems;
                planArr[t].times = yearitems + "年" + monthitems+"月"
            }
            var planOption = [];
            //二维数组遍历相同年份的不同月份
            for (var i = 0; i < planArr.length; i++) {
                var startData = planArr[i].start_time;
                if (planOption.length > 0) {
                    var flag = false;
                    for (var j = 0; j < planOption.length; j++) {
                        if (planOption[j][0].start_time == startData) {
                            planOption[j].push(planArr[i]);
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        var optionChild = [];
                        optionChild.push(planArr[i]);
                        planOption.push(optionChild);
                    }
                } else {
                    var optionChild = [];
                    optionChild.push(planArr[i]);
                    planOption.push(optionChild);
                }
            }
            this.planoption.push(...planOption)
        },
        //确定提交 和 拒绝提交
        async submit(num){
            console.log(num);
            var params={
                plan_id:this.planList.plan_id,
                is_confirmed:num
            };
            console.log(JSON.stringify(params));
            // 请求项目计划确认接口
            let getProjectList = await request('/decorate/constructionSite/Process/confirmRecord',
                'post',
                params,
                'application/x-www-form-urlencoded')
            let planarray = result(getProjectList)
            if(!planarray)return;
            weui.alert("修改成功");
            this.planList = {};
            this.planoption = [];
            this.initData()
        }
    }
    }
</script>

<style scoped lang="less">
    @import "~static/css/minxin.less";
.construction_plan{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: #f8f9fa;
    .plan-container{
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .headernav{
        background: #fff;
        line-height: 80rem/@rootFontSize;
        div{
            display: flex;
            align-items: center;
            padding: 0 20rem/@rootFontSize;
            .font-dpr(12px);
            &:nth-of-type(1){
                border: none;
            }
            img{
                width: 40rem/@rootFontSize;
                height: 40rem/@rootFontSize;
                margin-right: 20rem/@rootFontSize;;
            }
        }
            div:not(:last-child){
                position: relative;
                .border-bottom(#e5e6e7);
            }
    }
    .plancontent{
        margin-top: 20rem/@rootFontSize;
        background: #fff;
        overflow: hidden;
        /*padding-bottom: 98rem/@rootFontSize;*/
        position: relative;
        .itemMonthBox {
            width: 100%;
            height: auto;
            .mouthIcon {
                height: 40rem/@rootFontSize;
                background-color: #f08519;
                color: #fff;
                /*font-size: 0.3rem;*/
                .font-dpr(12px);
                text-align: center;
                line-height: 40rem/@rootFontSize;
                border-radius:20rem/@rootFontSize;
                margin: 0rem 20rem/@rootFontSize;
                display: inline-block;
                padding: 0 10rem/@rootFontSize;
                margin-top: 20rem/@rootFontSize;
            }
            .itemPlanBox {
                padding: 0 20rem/@rootFontSize;
                margin-left: 40rem/@rootFontSize;
                padding-top: 20rem/@rootFontSize;
                padding-bottom: 20rem/@rootFontSize;
                position: relative;
                &:after{
                    position: absolute;
                    content: '';
                    left: 0;
                    top: 0;
                    bottom: -20rem/@rootFontSize;
                    width: 1px;
                    background-color: #e5e6e7;
                    z-index: 1;
                }
                .itemTitleBox {
                    width: 100%;
                    padding-bottom: 0rem;
                    height: 80rem/@rootFontSize;
                    line-height: 80rem/@rootFontSize;
                    margin-top: -20rem/@rootFontSize;
                    .font-dpr(14px);
                    color: #000;
                    .dayText {
                        height: 30rem/@rootFontSize;
                        font-weight: 500;
                        float: left;
                        width: 40rem/@rootFontSize;
                        text-align: center;
                        display: block;
                        .font-dpr(16px);
                    }
                    .mouthText {
                        height: 30rem/@rootFontSize;
                        float: left;
                        width: 60rem/@rootFontSize;
                        text-align: center;
                        display: block;
                        .font-dpr(10px);
                    }
                    .procedure{
                        overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        .font-dpr(15px);
                        color: #000;

                    }
                }
                .bottomLine{
                    width: 100%;
                    height: 1px;
                    background: #e5e6e7;
                }

                .spotIcon {
                    position: absolute;
                    height: 16rem/@rootFontSize;
                    width: 16rem/@rootFontSize;
                    border-radius: 50%;
                    background-color: #000000;
                    left:-8rem/@rootFontSize;
                    top: 32rem/@rootFontSize;
                    z-index: 2;
                }
                    .itemContentBox {
                        .font-dpr(12px);
                        margin-left: 100rem/@rootFontSize;
                        overflow: hidden;
                        .textBox {
                            width: 50%;
                            float: left;
                            line-height: 60rem/@rootFontSize;

                        }
                    }
            }
        }
    }

    }
    .nodata{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .imgDiv{
            width:300rem/@rootFontSize;
            height: 300rem/@rootFontSize;
            img{
            width: 100%;
                height: 100%;
          }
        }
        .noText{
            .font-dpr(14px);
            color: #999;
            line-height: 80rem/@rootFontSize;
            text-align: center;
        }
    }
    .submitbtn{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        line-height: 98rem/@rootFontSize;
        height: 98rem/@rootFontSize;
        text-align: center;
        border-top: 1px solid #f4b36f;
        color: #f4b36f;
        .font-dpr(14px);
        background: #fff;
        z-index: 1000;

        .submitflex{
            display: flex;
            div{
                flex: 1;
                text-align: center;
                &:nth-of-type(2){
                    color: #999999;
                    position: relative;
                    &:after{
                        position: absolute;
                        width: 1px;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        content: '';
                        background: #e5e6e7;

                    }
                }
            }
        }
    }
}
</style>