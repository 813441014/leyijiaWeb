const state={}

const mutations={
	removeJSSDKstatus:(state)=>{
        state.jssdkStatus=true
    },
    removeBindStatus:(state)=>{
        state.bindStatus=true
    }
}

const actions={}


export default {
    state,mutations,actions
}