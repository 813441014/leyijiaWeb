const state={
    openId:'',
    sessionId:'',
    projectId:'',
    jssdkStatus:false,
    bindStatus:false
}

const mutations={
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
    }
}

const actions={}

export default {
    state,mutations,actions
}