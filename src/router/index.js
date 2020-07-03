import Vue from 'vue'
import Router from 'vue-router'
import {routers} from '../config'

Vue.use(Router)
const router = new Router({
    base: 'poetry',
    fallback: true,

    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    },
    routes: routers
})
export default router