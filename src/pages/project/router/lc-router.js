let arr = [
    {
        name:'workTeam',
        path:'/workTeam',
        component:() => import('../views/work-team/work-team'),
        meta:{
            title:'施工团队'
        }
    },
    {
        name:'switchProject',
        path:'/switchProject',
        component:() => import('../views/switch-project/switch-project'),
        meta:{
            title:'切换工地'
        }
    },
    {
        name:'projectImage',
        path:'/projectImage',
        component:() => import('../views/project-image/project-image'),
        meta:{
            title:'设计图纸'
        }
    },
    {
        name:'contract',
        path:'/contract',
        component:()=>import('../views/contract/contract'),
        meta:{
            title:'合同信息'
        }
    }
]


export default  arr