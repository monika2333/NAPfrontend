export default {
  path: "/source",
  meta: {
    title: "数据源"
  },
  children: [
    {
      path: "/source/index",
      name: "Source",
      component: () => import("@/views/source/index.vue"),
      meta: {
        title: "添加"
      }
    },
    {
      path: "/source/list",
      name: "SourceList",
      component: () => import("@/views/source/list.vue"),
      meta: {
        title: "列表"
      }
    }
  ]
};