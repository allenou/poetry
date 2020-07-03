export const routers = [
    {
        path: '/',
        redirect: '/shijing',
    },
    {
        path: '/shijing',
        component: () => import('../views/shijing/List'),
        meta: {
            title: '诗经'
        }
    },
    {
        path: '/lunyu',
        component: () => import('../views/lunyu/List'),
        meta: {
            title: '论语'
        }
    },
    {
        path: '/sishuwujing',
        component: () => import('../views/sishuwujing/List'),
        meta: {
            title: '四书五经'
        }
    },
    {
        path: '/youmengying',
        component: () => import('../views/youmengying/List'),
        meta: {
            title: '幽梦影'
        }
    },
    {
        path: '/caocao',
        component: () => import('../views/caocao/List'),
        meta: {
            title: '曹操市集'
        }
    },
    {
        path: '/yuanqu',
        component: () => import('../views/yuanqu/List'),
        meta: {
            title: '元曲'
        }
    },
]