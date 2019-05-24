import Vue from 'vue'
import Router from 'vue-router'



import cyRouter from './router/cy-router'
import zyhRouter from './router/zyh-router'
import lcRouter from './router/lc-router'



export default new Router({
  mode: 'hash',
  routes: [
      {
        path:'/',
        component:() => import('./views/project-index'),
        meta:{
          title:'我的工地'
        },
        children:[
            ...cyRouter,...zyhRouter,...lcRouter
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
Vue.use(Router)
