let arr = [
    {
        name:"constructionPlan",
        path:'/constructionPlan',
        component:() => import('../views/construction_plan/construction_plan'),
        meta:{
            title:'施工计划'
        }
    },
    {
        name:"stageAcceptance",
        path:'/stageAcceptance',
        component:() => import('../views/stage_acceptance/stage_acceptance'),
        meta:{
            title:'阶段验收'
        }

    },
    {
        name:"completeAcceptance",
        path:'/completeAcceptance',
        component:() => import('../views/complete_acceptance/complete_acceptance'),
        meta:{
            title:'竣工验收'
        }

    },
    {
        name:"editPhone",
        path:'/editPhone',
        component:() => import('../../../components/set-phone/set-phone'),
        meta:{
            title:'修改手机号'
        }
    },
    {
        name:"paymentRecord",
        path:'/paymentRecord',
        component:() => import('../views/payment-record/payment-record'),
        meta:{
            title:'交费记录'
        }
    },
    {
    	name:"goodsList",
    	path:'/goodsList',
        component:() => import('../views/goods-list/goods-list'),
        meta:{
            title:'订单列表'
        }
    },
    {
    	name:"goodsDetails",
    	path:'/goodsDetails',
    	component:() => import('../views/goods-details/goods-details'),
        meta:{
            title:'订单详情'
        }
    },
    {
    	name:"paymentDetails",
    	path:'/paymentDetails',
    	component:() => import('../views/payment-details/payment-details'),
        meta:{
            title:'交费记录详情'
        }
    }
]
export default  arr