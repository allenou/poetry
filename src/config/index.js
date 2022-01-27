export const routers = [
  {
    path: "/shijing",
    component: () =>
      import(/* webpackChunkName: "shijing" */ "@/views/shijing/List"),
    meta: {
      title: "诗经",
    },
  },
  {
    path: "/lunyu",
    component: () =>
      import(/* webpackChunkName: "lunyu" */ "@/views/lunyu/List"),
    meta: {
      title: "论语",
    },
  },
  {
    path: "/sishuwujing",
    component: () =>
      import(/* webpackChunkName: "sishuwujing" */ "@/views/sishuwujing/List"),
    meta: {
      title: "四书五经",
    },
  },
  // {
  //   path: "/youmengying",
  //   component: () =>
  //     import(/* webpackChunkName: "youmengying" */ "@/views/youmengying/List"),
  //   meta: {
  //     title: "幽梦影",
  //   },
  // },
  {
    path: "/caocao",
    component: () =>
      import(/* webpackChunkName: "caocao" */ "@/views/caocao/List"),
    meta: {
      title: "曹操诗集",
    },
  },
  // {
  //   path: "/yuanqu",
  //   component: () =>
  //     import(/* webpackChunkName: "yuanqu" */ "@/views/yuanqu/List"),
  //   meta: {
  //     title: "元曲",
  //   },
  // },
  {
    path: "/songci",
    component: () => import(/* webpackChunkName: "yuanqu" */ "@/views/ci/List"),
    meta: {
      title: "宋词",
    },
  },
  {
    path: "/",
    redirect: "/shijing",
  },
];
