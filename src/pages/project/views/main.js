import Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = 'https://n2cs.dingdingxiujia.com'
Vue.prototype.axios=axios

//适配
import 'static/js/flexible'


Vue.use(require('vue-wechat-title'))

//reset
import 'static/css/reset.css'

//获取url参数
import getParam from 'static/js/getParam'
//请求封装
import request from 'static/js/request'

//微信公众号信息
import wxInfo from 'static/js/wxPublicInfo'
//js注册
import wxReady from 'static/js/wxReady'

router.beforeEach(async (to,from,next)=>{
    let url = location.href
    alert(store.state.jssdkStatus);
    alert(store.state.bindStatus);
    // if(to.path!=='/setPhone'){
        if(store.state.jssdkStatus){
            //如果jssdk注册过

            if(store.state.bindStatus){
                next()
            }else{
                if(to.path==='/setPhone'){
                    next()
                }else{
                    next('/setPhone')
                }
            }
            // if(store.state.bindStatus){
            //     next()
            // }else if(to!=='/setPhone'){
            //     next('/setPhone')
            // }else{
            //     next('/setPhone')
            // }

        }else{
            //是否有openId
            if(localStorage.getItem('openId')){
                // 是
                //   openId存入store
                store.commit('wxOpenId',localStorage.getItem('openId'))
                //查看是否绑定该工地信息
                if(localStorage.getItem('sessionId')){
                    //是
                    //sessionId寸到store
                    store.commit('setSessionId',localStorage.getItem('sessionId'))
                    //projectId寸到store
                    store.commit('setProjectId',localStorage.getItem('projectId'))
                    //注册,成功跳转首页
                    store.commit('setBindStatus')
                     wxReady(encodeURIComponent(url.split('#')[0]),['previewImage'],()=>{store.commit('setJSSDKstatus');next()},()=>{})
                }else{
                    //否
                    //注册 跳转绑定
                     wxReady(encodeURIComponent(url.split('#')[0]),['previewImage'],()=>{store.commit('setJSSDKstatus');next('/setPhone')},()=>{})
                }
            }else{
                //否
                // 判断是否已经授权跳转
                if(url.split('?').length===1){
                    //未跳转 先跳转到微信页面
                    location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxInfo.wxAppId}&redirect_uri=https%3a%2f%2fn2cs.dingdingxiujia.com%2fcustomer%2fdist%2fproject.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
                }else if(getParam('code')){
                    //已跳转 通过code请求信息
                    let  getUserInfo  = await request(`/lyjlogin/index/acctoken?code=${getParam('code')}`,'get',{
                    },'application/x-www-form-urlencoded')

                    if(getUserInfo.code===101002){
                        //用户未绑定手机
                        //将openId存到state
                        store.commit('wxOpenId',getUserInfo.data.oppenId)
                        //将openId存到本地
                        localStorage.setItem('openId',getUserInfo.data.oppenId)
                        //获取jssdk签名 跳转到绑定页面
                         wxReady(encodeURIComponent(url.split('#')[0]),['previewImage'],()=>{store.commit('setJSSDKstatus');next('/setPhone')},()=>{})
                    }else if(getUserInfo.code===0){
                        //已绑定 存openId sessionId projectId
                        store.commit('wxOpenId',getUserInfo.data.oppenId)
                        localStorage.setItem('openId',getUserInfo.data.oppenId)
                        store.commit('setSessionId',getUserInfo.data.sessionId)
                        localStorage.setItem('sessionId',getUserInfo.data.sessionId)
                        store.commit('setProjectId',getUserInfo.data.addressId)
                        localStorage.setItem('projectId',getUserInfo.data.addressId)
                        store.commit('setBindStatus')
                        //用户已绑定
                        //获取jssdk签名 跳转到首页

                         wxReady(encodeURIComponent(url.split('#')[0]),['previewImage'],()=>{store.commit('setJSSDKstatus');next()},()=>{})
                        // await wxReady(url.split('#')[0],[],()=>{next()},()=>{})

                    }
                }
            }
        }
    //
    // }else{
    //     next()
    // }





})


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
