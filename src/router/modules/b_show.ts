export default {
  path: "/show",
  meta: {
    icon: "material-symbols:manage-search",
    title: "新闻展示"
  },
  children: [
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