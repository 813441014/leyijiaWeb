import wxInfo from './wxPublicInfo'
import request from './request'

// import wxReady from './wxReady'

import axios from 'axios'

// axios
// axios.post('/lyjlogin/jssdktoken/sign',{
//
// })


export default (url,apiList,success,error)=>{
    axios({
        method:'post',
        url:'/lyjlogin/jssdktoken/sign',
        data:`url=${url}`,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res=> {
        console.log(res.data.data.timestamp)
        wx.config({
            debug: false,
            appId: wxInfo.wxAppId,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.noncestr,
            signature: res.data.data.signature,
            jsApiList: apiList
        })
        wx.ready(()=>{
            success()
        })
        wx.error((error)=>{
            weui.alert(JSON.stringify(error))
        })
    }).catch(err=>{
        console.log(err)
    })
}


//参数 注册域名，apilist,成功回调，失败回调
// export default async (url,apiList,success,error)=>{
//     const signature =  await request('/lyjlogin/jssdktoken/sign','post',{
//         url:url
//     },'application/x-www-form-urlencoded')
//         console.log(signature)
//         await wx.config({
//             debug:true,
//             appId:wxInfo.wxAppId,
//             timestamp:signature.data.timestamp,
//             nonceStr:signature.data.noncestr,
//             signature:signature.data.signature,
//             jsApiList:apiList
//         })
//         await wx.ready((res)=>{
//             console.log(res)
//             success()
//         });
//         await wx.error(async (res)=>{
//             weui.alert(JSON.stringify(Object.assign({timestamp:signature.data.timestamp,nonceStr:signature.data.noncestr,signature:signature.data.signature})));
//             error()
//             // await wxReady(url,apiList,()=>{},()=>{})
//         })
// }


// export default ({timestamp,nonceStr,signature,jsApiList},success,failed)=>{
//     wx.config({
//         debug:true,
//         appId:wxInfo.wxAppId,
//         timestamp:timestamp,
//         nonceStr:nonceStr,
//         signature:signature,
//         jsApiList:jsApiList
//     })
//     wx.ready(()=>{
//         success()
//     });
//     wx.error((res)=>{
//         console.log(res)
//         failed()
//     })
// }