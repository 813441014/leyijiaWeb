import Vue from 'vue'
import Router from 'vue-router'

import cyRouter from './router/cy-router'
import zyhRouter from './router/zyh-router'
import lcRouter from './router/lc-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:() => import('./views/group-index'),
            meta:{
                title:'乐宜家集团'
            },
            children: [
                ...cyRouter, ...lcRouter, ...zyhRouter,
                // {
                //     path: '/assemblyDepartment',
                //     name: 'assemblyDepartment',
                //     component:() => import('./views/assemblyDepartment/assemblyDepartment'),
                //     meta:{
                //         title:'整装描述'
                //     },
                //     children: [
                //         {
                //             path: '/assemblyDepartment/setMeal',
                //             name: 'setMeal',
                //             component:() => import('./views/assemblyDepartment/setMeal/setMeal'),
                //             meta:{
                //                 title:'套餐描述'
                //             },
                //         },
                //         {
                //             path: '/assemblyDepartment/product',
                //             name: 'product',
                //             component:() => import('./views/assemblyDepartment/product/product'),
                //             meta:{
                //                 title:'产品列表'
                //             },
                //         }
                //     ]
                // },
                {
                    path: '/royalstarDescription',
                    name: 'royalstarDescription',
                    component:() => import('./views/royalstarDescription/royalstarDescription'),
                    meta:{
                        title:'荣事达描述'
                    }
                }
            ]
        }
    ]
})

