export default {
  path: "/search",
  meta: {
    icon: "material-symbols:manage-search",
    title: "新闻信息"
  },
  children: [
    {
      path: "/search/baseDB",
      name: "SearchBaseDB",
      component: () => import("@/views/search/index.vue"),
      meta: {
        title: "境内外新闻源"
      }
    },
    {
      path: "/search/taiwanDB",
      name: "SearchTaiwanDB",
      component: () => import("@/views/search/taiwan.vue"),
      meta: {
        title: "台湾新闻源"
      }
    }
  ]
};