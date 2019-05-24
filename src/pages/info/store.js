import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openId: '',
    sessionId: '',
    projectId: '',
    jssdkStatus: false,
    bindStatus: false,
    userId: '',
    userTel: ''
  },
  mutations: {
    wxOpenId:(state,val)=>{
      state.openId=val
    },
    setSessionId:(state,val)=>{
      state.sessionId=val
    },
    setProjectId:(state,val)=>{
      state.projectId=val
    },
    setJSSDKstatus:(state)=>{
      state.jssdkStatus=true
    },
    setBindStatus:(state)=>{
      state.bindStatus=true
    },
    removeJSSDKstatus:(state)=>{
        state.jssdkStatus=false
    },
    removeBindStatus:(state)=>{
        state.bindStatus=false
    },
    setUserTel:(state, val)=>{
      state.userId = val.id;
      state.userTel = val.tel;
      console.log(state.userId + ' / ' + state.userTel);
    },
    editTel:(state, val)=>{
      state.userTel = val;
      console.log('edit: ' + state.userTel);
    }
    // test:(state)=>{
    //   state.bindStatus=true
    // }
  },
  actions: {

  }
})
