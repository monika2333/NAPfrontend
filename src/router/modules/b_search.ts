export default {
  path: "/search",
  meta: {
    icon: "material-symbols:manage-search",
    title: "新闻信息"
  },
  children: [
    {
      path: "/search",
      name: "Search",
      component: () => import("@/views/search/index.vue"),
      meta: {
        title: "新闻搜索"
      }
    },
    {
      path: "/show",
      name: "Show",
      component: () => import("@/views/show/index.vue"),
      meta: {
        title: "新闻展示"
      }
    }
  ]
};