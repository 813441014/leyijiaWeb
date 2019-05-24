let arr = [
    // {
    //     path: '/assemblyDepartment',
    //     name: 'assemblyDepartment',
    //     component:() => import('../views/assemblyDepartment/assemblyDepartment'),
    //     meta:{
    //         title:'整装部'
    //     }
    // }
    {
        path: '/group',
        name: 'group',
        component:() => import('../views/n2csGroup/group'),
        meta:{
            title:'乐宜家集团'
        }
    },
    {
        path: 'assembly',
        name: 'assembly',
        component:() => import('../views/n2csAssembly/assembly'),
        meta:{
            title:'整装'
        },
        children:[
            {
                path:"",
                redirect:"describe"
            },
            {
                name:"describe",
                path:'describe',
                component:() => import('../views/describe/describe')
            },
            {
                name:"myInfo",
                path:'describe',
                component:() => import('../views/myInfo/myInfo')
            },
            {
                name:"newRetail",
                path:'newRetail',
                component:() => import('../views/newRetail/newRetail')
            },
            {
                name:"product",
                path:'product',
                component:() => import('../views/product/product')
            },
            {
                name:"setMeal",
                path:'setMeal',
                component:() => import('../views/setMeal/setMeal')
            },
            ]
    },
    {
        path: '/royalstar',
        name: 'royalstar',
        component:() => import('../views/n2csRoyalstar/royalstar'),
        meta:{
            title:'荣事达'
        }
    },
    {
        path: '/mine',
        name: 'mine',
        component:() => import('../views/n2csMine/mine'),
        meta:{
            title:'我的'
        }
    }
];

export default arr