import Vue from 'vue'
import Router from 'vue-router'


//
// import cyRouter from './router/cy-router'
// import zyhRouter from './router/zyh-router'
// import lcRouter from './router/lc-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/info-index'),
            meta:{
                title:'我的信息'
            },
            children:[
                {
                    name:"editPhone",
                    path:'/editPhone',
                    component:() => import('../../components/set-phone/set-phone'),
                    meta:{
                        title:'修改手机号'
                    }
                }
            ]
        },
        {
            name:"setPhone",
            path:'/setPhone',
            component:() => import('../../components/set-phone/set-phone'),
            meta:{
                title:'绑定手机'
            }
        }
    ]
})

