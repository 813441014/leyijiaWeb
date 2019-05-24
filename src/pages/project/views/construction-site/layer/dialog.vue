<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-title">{{title}}</div>
            <textarea class="content" v-model="transmit.my_content" name="" id="" cols="30" rows="10" placeholder="请输入您要评论的内容..."></textarea>
            <div class="btns">
                <div v-if="type != 'danger'" class="default-btn" @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
            </div>
            <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
        </div>
        
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type:{
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '确认'
        },
    },
    data(){
        return{
            showMask: false,
            transmit: {
                my_content: this.content
            }
        }
    },
    methods:{
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.$set(this.transmit, 'my_content', '');
            this.closeMask();
        },
        dangerBtn(){
            this.$emit('danger');
            this.closeMask();
        },
        confirmBtn(){
            this.$emit('confirm', this.transmit.my_content);
            this.$set(this.transmit, 'my_content', '');
            this.closeMask();
        }
    },
    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    @import "~static/css/minxin.less";
    .dialog{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container{
            width: 80%;
            height: 500rem/@rootFontSize;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8rem/@rootFontSize;
            position: relative;
            .dialog-title{
                width: 100%;
                height: 80rem / @rootFontSize;
                line-height: 80rem / @rootFontSize;
                .font-dpr(14px);
                color: #696969;
                font-weight: 600;
                padding-left: 20rem / @rootFontSize;
                box-sizing: border-box;
            }
            textarea {
                border: 0;
                border-radius: 5rem / @rootFontSize;
                background-color: rgba(241,241,241,.98);
                /*width: 355px;*/
                /*height: 100px;*/
                padding: 10rem / @rootFontSize;
                resize: none;
            }
            .content{
                width: 100%;
                height: 340rem / @rootFontSize;
                color: #797979;
                line-height: 36rem/@rootFontSize;
                .font-dpr(14px);
                padding: 10rem/@rootFontSize 20rem/@rootFontSize;
                box-sizing: border-box;
            }
            .inp{
                margin: 10rem/@rootFontSize 0 0 20rem/@rootFontSize;
                width: 200rem/@rootFontSize;
                height: 40rem/@rootFontSize;
                padding-left: 4rem/@rootFontSize;
                border-radius: 4rem/@rootFontSize;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                width: 100%;
                height: 80rem / @rootFontSize;
                line-height: 80rem / @rootFontSize;
                position: absolute;
                bottom: 0;
                left: 0;
                text-align: right;
                padding: 0 16rem/@rootFontSize;
                box-sizing: border-box;
                & > div{
                    display: inline-block;
                    height: 50rem / @rootFontSize;
                    line-height: 50rem / @rootFontSize;
                    padding: 0 25rem / @rootFontSize;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 8rem / @rootFontSize;
                    margin-right: 20rem / @rootFontSize;
                    cursor: pointer;
                }
                .default-btn{
                    color: #787878;
                    &:hover{
                        color: #509EE3; 
                    }
                }
                .danger-btn{
                    background: #EF8C8C;
                    &:hover{
                        background: rgb(224, 135, 135);
                    }
                    &:active{
                        background: #EF8C8C;
                    }
                }
                .confirm-btn{
                    color: #ffffff;
                    background: #509EE3;
                    &:hover{
                        background: #6FB0EB;
                    }
                }
            }
            .close-btn{
                position: absolute;
                top: 16rem / @rootFontSize;
                right: 16rem / @rootFontSize;
                width: 30rem / @rootFontSize;
                height: 30rem / @rootFontSize;
                line-height: 30rem / @rootFontSize;
                text-align: center;
                font-size: 18rem / @rootFontSize;
                cursor: pointer;
                &:hover{
                    font-weight: 600;
                }
            }
        }
    }
</style>
