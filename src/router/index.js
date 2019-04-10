import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    base: process.env.BASE_URL,
    fallback: true,

    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            component: () => import('../views/shijing/List'),
        },
        {
            path: '/shijing',
            component: () => import('../views/shijing/List'),
        },
        {
            path: '/lunyu',
            component: () => import('../views/lunyu/List'),
        },
        {
            path: '/sishuwujing',
            component: () => import('../views/sishuwujing/List'),
        }
    ]
})
export default router