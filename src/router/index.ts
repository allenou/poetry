import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

export const routes: RouteRecordRaw[] = [
  // 分类首页 - 显示作者列表
  {
    path: "/shijing",
    name: "shijing",
    meta: {
      title: "诗经",
    },
    component: () => import("@/views/category/index.vue"),
  },
  {
    path: "/yuanqu",
    name: "yuanqu",
    meta: {
      title: "元曲",
    },
    component: () => import("@/views/category/index.vue"),
  },
  {
    path: "/lunyu",
    name: "lunyu",
    meta: {
      title: "论语",
    },
    component: () => import("@/views/category/index.vue"),
  },
  {
    path: "/caocao",
    name: "caocao",
    meta: {
      title: "曹操诗集",
    },
    component: () => import("@/views/category/index.vue"),
  },
  {
    path: "/sishuwujing",
    name: "sishuwujing",
    meta: { title: "四书五经" },
    component: () => import("@/views/category/index.vue"),
  },
  {
    path: "/youmengying",
    name: "youmengying",
    meta: { title: "幽梦影" },
    component: () => import("@/views/youmengying/index.vue"),
  },

  // 作者详情页 - 显示作者的所有作品
  {
    path: "/:type/author/:authorName",
    name: "author-detail",
    component: () => import("@/views/author/index.vue"),
  },

  // 作品详情页 - 显示具体作品内容
  {
    path: "/:type/work/:workTitle",
    name: "work-detail",
    component: () => import("@/views/work/index.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
