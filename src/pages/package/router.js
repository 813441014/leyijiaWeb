import Vue from 'vue'
import Router from 'vue-router'


//
// import cyRouter from './router/cy-router'
// import zyhRouter from './router/zyh-router'
// import lcRouter from './router/lc-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/package-index'),
            meta:{
                title:'套餐描述'
            }
        }
    ]
})

