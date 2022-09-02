
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

export const routes: RouteRecordRaw[] = [
  {
    path: '/', name: 'shijing', meta: {
      title: '诗经'
    }, component: () => import('@/views/shijing/index.vue'),
  },
  {
    path: '/yuanqu', name: 'yuanqu', meta: {
      title: '元曲',
    }, component: () => import('@/views/yuanqu/index.vue'),
  },
  {
    path: '/lunyu', name: 'lunyu', meta: {
      title: '论语'
    }, component: () => import('@/views/lunyu/index.vue'),
  },
  {
    path: '/caocao', name: 'caocao', meta: {
      title: '曹操诗集'
    }, component: () => import('@/views/caocao/index.vue'),
  },
  // {
  //   path: '/sishuwujing', meta: { title: '四书五经' },redirect:{
  //     path:'/sishuwujing/daxue'
  //   }, children: [
  //     { path: 'daxue', name: 'daxue', meta: { title: '大学' }, component: SiShuWuJing },
  //     { path: 'zhongyong', name: 'zhongyong', meta: { title: '中庸' }, component: SiShuWuJing },
  //     { path: 'mengzi', name: 'mengzi', meta: { title: '孟子' }, component: SiShuWuJing }
  //   ]
  // },
  {
    path: '/youmengying', name: 'youmengying', meta: { title: '幽梦影' }, component: () => import('@/views/youmengying/index.vue'),
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router