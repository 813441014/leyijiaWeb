import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
// import '../../static/js/flexible'

axios.defaults.baseURL = 'https://n2cs.dingdingxiujia.com';
Vue.prototype.axios=axios;

//适配
import 'static/js/flexible';

Vue.use(require('vue-wechat-title'));
import VueJsonp from 'vue-jsonp';
Vue.use(VueJsonp);

//reset
import 'static/css/reset.css';

//获取url参数
import getParam from 'static/js/getParam';
//请求封装
import request from 'static/js/request';

//微信公众号信息
import wxInfo from 'static/js/wxPublicInfo';
//js注册
import wxReady from 'static/js/wxReady';

//jsapi
let jsAPIArr = ['previewImage','chooseImage','getLocalImgData','getLocation'];

router.beforeEach(async (to,from,next)=>{
    next();
    let url = location.href;
    // 判断jssdk是否注册过
    if(store.state.jssdkStatus){
        //如果jssdk注册过
        next();
    } else {
        // 跳转首页
        wxReady(encodeURIComponent(url.split('#')[0]),jsAPIArr,()=>{store.commit('setJSSDKStatus');next()},()=>{});
    }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
